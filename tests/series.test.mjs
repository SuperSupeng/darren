import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);
const { getAllPosts, getPostsBySeries, parseBlogContent } = require('../src/lib/blog.ts');
const { createPageMetadata, seriesStructuredData } = require('../src/lib/seo.ts');
const { defaultLocale, locales } = require('../src/i18n/config.ts');
const { siteUrl } = require('../src/lib/site-config.ts');
const {
  getSeriesCopy,
  seriesCatalog,
  seriesMetaDescription,
  seriesSlugs,
} = require('../src/lib/series.ts');
const sitemap = require('../src/app/sitemap.ts').default;

const classified = {
  'managing-31-ai-employees': 'people-and-orgs',
  'changzhi-small-city-ai': 'china-ai-on-the-ground',
  'superai-china-ecosystem-visit': 'china-ai-on-the-ground',
  'zongtong-temple-retreat': 'practice',
  'jindongnan-travel-notes': 'practice',
  '2025-year-in-review': 'practice',
};

test('series intros stay limited to the approved strings', () => {
  assert.deepEqual(seriesCatalog['people-and-orgs'].intro.zh, [
    { text: '长期研究 AI 时代的人与组织。' },
    { text: '（导语待 Darren 写）', placeholder: true },
  ]);
  assert.deepEqual(seriesCatalog['people-and-orgs'].intro.en, [
    { text: 'Exploring AI, people & organizations.' },
    { text: '(Intro to be written by Darren)', placeholder: true },
  ]);
  assert.deepEqual(seriesCatalog['china-ai-on-the-ground'].intro.zh, [
    { text: '（导语待 Darren 写）', placeholder: true },
  ]);
  assert.deepEqual(seriesCatalog['china-ai-on-the-ground'].intro.en, [
    { text: 'A ground-level guide to China’s AI ecosystem for global founders and builders.' },
  ]);
  assert.deepEqual(seriesCatalog.practice.intro.zh, [
    { text: '（导语待 Darren 写）', placeholder: true },
  ]);
  assert.deepEqual(seriesCatalog.practice.intro.en, [
    { text: '(Intro to be written by Darren)', placeholder: true },
  ]);
});

test('a placeholder is not used as the meta description', () => {
  assert.equal(seriesMetaDescription('people-and-orgs', 'zh'), '长期研究 AI 时代的人与组织。');
  assert.equal(seriesMetaDescription('people-and-orgs', 'en'), 'Exploring AI, people & organizations.');
  assert.equal(seriesMetaDescription('china-ai-on-the-ground', 'en'), 'A ground-level guide to China’s AI ecosystem for global founders and builders.');
  assert.equal(seriesMetaDescription('china-ai-on-the-ground', 'zh'), 'China AI 现场');
  assert.equal(seriesMetaDescription('practice', 'zh'), '实践与生活');
  assert.equal(seriesMetaDescription('practice', 'en'), 'Practice & Life');

  for (const slug of seriesSlugs) {
    for (const locale of locales) {
      const metadata = createPageMetadata({
        locale,
        path: `/blog/topic/${slug}`,
        title: getSeriesCopy(slug, locale).name,
        description: seriesMetaDescription(slug, locale),
      });
      assert.equal(metadata.title, getSeriesCopy(slug, locale).name);
      assert.equal(metadata.description, seriesMetaDescription(slug, locale));
      assert.equal(metadata.alternates.canonical, `/${locale}/blog/topic/${slug}`);
      assert.equal(metadata.alternates.languages['x-default'], `/${defaultLocale}/blog/topic/${slug}`);
      for (const language of locales) {
        assert.equal(metadata.alternates.languages[language], `/${language}/blog/topic/${slug}`);
      }
    }
  }
});

test('only clear fits receive a series, and Chinese-only posts stay off the English page', () => {
  for (const locale of locales) {
    for (const post of getAllPosts(locale)) {
      if (classified[post.slug]) assert.equal(post.series, classified[post.slug], post.slug);
      else assert.equal(post.series, undefined, post.slug);
    }
  }
  assert.deepEqual(getPostsBySeries('zh', 'people-and-orgs').map((post) => post.slug), ['managing-31-ai-employees']);
  assert.deepEqual(getPostsBySeries('en', 'people-and-orgs').map((post) => post.slug), ['managing-31-ai-employees']);
  assert.deepEqual(getPostsBySeries('zh', 'china-ai-on-the-ground').map((post) => post.slug), [
    'changzhi-small-city-ai',
    'superai-china-ecosystem-visit',
  ]);
  assert.deepEqual(getPostsBySeries('en', 'china-ai-on-the-ground').map((post) => post.slug), [
    'superai-china-ecosystem-visit',
  ]);
  assert.deepEqual(getPostsBySeries('zh', 'practice').map((post) => post.slug), [
    'jindongnan-travel-notes',
    'zongtong-temple-retreat',
    '2025-year-in-review',
  ]);
  assert.deepEqual(getPostsBySeries('en', 'practice').map((post) => post.slug), [
    'zongtong-temple-retreat',
    '2025-year-in-review',
  ]);
});

test('series pages publish CollectionPage and ItemList data for the posts that exist in that language', () => {
  const zh = seriesStructuredData('practice', 'zh')['@graph'];
  const page = zh.find((node) => node['@type'] === 'CollectionPage');
  const list = zh.find((node) => node['@type'] === 'ItemList');
  assert.equal(page.name, '实践与生活');
  assert.equal(page.url, `${siteUrl}/zh/blog/topic/practice`);
  assert.equal(list.numberOfItems, 3);
  assert.deepEqual(list.itemListElement.map((item) => item.url), [
    `${siteUrl}/zh/blog/jindongnan-travel-notes`,
    `${siteUrl}/zh/blog/zongtong-temple-retreat`,
    `${siteUrl}/zh/blog/2025-year-in-review`,
  ]);
  const china = seriesStructuredData('china-ai-on-the-ground', 'en')['@graph'].find((node) => node['@type'] === 'ItemList');
  assert.equal(china.numberOfItems, 1);
  assert.deepEqual(china.itemListElement.map((item) => item.url), [
    `${siteUrl}/en/blog/superai-china-ecosystem-visit`,
  ]);
  for (const slug of seriesSlugs) {
    for (const locale of locales) {
      const url = `${siteUrl}/${locale}/blog/topic/${slug}`;
      assert.equal(sitemap().some((entry) => entry.url === url), true, url);
    }
  }
});

test('the series field accepts only the three slugs', () => {
  const source = [
    '---',
    'title: A note',
    'date: 2026-01-02',
    'description: A note.',
    'tags: [AI]',
    'series: practice',
    '---',
    '',
    'Body.',
    '',
  ].join('\n');
  assert.equal(parseBlogContent(source).series, 'practice');
  assert.throws(() => parseBlogContent(source.replace('series: practice', 'series: work')), /series/);
});
