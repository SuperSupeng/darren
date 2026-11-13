import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);
const { consultingCopy, consultingPracticeId } = require('../src/lib/consulting-copy.ts');
const { navigationLinks, collaborateHref, siteUrl } = require('../src/lib/site-config.ts');
const { getWorkById, getWorkInquiry } = require('../src/lib/portfolio/index.ts');
const { homeStructuredData } = require('../src/lib/seo.ts');
const sitemap = require('../src/app/sitemap.ts').default;

test('both languages present the same three consulting directions with explicit scope', () => {
  for (const locale of ['zh', 'en']) {
    const copy = consultingCopy[locale];
    assert.deepEqual(copy.directions.map(item => item.id), ['ai-organization', 'geo', 'gtm']);
    for (const item of copy.directions) {
      for (const field of ['title', 'question', 'audience', 'outcome', 'boundary']) {
        assert.ok(item[field].trim(), `${locale}/${item.id}: ${field} must be stated`);
      }
    }
    assert.equal(copy.page.steps.length, 3);
    assert.ok(copy.page.contact.trim());
  }
  assert.match(consultingCopy.zh.page.opening, /个人名义提供付费咨询/);
  assert.match(consultingCopy.en.page.opening, /paid, independent consulting/);
  assert.match(consultingCopy.zh.directions[0].boundary, /不卖工具/);
  assert.match(consultingCopy.zh.directions[1].outcome, /诊断后/);
  assert.match(consultingCopy.zh.directions[2].boundary, /不包含.*海外.*执行/);
});

test('consulting is the primary collaboration entry in navigation and homepage schema', () => {
  assert.equal(collaborateHref, '/consulting');
  assert.equal(navigationLinks[1].href, collaborateHref);
  for (const locale of ['zh', 'en']) {
    const service = homeStructuredData(locale)['@graph'].find(item => item['@type'] === 'Service');
    assert.equal(service.url, `${siteUrl}/${locale}/consulting`);
    assert.equal(service.serviceType.length, 3);
  }
});

test('consulting links the existing 31-agents work and is in the sitemap', () => {
  assert.equal(getWorkById('zh', consultingPracticeId).title, '31 个 Agent 的数字组织实践');
  assert.equal(getWorkById('en', consultingPracticeId).title, 'A Digital Organization with 31 Agents');
  const urls = new Set(sitemap().map(entry => entry.url));
  for (const locale of ['zh', 'en']) {
    assert.ok(urls.has(`${siteUrl}/${locale}/consulting`));
    assert.ok(urls.has(`${siteUrl}/${locale}/work/${consultingPracticeId}`));
    assert.ok(urls.has(`${siteUrl}/${locale}/services`));
  }
});

test('the agent practice leads to organization consulting while event cases retain their relevant inquiry', () => {
  for (const locale of ['zh', 'en']) {
    const inquiry = getWorkInquiry(locale, 'agent-speaking');
    assert.equal(inquiry.href, '/consulting#ai-organization');
    assert.equal(inquiry.description, consultingCopy[locale].page.contact);
    assert.equal(getWorkInquiry(locale, 'superai-china').href, '/services#field-visits');
  }
});
