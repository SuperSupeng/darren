import { locales } from '@/i18n/config';
import { getAllPosts } from '@/lib/blog';
import { siteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const items = locales
    .flatMap((locale) =>
      getAllPosts(locale).map((post) => ({ locale, post }))
    )
    .sort(
      (a, b) =>
        new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
    )
    .map(({ locale, post }) => {
      const url = `${siteUrl}/${locale}/blog/${post.slug}`;
      return [
        '<item>',
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        `<description>${escapeXml(post.description)}</description>`,
        `<pubDate>${new Date(`${post.date}T00:00:00+08:00`).toUTCString()}</pubDate>`,
        `<dc:language>${locale === 'zh' ? 'zh-CN' : 'en'}</dc:language>`,
        '</item>',
      ].join('');
    })
    .join('');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '<channel>',
    '<title>Darren Su — Field Notes / 手记</title>',
    `<link>${siteUrl}</link>`,
    '<description>Field notes on China AI ecosystems, products, communities, global technology connections, and long-term practice.</description>',
    '<language>en</language>',
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
