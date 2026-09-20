import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import { CollectionHero, CollectionNext } from '@/components/spatial/Collections';
import { createPageMetadata, absoluteLocalizedUrl } from '@/lib/seo';
import { getSiteContent } from '@/lib/siteContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'podcast' });

  return createPageMetadata({
    locale,
    path: '/podcast',
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: ['《重新组织》', 'podcast', 'Darren Su'],
  });
}

export default async function PodcastPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const site = getSiteContent(locale);

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: site.podcast.hero.title,
        description: site.podcast.hero.subtitle,
        url: absoluteLocalizedUrl(locale, '/podcast'),
      }} />
      <main id="main-content" tabIndex={-1} className="collection-page collection-notes collection-podcast">
        <div className="collection-container">
          <CollectionHero
            locale={locale}
            zone="notes"
            title={locale === 'zh' ? '播客' : 'Podcast'}
            lead={site.podcast.hero.title}
            description={site.podcast.hero.subtitle}
            contentHref="#podcast-listen-title"
          />
          <section className="collection-section" aria-labelledby="podcast-listen-title">
            <h2 id="podcast-listen-title">{site.podcast.listen}</h2>
            <p className="collection-description">{site.podcast.summary}</p>
            <p className="collection-description">{site.podcast.listenPending}</p>
          </section>
          <CollectionNext
            href="/about"
            title={locale === 'zh' ? '关于我' : 'About'}
            description={locale === 'zh' ? '一段更完整的个人介绍。' : 'A short page with more of the background.'}
          />
        </div>
      </main>
    </>
  );
}
