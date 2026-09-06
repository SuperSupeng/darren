import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllPosts } from '@/lib/blog';
import { getSiteContent } from '@/lib/siteContent';
import JsonLd from '@/components/JsonLd';
import { CollectionHero, CollectionHeading, CollectionNext } from '@/components/spatial/Collections';
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
  const latest = posts[0];
  const labels = site.labels.fieldNotes;
  const copy = locale === 'zh'
    ? { title: '窗边的期刊。', read: '阅读这篇手记', index: '全部手记', topics: '这篇文章的话题' }
    : { title: 'Pages by the window.', read: 'Read this field note', index: 'All field notes', topics: 'Topics in this article' };

  return (
    <>
      <JsonLd data={blogStructuredData(posts, locale)} />
      <main id="main-content" tabIndex={-1} className="collection-page collection-notes">
        <div className="collection-container">
          <CollectionHero
            locale={locale}
            zone="notes"
            number="03"
            eyebrow={site.fieldNotes.hero.eyebrow}
            title={copy.title}
            lead={site.fieldNotes.hero.title}
            description={site.fieldNotes.hero.subtitle}
          >
            <a className="collection-text-link" href="#notes-index">{copy.index} <span aria-hidden="true">↓</span></a>
          </CollectionHero>

          <div className="collection-note-strip">
            <p className="collection-kicker">{labels.sidebarEyebrow}</p>
            <p>{labels.sidebarQuote}</p>
          </div>

          {latest ? (
            <section className="collection-section collection-latest">
              <div className="collection-journal-masthead">
                <p className="collection-kicker">{labels.latestEyebrow} / FIELD NOTE</p>
                <time dateTime={latest.date}>{latest.date}</time>
              </div>
              <article className="collection-latest-story">
                <Link href={`/blog/${latest.slug}`} className="collection-latest-image" aria-label={`${copy.read} · ${latest.title}`}>
                  <Image src={latest.image.url} alt="" fill sizes="(min-width: 950px) 58vw, 100vw" />
                </Link>
                <div className="collection-latest-copy">
                  <p className="collection-meta">{latest.readingTime} {labels.minRead}</p>
                  <h2><Link href={`/blog/${latest.slug}`}>{latest.title}</Link></h2>
                  <p className="collection-description">{latest.description}</p>
                  <ul className="collection-tags" aria-label={copy.topics}>{latest.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  <Link href={`/blog/${latest.slug}`} className="collection-text-link">{copy.read} <span aria-hidden="true">↗</span></Link>
                </div>
              </article>
            </section>
          ) : null}

          <section className="collection-section collection-journal-index" id="notes-index">
            <CollectionHeading eyebrow={`${copy.index} / ${String(posts.length).padStart(2, '0')}`} title={labels.recentTitle} description={labels.recentDescription} />
            {posts.length > 0 ? (
              <div className="collection-notes-list">
                {posts.map((post, index) => (
                  <article key={post.slug} className="collection-note-entry">
                    <div className="collection-note-date">
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <time dateTime={post.date}>{post.date}</time>
                      <small>{post.readingTime} {labels.minRead}</small>
                    </div>
                    <div className="collection-note-body">
                      <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                      <p className="collection-description">{post.description}</p>
                      <ul className="collection-tags" aria-label={copy.topics}>{post.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                      <Link href={`/blog/${post.slug}`} className="collection-text-link">{copy.read} <span aria-hidden="true">↗</span></Link>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="collection-note-image" aria-label={`${copy.read} · ${post.title}`}>
                      <Image src={post.image.url} alt="" fill sizes="(max-width: 600px) 100vw, 200px" />
                    </Link>
                  </article>
                ))}
              </div>
            ) : <p className="collection-description">{labels.empty}</p>}
          </section>

          <CollectionNext
            locale={locale}
            zone="work"
            href="/work"
            title={locale === 'zh' ? '回到长桌，看看故事的现场' : 'Back to where the stories began'}
            description={locale === 'zh' ? '开发者活动、城市项目，以及一起做事的人。' : 'Developer gatherings, city programs, and the people who make them happen.'}
          />
        </div>
      </main>
    </>
  );
}
