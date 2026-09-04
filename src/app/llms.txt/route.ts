import { locales } from '@/i18n/config';
import { getAllPosts } from '@/lib/blog';
import { siteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export function GET() {
  const articles = locales.flatMap((locale) =>
    getAllPosts(locale).map(
      (post) =>
        `- [${post.title}](${siteUrl}/${locale}/blog/${post.slug}): ${post.description}`
    )
  );

  const body = [
    '# Darren Su / 苏鹏',
    '',
    '> Darren Su is based in Hangzhou. He is Datawhale City Ecosystem Lead, co-founder of AGI Villa and MatchPoint, and creator of GlobalTechEvents. He initiates AI developer ecosystem programs, builds products, connects global technology networks, speaks about AI and agents, and operates a multi-agent digital organization.',
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
    '',
    '## Published writing',
    '',
    ...articles,
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
