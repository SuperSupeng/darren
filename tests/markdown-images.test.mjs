import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';
import { JSDOM } from 'jsdom';

const require = createRequire(import.meta.url);
const { renderMarkdown } = require('../src/lib/render-markdown.ts');
const { optimizeArticleImage } = require('../src/lib/optimize-article-image.ts');
const { getAllPosts } = require('../src/lib/blog.ts');

test('responsive article images retain text, anchors, alt text and reserved dimensions in both languages', () => {
  for (const locale of ['zh', 'en']) for (const post of getAllPosts(locale)) {
    const original = new JSDOM(renderMarkdown(post.content, post.title, locale));
    const responsive = new JSDOM(renderMarkdown(post.content, post.title, locale, { responsiveImages: true, optimizeImage: optimizeArticleImage }));
    try {
      const before = original.window.document;
      const after = responsive.window.document;
      assert.equal(after.body.textContent, before.body.textContent);
      assert.deepEqual([...after.querySelectorAll('[id]')].map(e => e.id), [...before.querySelectorAll('[id]')].map(e => e.id));
      const originalImages = [...before.querySelectorAll('img')];
      const images = [...after.querySelectorAll('img')];
      assert.equal(images.length, originalImages.length);
      for (const [index, image] of images.entries()) {
        const old = originalImages[index];
        for (const attr of ['alt', 'width', 'height', 'loading', 'decoding']) {
          assert.equal(image.getAttribute(attr), old.getAttribute(attr));
        }
        assert.ok(image.width > 0 && image.height > 0, 'Reserve image space before it loads');
        const candidates = image.getAttribute('srcset').split(',').map(entry => entry.trim().split(/\s+/));
        assert.ok(candidates.length > 1, 'The browser must be able to select a smaller image');
        for (const [href, descriptor] of candidates) {
          const url = new URL(href, 'https://example.test');
          assert.equal(url.pathname, '/_next/image');
          assert.equal(url.searchParams.get('url'), old.getAttribute('src'));
          assert.match(descriptor, /^\d+w$/);
        }
        assert.ok(image.getAttribute('sizes').includes('700px'));
        const originalLink = image.closest('a');
        assert.equal(originalLink?.getAttribute('href'), old.getAttribute('src'), 'Readers can open the unmodified full-resolution image');
        assert.equal(originalLink?.getAttribute('target'), '_blank');
        assert.equal(originalLink?.getAttribute('rel'), 'noopener noreferrer');
        assert.ok(originalLink?.getAttribute('aria-label').includes(image.alt));
        assert.equal(old.hasAttribute('srcset'), false, 'The default feed renderer keeps portable original URLs');
      }
    } finally {
      original.window.close();
      responsive.window.close();
    }
  }
});

test('the Changzhi page embeds only the logged-out Douyin player', () => {
  const post = getAllPosts('zh').find((item) => item.slug === 'changzhi-small-city-ai');
  const dom = new JSDOM(renderMarkdown(post.content, post.title, 'zh'));
  try {
    const frame = dom.window.document.querySelector('iframe');
    assert.equal(frame.getAttribute('src'), 'https://open.douyin.com/player/video?vid=7693160082292477235&autoplay=0&width=100vw&height=100vh');
    assert.equal(frame.getAttribute('title'), post.title);
    assert.equal(frame.getAttribute('loading'), 'lazy');
    assert.equal(frame.closest('.douyin-frame').style.backgroundImage, 'url("/blog/changzhi/cover.jpg")');
    assert.equal(dom.window.document.querySelectorAll('iframe').length, 1);
    assert.ok(dom.window.document.body.textContent.includes('小城市做 AI，可以从哪里开始？'));
    assert.ok(!dom.window.document.body.textContent.includes('视频字幕'));
    assert.ok(!post.content.includes('这几天其实一直都在山西'));
  } finally {
    dom.window.close();
  }
});

test('unknown and remote image sources remain usable without an image-optimizer allowlist', () => {
  const markdown = '![New asset](/new-image.jpg)\n\n![Remote](https://example.org/image.jpg?one=1&two=2)';
  const dom = new JSDOM(renderMarkdown(markdown, 'Images', 'en', { responsiveImages: true, optimizeImage: optimizeArticleImage }));
  try {
    const images = [...dom.window.document.querySelectorAll('img')];
    assert.deepEqual(images.map(e => e.getAttribute('src')), ['/new-image.jpg', 'https://example.org/image.jpg?one=1&two=2']);
    assert.ok(images.every(e => !e.hasAttribute('srcset')));
  } finally {
    dom.window.close();
  }
});
