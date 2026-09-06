import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import test from 'node:test';
import { JSDOM } from 'jsdom';

const require = createRequire(import.meta.url);
const { locales } = require('../src/i18n/config.ts');
const { getAllPosts } = require('../src/lib/blog.ts');
const { renderMarkdown } = require('../src/lib/render-markdown.ts');
const { siteUrl } = require('../src/lib/seo.ts');
const { GET } = require('../src/app/rss.xml/route.ts');
const contentNamespace = 'http://purl.org/rss/1.0/modules/content/';
const dcNamespace = 'http://purl.org/dc/elements/1.1/';

test('RSS provides the complete bilingual article collection with stable identity and publication dates', async () => {
  const response = GET();
  assert.equal(response.headers.get('Content-Type'), 'application/rss+xml; charset=utf-8');
  const xml = await response.text();
  const dom = new JSDOM(xml, { contentType: 'application/xml' });
  try {
    const document = dom.window.document;
    const posts = locales.flatMap(locale => getAllPosts(locale).map(post => ({ locale, post })));
    const items = [...document.querySelectorAll('item')];
    assert.equal(posts.length, 6, 'The source currently contains three complete articles in two languages');
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
      assert.equal(item.querySelector('pubDate').textContent, new Date(`${post.date}T00:00:00+08:00`).toUTCString());
      assert.equal(item.getElementsByTagNameNS(dcNamespace, 'creator')[0]?.textContent, 'Darren Su');
      assert.equal(item.getElementsByTagNameNS(dcNamespace, 'language')[0]?.textContent, locale === 'zh' ? 'zh-CN' : 'en');
      assert.deepEqual([...item.querySelectorAll('category')].map(value => value.textContent), post.tags);

      const html = item.getElementsByTagNameNS(contentNamespace, 'encoded')[0]?.textContent;
      assert.ok(html, `${url} must contain a readable full article`);
      const feed = new JSDOM(html);
      const page = new JSDOM(renderMarkdown(post.content, post.title, locale));
      try {
        assert.equal(feed.window.document.body.textContent, page.window.document.body.textContent, `${url}: feed text must match the complete article`);
        const feedElements = [...feed.window.document.querySelectorAll('[href], [src]')];
        const pageElements = [...page.window.document.querySelectorAll('[href], [src]')];
        assert.equal(feedElements.length, pageElements.length);
        for (const [index, element] of feedElements.entries()) {
          const attribute = element.hasAttribute('href') ? 'href' : 'src';
          const expected = new URL(pageElements[index].getAttribute(attribute), url).href;
          assert.equal(element.getAttribute(attribute), expected, `${url}: links and images must resolve without a feed reader base URL`);
          if (pageElements[index].getAttribute(attribute).startsWith('#')) {
            assert.equal(new URL(expected).pathname, new URL(url).pathname, 'Contents links must point back to this canonical article');
            const target = decodeURIComponent(new URL(expected).hash.slice(1));
            assert.ok(page.window.document.getElementById(target), `${url}: contents link must retain a real article heading`);
          }
        }
        assert.equal(feed.window.document.querySelector('script, iframe, object, embed'), null);
      } finally {
        feed.window.close();
        page.window.close();
      }
    }

    assert.equal(await GET().text(), xml, 'Repeated feed generation must not change GUIDs or invent timestamps');
  } finally {
    dom.window.close();
  }
});

test('RSS preserves special characters through XML and HTML while keeping unsafe source content inert', async (context) => {
  const blogRoot = path.join(process.cwd(), 'content/blog');
  const originalRead = fs.readFileSync;
  const originalList = fs.readdirSync;
  const title = 'A & B <notes> "quoted"';
  const description = 'Text with & < > " and a CDATA terminator ]]>';
  const source = `---\ntitle: ${title}\ndate: 2026-04-01\ndescription: ${description}\ntags: [Research & notes]\n---\n## A & B\n\nLiteral <script>alert("unsafe")</script> & closing ]]>\n\n[Find it](/zh/about?q=one&next=two)\n\n[Unsafe](javascript:alert)\n\n![Quote " onerror="alert](/image.png?first=one&second=two)\n\n![Unsafe image](javascript:alert)\n\n![Unsafe data image](data:text/html,unsafe)\n`;
  context.mock.method(fs, 'readdirSync', function (directory, ...options) {
    if (locales.some(locale => String(directory) === path.join(blogRoot, locale))) return ['escaping-fixture.md'];
    return originalList.call(this, directory, ...options);
  });
  context.mock.method(fs, 'readFileSync', function (filename, ...options) {
    if (locales.some(locale => String(filename) === path.join(blogRoot, locale, 'escaping-fixture.md'))) return source;
    return originalRead.call(this, filename, ...options);
  });

  const dom = new JSDOM(await GET().text(), { contentType: 'application/xml' });
  try {
    const items = [...dom.window.document.querySelectorAll('item')];
    assert.equal(items.length, locales.length);
    for (const item of items) {
      assert.equal(item.querySelector('title').textContent, title);
      assert.equal(item.querySelector('description').textContent, description);
      assert.equal(item.querySelector('category').textContent, 'Research & notes');
      const html = item.getElementsByTagNameNS(contentNamespace, 'encoded')[0].textContent;
      const body = new JSDOM(html);
      try {
        const document = body.window.document;
        assert.equal(document.querySelector('script, [onerror]'), null);
        assert.ok(document.body.textContent.includes('Literal <script>alert("unsafe")</script> & closing ]]>'));
        assert.equal(document.querySelector('a').getAttribute('href'), `${siteUrl}/zh/about?q=one&next=two`);
        assert.equal(document.querySelector('img').getAttribute('src'), `${siteUrl}/image.png?first=one&second=two`);
        assert.equal(document.querySelector('img').getAttribute('alt'), 'Quote " onerror="alert');
        for (const element of document.querySelectorAll('[href], [src]')) {
          const value = element.getAttribute('href') ?? element.getAttribute('src');
          assert.ok(['http:', 'https:', 'mailto:'].includes(new URL(value).protocol));
        }
      } finally {
        body.window.close();
      }
    }
  } finally {
    dom.window.close();
  }
});
