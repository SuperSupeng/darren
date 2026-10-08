import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);
const { getAboutCopy } = require('../src/lib/about.ts');
const { getExperienceArchive } = require('../src/lib/experience-archive.ts');
const { getFeaturedWork, getPortfolio, getWorkById, getWorkCollaboration } = require('../src/lib/portfolio/index.ts');
const { homeStructuredData } = require('../src/lib/seo.ts');
const { jobsCopy, homepageOneLiner, homepageServiceLine, pricingLine, talkList } = require('../src/lib/services-copy.ts');
const { getAboutRoles, getPersonJobTitle, getPersonOccupations, socialLinks } = require('../src/lib/site-config.ts');
const { getSiteContent } = require('../src/lib/siteContent.ts');

const forbidden = ['付费合作', '商业合作', 'paid partnership', 'commercial partnership', 'CryptoTime', '夜校', 'Night School', '金华', '武义', '农机', '中康', '高金', 'Gaojin', 'Zhongkang', '不接什么', '我目前不接'];

const repoRoot = new URL('..', import.meta.url).pathname;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next') continue;
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) walk(path, files);
    else if (/\.(tsx?|json|md|mjs|txt)$/.test(entry.name)) files.push(path);
  }
  return files;
}

test('homepage titles are the three approved roles, with the podcast host only on About', () => {
  assert.deepEqual(getPersonOccupations('zh'), [
    'AGI Villa & MatchPoint 联合创始人',
    'Datawhale 城市生态负责人',
    'n8n Ambassador',
  ]);
  assert.deepEqual(getPersonOccupations('en'), [
    'Co-founder, AGI Villa & MatchPoint',
    'Head of City Ecosystem, Datawhale',
    'n8n Ambassador',
  ]);
  assert.equal(getPersonJobTitle('zh'), getPersonOccupations('zh').join(' · '));
  assert.equal(getPersonJobTitle('en'), getPersonOccupations('en').join(' · '));
  assert.deepEqual(getAboutRoles('zh').slice(0, 3), getPersonOccupations('zh'));
  assert.equal(getAboutRoles('zh').at(-1), '《重新组织》主持人');
  assert.equal(getAboutRoles('en').at(-1), 'Host of Re:Organize');
  assert.equal(getSiteContent('zh').home.intro.startsWith('Darren，AI 创业者'), true);
  assert.equal(getSiteContent('zh').home.detail, homepageServiceLine);
  assert.equal(getSiteContent('en').home.intro, homepageOneLiner);
  assert.equal(getSiteContent('en').home.detail, '');
});

test('services are A and B in the approved order, with the eight talks and one pricing line', () => {
  assert.deepEqual(getPortfolio('zh').collaborations.map((item) => item.id), ['talks', 'field-visits']);
  assert.deepEqual(getPortfolio('en').collaborations.map((item) => item.id), ['field-visits', 'talks']);
  assert.equal(getPortfolio('zh').collaborations[0].title, '讲座和内训 / AI 转型咨询');
  assert.equal(getPortfolio('en').collaborations[0].title, 'China AI field visits & events for global investors and founders');
  assert.equal(talkList.zh.length, 8);
  assert.equal(talkList.en.length, 8);
  assert.equal(talkList.zh[3], '2026 在南京做过一场线下分享《AI 革命：我们正在进入什么时代》');
  assert.equal(talkList.zh[4], '2025-12 上海交通大学 MEM 行业论坛特邀嘉宾分享');
  assert.equal(talkList.zh[5], '2025-12 在株洲主持过一场 AI 职业教育论坛');
  assert.equal(pricingLine.zh, '按场次或按项目报价，来信时说一下人数、时长和想解决的问题');
  for (const locale of ['zh', 'en']) {
    for (const item of getPortfolio(locale).work) {
      assert.equal(getWorkCollaboration(locale, item.id).id, 'field-visits');
    }
  }
});

test('case edits, homepage cards, and jobs copy use the approved strings', () => {
  assert.equal(getWorkById('zh', 'waic-pioneers-night').role, '项目负责人');
  assert.equal(getWorkById('en', 'waic-pioneers-night').role, 'project lead');
  assert.equal(getWorkById('zh', 'rumata-workshop').result, '2026 年 7 月，南京，约 50 人到现场动手实操');
  assert.equal(getWorkById('en', 'rumata-workshop').result, 'July 2026, Nanjing, about 50 people on site for hands-on practice');
  assert.equal(getWorkById('zh', 'wechat-innovation-workshop').result, '2026 年 8 月成都、9 月上海，单场约 100 人');
  assert.equal(getWorkById('en', 'wechat-innovation-workshop').role, 'project lead');
  assert.deepEqual(getFeaturedWork('zh').map((item) => item.id), ['superai-china', 'rumata-workshop', 'agent-speaking']);
  assert.equal(getAboutCopy('zh').making[0].endsWith('想找工作或想招人，都可以找我聊聊。'), true);
  assert.equal(getAboutCopy('en').making[0].endsWith('Looking for a job or hiring? Happy to chat.'), true);
  assert.equal(jobsCopy.zh.label, '找工作 / 招人');
  assert.equal(jobsCopy.en.label, 'Jobs / Hiring');
  assert.equal(jobsCopy.en.body, 'Looking for a job: tell me the direction you want, your years of experience and your city. Hiring: tell me the role, its requirements and the budget range.');
  const singapore = getExperienceArchive('en').flatMap((section) => section.entries).find((entry) => entry.id === 'singapore-opc');
  assert.equal(singapore.title, 'Co-hosted a one-person-company event in Singapore and gave the opening talk.');
  const person = homeStructuredData('zh')['@graph'].find((node) => node['@type'] === 'Person');
  assert.equal(person.worksFor.name, 'Datawhale');
  assert.equal(person.jobTitle.includes('Datawhale 城市生态负责人'), true);
});

test('MatchPoint stays a co-founder title and leaves the product list; Intern Planet stays stopped', () => {
  const products = getSiteContent('en').products.items;
  assert.deepEqual(products.map((item) => item.id), ['globaltechevents', 'datawhale-aix-events', 'internplanet']);
  assert.equal(products.find((item) => item.id === 'internplanet').status, 'stopped');
  assert.equal(getSiteContent('zh').products.items.find((item) => item.id === 'internplanet').status, '已停止');
  assert.equal(fs.readFileSync(new URL('../src/components/studio/StudioScene.tsx', import.meta.url), 'utf8').includes('matchpoint.png'), false);
  assert.equal(socialLinks.some((item) => item.label === '视频号' && !item.href), true);
});

test('positioning copy does not reintroduce removed commercial or place names', () => {
  const files = ['src', 'content', 'messages'].flatMap((dir) => walk(`${repoRoot}/${dir}`));
  const hits = [];
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    for (const term of forbidden) {
      if (text.includes(term)) hits.push(`${file}: ${term}`);
    }
  }
  assert.deepEqual(hits, []);
});
