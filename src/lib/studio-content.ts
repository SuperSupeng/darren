import 'server-only';

import type { StudioContent } from '@/components/studio/types';
import { getAllPosts } from '@/lib/blog';
import { getFeaturedWork } from '@/lib/portfolio';
import { getSiteContent } from '@/lib/siteContent';

// Editorial selections stay fixed when translations or archive entries are added.
const featuredNotes = {
  zh: ['turning-expertise-into-an-asset', 'managing-31-ai-employees', 'superai-china-ecosystem-visit'],
  en: ['managing-31-ai-employees', 'superai-china-ecosystem-visit', 'zongtong-temple-retreat'],
};

// Keep filesystem access and full content records on the server. The room only
// needs a small set of localized, serializable cards.
export function getStudioContent(locale: string): StudioContent {
  const site = getSiteContent(locale);
  const liveStatus = locale === 'zh' ? '运行中' : 'live';
  const posts = getAllPosts(locale);
  const selectedNotes = featuredNotes[locale === 'en' ? 'en' : 'zh']
    .flatMap((slug) => posts.filter((post) => post.slug === slug));

  return {
    work: getFeaturedWork(locale).map((item) => ({
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
    // Historical records remain available even when their exact publication day is unknown.
    notes: selectedNotes.map((post) => ({
      id: post.slug,
      title: post.title,
      description: post.description,
      image: post.image.url,
      href: `/blog/${post.slug}`,
      meta: [post.date ?? post.dateNote ?? post.archiveYear, `${post.readingTime} ${site.labels.fieldNotes.minRead}`].filter(Boolean).join(' · '),
    })),
  };
}
