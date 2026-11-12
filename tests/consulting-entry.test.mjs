import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);
const { consultingCopy, consultingPracticeId } = require('../src/lib/consulting-copy.ts');
const { jobsCopy } = require('../src/lib/services-copy.ts');
const { navigationLinks } = require('../src/lib/site-config.ts');
const { getWorkById } = require('../src/lib/portfolio/index.ts');
const sitemap = require('../src/app/sitemap.ts').default;
const { siteUrl } = require('../src/lib/site-config.ts');

const repoRoot = new URL('..', import.meta.url);

test('consulting pages use the locked homepage and page copy', () => {
  assert.deepEqual(consultingCopy.zh.home, {
    label: '咨询合作',
    heading: 'AI 进入工作之后，很多问题不只是工具问题。',
    body: '如果你正在想，AI 会怎样改变团队的分工、管理和协作，我可以和你一起把现状和下一步想清楚。在人工智能搜索里被找到，以及产品出海的早期判断，也可以来信聊。',
    link: '看看我会一起判断哪些问题',
  });
  assert.equal(consultingCopy.zh.page.title, '先把问题看清，再决定下一步');
  assert.equal(consultingCopy.zh.page.primaryTitle, 'AI 原生组织转型');
  assert.equal(consultingCopy.zh.page.relatedLink, '我怎样组织 31 个日常运行的智能助手');
  assert.equal(consultingCopy.zh.page.otherTitle, '另外也可以谈');
  assert.equal(consultingCopy.en.home.label, 'Consulting');
  assert.equal(consultingCopy.en.home.heading, 'When AI enters the work, the questions go beyond tools.');
  assert.equal(consultingCopy.en.home.link, 'The questions I work through');
  assert.equal(consultingCopy.en.page.title, 'Understand the question before deciding what to do next');
  assert.equal(consultingCopy.en.page.primaryTitle, 'AI-native organization transformation');
  assert.equal(consultingCopy.en.page.relatedLink, 'How I organize 31 agents in my day-to-day work');
  assert.equal(consultingCopy.en.page.otherTitle, 'Other questions I work on');
  assert.ok(consultingCopy.zh.page.primaryBody.length > consultingCopy.zh.page.otherSearch.length + consultingCopy.zh.page.otherMarket.length);
  assert.ok(consultingCopy.en.page.primaryBody.length > consultingCopy.en.page.otherSearch.length + consultingCopy.en.page.otherMarket.length);
  assert.ok(!consultingCopy.zh.page.contact.includes('价格'));
  assert.ok(!/price|subscription/i.test(consultingCopy.en.page.contact));
});

test('the homepage invitation links to consulting and the contact panel keeps jobs separate', () => {
  const purpose = fs.readFileSync(new URL('./src/components/studio/StudioPurpose.tsx', repoRoot), 'utf8');
  const contact = fs.readFileSync(new URL('./src/components/spatial/HeaderContact.tsx', repoRoot), 'utf8');
  const nav = fs.readFileSync(new URL('./src/components/spatial/SpatialHeader.tsx', repoRoot), 'utf8');
  assert.ok(purpose.includes('href="/consulting"'));
  assert.ok(!purpose.includes('有想一起做的事？'));
  assert.ok(!purpose.includes('Something we could do together?'));
  assert.ok(!purpose.includes('ContactActions'));
  assert.ok(contact.includes('href="/consulting"'));
  assert.ok(contact.includes('<JobsNote locale={locale} />'));
  assert.equal(jobsCopy.zh.label, '找工作 / 招人');
  assert.equal(jobsCopy.en.label, 'Jobs / Hiring');
  assert.deepEqual(navigationLinks.map((link) => link.href), ['/', '/blog', '/podcast', '/projects']);
  assert.ok(!nav.includes('/consulting'));
});

test('consulting links the existing 31-agents work and is in the sitemap', () => {
  assert.equal(getWorkById('zh', consultingPracticeId).title, '31 个 Agent 的数字组织实践');
  assert.equal(getWorkById('en', consultingPracticeId).title, 'A Digital Organization with 31 Agents');
  const urls = new Set(sitemap().map((entry) => entry.url));
  assert.ok(urls.has(`${siteUrl}/zh/consulting`));
  assert.ok(urls.has(`${siteUrl}/en/consulting`));
  assert.ok(urls.has(`${siteUrl}/zh/work/${consultingPracticeId}`));
  assert.ok(urls.has(`${siteUrl}/en/work/${consultingPracticeId}`));
});
