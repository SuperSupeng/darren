import type { Metadata } from 'next';
import { defaultLocale, isLocale, locales, type Locale } from '@/i18n/config';
import type { BlogPost } from '@/lib/blog';
import { getSiteContent } from '@/lib/siteContent';

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.darren-su.com';

type KeywordGroup = 'home' | 'services' | 'work' | 'blog' | 'about';

const pageKeywords: Record<Locale, Record<KeywordGroup, string[]>> = {
  en: {
    home: [
      'China AI ecosystem',
      'China robotics ecosystem',
      'China supply chain',
      'AI builder community China',
      'China developer community',
      'AI ecosystem briefing',
      'China partner discovery',
      'focused China pilot',
      'AGI Villa',
      'Datawhale',
      'Product Lab',
    ],
    services: [
      'China AI ecosystem briefing',
      'China robotics field visit',
      'China supply chain network',
      'China local partner discovery',
      'AI builder community China',
      'focused China pilot',
      'China technology delegation',
    ],
    work: [
      'China AI case studies',
      'AI builder community activation',
      'China robotics field visit',
      'China ecosystem briefing',
      'developer community workshop',
      'supply chain field visit',
    ],
    blog: [
      'AI field notes',
      'China tech ecosystem',
      'China robotics ecosystem',
      'community building',
      'global tech ecosystem',
    ],
    about: [
      'Darren Su',
      'AGI Villa',
      'Datawhale',
      'AI builder community',
      'community operator',
      'Zen practitioner',
    ],
  },
  zh: {
    home: [
      '中国团队出海',
      '出海策略',
      '海外种子用户',
      'AI 产品出海',
      '机器人出海',
      '硬件出海',
      '开发者工具出海',
      '海外渠道验证',
      '海外反馈验证',
      '低成本出海验证',
      'AGI Villa',
      'Datawhale',
      'Product Lab',
    ],
    services: [
      '出海咨询',
      '出海第一步判断',
      '海外用户与渠道梳理',
      '低成本海外反馈试点',
      'AI 产品出海',
      '机器人硬件出海',
      '海外种子用户',
      '开发者社区出海',
    ],
    work: [
      '出海案例',
      '出海策略验证',
      '海外用户反馈',
      'AI 产品出海',
      '机器人硬件出海',
      '开发者工具出海',
      '海外活动反馈试点',
    ],
    blog: [
      '出海手记',
      '产品实验',
      '海外科技生态',
      '开发者社区',
      '长期做事',
      '跨境科技连接',
    ],
    about: [
      'Darren Su',
      '苏鹏',
      'AGI Villa',
      'Datawhale',
      'AI 创作者社区',
      '社区建设者',
      '禅修',
    ],
  },
};

const openGraphLocales: Record<Locale, string> = {
  en: 'en_US',
  zh: 'zh_CN',
};

export function localizedPath(locale: string, path = '/') {
  const route = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${route}`;
}

export function absoluteLocalizedUrl(locale: string, path = '/') {
  return `${siteUrl}${localizedPath(locale, path)}`;
}

export function buildAlternates(
  locale: string,
  path = '/',
  availableLocales: readonly string[] = locales
): NonNullable<Metadata['alternates']> {
  const languages = Object.fromEntries(
    availableLocales.map((item) => [item, localizedPath(item, path)])
  );

  if (availableLocales.length > 1) {
    const fallbackLocale = availableLocales.includes(defaultLocale)
      ? defaultLocale
      : availableLocales[0];
    languages['x-default'] = localizedPath(fallbackLocale, path);
  }

  return {
    canonical: localizedPath(locale, path),
    languages,
    types: {
      'application/rss+xml': `${siteUrl}/rss.xml`,
    },
  };
}

export function getPageKeywords(locale: string, group: KeywordGroup) {
  const safeLocale = isLocale(locale) ? locale : defaultLocale;
  return pageKeywords[safeLocale][group];
}

function getAreaServed(locale: string) {
  return locale === 'zh' ? ['China', 'North America', 'Europe', 'Asia', 'Global'] : ['China', 'Asia'];
}

export function createPageMetadata({
  locale,
  path = '/',
  title,
  description,
  keywords = [],
  image = '/og-image.png',
  imageWidth = 1200,
  imageHeight = 630,
  imageAlt,
  availableLocales = locales,
  openGraphType = 'website',
  publishedTime,
}: {
  locale: string;
  path?: string;
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  availableLocales?: readonly string[];
  openGraphType?: 'website' | 'article';
  publishedTime?: string;
}): Metadata {
  const site = getSiteContent(locale);
  const commonOpenGraph = {
    locale: openGraphLocales[locale as Locale] ?? locale,
    url: localizedPath(locale, path),
    siteName: 'Darren Su',
    title,
    description,
    images: [
      {
        url: image,
        width: imageWidth,
        height: imageHeight,
        alt: imageAlt ?? site.seo.ogImageAlt,
      },
    ],
  };

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Darren Su', url: siteUrl }],
    creator: 'Darren Su',
    metadataBase: new URL(siteUrl),
    alternates: buildAlternates(locale, path, availableLocales),
    openGraph:
      openGraphType === 'article'
        ? {
            ...commonOpenGraph,
            type: 'article',
            publishedTime,
            authors: [`${siteUrl}/${locale}/about`],
          }
        : {
            ...commonOpenGraph,
            type: 'website',
          },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@zenshipai',
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

function personNode(locale: string) {
  const site = getSiteContent(locale);

  return {
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: 'Darren Su',
    alternateName: '苏鹏',
    url: absoluteLocalizedUrl(locale, '/about'),
    image: `${siteUrl}/photo.jpg`,
    email: 'supeng842499467@gmail.com',
    jobTitle: site.seo.home.jobTitle,
    homeLocation: {
      '@type': 'City',
      name: locale === 'zh' ? '杭州' : 'Hangzhou',
    },
    affiliation: [
      { '@type': 'Organization', name: 'AGI Villa' },
      { '@type': 'Organization', name: 'Datawhale' },
    ],
    hasOccupation: [
      {
        '@type': 'Occupation',
        name: locale === 'zh' ? 'AGI Villa 联合创始人' : 'AGI Villa Co-founder',
      },
      {
        '@type': 'Occupation',
        name: locale === 'zh' ? 'Datawhale 城市负责人' : 'Datawhale City Lead',
      },
    ],
    sameAs: [
      'https://x.com/zenshipai',
      'https://www.instagram.com/0xdarren_su',
      'https://www.linkedin.com/in/darrenzenshipai',
      'https://github.com/SuperSupeng',
    ],
    knowsAbout: site.seo.home.knowsAbout,
    knowsLanguage: ['zh-CN', 'en'],
  };
}

function breadcrumbNode(locale: string, path: string, name: string) {
  const homeName = locale === 'zh' ? '首页' : 'Home';
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeName,
        item: absoluteLocalizedUrl(locale),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name,
        item: absoluteLocalizedUrl(locale, path),
      },
    ],
  };
}

export function homeStructuredData(locale: string) {
  const site = getSiteContent(locale);
  const url = absoluteLocalizedUrl(locale);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      personNode(locale),
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'Darren Su',
        alternateName: 'Darren Su / 苏鹏',
        url: siteUrl,
        inLanguage: ['en', 'zh-CN'],
        publisher: { '@id': `${siteUrl}/#person` },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${siteUrl}/#service`,
        name: site.seo.home.professionalServiceName,
        url,
        image: `${siteUrl}/images/hero-longjing-mist.jpg`,
        email: 'supeng842499467@gmail.com',
        areaServed: getAreaServed(locale),
        availableLanguage: ['English', 'Chinese'],
        serviceType: site.seo.home.serviceTypes,
        founder: { '@id': `${siteUrl}/#person` },
      },
    ],
  };
}

export function aboutStructuredData(locale: string) {
  const name = locale === 'zh' ? '关于 Darren Su / 苏鹏' : 'About Darren Su / 苏鹏';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personNode(locale),
      {
        '@type': 'ProfilePage',
        '@id': `${absoluteLocalizedUrl(locale, '/about')}#profile`,
        url: absoluteLocalizedUrl(locale, '/about'),
        name,
        inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
        mainEntity: { '@id': `${siteUrl}/#person` },
      },
      breadcrumbNode(locale, '/about', name),
    ],
  };
}

export function servicesStructuredData(locale: string) {
  const site = getSiteContent(locale);
  const pageName = site.seo.services.listName;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name: pageName,
        url: absoluteLocalizedUrl(locale, '/services'),
        itemListElement: site.serviceItems.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Service',
            name: item.title,
            description: item.short,
            provider: { '@id': `${siteUrl}/#person` },
            areaServed: getAreaServed(locale),
            availableLanguage: ['English', 'Chinese'],
          },
        })),
      },
      personNode(locale),
      breadcrumbNode(locale, '/services', pageName),
    ],
  };
}

export function articleStructuredData(post: BlogPost, locale: string) {
  const url = absoluteLocalizedUrl(locale, `/blog/${post.slug}`);
  const blogName = locale === 'zh' ? '手记' : 'Field Notes';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        mainEntityOfPage: url,
        url,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        author: { '@id': `${siteUrl}/#person` },
        publisher: { '@id': `${siteUrl}/#person` },
        image: `${siteUrl}${post.image.url}`,
        keywords: post.tags.join(', '),
        inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
        isPartOf: { '@id': `${siteUrl}/#website` },
      },
      personNode(locale),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: locale === 'zh' ? '首页' : 'Home',
            item: absoluteLocalizedUrl(locale),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: blogName,
            item: absoluteLocalizedUrl(locale, '/blog'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: url,
          },
        ],
      },
    ],
  };
}

export function blogStructuredData(posts: BlogPost[], locale: string) {
  const url = absoluteLocalizedUrl(locale, '/blog');
  const name = locale === 'zh' ? 'Darren Su 的手记' : 'Darren Su Field Notes';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${url}#blog`,
        name,
        url,
        inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
        author: { '@id': `${siteUrl}/#person` },
        blogPost: posts.map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          url: absoluteLocalizedUrl(locale, `/blog/${post.slug}`),
          image: `${siteUrl}${post.image.url}`,
          author: { '@id': `${siteUrl}/#person` },
        })),
      },
      personNode(locale),
      breadcrumbNode(locale, '/blog', name),
    ],
  };
}

export function productLabStructuredData(locale: string) {
  const site = getSiteContent(locale);
  const name = locale === 'zh' ? '产品实验室' : 'Product Lab';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name,
        url: absoluteLocalizedUrl(locale, '/build'),
        itemListElement: site.products.items.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            name: project.name,
            description: project.description,
            url:
              project.status === 'stopped' || project.status === '已停止'
                ? undefined
                : project.url,
            creator: { '@id': `${siteUrl}/#person` },
            keywords: project.tags.join(', '),
          },
        })),
      },
      personNode(locale),
      breadcrumbNode(locale, '/build', name),
    ],
  };
}
