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
} = require('../src/lib/seo.ts');
const {
  getPersonJobTitle,
  getPersonOccupations,
  linkedinProfileUrl,
  personAlternateNames,
  personName,
  personSameAs,
} = require('../src/lib/site-config.ts');
const { getAllPosts } = require('../src/lib/blog.ts');
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
  assert.match(body, /MatchPoint · Co-founder/);
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
