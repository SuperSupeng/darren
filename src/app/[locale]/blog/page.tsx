import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllPosts } from '@/lib/blog';
import { getSiteContent } from '@/lib/siteContent';
import JsonLd from '@/components/JsonLd';
import ArticleDate from '@/components/blog/ArticleDate';
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
  const featured = posts.find((post) => post.date)
    ?? posts.find((post) => post.slug === 'superai-china-ecosystem-visit')
    ?? posts[0];
  const labels = site.labels.fieldNotes;
  const copy = locale === 'zh'
    ? { title: '文章与手记', read: '阅读全文', index: '全部文章', featured: '精选文章' }
    : { title: 'Writing', read: 'Read the article', index: 'All articles', featured: 'Featured writing' };

  return (
    <>
      <JsonLd data={blogStructuredData(posts, locale)} />
      <main id="main-content" tabIndex={-1} className="collection-page collection-notes">
        <div className="collection-container">
          <CollectionHero
            locale={locale}
            zone="notes"
            title={copy.title}
            lead={site.fieldNotes.hero.title}
            description={site.fieldNotes.hero.subtitle}
          >
            <a className="collection-text-link" href="#notes-index">{copy.index} <span aria-hidden="true">↓</span></a>
          </CollectionHero>

          <div className="collection-note-strip">
            <p>{labels.sidebarQuote}</p>
          </div>

          {featured ? (
            <section className="collection-section collection-latest">
              <div className="collection-journal-masthead">
                <p>{copy.featured}</p>
                <ArticleDate post={featured} locale={locale} />
              </div>
              <article className="collection-latest-story">
                <Link href={`/blog/${featured.slug}`} className="collection-latest-image" aria-label={`${copy.read} · ${featured.title}`}>
                  <Image src={featured.image.url} alt="" fill sizes="(min-width: 950px) 58vw, 100vw" />
                </Link>
                <div className="collection-latest-copy">
                  <h2><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2>
                  <p className="collection-description">{featured.description}</p>
                  <Link href={`/blog/${featured.slug}`} className="collection-text-link">{copy.read} <span aria-hidden="true">↗</span></Link>
                </div>
              </article>
            </section>
          ) : null}

          <section className="collection-section collection-journal-index" id="notes-index">
            <CollectionHeading title={copy.index} description={labels.recentDescription} />
            {posts.length > 0 ? (
              <div className="collection-notes-list">
                {posts.map((post) => (
                  <article key={post.slug} className="collection-note-entry">
                    <div className="collection-note-date">
                      <ArticleDate post={post} locale={locale} />
                    </div>
                    <div className="collection-note-body">
                      <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                      <p className="collection-description">{post.description}</p>
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
            href="/work"
            title={locale === 'zh' ? '查看工作案例' : 'Explore my work'}
            description={locale === 'zh' ? '开发者活动、产品 Workshop 与 AI 分享的项目记录。' : 'Project records from developer events, product workshops, and AI talks.'}
          />
        </div>
      </main>
    </>
  );
}
