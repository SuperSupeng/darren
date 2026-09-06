import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

// Read the served HTML without executing JavaScript, as a crawler would.
const baseUrl = new URL(process.argv[2] ?? 'http://127.0.0.1:3100');
const failures = [];
const pages = new Map();
const sources = new Map();
const imagePaths = new Set();

async function request(path, userAgent = 'OAI-SearchBot') {
  return fetch(new URL(path, baseUrl), {
    headers: { 'User-Agent': userAgent },
    signal: AbortSignal.timeout(15_000),
  });
}

function check(condition, message) {
  if (!condition) failures.push(message);
}

const sitemapResponse = await request('/sitemap.xml');
assert.equal(sitemapResponse.status, 200, 'Sitemap must be accessible');
const sitemap = new JSDOM(await sitemapResponse.text(), { contentType: 'application/xml' }).window.document;
const entries = [...sitemap.querySelectorAll('url')];
assert.ok(entries.length > 0, 'Sitemap must contain pages');

for (const entry of entries) {
  const canonical = entry.querySelector('loc').textContent;
  const path = new URL(canonical).pathname;
  const response = await request(path);
  const document = new JSDOM(await response.text()).window.document;
  const label = `${path}:`;
  const meta = (name) => document.querySelector(`meta[name="${name}"], meta[property="${name}"]`)?.content;
  const languages = Object.fromEntries([...document.querySelectorAll('link[hreflang]')].map(link => [link.hreflang, link.href]));
  const sitemapLanguages = Object.fromEntries([...entry.getElementsByTagName('xhtml:link')].map(link => [link.getAttribute('hreflang'), link.getAttribute('href')]));

  check(response.status === 200, `${label} HTTP ${response.status}`);
  check(!pages.has(canonical), `${label} duplicate sitemap entry`);
  check(Boolean(document.title.trim()), `${label} missing title`);
  check(Boolean(meta('description')?.trim()), `${label} missing description`);
  check(document.querySelectorAll('h1').length === 1, `${label} expected one H1`);
  check((document.querySelector('main')?.textContent.trim().length ?? 0) > 100, `${label} main content missing from raw HTML`);
  check(!document.querySelector('img:not([alt])'), `${label} image missing alt attribute`);
  check(!/noindex/i.test(`${meta('robots') ?? ''} ${response.headers.get('x-robots-tag') ?? ''}`), `${label} sitemap page is noindex`);
  check(document.querySelector('link[rel="canonical"]')?.href === canonical, `${label} canonical differs from sitemap`);
  check(meta('og:url') === canonical, `${label} Open Graph URL differs from canonical`);
  check(Boolean(meta('og:image')), `${label} missing share image`);
  check(!/hreflang=/i.test(response.headers.get('link') ?? ''), `${label} middleware emitted competing language links`);
  check(JSON.stringify(languages) === JSON.stringify(sitemapLanguages), `${label} HTML and sitemap language links differ`);
  check(document.documentElement.lang === (path.startsWith('/zh') ? 'zh-CN' : 'en'), `${label} incorrect document language`);

  if (meta('og:image')) imagePaths.add(new URL(meta('og:image')).pathname);
  if (/^\/(en|zh)\/(blog|work)\/[^/]+$/.test(path)) {
    const sourceUrl = `${canonical}/source.md`;
    check(document.querySelector('link[rel="alternate"][type="text/markdown"]')?.href === sourceUrl, `${label} missing canonical Markdown alternate`);
    check([...document.querySelectorAll('main a[href]')].some(link => new URL(link.getAttribute('href'), canonical).href === sourceUrl), `${label} source text has no visible download link`);
    sources.set(sourceUrl, canonical);
  }
  const scripts = [...document.querySelectorAll('script[type="application/ld+json"]')];
  check(scripts.length > 0, `${label} missing structured data`);
  for (const script of scripts) {
    try {
      const graph = JSON.parse(script.textContent);
      check(graph['@context'] === 'https://schema.org', `${label} unexpected structured data context`);
    } catch {
      failures.push(`${label} invalid JSON-LD`);
    }
  }
  pages.set(canonical, { document, languages });
}

for (const [canonical, { document, languages }] of pages) {
  for (const [language, href] of Object.entries(languages)) {
    check(pages.has(href), `${canonical}: ${language} alternate is not a published page`);
    if (language !== 'x-default' && pages.has(href)) {
      check(Object.values(pages.get(href).languages).includes(canonical), `${canonical}: alternate does not link back`);
    }
  }
  for (const link of document.querySelectorAll('main a[href]')) {
    const target = new URL(link.getAttribute('href'), canonical);
    if (target.origin !== new URL(canonical).origin || !/^\/(en|zh)(\/|$)/.test(target.pathname)) continue;
    if (sources.has(`${target.origin}${target.pathname}`)) continue;
    const destination = pages.get(`${target.origin}${target.pathname}`);
    check(Boolean(destination), `${canonical}: internal link missing from sitemap: ${target.pathname}`);
    if (destination && target.hash) {
      const fragment = decodeURIComponent(target.hash.slice(1));
      // The homepage router uses these hashes to select a room view, not scroll to an element.
      const roomView = destination.document.querySelector('.studio-experience') && ['work', 'build', 'notes'].includes(fragment);
      check(Boolean(roomView || destination.document.getElementById(fragment)), `${canonical}: broken anchor ${target.pathname}${target.hash}`);
    }
  }
}

for (const [sourceUrl, canonical] of sources) {
  const response = await request(new URL(sourceUrl).pathname);
  const body = await response.text();
  check(response.status === 200, `${sourceUrl}: source unavailable`);
  check(response.headers.get('content-type')?.startsWith('text/markdown'), `${sourceUrl}: incorrect source content type`);
  check(response.headers.get('link') === `<${canonical}>; rel="canonical"`, `${sourceUrl}: missing canonical HTTP link`);
  check(body.includes(`canonical: "${canonical}"`) && body.includes('author: "Darren Su / 苏鹏"'), `${sourceUrl}: missing source attribution`);
  check(body.length > 300, `${sourceUrl}: source content is unexpectedly short`);
}

for (const imagePath of imagePaths) {
  const response = await fetch(new URL(imagePath, baseUrl), { method: 'HEAD', signal: AbortSignal.timeout(15_000) });
  check(response.status === 200 && response.headers.get('content-type')?.startsWith('image/'), `Share image unavailable: ${imagePath}`);
}

for (const locale of ['en', 'zh']) {
  const response = await request(`/${locale}?light=evening&still=1`);
  const document = new JSDOM(await response.text()).window.document;
  const expected = [...pages.keys()].find(url => new URL(url).pathname === `/${locale}`);
  check(document.querySelector('link[rel="canonical"]')?.href === expected, `${locale}: visual preferences changed canonical URL`);
}

for (const path of ['/zh/studio', '/en/studio', '/zh/blog/not-a-real-article', '/en/work/not-a-real-case', '/zh/blog/not-a-real-article/source.md', '/en/work/not-a-real-case/source.md']) {
  const response = await request(path);
  const document = new JSDOM(await response.text()).window.document;
  check(/noindex/.test(`${document.querySelector('meta[name="robots"]')?.content ?? ''} ${response.headers.get('x-robots-tag') ?? ''}`), `${path}: should be noindex`);
  if (path.includes('not-a-real')) check(response.status === 404, `${path}: missing content should return 404`);
  check(!/hreflang=/i.test(response.headers.get('link') ?? ''), `${path}: should not emit language alternatives in HTTP headers`);
}

for (const userAgent of ['Googlebot', 'bingbot', 'OAI-SearchBot']) {
  const response = await request('/zh/blog/managing-31-ai-employees', userAgent);
  const document = new JSDOM(await response.text()).window.document;
  check(response.status === 200 && (document.querySelector('.reading-prose')?.textContent.length ?? 0) > 1000, `${userAgent}: article body unavailable`);
  check(Boolean(document.head.querySelector('link[rel="canonical"]')), `${userAgent}: canonical missing from head`);
}

for (const path of ['/robots.txt', '/llms.txt', '/rss.xml']) {
  const response = await request(path);
  const body = await response.text();
  check(response.status === 200 && body.length > 100, `${path}: discovery document unavailable`);
  if (path === '/llms.txt') {
    for (const [, href] of body.matchAll(/\]\((https?:\/\/[^)]+)\)/g)) {
      check(pages.has(href) || sources.has(href) || href === `${new URL([...pages.keys()][0]).origin}/rss.xml`, `${path}: listed resource is not a known canonical page or reading format: ${href}`);
    }
  }
  if (path === '/rss.xml') {
    const rss = new JSDOM(body, { contentType: 'application/xml' }).window.document;
    for (const link of rss.querySelectorAll('item > link')) {
      check(pages.has(link.textContent), `${path}: listed article is not in the sitemap: ${link.textContent}`);
    }
    const items = [...rss.querySelectorAll('item')];
    check(items.length === [...pages.keys()].filter(url => /^\/(en|zh)\/blog\/[^/]+$/.test(new URL(url).pathname)).length, `${path}: missing published articles`);
    for (const item of items) {
      check((item.getElementsByTagName('content:encoded')[0]?.textContent.length ?? 0) > 1000, `${path}: missing full article content`);
      check(item.getElementsByTagName('dc:creator')[0]?.textContent === 'Darren Su', `${path}: missing author attribution`);
    }
  }
}

console.log(JSON.stringify({ pages: pages.size, shareImages: imagePaths.size, sources: sources.size, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
