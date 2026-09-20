import { getAboutCopy } from './about';
import type { Metadata } from 'next';
import { defaultLocale, isLocale, locales, type Locale } from '@/i18n/config';
import type { BlogPost } from '@/lib/blog';
import { getPortfolio, type PortfolioWork } from '@/lib/portfolio';
import { getSiteContent } from '@/lib/siteContent';
import {
  contactEmail,
  getPersonJobTitle,
  getPersonOccupations,
  personAffiliations,
  personAlternateNames,
  personName,
  personSameAs,
  rssPath,
  siteUrl,
} from '@/lib/site-config';
export { siteUrl } from '@/lib/site-config';

type KeywordGroup = 'home' | 'services' | 'work' | 'blog' | 'about';

const pageKeywords: Record<Locale, Record<KeywordGroup, string[]>> = {
  en: {
    home: [
      'Darren Su',
      'MatchPoint Co-founder',
      'AGI Villa Co-founder',
      'Head of City Ecosystem at Datawhale',
      'n8n Ambassador',
      'Re:Organize',
      'AI agents and automation',
      'China AI ecosystem',
      'China developer community',
      'AI developer ecosystem programs',
      'AI product workshop China',
      'AI agent speaker',
      'multi-agent organization',
      'AGI Villa',
      'Datawhale',
      'MatchPoint',
      'GlobalTechEvents',
    ],
    services: [
      'AI developer events China',
      'developer ecosystem program',
      'AI product workshop China',
      'China early user feedback',
      'AI agent keynote speaker',
      'multi-agent workshop',
    ],
    work: [
      'AI developer ecosystem case studies',
      'China developer community programs',
      'developer community workshop',
      'global AI ecosystem partnership',
      'WAIC side event',
      'Datawhale city ecosystem',
    ],
    blog: [
      'AI agent writing',
      'developer ecosystems',
      'multi-agent organization',
      'product building',
      'global tech ecosystem',
    ],
    about: [
      'Darren Su',
      '苏鹏',
      'AGI Villa',
      'Datawhale',
      'MatchPoint',
      'MatchPoint Co-founder',
      'GlobalTechEvents',
      'Head of City Ecosystem at Datawhale',
      'n8n Ambassador',
      'Re:Organize',
      '《重新组织》',
      'global AI communities',
      'multi-agent organization',
    ],
  },
  zh: {
    home: [
      '苏鹏',
      'Darren Su',
      'MatchPoint 联合创始人',
      'AGI Villa 联合创始人',
      'Datawhale 城市生态负责人',
      'n8n Ambassador',
      '《重新组织》',
      'Re:Organize',
      'Agent 与自动化',
      'AI 开发者生态',
      'AI 开发者活动',
      'AI 产品 Workshop',
      'Agent 分享',
      '多 Agent 数字组织',
      'AGI Villa',
      'Datawhale',
      'MatchPoint',
      'GlobalTechEvents',
    ],
    services: [
      'AI 开发者活动',
      '开发者生态项目',
      'AI 产品 Workshop',
      '早期用户反馈',
      'AI Agent 分享',
      '多 Agent 工作坊',
    ],
    work: [
      'AI 生态项目案例',
      '开发者社区活动',
      '多城市联动活动',
      '全球科技生态合作',
      'WAIC 官方夜场',
      'Datawhale 城市生态',
    ],
    blog: [
      'AI Agent 文章',
      '多 Agent 数字组织',
      '产品创造',
      '开发者生态',
      '长期做事',
      '全球科技生态',
    ],
    about: [
      'Darren Su',
      '苏鹏',
      'AGI Villa',
      'Datawhale',
      'MatchPoint',
      'MatchPoint 联合创始人',
      'GlobalTechEvents',
      'Datawhale 城市生态负责人',
      'n8n Ambassador',
      '《重新组织》',
      'Re:Organize',
      '全球 AI 社区',
      '多 Agent 数字组织',
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
      'application/rss+xml': `${siteUrl}${rssPath}`,
      ...(/^\/(?:blog|work)\/[^/]+$/.test(path)
        ? { 'text/markdown': absoluteLocalizedUrl(locale, `${path}/source.md`) }
        : {}),
    },
  };
}

export function getPageKeywords(locale: string, group: KeywordGroup) {
  const safeLocale = isLocale(locale) ? locale : defaultLocale;
  return pageKeywords[safeLocale][group];
}

const areaServed = ['China'];

function isSiteAuthor(name: string) {
  return name === personName || name === '苏鹏' || name === 'Darren' || name === 'Darren Su / 苏鹏';
}

export function createPageMetadata({
  locale,
  path = '/',
  title,
  description,
  keywords = [],
  image = '/og-image-v2.png',
  imageWidth = 1200,
  imageHeight = 630,
  imageAlt,
  availableLocales = locales,
  openGraphType = 'website',
  publishedTime,
  modifiedTime,
  authors = [personName],
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
  modifiedTime?: string;
  authors?: string[];
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
    authors: authors.map((name) => ({ name, ...(isSiteAuthor(name) ? { url: siteUrl } : {}) })),
    creator: authors.join(', '),
    metadataBase: new URL(siteUrl),
    alternates: buildAlternates(locale, path, availableLocales),
    openGraph:
      openGraphType === 'article'
        ? {
            ...commonOpenGraph,
            type: 'article',
            ...(publishedTime ? { publishedTime } : {}),
            ...(modifiedTime ? { modifiedTime } : {}),
            authors: authors.map((name) => isSiteAuthor(name) ? `${siteUrl}/${locale}/about` : name),
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
    name: personName,
    alternateName: [...personAlternateNames],
    url: absoluteLocalizedUrl(locale, '/about'),
    mainEntityOfPage: `${absoluteLocalizedUrl(locale, '/about')}#profile`,
    image: `${siteUrl}/photo.jpg`,
    email: contactEmail,
    jobTitle: getPersonJobTitle(locale),
    homeLocation: {
      '@type': 'City',
      name: locale === 'zh' ? '杭州' : 'Hangzhou',
    },
    affiliation: personAffiliations.map((name) => ({ '@type': 'Organization', name })),
    hasOccupation: getPersonOccupations(locale).map((name) => ({
      '@type': 'Occupation',
      name,
    })),
    sameAs: [...personSameAs],
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
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: 'Darren Su / 苏鹏',
        inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
        isPartOf: { '@id': `${siteUrl}/#website` },
        mainEntity: { '@id': `${siteUrl}/#person` },
      },
      {
        '@type': 'Service',
        '@id': `${siteUrl}/#service`,
        name: site.seo.home.professionalServiceName,
        url: absoluteLocalizedUrl(locale, '/services'),
        areaServed,
        serviceType: site.seo.home.serviceTypes,
        provider: { '@id': `${siteUrl}/#person` },
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
        description: getAboutCopy(locale).description,
        isPartOf: { '@id': `${siteUrl}/#website` },
        mainEntity: { '@id': `${siteUrl}/#person` },
      },
      breadcrumbNode(locale, '/about', name),
    ],
  };
}

export function servicesStructuredData(locale: string) {
  const site = getSiteContent(locale);
  const { collaborations } = getPortfolio(locale);
  const pageName = site.seo.services.listName;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name: pageName,
        url: absoluteLocalizedUrl(locale, '/services'),
        itemListElement: collaborations.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Service',
            '@id': absoluteLocalizedUrl(locale, `/services#${item.id}`),
            url: absoluteLocalizedUrl(locale, `/services#${item.id}`),
            name: item.title,
            description: item.description,
            provider: { '@id': `${siteUrl}/#person` },
            areaServed,
            availableChannel: {
              '@type': 'ServiceChannel',
              serviceUrl: absoluteLocalizedUrl(locale, `/services#${item.id}`),
              availableLanguage: ['English', 'Chinese'],
            },
          },
        })),
      },
      personNode(locale),
      breadcrumbNode(locale, '/services', pageName),
    ],
  };
}

export function workStructuredData(locale: string) {
  const { work } = getPortfolio(locale);
  const name = locale === 'zh' ? 'Darren Su 的项目' : 'Darren Su Projects';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name,
        url: absoluteLocalizedUrl(locale, '/projects'),
        itemListElement: work.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            name: item.title,
            description: item.summary,
            creator: { '@id': `${siteUrl}/#person` },
            url: absoluteLocalizedUrl(locale, `/work/${item.id}`),
          },
        })),
      },
      personNode(locale),
      breadcrumbNode(locale, '/projects', name),
    ],
  };
}

export function workCaseStructuredData(work: PortfolioWork, locale: string) {
  const url = absoluteLocalizedUrl(locale, `/work/${work.id}`);
  const workIndexName = locale === 'zh' ? '项目' : 'Projects';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${url}#case-study`,
        url,
        mainEntityOfPage: url,
        name: work.title,
        description: work.summary,
        image: work.image ? `${siteUrl}${work.image}` : undefined,
        creator: { '@id': `${siteUrl}/#person` },
        contentLocation: { '@type': 'Place', name: work.location },
        inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
        isPartOf: { '@id': `${siteUrl}/#website` },
        citation: work.caseStudy.materials?.map((material) => ({
          '@type': 'CreativeWork',
          name: material.title,
          description: material.description,
          url: material.href.startsWith('/')
            ? absoluteLocalizedUrl(locale, material.href)
            : material.href,
        })),
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
            name: workIndexName,
            item: absoluteLocalizedUrl(locale, '/projects'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: work.title,
            item: url,
          },
        ],
      },
    ],
  };
}

function articleAuthors(post: BlogPost, locale: string) {
  return post.authors.map((name) => ({
    '@type': 'Person',
    name,
    ...(isSiteAuthor(name) ? {
      '@id': `${siteUrl}/#person`,
      url: absoluteLocalizedUrl(locale, '/about'),
    } : {}),
  }));
}

export function articleStructuredData(post: BlogPost, locale: string) {
  const listPath = '/blog';
  const url = absoluteLocalizedUrl(locale, `/blog/${post.slug}`);
  const blogName = locale === 'zh' ? '文章' : 'Writing';

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
        ...(post.date ? { datePublished: post.date } : {}),
        ...(post.dateModified ? { dateModified: post.dateModified } : {}),
        author: articleAuthors(post, locale),
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
            item: absoluteLocalizedUrl(locale, listPath),
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
  const name = locale === 'zh' ? 'Darren Su 的文章' : 'Darren Su Writing';

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
          ...(post.date ? { datePublished: post.date } : {}),
          ...(post.dateModified ? { dateModified: post.dateModified } : {}),
          url: absoluteLocalizedUrl(locale, `/blog/${post.slug}`),
          image: `${siteUrl}${post.image.url}`,
          author: articleAuthors(post, locale),
        })),
      },
      personNode(locale),
      breadcrumbNode(locale, '/blog', name),
    ],
  };
}

export function projectsStructuredData(locale: string) {
  const site = getSiteContent(locale);
  const { work } = getPortfolio(locale);
  const name = locale === 'zh' ? '项目' : 'Projects';
  const digitalOrganization = site.products.digitalOrganization;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name,
        url: absoluteLocalizedUrl(locale, '/projects'),
        itemListElement: [
          ...site.products.items.map((project, index) => ({
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
          {
            '@type': 'ListItem',
            position: site.products.items.length + 1,
            item: {
              '@type': 'CreativeWork',
              name: digitalOrganization.title,
              description: digitalOrganization.description,
              url: digitalOrganization.href
                ? absoluteLocalizedUrl(locale, digitalOrganization.href)
                : absoluteLocalizedUrl(locale, '/projects'),
              creator: { '@id': `${siteUrl}/#person` },
            },
          },
          ...work.map((item, index) => ({
            '@type': 'ListItem',
            position: site.products.items.length + 2 + index,
            item: {
              '@type': 'CreativeWork',
              name: item.title,
              description: item.summary,
              creator: { '@id': `${siteUrl}/#person` },
              url: absoluteLocalizedUrl(locale, `/work/${item.id}`),
            },
          })),
        ],
      },
      personNode(locale),
      breadcrumbNode(locale, '/projects', name),
    ],
  };
}
