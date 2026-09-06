import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);
const { getAllPosts } = require('../src/lib/blog.ts');
const { getPortfolio } = require('../src/lib/portfolio.ts');
const { siteUrl } = require('../src/lib/seo.ts');
const { articleMarkdown, caseMarkdown, absoluteMarkdownLinks, markdownResponse } = require('../src/lib/content-source.ts');
const { GET: articleGET, generateStaticParams: articleParams } = require('../src/app/[locale]/blog/[slug]/source.md/route.ts');
const { GET: caseGET, generateStaticParams: caseParams } = require('../src/app/[locale]/work/[slug]/source.md/route.ts');

test('source routes enumerate both locale and slug for every published article and case', () => {
  const expectedArticles = ['en', 'zh'].flatMap(locale => getAllPosts(locale).map(({ slug }) => ({ locale, slug })));
  const expectedCases = ['en', 'zh'].flatMap(locale => getPortfolio(locale).work.map(({ id }) => ({ locale, slug: id })));
  assert.deepEqual(articleParams(), expectedArticles);
  assert.deepEqual(caseParams(), expectedCases);
});

test('Markdown articles preserve the full source, author, publication date, and canonical identity', async () => {
  for (const locale of ['zh', 'en']) {
    for (const post of getAllPosts(locale)) {
      const canonical = `${siteUrl}/${locale}/blog/${post.slug}`;
      const text = articleMarkdown(post, locale);
      assert.ok(text.includes(`date: "${post.date}"`));
      assert.ok(text.includes(`canonical: "${canonical}"`));
      assert.ok(text.includes('author: "Darren Su / 苏鹏"'));
      assert.ok(text.endsWith(`${absoluteMarkdownLinks(post.content.trim(), canonical)}\n\n`));
      const response = await articleGET(new Request(`${canonical}/source.md`), { params: Promise.resolve({ locale, slug: post.slug }) });
      assert.equal(response.status, 200);
      assert.equal(response.headers.get('link'), `<${canonical}>; rel="canonical"`);
      assert.match(response.headers.get('content-type'), /^text\/markdown/);
      assert.equal(await response.text(), text);
    }
  }
});

test('case exports retain qualifications, responsibilities, outcomes, and published references without inventing publication dates', () => {
  for (const locale of ['zh', 'en']) {
    for (const work of getPortfolio(locale).work) {
      const text = caseMarkdown(work, locale);
      for (const fact of [work.summary, work.role, work.year, work.result, work.caseStudy.context, work.caseStudy.outcome, work.caseStudy.reflection, ...work.caseStudy.responsibilities]) {
        assert.ok(text.includes(fact), `${work.id}: missing original detail`);
      }
      if (work.caseStudy.outcomeNote) assert.ok(text.includes(work.caseStudy.outcomeNote));
      for (const material of work.caseStudy.materials ?? []) {
        assert.ok(text.includes(material.title));
        assert.ok(text.includes(material.description));
        const href = material.href.startsWith('/') ? `${siteUrl}/${locale}${material.href}` : material.href;
        assert.ok(text.includes(href));
      }
      assert.ok(!/^date:|^dateModified:/m.test(text), 'Event year is not a publication date');
    }
  }
});

test('standalone Markdown links keep their language and origin while code examples remain verbatim', () => {
  const canonical = `${siteUrl}/zh/blog/example`;
  const input = [
    '[Section](#示例)',
    '![Image](/blog/images/example.png)',
    '[Other article](/blog/other)',
    '[Case](/work/project)',
    '[English](/en/blog/other)',
    '[External](https://example.org/source)',
    '[External relative](//example.org/blog/source)',
    '`[Inline](/blog/code)`',
    '```md',
    '[Example](/blog/code)',
    '```',
  ].join('\n');
  const output = absoluteMarkdownLinks(input, canonical);
  assert.ok(output.includes(`[Section](${canonical}#%E7%A4%BA%E4%BE%8B)`));
  assert.ok(output.includes(`![Image](${siteUrl}/blog/images/example.png)`));
  assert.ok(output.includes(`[Other article](${siteUrl}/zh/blog/other)`));
  assert.ok(output.includes(`[Case](${siteUrl}/zh/work/project)`));
  assert.ok(output.includes(`[English](${siteUrl}/en/blog/other)`));
  assert.ok(output.includes('[External](https://example.org/source)'));
  assert.ok(output.includes('[External relative](https://example.org/blog/source)'));
  assert.ok(output.includes('`[Inline](/blog/code)`'));
  assert.ok(output.includes('```md\n[Example](/blog/code)\n```'));
  const nested = '```md\n```not-a-closing-fence\n[Example](/blog/code)\n```\n[Article](/blog/other)';
  assert.equal(absoluteMarkdownLinks(nested, canonical), `\`\`\`md\n\`\`\`not-a-closing-fence\n[Example](/blog/code)\n\`\`\`\n[Article](${siteUrl}/zh/blog/other)`);
});

test('source routes reject missing content and invalid languages without fallback or successful empty pages', async () => {
  for (const handler of [articleGET, caseGET]) {
    for (const params of [{ locale: 'zh', slug: 'missing' }, { locale: 'fr', slug: 'managing-31-ai-employees' }]) {
      const response = await handler(new Request('https://example.org/source.md'), { params: Promise.resolve(params) });
      assert.equal(response.status, 404);
      assert.equal(response.headers.get('x-robots-tag'), 'noindex');
      assert.ok(!response.headers.has('link'));
    }
  }
  const response = markdownResponse('# Public source', `${siteUrl}/zh/about`, 'zh');
  assert.equal(response.headers.get('content-language'), 'zh-CN');
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
});
