import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';

const require = createRequire(import.meta.url);
const { locales, defaultLocale } = require('../src/i18n/config.ts');
const { routing } = require('../src/i18n/routing.ts');
const { getPortfolio } = require('../src/lib/portfolio/index.ts');
const {
  siteUrl,
  buildAlternates,
  createPageMetadata,
  homeStructuredData,
  articleStructuredData,
  servicesStructuredData,
  getPageKeywords,
  getBlogPageMetadata,
  getWorkPageMetadata,
  getProjectsPageKeywords,
  workCaseStructuredData,
} = require('../src/lib/seo.ts');
const {
  getPersonJobTitle,
  getPersonOccupations,
  linkedinProfileUrl,
  personAlternateNames,
  personName,
  personSameAs,
} = require('../src/lib/site-config.ts');
const { getAllPosts, parseBlogContent } = require('../src/lib/blog.ts');
const { seriesSlugs } = require('../src/lib/series.ts');
const { getWorkById } = require('../src/lib/portfolio/index.ts');
const { getSiteContent } = require('../src/lib/siteContent.ts');
const { articleMarkdown } = require('../src/lib/content-source.ts');
const { GET: rssGET } = require('../src/app/rss.xml/route.ts');
const { default: sitemap } = require('../src/app/sitemap.ts');
const { default: robots } = require('../src/app/robots.ts');
const { GET: llmsGET } = require('../src/app/llms.txt/route.ts');
const { default: JsonLd } = require('../src/components/JsonLd.tsx');

function array(value) {
  return Array.isArray(value) ? value : value === undefined ? [] : [value];
}

test('locale routing leaves alternate URLs to the metadata and content-aware sitemap', () => {
  assert.equal(routing.alternateLinks, false);
});

test('every crawler rule protects API routes and preserves the existing public crawling policy', () => {
  const result = robots();
  const rules = array(result.rules);
  assert.ok(rules.length > 0);
  for (const rule of rules) {
    assert.ok(array(rule.disallow).includes('/api/'), `${array(rule.userAgent).join(', ')} must exclude API routes`);
  }
  for (const userAgent of ['*', 'OAI-SearchBot', 'GPTBot']) {
    const rule = rules.find(item => array(item.userAgent).includes(userAgent));
    assert.ok(rule, `${userAgent} must retain an explicit rule`);
    assert.ok(array(rule.allow).includes('/'), `${userAgent} must retain public-page access`);
    assert.ok(!array(rule.disallow).includes('/'), `${userAgent} must not block the public site`);
  }
  assert.ok(array(result.sitemap).includes(`${siteUrl}/sitemap.xml`));
});

test('the sitemap contains every real localized page once and only advertises existing alternate URLs', () => {
  const expected = new Set();
  const basePaths = ['', '/projects', '/services', '/about', '/blog', '/podcast'];
  for (const locale of locales) {
    for (const route of basePaths) expected.add(`${siteUrl}/${locale}${route}`);
    const postFiles = fs.readdirSync(new URL(`../content/blog/${locale}/`, import.meta.url))
      .filter(filename => filename.endsWith('.md') || filename.endsWith('.mdx'));
    assert.ok(postFiles.length > 0, `${locale} blog fixtures must not be empty`);
    for (const filename of postFiles) {
      const slug = filename.slice(0, filename.lastIndexOf('.'));
      expected.add(`${siteUrl}/${locale}/blog/${slug}`);
    }
    for (const slug of seriesSlugs) expected.add(`${siteUrl}/${locale}/blog/topic/${slug}`);
    const { work } = getPortfolio(locale);
    assert.ok(work.length > 0, `${locale} portfolio must not be empty`);
    for (const item of work) expected.add(`${siteUrl}/${locale}/work/${item.id}`);
  }

  const entries = sitemap();
  const urls = entries.map(entry => entry.url);
  assert.equal(new Set(urls).size, urls.length, 'Canonical sitemap URLs must be unique');
  assert.deepEqual(new Set(urls), expected, 'Only real public routes belong in the sitemap');

  for (const entry of entries) {
    const url = new URL(entry.url);
    assert.equal(url.search, '', 'Lighting and other display preferences must not create indexable URLs');
    assert.equal(url.hash, '', 'Fragments must not create separate sitemap entries');
    assert.ok(!url.pathname.split('/').includes('studio'), 'The experimental studio route must stay out of the sitemap');
    assert.ok(!['/work', '/build', '/field-notes', '/elsewhere'].includes(url.pathname.replace(/^\/(en|zh)/, '')), `${entry.url} is a retired index and must not be a primary sitemap entry`);
    const languageUrls = entry.alternates?.languages;
    assert.ok(languageUrls, `${entry.url} must describe its actual language versions`);
    const locale = url.pathname.split('/')[1];
    assert.equal(languageUrls[locale], entry.url, 'Alternate sets must include the current page');
    for (const [language, alternate] of Object.entries(languageUrls)) {
      assert.ok(expected.has(alternate), `${entry.url} advertises a missing translation: ${alternate}`);
      const alternateUrl = new URL(alternate);
      assert.equal(alternateUrl.pathname.split('/').slice(2).join('/'), url.pathname.split('/').slice(2).join('/'));
      if (language !== 'x-default') assert.equal(alternateUrl.pathname.split('/')[1], language);
    }
  }
});

test('single-language article metadata never invents a translation or fallback', () => {
  for (const locale of locales) {
    const path = '/blog/a-single-language-note';
    const metadata = createPageMetadata({
      locale,
      path,
      title: 'A single-language note',
      description: 'A note that has no translated edition.',
      availableLocales: [locale],
      openGraphType: 'article',
    });
    assert.equal(metadata.alternates.canonical, `/${locale}${path}`);
    assert.deepEqual(metadata.alternates.languages, { [locale]: `/${locale}${path}` });
  }

  const translated = buildAlternates('zh', '/blog/a-translated-note');
  assert.equal(translated.languages['x-default'], `/${defaultLocale}/blog/a-translated-note`);
  for (const locale of locales) {
    assert.equal(translated.languages[locale], `/${locale}/blog/a-translated-note`);
  }
});

test('homepage structured data identifies Darren as a person and the provider of the listed services', () => {
  for (const locale of locales) {
    const graph = homeStructuredData(locale)['@graph'];
    assert.deepEqual(new Set(graph.map(node => node['@type'])), new Set(['Person', 'WebSite', 'WebPage', 'Service']));
    const person = graph.find(node => node['@type'] === 'Person');
    const page = graph.find(node => node['@type'] === 'WebPage');
    const service = graph.find(node => node['@type'] === 'Service');
    const website = graph.find(node => node['@type'] === 'WebSite');
    assert.equal(person['@id'], `${siteUrl}/#person`);
    assert.equal(person.name, personName);
    assert.deepEqual(person.alternateName, [...personAlternateNames]);
    assert.equal(person.jobTitle, getPersonJobTitle(locale));
    assert.deepEqual(person.sameAs, [...personSameAs]);
    assert.ok(person.sameAs.includes(linkedinProfileUrl));
    assert.ok(person.sameAs.includes(`${siteUrl}`));
    assert.ok(!person.jobTitle.includes('Builder-Monk'));
    assert.ok(!person.jobTitle.includes('Zen Ship'));
    assert.deepEqual(person.hasOccupation.map((item) => item.name), getPersonOccupations(locale));
    assert.deepEqual(page.mainEntity, { '@id': person['@id'] });
    assert.deepEqual(service.provider, { '@id': person['@id'] });
    assert.deepEqual(website.publisher, { '@id': person['@id'] });
    assert.equal(page.url, `${siteUrl}/${locale}`);
    assert.equal(service.url, `${siteUrl}/${locale}/services`);
  }
});

test('llms.txt uses the current IA, canonical identity, and confirmed public profiles', async () => {
  const body = await (await llmsGET()).text();
  assert.match(body, /^# Darren Su \/ 苏鹏/m);
  assert.match(body, /Public name: Darren \/ Darren Su/);
  assert.match(body, /Chinese name: 苏鹏/);
  assert.match(body, /Co-founder, AGI Villa & MatchPoint/);
  assert.match(body, /Head of City Ecosystem, Datawhale/);
  assert.match(body, /Datawhale 城市生态负责人/);
  assert.match(body, /Re:Organize · Host/);
  assert.match(body, new RegExp(`Canonical website: ${siteUrl}`));
  assert.ok(body.includes(linkedinProfileUrl));
  for (const href of personSameAs) {
    assert.ok(body.includes(href), `llms.txt must list ${href}`);
  }
  assert.ok(!body.includes('Zen Ship Lab'));
  assert.ok(!body.includes('GoChina'));
  assert.ok(!body.includes('Builder-Monk'));
  for (const locale of locales) {
    for (const route of ['', '/blog', '/podcast', '/projects', '/about', '/services']) {
      assert.ok(body.includes(`${siteUrl}/${locale}${route}`), `llms.txt must list ${locale}${route || '/'}`);
    }
    assert.ok(!body.includes(`](${siteUrl}/${locale}/work)`));
    assert.ok(!body.includes(`](${siteUrl}/${locale}/build)`));
    assert.ok(!body.includes(`](${siteUrl}/${locale}/field-notes)`));
    assert.ok(!body.includes(`](${siteUrl}/${locale}/elsewhere)`));
  }
});

test('article JSON-LD keeps title, description, author, and dates from source metadata', () => {
  for (const locale of locales) {
    for (const post of getAllPosts(locale)) {
      const article = articleStructuredData(post, locale)['@graph'].find((node) => node['@type'] === 'BlogPosting');
      assert.equal(article.headline, post.title);
      assert.equal(article.description, post.description);
      assert.deepEqual(article.author.map((author) => author.name), post.authors);
      if (post.date) assert.equal(article.datePublished, post.date);
      else assert.ok(!Object.hasOwn(article, 'datePublished'));
      if (post.dateModified) assert.equal(article.dateModified, post.dateModified);
      else assert.ok(!Object.hasOwn(article, 'dateModified'));
    }
  }
});

test('service structured data points each collaboration to its public section and the same person', () => {
  for (const locale of locales) {
    const { collaborations } = getPortfolio(locale);
    const graph = servicesStructuredData(locale)['@graph'];
    const list = graph.find(node => node['@type'] === 'ItemList');
    const person = graph.find(node => node['@type'] === 'Person');
    assert.equal(list.itemListElement.length, collaborations.length);
    assert.ok(collaborations.length > 0);
    for (const [index, collaboration] of collaborations.entries()) {
      const item = list.itemListElement[index];
      const expectedUrl = `${siteUrl}/${locale}/services#${collaboration.id}`;
      assert.equal(item.position, index + 1);
      assert.equal(item.item['@type'], 'Service');
      assert.equal(item.item['@id'], expectedUrl);
      assert.equal(item.item.url, expectedUrl);
      assert.equal(item.item.availableChannel.serviceUrl, expectedUrl);
      assert.equal(item.item.name, collaboration.title);
      assert.deepEqual(item.item.provider, { '@id': person['@id'] });
    }
  }
});

function articleNode(post, locale) {
  return articleStructuredData(post, locale)['@graph'].find((node) => node['@type'] === 'BlogPosting');
}

function postFrom(source, slug = 'example') {
  return {
    slug,
    ...parseBlogContent(source),
    readingTime: 1,
    image: { url: '/og-image.png', width: 1200, height: 630 },
  };
}

const plainArticle = [
  '---',
  'title: An original field note',
  'date: 2024-02-29',
  'description: A published observation: with its original date.',
  'tags: [AI agents, Research]',
  '---',
  '',
  '## Evidence',
  '',
  'A first-hand observation.',
  '',
].join('\n');

test('seo fields change the document title and description while JSON-LD keeps the visible headline', () => {
  const source = plainArticle.replace(
    'tags: [AI agents, Research]',
    [
      'tags: [AI agents, Research]',
      'seoTitle: "Search title: agents"',
      'seoDescription: A longer search description for the same note.',
      'seoKeywords: [practice, notes]',
      'about: [Practice]',
    ].join('\n'),
  );
  const post = postFrom(source);
  const metadata = createPageMetadata({
    locale: 'en',
    path: '/blog/example',
    ...getBlogPageMetadata(post),
    openGraphType: 'article',
    publishedTime: post.date,
    authors: post.authors,
  });
  assert.equal(metadata.title, 'Search title: agents');
  assert.equal(metadata.description, 'A longer search description for the same note.');
  assert.deepEqual(metadata.keywords, ['AI agents', 'Research', 'practice', 'notes', 'Darren Su', 'writing']);
  assert.equal(metadata.openGraph.title, metadata.title);
  const article = articleNode(post, 'en');
  assert.equal(article.headline, 'An original field note');
  assert.equal(article.alternativeHeadline, 'Search title: agents');
  assert.equal(article.description, 'A published observation: with its original date.');
  assert.equal(article.keywords, 'AI agents, Research, practice, notes');
  assert.deepEqual(article.about, [{ '@type': 'Thing', name: 'Practice' }]);
  assert.ok(!Object.hasOwn(article, 'mentions'));
  assert.ok(!Object.hasOwn(article, 'citation'));
});

test('articles without seo fields keep the current metadata and JSON-LD', () => {
  const post = postFrom(plainArticle);
  for (const field of ['seoTitle', 'seoDescription', 'seoKeywords', 'about']) {
    assert.ok(!Object.hasOwn(post, field), field);
  }
  const metadata = createPageMetadata({
    locale: 'en',
    path: '/blog/example',
    ...getBlogPageMetadata(post),
    openGraphType: 'article',
    publishedTime: post.date,
    authors: post.authors,
  });
  assert.equal(metadata.title, post.title);
  assert.equal(metadata.description, post.description);
  assert.deepEqual(metadata.keywords, [...post.tags, 'Darren Su', 'writing']);
  const article = articleNode(post, 'en');
  assert.deepEqual(Object.keys(article), [
    '@type',
    '@id',
    'mainEntityOfPage',
    'url',
    'headline',
    'description',
    'datePublished',
    'author',
    'publisher',
    'image',
    'keywords',
    'inLanguage',
    'isPartOf',
  ]);
  assert.equal(article.headline, post.title);
  assert.equal(article.description, post.description);
  assert.equal(article.keywords, post.tags.join(', '));
  assert.equal(article.datePublished, '2024-02-29');
});

test('filled articles use the researched search fields and leave visible text and dates alone', () => {
  const expected = {
    'zh/managing-31-ai-employees': {
      seoTitle: '管了 31 个 AI 员工之后，我重新理解了管理学：多 Agent 分工与数字组织设计',
      seoDescription: '我搭建了一个基于 OpenClaw 的多 Agent 协作系统：31 个 Agent 组成「四部一室」，44 个定时任务每天自动执行。当员工变成 AI，管理的核心矛盾从「意愿问题」变成了「理解问题」；在 AI 时代，组织的稀缺资源变成了人类的判断力和注意力。',
    },
    'en/managing-31-ai-employees': {
      seoTitle: 'Managing 31 AI Employees: Multi-Agent Roles and Digital Organization Design',
      seoDescription: 'I built a multi-agent system on OpenClaw: 31 agents in “four departments and one office,” 44 daily scheduled tasks, and a product whose daily operation I handed entirely to agents. What operating it taught me about management.',
    },
    'zh/turning-expertise-into-an-asset': {
      seoTitle: 'AI 时代，如何把一个人的经验变成一项资产？｜一人公司（OPC）与专家智能体',
      seoDescription: '和 Leapility 跃向 CEO 白双聊专家智能体：真正的 OPC，不是一个人完成所有工作，而是把个人经验产品化——Solo 和 Scalable。也聊怎样提取隐性知识、AIM 模型，以及为什么 AI 时代效率不是最终竞争力。',
    },
    'en/turning-expertise-into-an-asset': {
      seoTitle: 'How Can Personal Experience Become an Asset in the AI Era? Expert Agents and One-Person Companies',
      seoDescription: 'A conversation with Bai Shuang, CEO of Leapility, on expert agents and OPCs: a real OPC is not about doing every job yourself, but about turning personal experience into a product — Solo and Scalable.',
    },
    'en/superai-china-ecosystem-visit': {
      seoTitle: "China's AI Ecosystem: Five Observations from Hangzhou and Shanghai",
      seoDescription: 'Field notes from visiting Zhejiang University, ModelScope, Qwen, MiniMax, SenseTime and others with the SuperAI team: global teams are curious about China, but the entry points are weak, and Chinese companies should bring their understanding of the industry, not only products.',
    },
    'zh/superai-china-ecosystem-visit': {
      seoTitle: '海外到底怎么看中国 AI 生态？陪 SuperAI 团队走访杭州和上海的五个现场观察',
      seoDescription: '陪 SuperAI 团队走访浙大、魔搭社区、Qwen、MiniMax、商汤等高校、社区和公司后的五个观察：一年一次的大会不够了；海外不是不关心中国，而是缺少理解中国的入口；中国科技企业出海，真正应该讲什么。',
    },
    'zh/changzhi-small-city-ai': {
      seoTitle: '在长治，我看到了小城市做AI的机会｜小城市做 AI，可以从哪里开始？',
      seoDescription: '小城市做 AI，可以从哪里开始？ 在长治和当地伙伴交流后，我的一个思路是：聚起想做事的人，梳理产业需求和真实场景，再把全国的人才与资源连接进来。产业、文化和文旅，都有值得一起探索的方向。',
    },
  };

  for (const locale of locales) {
    for (const post of getAllPosts(locale)) {
      const key = `${locale}/${post.slug}`;
      const metadata = getBlogPageMetadata(post);
      const article = articleNode(post, locale);
      assert.equal(article.headline, post.title);
      assert.equal(article.description, post.description);
      const verifiedDates = {
        'turning-expertise-into-an-asset': '2026-07-22',
        'changzhi-small-city-ai': '2026-10-05',
        'jindongnan-travel-notes': '2026-10-05',
        'managing-31-ai-employees': '2026-04-05',
        'zongtong-temple-retreat': '2026-02-27',
        'how-ai-memory-works': '2024-11-17',
        'myscaledb-vector-database-dialogue': '2024-05-10',
      };
      if (verifiedDates[post.slug]) {
        assert.equal(post.date, verifiedDates[post.slug]);
        assert.ok(!Object.hasOwn(post, 'dateModified'));
      } else {
        assert.ok(!Object.hasOwn(post, 'date') && !Object.hasOwn(post, 'dateModified'));
      }
      if (!expected[key]) {
        assert.equal(metadata.title, post.seoTitle ?? post.title);
        assert.equal(metadata.description, post.seoDescription ?? post.description);
        assert.deepEqual(metadata.keywords, [...post.tags, ...(post.seoKeywords ?? []), 'Darren Su', 'writing']);
        if (post.seoTitle) assert.equal(article.alternativeHeadline, post.seoTitle);
        else assert.ok(!Object.hasOwn(article, 'alternativeHeadline'));
        assert.ok(!Object.hasOwn(article, 'about'));
        assert.equal(article.keywords, [...post.tags, ...(post.seoKeywords ?? [])].join(', '));
        continue;
      }
      assert.equal(post.seoTitle, expected[key].seoTitle);
      assert.equal(post.seoDescription, expected[key].seoDescription);
      assert.equal(metadata.title, post.seoTitle);
      assert.equal(metadata.description, post.seoDescription);
      assert.notEqual(metadata.title, post.title);
      assert.equal(article.alternativeHeadline, post.seoTitle);
      assert.equal(article.keywords, [...post.tags, ...post.seoKeywords].join(', '));
      if (post.about) assert.deepEqual(article.about, post.about.map((name) => ({ '@type': 'Thing', name })));
      else assert.ok(!Object.hasOwn(article, 'about'));
    }
  }
});

test('listed JSON-LD extras use names that appear in the article and skip unlisted pages', () => {
  const zhManaging = getAllPosts('zh').find((post) => post.slug === 'managing-31-ai-employees');
  const managing = articleNode(zhManaging, 'zh');
  assert.deepEqual(managing.mentions.map((item) => item.name), ['OpenClaw', 'Claude Code', 'GlobalTechEvents']);
  for (const name of managing.mentions.map((item) => item.name)) {
    assert.ok(zhManaging.content.includes(name), name);
  }
  assert.deepEqual(managing.citation.map((item) => item.url), [
    'https://openai.com/index/harness-engineering/',
    'https://martinfowler.com/articles/harness-engineering.html',
    'https://www.library.hbs.edu/hc/hawthorne/intro.html',
    'https://www.nber.org/papers/w15016',
    'https://code.claude.com/docs/en/memory',
    'https://code.claude.com/docs/en/agent-teams',
    'https://code.claude.com/docs/en/worktrees',
    'https://github.com/ximing/claude-code-source/blob/main/articles/10-memory-system.md',
    'https://www.axios.com/2026/03/31/anthropic-leaked-source-code-ai',
    'https://techcrunch.com/2026/03/31/anthropic-is-having-a-month/',
  ]);
  for (const citation of managing.citation) assert.ok(zhManaging.content.includes(citation.url));

  const enManaging = articleNode(getAllPosts('en').find((post) => post.slug === 'managing-31-ai-employees'), 'en');
  assert.ok(!Object.hasOwn(enManaging, 'mentions'));
  assert.ok(!Object.hasOwn(enManaging, 'citation'));

  const zhConversation = getAllPosts('zh').find((post) => post.slug === 'turning-expertise-into-an-asset');
  const conversation = articleNode(zhConversation, 'zh');
  assert.deepEqual(conversation.mentions, [
    { '@type': 'Person', name: '白双' },
    { '@type': 'Organization', name: 'Leapility 跃向' },
  ]);
  for (const mention of conversation.mentions) assert.ok(zhConversation.content.includes(mention.name));
  assert.ok(!Object.hasOwn(articleNode(getAllPosts('en').find((post) => post.slug === 'turning-expertise-into-an-asset'), 'en'), 'mentions'));

  const visit = getAllPosts('en').find((post) => post.slug === 'superai-china-ecosystem-visit');
  const visitArticle = articleNode(visit, 'en');
  assert.deepEqual(visitArticle.contentLocation, [
    { '@type': 'Place', name: 'Hangzhou' },
    { '@type': 'Place', name: 'Shanghai' },
  ]);
  for (const place of visitArticle.contentLocation) assert.ok(visit.content.includes(place.name));
  for (const mention of visitArticle.mentions) {
    assert.equal(mention['@type'], 'Organization');
    assert.ok(visit.content.includes(mention.name), mention.name);
  }
  assert.deepEqual(visitArticle.mentions.map((item) => item.name), [
    'Zhejiang University', 'ModelScope', 'Qwen', 'Qoder', 'Datawhale', 'ZhenFund', 'MiniMax', 'Volcano Engine', 'Trae', 'SenseTime',
  ]);
  const zhVisit = articleNode(getAllPosts('zh').find((post) => post.slug === 'superai-china-ecosystem-visit'), 'zh');
  assert.ok(!Object.hasOwn(zhVisit, 'mentions'));
  assert.ok(!Object.hasOwn(zhVisit, 'contentLocation'));
});

test('case-study search fields replace only the pages that define them', () => {
  const speaking = getWorkById('zh', 'agent-speaking');
  const speakingMetadata = getWorkPageMetadata(speaking, 'zh');
  assert.equal(speakingMetadata.title, '31 个 Agent 的数字组织实践：Agent 怎样分工、哪里会出错');
  assert.equal(speakingMetadata.description, speaking.summary);
  assert.deepEqual(speakingMetadata.keywords, ['多 Agent 分工', 'AI Agent 分享', '数字组织', '31 个 Agent', '44 个自动任务', '把任务交给 AI 后的管理方式']);
  assert.ok(!speakingMetadata.keywords.includes('WAIC 官方夜场'));
  const speakingCase = workCaseStructuredData(speaking, 'zh')['@graph'].find((node) => node['@type'] === 'CreativeWork');
  assert.equal(speakingCase.name, speaking.title);
  assert.equal(speakingCase.description, speaking.summary);

  const englishSpeaking = getWorkById('en', 'agent-speaking');
  assert.equal(getWorkPageMetadata(englishSpeaking, 'en').title, 'A Digital Organization with 31 Agents: How Agents Divide Tasks and Where They Fail');
  assert.equal(getWorkPageMetadata(englishSpeaking, 'en').description, englishSpeaking.summary);

  const superai = getWorkById('en', 'superai-china');
  assert.equal(getWorkPageMetadata(superai, 'en').title, 'SuperAI’s China Visit: Learning About China’s AI Ecosystem in Hangzhou and Shanghai');
  assert.deepEqual(getWorkPageMetadata(superai, 'en').keywords, ['China AI ecosystem', 'Hangzhou', 'Shanghai', 'Singapore', 'SuperAI', 'Datawhale', 'Zhejiang University', 'ModelScope', 'Qwen', 'MiniMax']);
  assert.equal(getWorkPageMetadata(getWorkById('zh', 'superai-china'), 'zh').title, 'SuperAI 中国 AI 生态走访：杭州、上海与新加坡');
  assert.deepEqual(
    getWorkPageMetadata(getWorkById('zh', 'superai-china'), 'zh').keywords,
    [...getPageKeywords('zh', 'work'), 'SuperAI 中国 AI 生态走访', '杭州 · 上海 · 新加坡'],
  );

  const festival = getWorkById('en', 'aix-creation-festival');
  assert.equal(getWorkPageMetadata(festival, 'en').title, 'AI+X Creation Festival: 40 Cities, for AI Learners Outside the Largest Tech Hubs');
  assert.equal(getWorkPageMetadata(getWorkById('zh', 'aix-creation-festival'), 'zh').title, 'AI+X 创造节：40 座城市，让不在一线城市的 AI 学习者和开发者在本地见面');

  const unchanged = getWorkById('zh', 'wechat-innovation-workshop');
  const unchangedMetadata = getWorkPageMetadata(unchanged, 'zh');
  assert.equal(unchangedMetadata.title, unchanged.title);
  assert.equal(unchangedMetadata.description, unchanged.summary);
  assert.deepEqual(unchangedMetadata.keywords, [...getPageKeywords('zh', 'work'), unchanged.title, unchanged.location]);
  assert.ok(unchangedMetadata.keywords.includes('WAIC 官方夜场'));
});

test('project index metadata mentions the AI-native work system without a new publication date', () => {
  assert.deepEqual(getProjectsPageKeywords('zh').slice(-2), ['AI 原生工作系统', '多 Agent 系统']);
  assert.deepEqual(getProjectsPageKeywords('en').slice(-2), ['AI-native work system', 'multi-agent system']);
  assert.ok(getProjectsPageKeywords('zh').includes('WAIC 官方夜场'));
  const zh = JSON.parse(fs.readFileSync(new URL('../messages/zh.json', import.meta.url), 'utf8'));
  const en = JSON.parse(fs.readFileSync(new URL('../messages/en.json', import.meta.url), 'utf8'));
  assert.equal(zh.projects.meta.description, 'Darren Su / 苏鹏的产品与项目：GlobalTechEvents、Datawhale AI+X Events，日常使用的 AI 原生工作系统（31 个专业 Agent、44 个自动任务），以及代表案例。');
  assert.equal(en.projects.meta.description, 'Products and projects by Darren Su, including GlobalTechEvents, Datawhale AI+X Events, an AI-native work system with 31 specialized agents and 44 recurring automations, and selected case studies.');
  assert.ok(!zh.projects.meta.description.includes('MatchPoint'));
  assert.ok(!en.projects.meta.description.includes('MatchPoint'));
  assert.equal(getSiteContent('zh').seo.home.knowsAbout.at(-1), '数字组织设计');
  assert.equal(getSiteContent('en').seo.home.knowsAbout.at(-1), 'Digital Organization Design');
  assert.ok(getSiteContent('zh').seo.home.knowsAbout.includes('多 Agent 数字组织'));
  assert.ok(getSiteContent('en').seo.home.knowsAbout.includes('China AI ecosystem'));
});

test('llms.txt and RSS keep visible titles, and every topic URL is in the sitemap', async () => {
  const body = await (await llmsGET()).text();
  const writingAt = body.indexOf('## Published writing');
  const topicsAt = body.indexOf('## Topics / 主题索引');
  assert.ok(topicsAt >= 0 && topicsAt < writingAt);
  const topics = body.slice(topicsAt, writingAt);
  const urls = [...topics.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((match) => match[1]);
  const sitemapUrls = new Set(sitemap().map((entry) => entry.url));
  for (const slug of seriesSlugs) {
    for (const locale of locales) {
      const url = `${siteUrl}/${locale}/blog/topic/${slug}`;
      assert.ok(topics.includes(url), `Topics must list ${url}`);
    }
  }
  assert.equal(urls.length, 37);
  for (const url of urls) assert.ok(sitemapUrls.has(url), `${url} must already be in the sitemap`);
  const xml = await (await rssGET()).text();
  for (const locale of locales) {
    for (const post of getAllPosts(locale)) {
      assert.ok(body.includes(`- [${post.title}](${siteUrl}/${locale}/blog/${post.slug}): ${post.description}`));
      const markdown = articleMarkdown(post, locale);
      assert.ok(markdown.includes(`# ${post.title}`));
      assert.ok(markdown.startsWith(`---\ntitle: ${JSON.stringify(post.title)}`));
      if (!post.seoTitle) continue;
      assert.ok(!body.includes(post.seoTitle));
      assert.ok(!xml.includes(post.seoTitle));
      assert.ok(!markdown.includes(post.seoTitle));
      if (post.seoDescription && post.seoDescription !== post.description) {
        assert.ok(!body.includes(post.seoDescription));
        assert.ok(!xml.includes(post.seoDescription));
        assert.ok(!markdown.includes(post.seoDescription));
      }
    }
  }
});

test('article and case pages still bind the visible title, summary, and tags', () => {
  const articlePage = fs.readFileSync(new URL('../src/app/[locale]/blog/[slug]/page.tsx', import.meta.url), 'utf8');
  assert.match(articlePage, /<h1>\{post\.title\}<\/h1>/);
  assert.match(articlePage, /<p className="reading-deck">\{post\.description\}<\/p>/);
  assert.match(articlePage, /post\.tags\.map\(tag =>/);
  const casePage = fs.readFileSync(new URL('../src/app/[locale]/work/[slug]/page.tsx', import.meta.url), 'utf8');
  assert.match(casePage, /<h1>\{work\.title\}<\/h1>/);
  assert.match(casePage, /<p className="interior-lead">\{work\.summary\}<\/p>/);
});

test('the Changzhi video page publishes one VideoObject and stays Chinese-only', () => {
  assert.equal(getAllPosts('en').some((post) => post.slug === 'changzhi-small-city-ai' || post.slug === 'jindongnan-travel-notes'), false);
  const post = getAllPosts('zh').find((item) => item.slug === 'changzhi-small-city-ai');
  const graph = articleStructuredData(post, 'zh')['@graph'];
  const video = graph.find((node) => node['@type'] === 'VideoObject');
  const article = graph.find((node) => node['@type'] === 'BlogPosting');
  assert.equal(video.name, '在长治，我看到了小城市做AI的机会');
  assert.equal(video.description, post.description);
  assert.equal(video.thumbnailUrl, `${siteUrl}/blog/changzhi/cover.jpg`);
  assert.equal(video.uploadDate, '2026-10-05T20:30:22+08:00');
  assert.equal(video.duration, 'PT5M51S');
  assert.equal(video.embedUrl, 'https://open.douyin.com/player/video?vid=7693160082292477235&autoplay=0');
  assert.equal(video.url, 'https://www.douyin.com/video/7693160082292477235');
  assert.deepEqual(video.author, { '@id': `${siteUrl}/#person` });
  assert.equal(article.headline, post.title);
  assert.equal(article.description, post.description);
  assert.equal(article.datePublished, '2026-10-05');
  assert.ok(!Object.hasOwn(article, 'dateModified'));
  assert.ok(!post.seoKeywords.includes('县城'));
  const entry = sitemap().find((item) => item.url === `${siteUrl}/zh/blog/changzhi-small-city-ai`);
  assert.deepEqual(entry.alternates.languages, { zh: `${siteUrl}/zh/blog/changzhi-small-city-ai` });
  assert.ok(!Object.hasOwn(entry, 'lastModified'));
  const travel = sitemap().find((item) => item.url === `${siteUrl}/zh/blog/jindongnan-travel-notes`);
  assert.deepEqual(travel.alternates.languages, { zh: `${siteUrl}/zh/blog/jindongnan-travel-notes` });
  assert.ok(!Object.hasOwn(travel, 'lastModified'));
});

test('JSON-LD remains valid JSON without allowing content to close its script element', () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Darren / 苏鹏',
    description: '</script><script>window.unwanted = true</script><p>injected</p> & < >',
  };
  const markup = renderToStaticMarkup(createElement(JsonLd, { data }));
  const dom = new JSDOM(`<!doctype html><html><body>${markup}</body></html>`);
  try {
    const { document } = dom.window;
    assert.equal(document.querySelectorAll('script').length, 1);
    assert.equal(document.querySelector('p'), null);
    const script = document.querySelector('script[type="application/ld+json"]');
    assert.ok(script);
    assert.ok(!script.textContent.includes('<'), 'HTML-opening characters must be escaped inside JSON-LD');
    assert.deepEqual(JSON.parse(script.textContent), data, 'Escaping must preserve the original structured content');
  } finally {
    dom.window.close();
  }
});
