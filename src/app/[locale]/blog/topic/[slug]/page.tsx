import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import ArticleDate from '@/components/blog/ArticleDate';
import JsonLd from '@/components/JsonLd';
import { getPostsBySeries } from '@/lib/blog';
import { createPageMetadata, seriesStructuredData } from '@/lib/seo';
import { getSeriesCopy, isSeriesSlug, seriesMetaDescription, seriesSlugs } from '@/lib/series';
import '@/components/spatial/collections.css';

export function generateStaticParams() {
  return seriesSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isSeriesSlug(slug)) {
    return {
      title: locale === 'zh' ? '页面未找到' : 'Page not found',
      robots: { index: false, follow: false },
    };
  }

  return createPageMetadata({
    locale,
    path: `/blog/topic/${slug}`,
    title: getSeriesCopy(slug, locale).name,
    description: seriesMetaDescription(slug, locale),
  });
}

export default async function SeriesPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isSeriesSlug(slug)) notFound();

  const copy = getSeriesCopy(slug, locale);
  const posts = getPostsBySeries(locale, slug);

  return (
    <>
      <JsonLd data={seriesStructuredData(slug, locale)} />
      <main id="main-content" tabIndex={-1} className="collection-page collection-notes">
        <div className="collection-container">
          <header className="series-heading">
            <h1>{copy.name}</h1>
            <p className="series-intro">
              {copy.intro.map((part, index) => (
                <Fragment key={part.text}>
                  {index > 0 ? ' ' : null}
                  {part.placeholder ? <em className="series-placeholder">{part.text}</em> : part.text}
                </Fragment>
              ))}
            </p>
          </header>
          {posts.length === 0 ? (
            <p className="collection-description series-empty">{locale === 'zh' ? '暂无' : 'Nothing yet'}</p>
          ) : (
            <div className="collection-notes-list series-text-list">
              {posts.map((post) => (
                <article key={post.slug} className="collection-note-entry series-text-entry">
                  <div className="collection-note-date">
                    <ArticleDate post={post} locale={locale} />
                  </div>
                  <div className="collection-note-body">
                    <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
                    <p className="collection-description">{post.description}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
