import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);
const { getAboutCopy } = require('../src/lib/about.ts');
const { getExperienceArchive } = require('../src/lib/experience-archive.ts');
const { getFeaturedWork, getPortfolio, getWorkById, getWorkCollaboration } = require('../src/lib/portfolio/index.ts');
const { homeStructuredData } = require('../src/lib/seo.ts');
const { homepageOneLiner, homepageServiceLine, pricingLine, serviceOffers, talkList } = require('../src/lib/services-copy.ts');
const { getAboutRoles, getPersonJobTitle, getPersonOccupations, socialLinks } = require('../src/lib/site-config.ts');
const { getSiteContent } = require('../src/lib/siteContent.ts');

const forbidden = ['MatchPoint', 'matchpoint', '找工作', '招人', 'Jobs / Hiring', '付费合作', '商业合作', 'paid partnership', 'commercial partnership', 'CryptoTime', '夜校', 'Night School', '金华', '武义', '农机', '中康', '高金', 'Gaojin', 'Zhongkang', '不接什么', '我目前不接', '找谁来做', '具体怎么做、找谁来做', '我不做'];

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
    'AGI Villa 联合创始人',
    'Datawhale 城市生态负责人',
    'n8n Ambassador',
  ]);
  assert.deepEqual(getPersonOccupations('en'), [
    'Co-founder, AGI Villa',
    'Head of City Ecosystem, Datawhale',
    'n8n Ambassador',
  ]);
  assert.equal(getPersonJobTitle('zh'), getPersonOccupations('zh').join(' · '));
  assert.equal(getPersonJobTitle('en'), getPersonOccupations('en').join(' · '));
  assert.deepEqual(getAboutRoles('zh').slice(0, 3), getPersonOccupations('zh'));
  assert.equal(getAboutRoles('zh').at(-1), '《重新组织》主持人');
  assert.equal(getAboutRoles('en').at(-1), 'Host of Re:Organize');
  assert.match(getSiteContent('zh').home.intro, /AI 时代的人与组织/);
  assert.equal(getSiteContent('zh').home.detail, homepageServiceLine);
  assert.equal(getSiteContent('en').home.intro, homepageOneLiner);
  assert.match(getSiteContent('en').home.detail, /consulting/);
});

test('services are A and B in the approved order, with the eight talks and one pricing line', () => {
  assert.deepEqual(getPortfolio('zh').collaborations.map((item) => item.id), ['talks', 'field-visits']);
  assert.deepEqual(getPortfolio('en').collaborations.map((item) => item.id), ['field-visits', 'talks']);
  assert.equal(getPortfolio('zh').collaborations[0].title, 'AI 讲座与工作坊');
  assert.equal(getPortfolio('en').collaborations[0].title, 'China AI visits and events');
  assert.equal(talkList.zh.length, 8);
  assert.equal(talkList.en.length, 8);
  assert.equal(talkList.zh[3], '2026 在南京做过一场线下分享《AI 革命：我们正在进入什么时代》');
  assert.equal(talkList.zh[4], '上海交通大学 MEM 行业论坛特邀嘉宾分享（2025-12）');
  assert.equal(talkList.en[4], 'Invited guest talk, Shanghai Jiao Tong University MEM Industry Forum (Dec 2025)');
  assert.equal(talkList.zh[5], '在株洲主持过一场 AI 职业教育论坛');
  assert.equal(talkList.en[5], 'Hosted an AI vocational education forum in Zhuzhou');
  assert.match(serviceOffers.talks.zh.paragraphs[0], /工作坊/);
  assert.ok(!serviceOffers.talks.zh.paragraphs.join(' ').includes('转型咨询'));
  assert.equal(serviceOffers.talks.en.title, 'AI talks and workshops');
  assert.equal(pricingLine.zh, '按场次或按项目报价，来信时说一下人数、时长和想解决的问题');
  for (const locale of ['zh', 'en']) {
    for (const item of getPortfolio(locale).work) {
      assert.equal(getWorkCollaboration(locale, item.id).id, 'field-visits');
    }
  }
});

test('case evidence stays accurate while retired recruitment offers are removed', () => {
  assert.equal(getWorkById('zh', 'waic-pioneers-night').role, '项目负责人');
  assert.equal(getWorkById('en', 'waic-pioneers-night').role, 'project lead');
  assert.equal(getWorkById('zh', 'rumata-workshop').result, '2026 年 7 月，南京，约 50 人到现场动手实操');
  assert.equal(getWorkById('en', 'rumata-workshop').result, 'July 2026, Nanjing, about 50 people on site for hands-on practice');
  assert.equal(getWorkById('zh', 'wechat-innovation-workshop').result, '2026 年 8 月成都、9 月上海，单场约 100 人');
  assert.equal(getWorkById('en', 'wechat-innovation-workshop').role, 'project lead');
  assert.deepEqual(getFeaturedWork('zh').map((item) => item.id), ['superai-china', 'rumata-workshop', 'agent-speaking']);
  const singapore = getExperienceArchive('en').flatMap((section) => section.entries).find((entry) => entry.id === 'singapore-opc');
  assert.equal(singapore.title, 'Co-hosted a one-person-company event in Singapore and gave the opening talk.');
  const person = homeStructuredData('zh')['@graph'].find((node) => node['@type'] === 'Person');
  assert.equal(person.worksFor.name, 'Datawhale');
  for (const locale of ['zh', 'en']) assert.ok(!/MatchPoint|hiring|找工作|招人/.test(JSON.stringify(getAboutCopy(locale))));
  assert.equal(person.jobTitle.includes('Datawhale 城市生态负责人'), true);
});

test('retired businesses stay off the showcase and 观木 remains live', () => {
  const products = getSiteContent('en').products.items;
  const zhProducts = getSiteContent('zh').products.items;
  assert.deepEqual(products.map((item) => item.id), ['globaltechevents', 'datawhale-aix-events', 'guanmu']);
  assert.deepEqual(zhProducts.map((item) => item.id), ['globaltechevents', 'datawhale-aix-events', 'guanmu']);
  assert.equal(products.find((item) => item.id === 'guanmu').status, 'live');
  assert.equal(products.find((item) => item.id === 'guanmu').url, 'https://guanmu.darren-su.com/');
  assert.equal(zhProducts.find((item) => item.id === 'guanmu').status, '运行中');
  assert.equal(zhProducts.find((item) => item.id === 'guanmu').tagline, '拆懂一座古建筑');
  assert.equal(products.some((item) => item.id === 'internplanet' || item.id === 'matchpoint'), false);
  assert.equal(zhProducts.some((item) => item.id === 'internplanet'), false);
  assert.equal(fs.readFileSync(new URL('../src/lib/site-content/en.ts', import.meta.url), 'utf8').includes('internplanet.tech'), false);
  assert.equal(fs.readFileSync(new URL('../src/lib/site-content/zh.ts', import.meta.url), 'utf8').includes('Intern Planet'), false);
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
