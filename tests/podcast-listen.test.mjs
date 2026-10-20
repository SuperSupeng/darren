import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);
const { englishContent } = require('../src/lib/site-content/en.ts');
const { chineseContent } = require('../src/lib/site-content/zh.ts');

const listenUrl = 'https://www.xiaoyuzhoufm.com/podcast/6aacb9b82527cf1af35662c9';
const pendingCopy = /confirmed|unconfirmed|listenPending|一经核对|确认后会挂在这里/;

test('podcast hub links to the confirmed Xiaoyuzhou listen page', () => {
  for (const content of [englishContent, chineseContent]) {
    assert.equal(content.podcast.listenUrl, listenUrl);
    assert.equal(content.podcast.hero.title, '《重新组织》');
    assert.equal('listenPending' in content.podcast, false);
    const copy = [
      content.podcast.summary,
      content.podcast.listen,
      content.podcast.listenCta,
      content.podcast.hero.subtitle,
    ].join('\n');
    assert.equal(pendingCopy.test(copy), false);
  }

  assert.equal(englishContent.podcast.listenCta, 'Listen on Xiaoyuzhou');
  assert.equal(chineseContent.podcast.listenCta, '在小宇宙收听');

  const page = fs.readFileSync(new URL('../src/app/[locale]/podcast/page.tsx', import.meta.url), 'utf8');
  assert.match(page, /href=\{site\.podcast\.listenUrl\}/);
  assert.match(page, /target="_blank"/);
  assert.match(page, /rel="noopener noreferrer"/);
  assert.equal(page.includes('listenPending'), false);
});
