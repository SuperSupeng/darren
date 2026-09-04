import { MetadataRoute } from 'next';
import { defaultLocale, locales } from '@/i18n/config';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.darren-su.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseRoutes = [
    '',
    '/work',
    '/services',
    '/build',
    '/about',
    '/blog',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const route of baseRoutes) {
    const languages = Object.fromEntries(
      locales.map((locale) => [locale, `${baseUrl}/${locale}${route}`])
    );
    languages['x-default'] = `${baseUrl}/${defaultLocale}${route}`;

    for (const locale of locales) {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        changeFrequency: route === '' || route === '/blog' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
        alternates: { languages },
      });
    }
  }

  for (const locale of locales) {
    for (const post of getAllPosts(locale)) {
      const route = `/blog/${post.slug}`;
      const availableLocales = locales.filter((item) => getPostBySlug(post.slug, item));
      const languages = Object.fromEntries(
        availableLocales.map((item) => [item, `${baseUrl}/${item}${route}`])
      );

      if (availableLocales.length > 1) {
        const fallbackLocale = availableLocales.includes(defaultLocale)
          ? defaultLocale
          : availableLocales[0];
        languages['x-default'] = `${baseUrl}/${fallbackLocale}${route}`;
      }

      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: post.date,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: { languages },
      });
    }
  }

  return sitemap;
}
