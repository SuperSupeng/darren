import { locales } from '@/i18n/config';
import { getAllPosts } from '@/lib/blog';
import { getPortfolio } from '@/lib/portfolio';
import {
  contactEmail,
  getPersonJobTitle,
  personDisplayName,
  personProfileLinks,
  siteUrl,
} from '@/lib/site-config';

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

  const body = [
    `# ${personDisplayName}`,
    '',
    '## Identity',
    '',
    '- Public name: Darren / Darren Su',
    '- Chinese name: 苏鹏',
    `- Roles (EN): ${getPersonJobTitle('en')}`,
    `- Roles (ZH): ${getPersonJobTitle('zh')}`,
    '- MatchPoint · Co-founder / 联合创始人',
    '- AGI Villa · Co-founder / 联合创始人',
    '- Datawhale · Head of City Ecosystem / 城市生态负责人',
    '- n8n · Ambassador',
    '- Podcast: 《重新组织》 / Re:Organize · Host',
    '- Site purpose: bilingual zh/en public archive hub for writing, the podcast entrance, projects, about, and collaboration',
    `Canonical website: ${siteUrl}`,
    `Primary contact: ${contactEmail}`,
    '',
    '## Main pages',
    '',
    `- [English home](${siteUrl}/en)`,
    `- [中文首页](${siteUrl}/zh)`,
    `- [Writing](${siteUrl}/en/blog)`,
    `- [文章](${siteUrl}/zh/blog)`,
    `- [Podcast Re:Organize / 《重新组织》](${siteUrl}/en/podcast)`,
    `- [播客《重新组织》 / Re:Organize](${siteUrl}/zh/podcast)`,
    `- [Projects](${siteUrl}/en/projects)`,
    `- [项目](${siteUrl}/zh/projects)`,
    `- [About Darren](${siteUrl}/en/about)`,
    `- [关于苏鹏](${siteUrl}/zh/about)`,
    `- [Collaborate](${siteUrl}/en/services)`,
    `- [合作](${siteUrl}/zh/services)`,
    '',
    '## Case studies',
    '',
    'Individual case studies remain at their current `/work/[slug]` URLs. The projects index is `/projects`; `/work` without a slug redirects there.',
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
    `- [RSS summaries, Chinese and English](${siteUrl}/rss.xml)`,
    ...sourceFiles,
    '',
    '## Public profiles',
    '',
    ...personProfileLinks.map(([label, href]) => `- ${label}: ${href}`),
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
