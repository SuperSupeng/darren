import { getTranslations } from 'next-intl/server';
import { getAllPosts } from '@/lib/blog';
import { getSeriesCopy, seriesSlugs } from '@/lib/series';
import { getSiteContent } from '@/lib/siteContent';
import { rssPath } from '@/lib/site-config';
import JsonLd from '@/components/JsonLd';
import { Link } from '@/i18n/navigation';
import { ArticleIndex } from '@/components/spatial/ArticleIndex';
import { CollectionHero, CollectionHeading } from '@/components/spatial/Collections';
import { blogStructuredData, createPageMetadata, getPageKeywords } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return createPageMetadata({
    locale,
    path: '/blog',
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: getPageKeywords(locale, 'blog'),
  });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const site = getSiteContent(locale);
  const posts = getAllPosts(locale);
  const labels = site.labels.fieldNotes;
  const copy = locale === 'zh'
    ? { title: '文章', read: '阅读全文', index: '全部文章', featured: '精选文章' }
    : { title: 'Writing', read: 'Read the article', index: 'All articles', featured: 'Featured writing' };

  return (
    <>
      <JsonLd data={blogStructuredData(posts, locale)} />
      <main id="main-content" tabIndex={-1} className="collection-page collection-notes">
        <div className="collection-container">
          <CollectionHero
            zone="notes"
            title={copy.title}
            lead={site.writing.hero.title}
          >
            <div className="collection-hero-actions">
              <Link className="collection-text-link" href="/podcast">{locale === 'zh' ? '播客《重新组织》' : 'Podcast · Re:Organize'} <span aria-hidden="true">→</span></Link>
              <a className="collection-text-link" href={rssPath}>{labels.rssLabel} <span aria-hidden="true">↗</span></a>
            </div>
            <p className="collection-series-row">
              {seriesSlugs.map((slug) => (
                <Link key={slug} href={`/blog/topic/${slug}`}>{getSeriesCopy(slug, locale).name}</Link>
              ))}
            </p>
          </CollectionHero>

          <section className="collection-section collection-journal-index" id="notes-index">
            <CollectionHeading title={copy.index} />
            <ArticleIndex posts={posts} locale={locale} empty={labels.empty} readLabel={copy.read} />
          </section>
        </div>
      </main>
    </>
  );
}
