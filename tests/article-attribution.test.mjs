import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import test from 'node:test';
import { JSDOM } from 'jsdom';

const require = createRequire(import.meta.url);
const { getAllPosts, parseBlogContent } = require('../src/lib/blog.ts');
const { articleMarkdown } = require('../src/lib/content-source.ts');
const { articleStructuredData, blogStructuredData, createPageMetadata, siteUrl } = require('../src/lib/seo.ts');
const { GET: feedGET } = require('../src/app/rss.xml/route.ts');
const { GET: sourceGET } = require('../src/app/[locale]/blog/[slug]/source.md/route.ts');
const locales = ['en', 'zh'];
const dcNamespace = 'http://purl.org/dc/elements/1.1/';

test('source authors and date uncertainty propagate through metadata, both JSON-LD views, RSS, and Markdown routes', async (context) => {
  const fixtures = [
    { slug: 'coauthored-archive', authors: ['苏鹏', '王瑞楠'], dates: ['archiveYear: "2024"', 'dateNote: 2024 年旧文，原发表日期未核实。'] },
    { slug: 'uncertain-date', authors: ['Guest & <Writer>'], dates: ['dateNote: 原发表日期未核实。'] },
    { slug: 'dated-default', dates: ['date: 2026-07-22'] },
    { slug: 'coauthored-dated', authors: ['苏鹏', '王瑞楠'], dates: ['date: 2024-07-01'] },
  ];
  const sources = new Map(fixtures.map(fixture => [`${fixture.slug}.md`, [
    '---',
    `title: ${fixture.slug}`,
    ...fixture.dates,
    ...(fixture.authors ? [`authors: ${JSON.stringify(fixture.authors)}`] : []),
    'description: An article fixture with explicit source authors and honest historical metadata.',
    'tags: [AI, Community]',
    '---',
    '',
    '## A first-hand record',
    '',
    'The original body and [reference](https://example.org/reference) remain available.',
    '',
  ].join('\n')]));
  const blogRoot = path.join(process.cwd(), 'content/blog');
  const originalRead = fs.readFileSync;
  const originalList = fs.readdirSync;
  context.mock.method(fs, 'readdirSync', function (directory, ...options) {
    if (locales.some(locale => String(directory) === path.join(blogRoot, locale))) return [...sources.keys()];
    return originalList.call(this, directory, ...options);
  });
  context.mock.method(fs, 'readFileSync', function (filename, ...options) {
    const filenameString = String(filename);
    if (locales.some(locale => path.dirname(filenameString) === path.join(blogRoot, locale)) && sources.has(path.basename(filenameString))) {
      return sources.get(path.basename(filenameString));
    }
    return originalRead.call(this, filename, ...options);
  });

  const feedText = await feedGET().text();
  const dom = new JSDOM(feedText, { contentType: 'application/xml' });
  try {
    assert.equal(dom.window.document.querySelector('parsererror'), null);
    const items = [...dom.window.document.querySelectorAll('item')];
    assert.equal(items.length, fixtures.length * locales.length);
    for (const locale of locales) {
      const posts = getAllPosts(locale);
      assert.deepEqual(posts.map(post => post.slug), ['dated-default', 'coauthored-dated', 'coauthored-archive', 'uncertain-date']);
      const index = blogStructuredData(posts, locale)['@graph'].find(node => node['@type'] === 'Blog');
      for (const post of posts) {
        const fixture = fixtures.find(value => value.slug === post.slug);
        const expectedAuthors = fixture.authors ?? ['Darren Su'];
        const canonical = `${siteUrl}/${locale}/blog/${post.slug}`;
        assert.deepEqual(post.authors, expectedAuthors);
        const article = articleStructuredData(post, locale)['@graph'].find(node => node['@type'] === 'BlogPosting');
        const indexArticle = index.blogPost.find(value => value.url === canonical);
        for (const schema of [article, indexArticle]) {
          assert.deepEqual(schema.author.map(author => author.name), expectedAuthors);
          for (const author of schema.author) {
            assert.equal(author['@type'], 'Person');
            if (['Darren Su', '苏鹏'].includes(author.name)) {
              assert.equal(author['@id'], `${siteUrl}/#person`);
              assert.equal(author.url, `${siteUrl}/${locale}/about`);
            } else {
              assert.ok(!Object.hasOwn(author, '@id') && !Object.hasOwn(author, 'url'), 'A coauthor must not inherit Darren’s identity or profile');
            }
          }
          if (post.date) assert.equal(schema.datePublished, post.date);
          else assert.ok(!Object.hasOwn(schema, 'datePublished'));
          assert.ok(!Object.hasOwn(schema, 'dateModified'));
        }
        assert.deepEqual(article.publisher, { '@id': `${siteUrl}/#person` }, 'Website publishing and article authorship are distinct');

        const metadata = createPageMetadata({ locale, path: `/blog/${post.slug}`, title: post.title, description: post.description, openGraphType: 'article', publishedTime: post.date, authors: post.authors });
        assert.deepEqual(metadata.authors.map(author => author.name), expectedAuthors);
        assert.equal(metadata.creator, expectedAuthors.join(', '));
        assert.deepEqual(metadata.openGraph.authors, expectedAuthors.map(name => ['Darren Su', '苏鹏'].includes(name) ? `${siteUrl}/${locale}/about` : name));
        for (const author of metadata.authors.filter(author => !['Darren Su', '苏鹏'].includes(author.name))) assert.ok(!Object.hasOwn(author, 'url'));
        if (post.date) assert.equal(metadata.openGraph.publishedTime, post.date);
        else assert.ok(!Object.hasOwn(metadata.openGraph, 'publishedTime'));

        const markdown = articleMarkdown(post, locale);
        const exported = parseBlogContent(markdown);
        for (const field of ['authors', 'date', 'archiveYear', 'dateNote']) assert.deepEqual(exported[field], post[field]);
        if (post.authors.length > 1) assert.ok(!/^author:/m.test(markdown), 'A coauthored export must not retain a contradictory sole-author field');
        if (post.slug === 'dated-default') assert.ok(markdown.includes('author: "Darren Su / 苏鹏"'), 'The existing single-author export stays compatible');
        const response = await sourceGET(new Request(`${canonical}/source.md`), { params: Promise.resolve({ locale, slug: post.slug }) });
        assert.equal(response.status, 200);
        assert.equal(await response.text(), markdown);
        assert.equal(response.headers.get('link'), `<${canonical}>; rel="canonical"`);

        const item = items.find(item => item.querySelector('guid').textContent === canonical);
        assert.deepEqual([...item.getElementsByTagNameNS(dcNamespace, 'creator')].map(author => author.textContent), expectedAuthors);
        if (post.date) assert.equal(item.querySelector('pubDate').textContent, new Date(`${post.date}T00:00:00+08:00`).toUTCString());
        else assert.equal(item.querySelector('pubDate'), null);
        assert.equal(item.querySelector('link').textContent, canonical);
      }
    }
    assert.equal(await feedGET().text(), feedText, 'Feed generation must not add the current date or unstable identities');
    assert.ok(!feedText.includes('Invalid Date'));
  } finally {
    dom.window.close();
  }
});
