import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentRoot = path.join(projectRoot, 'content', 'blog');
const publicRoot = path.join(projectRoot, 'public');
const portfolioPath = path.join(projectRoot, 'src', 'lib', 'portfolio.ts');
const portfolioSource = fs.readFileSync(portfolioPath, 'utf8');
const locales = ['en', 'zh'];
const requiredFrontmatter = ['title', 'date', 'description', 'tags'];

function markdownFiles() {
  return locales.flatMap((locale) => {
    const localeRoot = path.join(contentRoot, locale);
    assert.ok(fs.existsSync(localeRoot), `Missing blog directory: content/blog/${locale}`);

    const files = fs
      .readdirSync(localeRoot)
      .filter((filename) => /\.mdx?$/.test(filename))
      .sort();

    assert.ok(files.length > 0, `No blog posts found in content/blog/${locale}`);

    return files.map((filename) => ({
      locale,
      filename,
      slug: filename.replace(/\.mdx?$/, ''),
      absolutePath: path.join(localeRoot, filename),
      relativePath: path.posix.join('content', 'blog', locale, filename),
    }));
  });
}

function readPost(post) {
  return fs.readFileSync(post.absolutePath, 'utf8').replace(/\r\n/g, '\n');
}

function stripFencedCode(source) {
  const visibleLines = [];
  let fence = null;

  for (const line of source.split('\n')) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);

    if (!fence && marker) {
      fence = { character: marker[1][0], length: marker[1].length };
      continue;
    }

    if (fence) {
      const closingFence = line.match(/^\s*(`+|~+)\s*$/);
      if (
        closingFence
        && closingFence[1][0] === fence.character
        && closingFence[1].length >= fence.length
      ) {
        fence = null;
      }
      continue;
    }

    visibleLines.push(line);
  }

  return visibleLines.join('\n');
}

function parseFrontmatter(source, relativePath) {
  const match = source.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  assert.ok(match, `${relativePath} must start with a frontmatter block`);

  const values = new Map();
  for (const line of match[1].split('\n')) {
    if (!line.trim() || /^\s/.test(line)) continue;
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    values.set(line.slice(0, separator).trim(), line.slice(separator + 1).trim());
  }

  return values;
}

function markdownDestination(rawDestination) {
  const destination = rawDestination.trim();
  if (destination.startsWith('<')) {
    const closingBracket = destination.indexOf('>');
    return closingBracket === -1 ? destination : destination.slice(1, closingBracket);
  }
  return destination.split(/\s+/, 1)[0];
}

function localAssetPath(destination) {
  const pathname = destination.split(/[?#]/, 1)[0];
  if (!pathname.startsWith('/') || pathname.startsWith('//')) return null;

  const decodedPath = decodeURIComponent(pathname);
  const resolvedPath = path.resolve(publicRoot, `.${decodedPath}`);
  assert.ok(
    resolvedPath.startsWith(`${publicRoot}${path.sep}`),
    `Local asset escapes the public directory: ${destination}`,
  );
  return resolvedPath;
}

function articleRoute(destination, sourceLocale) {
  let parsedUrl;
  try {
    parsedUrl = new URL(destination, 'https://content.test');
  } catch {
    return null;
  }

  const internalHosts = new Set(['content.test', 'darren-su.com', 'www.darren-su.com']);
  if (!internalHosts.has(parsedUrl.hostname)) return null;

  const { pathname } = parsedUrl;

  const localized = pathname.match(/^\/(en|zh)\/blog\/([^/]+)\/?$/);
  if (localized) return { locale: localized[1], slug: decodeURIComponent(localized[2]) };

  const currentLocale = pathname.match(/^\/blog\/([^/]+)\/?$/);
  if (currentLocale) return { locale: sourceLocale, slug: decodeURIComponent(currentLocale[1]) };

  return null;
}

test('blog frontmatter is complete in both languages', () => {
  for (const post of markdownFiles()) {
    const frontmatter = parseFrontmatter(readPost(post), post.relativePath);

    for (const field of requiredFrontmatter) {
      assert.ok(frontmatter.has(field), `${post.relativePath} is missing frontmatter field: ${field}`);
      assert.ok(frontmatter.get(field), `${post.relativePath} has an empty frontmatter field: ${field}`);
    }

    const date = frontmatter.get('date');
    assert.match(date, /^\d{4}-\d{2}-\d{2}$/, `${post.relativePath} date must use YYYY-MM-DD`);
    const parsedDate = new Date(`${date}T00:00:00Z`);
    assert.ok(!Number.isNaN(parsedDate.valueOf()), `${post.relativePath} has an invalid date`);
    assert.equal(
      parsedDate.toISOString().slice(0, 10),
      date,
      `${post.relativePath} has an invalid calendar date`,
    );

    const tags = frontmatter.get('tags');
    assert.match(tags, /^\[\s*[^\]]+\s*\]$/, `${post.relativePath} tags must be a non-empty inline list`);
  }
});

test('local images referenced by Markdown exist in public', () => {
  const missingImages = [];

  for (const post of markdownFiles()) {
    const source = stripFencedCode(readPost(post));
    const imagePattern = /!\[[^\]]*\]\(([^)]+)\)/g;

    for (const match of source.matchAll(imagePattern)) {
      const destination = markdownDestination(match[1]);
      const assetPath = localAssetPath(destination);
      if (assetPath && (!fs.existsSync(assetPath) || !fs.statSync(assetPath).isFile())) {
        missingImages.push(`${post.relativePath}: ${destination}`);
      }
    }
  }

  assert.deepEqual(missingImages, [], `Missing local images:\n${missingImages.join('\n')}`);
});

test('internal Markdown links to blog articles resolve', () => {
  const posts = markdownFiles();
  const knownArticles = new Set(posts.map(({ locale, slug }) => `${locale}/${slug}`));
  const missingArticles = [];

  for (const post of posts) {
    const source = stripFencedCode(readPost(post));
    const linkPattern = /(?<!!)\[[^\]]*\]\(([^)]+)\)/g;

    for (const match of source.matchAll(linkPattern)) {
      const destination = markdownDestination(match[1]);
      const route = articleRoute(destination, post.locale);
      if (route && !knownArticles.has(`${route.locale}/${route.slug}`)) {
        missingArticles.push(`${post.relativePath}: ${destination}`);
      }
    }
  }

  assert.deepEqual(missingArticles, [], `Missing linked articles:\n${missingArticles.join('\n')}`);
});

test('portfolio case routes, notes, and local images stay complete', () => {
  const chineseStart = portfolioSource.indexOf('const chinesePortfolio');
  const englishStart = portfolioSource.indexOf('const englishPortfolio');
  const dimensionsStart = portfolioSource.indexOf('const portfolioImageDimensions');

  assert.ok(chineseStart >= 0 && englishStart > chineseStart, 'Chinese portfolio data is missing');
  assert.ok(dimensionsStart > englishStart, 'English portfolio data is missing');

  const workIds = (source) => [...source.matchAll(/\n\s{6}id: '([^']+)'/g)].map((match) => match[1]);
  const chinesePortfolioSource = portfolioSource.slice(chineseStart, englishStart);
  const englishPortfolioSource = portfolioSource.slice(englishStart, dimensionsStart);
  const chineseIds = workIds(chinesePortfolioSource);
  const englishIds = workIds(englishPortfolioSource);

  assert.ok(chineseIds.length > 0, 'No portfolio cases found');
  assert.equal(new Set(chineseIds).size, chineseIds.length, 'Chinese portfolio IDs must be unique');
  assert.equal(new Set(englishIds).size, englishIds.length, 'English portfolio IDs must be unique');
  assert.deepEqual(englishIds, chineseIds, 'Both locales must expose the same portfolio case routes');
  assert.match(
    portfolioSource,
    /href: `\/work\/\$\{item\.id\}`/,
    'Portfolio cases must link to their generated detail routes',
  );

  const imagePaths = [...portfolioSource.matchAll(/\n\s+(?:image|src): '([^']+)'/g)].map(
    (match) => match[1],
  );
  assert.ok(imagePaths.length > 0, 'Portfolio images are missing');

  for (const imagePath of new Set(imagePaths)) {
    const assetPath = localAssetPath(imagePath);
    assert.ok(assetPath && fs.existsSync(assetPath), `Missing portfolio image: ${imagePath}`);
    assert.ok(fs.statSync(assetPath).isFile(), `Portfolio image is not a file: ${imagePath}`);
  }

  const knownArticles = new Set(markdownFiles().map(({ locale, slug }) => `${locale}/${slug}`));
  const localePortfolioSources = {
    zh: chinesePortfolioSource,
    en: englishPortfolioSource,
  };

  for (const [locale, source] of Object.entries(localePortfolioSources)) {
    const noteHrefs = [...source.matchAll(/\n\s+noteHref: '([^']+)'/g)].map((match) => match[1]);
    for (const noteHref of new Set(noteHrefs)) {
      const route = articleRoute(noteHref, locale);
      assert.ok(route, `Invalid portfolio note link: ${noteHref}`);
      assert.ok(
        knownArticles.has(`${route.locale}/${route.slug}`),
        `Missing ${locale} portfolio note: ${noteHref}`,
      );
    }
  }
});

function headingSlugs(source) {
  const seen = new Map();
  const slugs = new Set();

  for (const match of stripFencedCode(source).matchAll(/^#{1,6}\s+(.+)$/gm)) {
    const plainText = match[1]
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[`*_~]/g, '')
      .normalize('NFKC')
      .toLocaleLowerCase()
      .replace(/[\u2018\u2019']/g, '')
      .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
      .replace(/^-+|-+$/g, '') || 'section';
    const count = seen.get(plainText) ?? 0;
    seen.set(plainText, count + 1);
    slugs.add(count === 0 ? plainText : `${plainText}-${count + 1}`);
  }

  return slugs;
}

test('Markdown table-of-contents links point to rendered headings', () => {
  const brokenAnchors = [];

  for (const post of markdownFiles()) {
    const source = stripFencedCode(readPost(post));
    const slugs = headingSlugs(source);

    for (const match of source.matchAll(/(?<!!)\[[^\]]+\]\(#([^)]+)\)/g)) {
      const anchor = decodeURIComponent(match[1]);
      if (!slugs.has(anchor)) brokenAnchors.push(`${post.relativePath}: #${anchor}`);
    }
  }

  assert.deepEqual(brokenAnchors, [], `Broken heading anchors:\n${brokenAnchors.join('\n')}`);
});

test('known dead external references are not published', () => {
  const occurrences = [];
  const deadAgentTownLink = /https?:\/\/(?:www\.)?github\.com\/AGI-Villa\/agent-town(?:[/?#][^\s)>\]]*)?/gi;

  for (const post of markdownFiles()) {
    const source = stripFencedCode(readPost(post));
    if (deadAgentTownLink.test(source)) occurrences.push(post.relativePath);
    deadAgentTownLink.lastIndex = 0;
  }

  assert.deepEqual(
    occurrences,
    [],
    `Remove or replace the unavailable AGI-Villa/agent-town reference in:\n${occurrences.join('\n')}`,
  );
});
