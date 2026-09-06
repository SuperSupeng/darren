import { locales } from '@/i18n/config';
import { getAllPosts } from '@/lib/blog';
import { renderMarkdown } from '@/lib/render-markdown';
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

// The shared renderer escapes attributes. Decode once before resolving them,
// then escape the resolved URL for its HTML attribute and the enclosing XML.
function renderFeedContent(content: string, title: string, locale: string, articleUrl: string) {
  return renderMarkdown(content, title, locale).replace(/\s(href|src)="([^"]*)"/g, (_, attribute: string, encodedUrl: string) => {
    const rawUrl = encodedUrl
      .replace(/&#96;/g, '`')
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<')
      .replace(/&amp;/g, '&');

    try {
      const url = new URL(rawUrl, articleUrl);
      const safeProtocol = url.protocol === 'https:' || url.protocol === 'http:'
        || (attribute === 'href' && url.protocol === 'mailto:');
      return safeProtocol ? ` ${attribute}="${escapeXml(url.href)}"` : '';
    } catch {
      return '';
    }
  });
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
        `<link>${escapeXml(url)}</link>`,
        `<guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `<description>${escapeXml(post.description)}</description>`,
        `<content:encoded>${escapeXml(renderFeedContent(post.content, post.title, locale, url))}</content:encoded>`,
        '<dc:creator>Darren Su</dc:creator>',
        ...post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`),
        `<pubDate>${new Date(`${post.date}T00:00:00+08:00`).toUTCString()}</pubDate>`,
        `<dc:language>${locale === 'zh' ? 'zh-CN' : 'en'}</dc:language>`,
        '</item>',
      ].join('');
    })
    .join('');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">',
    '<channel>',
    '<title>Darren Su — Field Notes / 手记</title>',
    `<link>${escapeXml(siteUrl)}</link>`,
    `<atom:link href="${escapeXml(`${siteUrl}/rss.xml`)}" rel="self" type="application/rss+xml" />`,
    '<description>Field notes on China AI ecosystems, products, communities, global technology connections, and long-term practice.</description>',
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
