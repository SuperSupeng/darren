import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import test from 'node:test';
import { JSDOM } from 'jsdom';

const require = createRequire(import.meta.url);
const { locales } = require('../src/i18n/config.ts');
const { getAllPosts } = require('../src/lib/blog.ts');
const { siteUrl } = require('../src/lib/seo.ts');
const { GET } = require('../src/app/rss.xml/route.ts');
const dcNamespace = 'http://purl.org/dc/elements/1.1/';
const contentNamespace = 'http://purl.org/rss/1.0/modules/content/';

test('RSS provides a compact bilingual Writing feed with stable identity and publication dates', async () => {
  const response = await GET();
  assert.equal(response.headers.get('Content-Type'), 'application/rss+xml; charset=utf-8');
  const xml = await response.text();
  const byteLength = Buffer.byteLength(xml, 'utf8');
  assert.ok(byteLength < 150_000, `excerpt feed must stay well under 150KB, got ${byteLength} bytes`);
  const dom = new JSDOM(xml, { contentType: 'application/xml' });
  try {
    const document = dom.window.document;
    const posts = locales.flatMap(locale => getAllPosts(locale).map(post => ({ locale, post })));
    const items = [...document.querySelectorAll('item')];
    const sourceCount = locales.reduce((count, locale) => count + fs.readdirSync(path.join(process.cwd(), 'content/blog', locale)).filter(name => /\.mdx?$/.test(name)).length, 0);
    assert.ok(sourceCount > 0, 'The published article collection must not be empty');
    assert.equal(posts.length, sourceCount, 'Every published language version must be included, without requiring a translation');
    assert.equal(items.length, posts.length);
    assert.equal(document.querySelector('lastBuildDate'), null, 'A build must not manufacture an editorial update date');
    const self = document.getElementsByTagNameNS('http://www.w3.org/2005/Atom', 'link')[0];
    assert.equal(self?.getAttribute('href'), `${siteUrl}/rss.xml`);
    assert.equal(self?.getAttribute('rel'), 'self');
    assert.equal(self?.getAttribute('type'), 'application/rss+xml');

    const expectedUrls = posts.map(({ locale, post }) => `${siteUrl}/${locale}/blog/${post.slug}`);
    assert.deepEqual(new Set(items.map(item => item.querySelector('guid').textContent)), new Set(expectedUrls));
    for (const { locale, post } of posts) {
      const url = `${siteUrl}/${locale}/blog/${post.slug}`;
      const item = items.find(value => value.querySelector('guid').textContent === url);
      assert.equal(item.querySelector('guid').getAttribute('isPermaLink'), 'true');
      assert.equal(item.querySelector('link').textContent, url);
      assert.equal(item.querySelector('title').textContent, post.title);
      assert.equal(item.querySelector('description').textContent, post.description);
      assert.ok(post.description.trim(), `${url} must include a useful excerpt`);
      assert.equal(item.getElementsByTagNameNS(contentNamespace, 'encoded')[0], undefined, `${url} must not embed full article HTML`);
      assert.ok(!item.querySelector('description').textContent.includes('<img'), `${url}: excerpts must not embed images`);
      if (post.date) assert.equal(item.querySelector('pubDate').textContent, new Date(`${post.date}T00:00:00+08:00`).toUTCString());
      else assert.equal(item.querySelector('pubDate'), null);
      assert.deepEqual([...item.getElementsByTagNameNS(dcNamespace, 'creator')].map(author => author.textContent), post.authors);
      assert.equal(item.getElementsByTagNameNS(dcNamespace, 'language')[0]?.textContent, locale === 'zh' ? 'zh-CN' : 'en');
      assert.deepEqual([...item.querySelectorAll('category')].map(value => value.textContent), post.tags);
    }

    assert.equal(await (await GET()).text(), xml, 'Repeated feed generation must not change GUIDs or invent timestamps');
  } finally {
    dom.window.close();
  }
});

test('RSS preserves special characters through XML while keeping item bodies as excerpts', async (context) => {
  const blogRoot = path.join(process.cwd(), 'content/blog');
  const originalRead = fs.readFileSync;
  const originalList = fs.readdirSync;
  const title = 'A & B <notes> "quoted"';
  const description = 'Text with & < > " and a CDATA terminator ]]>';
  const source = `---\ntitle: ${title}\ndate: 2026-04-01\ndescription: ${description}\ntags: [Research & notes]\n---\n## A & B\n\nLiteral <script>alert("unsafe")</script> & closing ]]>\n\n[Find it](/zh/about?q=one&next=two)\n\n![Quote " onerror="alert](/image.png?first=one&second=two)\n`;
  context.mock.method(fs, 'readdirSync', function (directory, ...options) {
    if (locales.some(locale => String(directory) === path.join(blogRoot, locale))) return ['escaping-fixture.md'];
    return originalList.call(this, directory, ...options);
  });
  context.mock.method(fs, 'readFileSync', function (filename, ...options) {
    if (locales.some(locale => String(filename) === path.join(blogRoot, locale, 'escaping-fixture.md'))) return source;
    return originalRead.call(this, filename, ...options);
  });

  const xml = await (await GET()).text();
  const dom = new JSDOM(xml, { contentType: 'application/xml' });
  try {
    const items = [...dom.window.document.querySelectorAll('item')];
    assert.equal(items.length, locales.length);
    assert.ok(!xml.includes('<content:encoded>'));
    assert.ok(!xml.includes('<img'));
    for (const item of items) {
      assert.equal(item.querySelector('title').textContent, title);
      assert.equal(item.querySelector('description').textContent, description);
      assert.equal(item.querySelector('category').textContent, 'Research & notes');
      assert.equal(item.getElementsByTagNameNS(contentNamespace, 'encoded')[0], undefined);
    }
  } finally {
    dom.window.close();
  }
});
