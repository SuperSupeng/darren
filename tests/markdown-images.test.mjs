import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';
import { JSDOM } from 'jsdom';

const require = createRequire(import.meta.url);
const { renderMarkdown } = require('../src/lib/render-markdown.ts');
const { getAllPosts } = require('../src/lib/blog.ts');

test('responsive article images retain text, anchors, alt text and reserved dimensions in both languages', () => {
  for (const locale of ['zh', 'en']) for (const post of getAllPosts(locale)) {
    const original = new JSDOM(renderMarkdown(post.content, post.title, locale));
    const responsive = new JSDOM(renderMarkdown(post.content, post.title, locale, { responsiveImages: true }));
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
        assert.equal(old.hasAttribute('srcset'), false, 'The default feed renderer keeps portable original URLs');
      }
    } finally {
      original.window.close();
      responsive.window.close();
    }
  }
});

test('unknown and remote image sources remain usable without an image-optimizer allowlist', () => {
  const markdown = '![New asset](/new-image.jpg)\n\n![Remote](https://example.org/image.jpg?one=1&two=2)';
  const dom = new JSDOM(renderMarkdown(markdown, 'Images', 'en', { responsiveImages: true }));
  try {
    const images = [...dom.window.document.querySelectorAll('img')];
    assert.deepEqual(images.map(e => e.getAttribute('src')), ['/new-image.jpg', 'https://example.org/image.jpg?one=1&two=2']);
    assert.ok(images.every(e => !e.hasAttribute('srcset')));
  } finally {
    dom.window.close();
  }
});
