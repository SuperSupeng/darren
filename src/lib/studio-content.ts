import 'server-only';

import type { StudioContent } from '@/components/studio/types';
import { getAllPosts } from '@/lib/blog';
import { getFeaturedWork } from '@/lib/portfolio';
import { getSiteContent } from '@/lib/siteContent';

// Keep filesystem access and full content records on the server. The room only
// needs a small set of localized, serializable cards.
export function getStudioContent(locale: string): StudioContent {
  const site = getSiteContent(locale);
  const liveStatus = locale === 'zh' ? '运行中' : 'live';

  return {
    work: getFeaturedWork(locale).slice(0, 3).map((item) => ({
      id: item.id,
      title: item.title,
      description: item.heroSummary ?? item.summary,
      image: item.image ?? '/og-image.png',
      href: item.href ?? `/work/${item.id}`,
      meta: `${item.year} · ${item.location}`,
    })),
    build: site.products.items.filter((item) => item.status === liveStatus).slice(0, 3).map((item) => ({
      id: item.id,
      title: item.name,
      description: item.description,
      image: item.image,
      href: item.url,
      external: true,
      meta: item.tagline,
    })),
    notes: getAllPosts(locale).slice(0, 3).map((post) => ({
      id: post.slug,
      title: post.title,
      description: post.description,
      image: post.image.url,
      href: `/blog/${post.slug}`,
      meta: `${post.date} · ${post.readingTime} ${site.labels.fieldNotes.minRead}`,
    })),
  };
}
