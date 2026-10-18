import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);
const config = require('../next.config.ts').default;

test('feed aliases permanently redirect to the RSS feed and existing redirects stay', async () => {
  const redirects = await config.redirects();
  const sources = redirects.map((rule) => rule.source);
  assert.deepEqual(sources, [
    '/fr',
    '/fr/:path*',
    '/:locale(en|zh)/work',
    '/:locale(en|zh)/build',
    '/field-notes',
    '/:locale(en|zh)/field-notes',
    '/elsewhere',
    '/:locale(en|zh)/elsewhere',
    '/feed',
    '/atom.xml',
    '/:locale(en|zh)/feed',
  ]);
  for (const source of ['/feed', '/atom.xml', '/:locale(en|zh)/feed']) {
    const rule = redirects.find((item) => item.source === source);
    assert.equal(rule.destination, '/rss.xml');
    assert.equal(rule.permanent, true);
  }
});
