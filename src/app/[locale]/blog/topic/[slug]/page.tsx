import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import ArticleDate from '@/components/blog/ArticleDate';
import JsonLd from '@/components/JsonLd';
import { getPostsBySeries, type BlogPost } from '@/lib/blog';
import { createPageMetadata, seriesStructuredData } from '@/lib/seo';
import { getSeriesCopy, getSeriesGroupCopy, isSeriesSlug, seriesMetaDescription, seriesSlugs, visibleSeriesGroups } from '@/lib/series';
import '@/components/spatial/collections.css';

function SeriesEntries({ locale, posts, titleTag }: { locale: string; posts: BlogPost[]; titleTag: 'h2' | 'h3' }) {
  const Title = titleTag;
  return posts.map((post) => (
    <article key={post.slug} className="collection-note-entry series-text-entry">
      <div className="collection-note-date">
        <ArticleDate post={post} locale={locale} />
      </div>
      <div className="collection-note-body">
        <Title><Link href={`/blog/${post.slug}`}>{post.title}</Link></Title>
        <p className="collection-description">{post.description}</p>
      </div>
    </article>
  ));
}

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
  const groups = visibleSeriesGroups(slug, posts);
  const ungrouped = posts.filter((post) => !post.seriesGroup);

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
            <>
              {ungrouped.length > 0 ? (
                <div className="collection-notes-list series-text-list">
                  <SeriesEntries locale={locale} posts={ungrouped} titleTag="h2" />
                </div>
              ) : null}
              {groups.map((group) => (
                <section key={group} className="series-group" aria-labelledby={`series-group-${group}`}>
                  <h2 id={`series-group-${group}`}>{getSeriesGroupCopy(group, locale)}</h2>
                  <div className="collection-notes-list series-text-list">
                    <SeriesEntries locale={locale} posts={posts.filter((post) => post.seriesGroup === group)} titleTag="h3" />
                  </div>
                </section>
              ))}
            </>
          )}
        </div>
      </main>
    </>
  );
}
