import { locales } from '@/i18n/config';
import { getAllPosts } from '@/lib/blog';
import { getPortfolio } from '@/lib/portfolio';
import { siteUrl } from '@/lib/seo';
import { getSiteContent } from '@/lib/siteContent';

export const dynamic = 'force-static';

export function GET() {
  const articles = locales.flatMap((locale) =>
    getAllPosts(locale).map(
      (post) =>
        `- [${post.title}](${siteUrl}/${locale}/blog/${post.slug}): ${post.description}`
    )
  );
  const cases = locales.flatMap((locale) =>
    getPortfolio(locale).work.map(
      (work) =>
        `- [${work.title}](${siteUrl}/${locale}/work/${work.id}): ${work.summary}`
    )
  );
  const sourceFiles = locales.flatMap((locale) => [
    ...getAllPosts(locale).map(post => `- [${post.title} (${locale}, Markdown)](${siteUrl}/${locale}/blog/${post.slug}/source.md)`),
    ...getPortfolio(locale).work.map(work => `- [${work.title} (${locale}, Markdown)](${siteUrl}/${locale}/work/${work.id}/source.md)`),
  ]);
  const profile = getSiteContent('en').about.hero;

  const body = [
    '# Darren Su / 苏鹏',
    '',
    `> ${profile.subtitle}`,
    '',
    profile.tags.join('; '),
    '',
    `Canonical website: ${siteUrl}`,
    'Primary contact: supeng842499467@gmail.com',
    '',
    '## Main pages',
    '',
    `- [English home](${siteUrl}/en)`,
    `- [中文首页](${siteUrl}/zh)`,
    `- [Selected work](${siteUrl}/en/work)`,
    `- [代表案例](${siteUrl}/zh/work)`,
    `- [Collaborate](${siteUrl}/en/services)`,
    `- [合作](${siteUrl}/zh/services)`,
    `- [Products](${siteUrl}/en/build)`,
    `- [产品](${siteUrl}/zh/build)`,
    `- [About Darren](${siteUrl}/en/about)`,
    `- [关于 Darren](${siteUrl}/zh/about)`,
    `- [Writing](${siteUrl}/en/blog)`,
    `- [文章与手记](${siteUrl}/zh/blog)`,
    '',
    '## Case studies',
    '',
    ...cases,
    '',
    '## Published writing',
    '',
    ...articles,
    '',
    '## Full-text formats',
    '',
    'The HTML pages above are the canonical sources. These alternate formats are generated from the same public content, including authorship, article publication dates, images, and references. Case-study years describe when the work happened; they are not publication dates.',
    '',
    `- [Full-text RSS, Chinese and English](${siteUrl}/rss.xml)`,
    ...sourceFiles,
    '',
    '## Public profiles',
    '',
    '- X: https://x.com/zenshipai',
    '- Instagram: https://www.instagram.com/0xdarren_su',
    '- LinkedIn: https://www.linkedin.com/in/darrenzenshipai',
    '- GitHub: https://github.com/SuperSupeng',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
