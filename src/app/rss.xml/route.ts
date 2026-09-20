import { locales } from '@/i18n/config';
import { compareBlogPosts, getAllPosts } from '@/lib/blog';
import { rssPath, siteUrl } from '@/lib/site-config';

export const dynamic = 'force-static';
export const revalidate = false;
export const runtime = 'nodejs';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const items = locales
    .flatMap((locale) =>
      getAllPosts(locale).map((post) => ({ locale, post }))
    )
    .sort((a, b) => compareBlogPosts(a.post, b.post))
    .map(({ locale, post }) => {
      const url = `${siteUrl}/${locale}/blog/${post.slug}`;
      return [
        '<item>',
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${escapeXml(url)}</link>`,
        `<guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `<description>${escapeXml(post.description)}</description>`,
        ...post.authors.map((author) => `<dc:creator>${escapeXml(author)}</dc:creator>`),
        ...post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`),
        ...(post.date ? [`<pubDate>${new Date(`${post.date}T00:00:00+08:00`).toUTCString()}</pubDate>`] : []),
        `<dc:language>${locale === 'zh' ? 'zh-CN' : 'en'}</dc:language>`,
        '</item>',
      ].join('');
    })
    .join('');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">',
    '<channel>',
    '<title>Darren Su — Writing / 文章</title>',
    `<link>${escapeXml(siteUrl)}</link>`,
    `<atom:link href="${escapeXml(`${siteUrl}${rssPath}`)}" rel="self" type="application/rss+xml" />`,
    '<description>Writing on China AI ecosystems, products, communities, and practice.</description>',
    items,
    '</channel>',
    '</rss>',
  ].join('');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
