import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

// Read the served HTML without executing JavaScript, as a crawler would.
const baseUrl = new URL(process.argv[2] ?? 'http://127.0.0.1:3100');
const failures = [];
const pages = new Map();
const sources = new Map();
const imagePaths = new Set();
const articleImagePaths = new Set();

async function request(path, userAgent = 'OAI-SearchBot') {
  return fetch(new URL(path, baseUrl), {
    headers: { 'User-Agent': userAgent },
    signal: AbortSignal.timeout(15_000),
  });
}

function check(condition, message) {
  if (!condition) failures.push(message);
}

function checkValues(actual, expected, message) {
  check(JSON.stringify(actual) === JSON.stringify(expected), message);
}

function articleIdentity(document, label) {
  const authors = [...document.querySelectorAll('meta[name="author"]')].map(meta => meta.content);
  check(authors.length > 0 && authors.every(author => author.trim()), `${label} article author metadata is missing or empty`);
  const published = [...document.querySelectorAll('meta[property="article:published_time"]')];
  const times = [...document.querySelectorAll('.reading-byline time')];
  check(published.length <= 1, `${label} duplicate publication metadata`);
  const date = published[0]?.content;
  if (published.length) {
    const parsed = new Date(`${date}T00:00:00Z`);
    check(/^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === date, `${label} invalid publication date metadata`);
    checkValues(times.map(time => time.getAttribute('datetime')), [date], `${label} visible publication datetime differs from metadata`);
    checkValues(times.map(time => time.textContent.trim()), [date], `${label} visible publication date differs from metadata`);
  } else {
    check(times.length === 0, `${label} undated article must not have a publication time element`);
  }
  return { authors, date };
}

function checkArticleSchema(schema, article, nodes, label) {
  const authors = Array.isArray(schema.author) ? schema.author : [schema.author];
  const names = authors.map(author => author?.name ?? nodes.find(node => author?.['@id'] && node['@id'] === author['@id'])?.name);
  checkValues(names, article.authors, `${label} JSON-LD authors differ from page metadata`);
  if (article.date) check(schema.datePublished === article.date, `${label} JSON-LD publication date differs from page metadata`);
  else check(!Object.hasOwn(schema, 'datePublished'), `${label} undated article must not declare datePublished`);
}

function sourceFrontmatter(body, label) {
  const match = body.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  check(Boolean(match), `${label} missing source frontmatter`);
  const fields = {};
  for (const line of match?.[1].split('\n') ?? []) {
    const separator = line.indexOf(':');
    const key = line.slice(0, separator);
    try {
      if (separator <= 0 || Object.hasOwn(fields, key)) throw new Error('invalid field');
      fields[key] = JSON.parse(line.slice(separator + 1).trim());
    } catch {
      failures.push(`${label} invalid or duplicate source field: ${key}`);
    }
  }
  return fields;
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
  for (const image of document.querySelectorAll('.reading-prose img')) {
    const candidates = (image.getAttribute('srcset') ?? '').split(',').map(value => value.trim().split(/\s+/));
    const source = candidates.find(([, width]) => Number.parseInt(width, 10) >= 640)?.[0] ?? image.getAttribute('src');
    if (!source) continue;
    const url = new URL(source, canonical);
    if (url.origin === new URL(canonical).origin) articleImagePaths.add(`${url.pathname}${url.search}`);
  }
  if (/^\/(en|zh)\/(blog|work)\/[^/]+$/.test(path)) {
    const sourceUrl = `${canonical}/source.md`;
    check(document.head.querySelector('link[rel="alternate"][type="text/markdown"]')?.href === sourceUrl, `${label} missing canonical Markdown alternate in head`);
    // Reading pages stay focused on their content. Crawlers discover the
    // complete text through the head alternate and llms.txt, without a UI link.
    sources.set(sourceUrl, canonical);
  }
  const scripts = [...document.querySelectorAll('script[type="application/ld+json"]')];
  const nodes = [];
  check(scripts.length > 0, `${label} missing structured data`);
  for (const script of scripts) {
    try {
      const graph = JSON.parse(script.textContent);
      check(graph['@context'] === 'https://schema.org', `${label} unexpected structured data context`);
      nodes.push(...(Array.isArray(graph['@graph']) ? graph['@graph'] : [graph]));
    } catch {
      failures.push(`${label} invalid JSON-LD`);
    }
  }
  const article = /^\/(en|zh)\/blog\/[^/]+$/.test(path) ? articleIdentity(document, label) : undefined;
  if (article) check(nodes.filter(node => node['@type'] === 'BlogPosting').length === 1, `${label} expected one article JSON-LD node`);
  pages.set(canonical, { document, languages, nodes, article });
}

for (const [canonical, { document, languages, nodes }] of pages) {
  const articles = nodes.flatMap(node => node['@type'] === 'BlogPosting' ? [node] : node['@type'] === 'Blog' ? node.blogPost ?? [] : []);
  for (const schema of articles) {
    const article = pages.get(schema.url)?.article;
    check(Boolean(article), `${canonical}: article JSON-LD has no matching article page: ${schema.url}`);
    if (article) checkArticleSchema(schema, article, nodes, `${canonical} (${schema.url}):`);
  }
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
  const fields = sourceFrontmatter(body, `${sourceUrl}:`);
  check(fields.canonical === canonical, `${sourceUrl}: source canonical differs from page`);
  const article = pages.get(canonical)?.article;
  if (article) {
    checkValues(fields.authors, article.authors, `${sourceUrl}: source authors differ from page metadata`);
    if (Object.hasOwn(fields, 'author')) {
      check(article.authors.length === 1 && (fields.author === article.authors[0] || (article.authors[0] === 'Darren Su' && fields.author === 'Darren Su / 苏鹏')), `${sourceUrl}: legacy author field conflicts with the complete author list`);
    }
    if (article.date) check(fields.date === article.date, `${sourceUrl}: source date differs from page metadata`);
    else check(!Object.hasOwn(fields, 'date'), `${sourceUrl}: undated article must not export a publication date`);
  } else {
    check(fields.author === 'Darren Su / 苏鹏', `${sourceUrl}: missing case source attribution`);
  }
  check(body.length > 300, `${sourceUrl}: source content is unexpectedly short`);
}

for (const imagePath of imagePaths) {
  const response = await fetch(new URL(imagePath, baseUrl), { method: 'HEAD', signal: AbortSignal.timeout(15_000) });
  check(response.status === 200 && response.headers.get('content-type')?.startsWith('image/'), `Share image unavailable: ${imagePath}`);
}

// Exercise the actual optimized response, including its body. A valid source
// file or successful HEAD request does not detect a stalled image conversion.
const articleImageRequests = [...articleImagePaths];
for (let index = 0; index < articleImageRequests.length; index += 4) {
  await Promise.all(articleImageRequests.slice(index, index + 4).map(async (imagePath) => {
    try {
      const response = await fetch(new URL(imagePath, baseUrl), {
        headers: { Accept: 'image/webp,image/*,*/*;q=0.8' },
        signal: AbortSignal.timeout(15_000),
      });
      const body = await response.arrayBuffer();
      check(response.status === 200 && response.headers.get('content-type')?.startsWith('image/') && body.byteLength > 0, `Article image unavailable: ${imagePath}`);
    } catch (error) {
      failures.push(`Article image failed or timed out: ${imagePath} (${error.message})`);
    }
  }));
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
    const listedUrls = new Set([...body.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map(([, href]) => href));
    for (const sourceUrl of sources.keys()) {
      check(listedUrls.has(sourceUrl), `${path}: missing full-text source: ${sourceUrl}`);
    }
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
      const url = item.querySelector('link')?.textContent;
      const article = pages.get(url)?.article;
      check(Boolean(article), `${path}: item has no matching article page: ${url}`);
      if (!article) continue;
      const authors = [...item.getElementsByTagNameNS('http://purl.org/dc/elements/1.1/', 'creator')].map(author => author.textContent);
      checkValues(authors, article.authors, `${path} (${url}): RSS authors differ from page metadata`);
      const dates = [...item.querySelectorAll('pubDate')].map(date => date.textContent);
      if (article.date) {
        checkValues(dates, [new Date(`${article.date}T00:00:00+08:00`).toUTCString()], `${path} (${url}): RSS publication date differs from page metadata`);
      } else {
        check(dates.length === 0, `${path} (${url}): undated article must not declare pubDate`);
      }
    }
  }
}

console.log(JSON.stringify({ pages: pages.size, shareImages: imagePaths.size, articleImages: articleImagePaths.size, sources: sources.size, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
