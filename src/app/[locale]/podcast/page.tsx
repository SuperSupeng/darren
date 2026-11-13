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
    keywords: ['《重新组织》', 'Re:Organize', 'podcast', 'Darren Su'],
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
            zone="notes"
            title={locale === 'zh' ? '播客' : 'Podcast'}
            lead={site.podcast.hero.title}
            description={site.podcast.hero.subtitle}
          >
            <a className="collection-text-link" href={site.podcast.listenUrl} target="_blank" rel="noopener noreferrer">{site.podcast.listenCta} <span aria-hidden="true">↗</span></a>
          </CollectionHero>
          <section className="collection-section" aria-labelledby="podcast-listen-title">
            <h2 id="podcast-listen-title">{site.podcast.listen}</h2>
            <p className="collection-description">{site.podcast.summary}</p>
            <a className="collection-text-link" href={site.podcast.listenUrl} target="_blank" rel="noopener noreferrer">
              {site.podcast.listenCta} <span aria-hidden="true">↗</span>
            </a>
          </section>
          <CollectionNext
            href="/blog"
            title={locale === 'zh' ? '继续阅读文章' : 'Continue with my writing'}
            description={locale === 'zh' ? '关于 AI、产品和社区的文章，以及工作之外的生活记录。' : 'Writing about AI, products, and communities, along with life outside work.'}
          />
        </div>
      </main>
    </>
  );
}
