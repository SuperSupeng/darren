import { getTranslations } from 'next-intl/server';
import { getPostsBySection } from '@/lib/blog';
import { getSiteContent } from '@/lib/siteContent';
import JsonLd from '@/components/JsonLd';
import { ArticleIndex, FeaturedArticle } from '@/components/spatial/ArticleIndex';
import { CollectionHero, CollectionHeading, CollectionNext } from '@/components/spatial/Collections';
import { createPageMetadata, fieldNotesStructuredData, getPageKeywords } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'fieldNotes' });

  return createPageMetadata({
    locale,
    path: '/field-notes',
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: getPageKeywords(locale, 'blog'),
  });
}

export default async function FieldNotesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const site = getSiteContent(locale);
  const posts = getPostsBySection(locale, 'field-notes');
  const featured = posts[0];
  const copy = locale === 'zh'
    ? { title: '手记', read: '阅读手记', index: '全部手记', featured: '一篇现场记录' }
    : { title: 'Field Notes', read: 'Read the note', index: 'All field notes', featured: 'A field record' };

  return (
    <>
      <JsonLd data={fieldNotesStructuredData(posts, locale)} />
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
            <p>{site.fieldNotes.sidebarQuote}</p>
          </div>

          {featured ? (
            <FeaturedArticle post={featured} locale={locale} eyebrow={copy.featured} readLabel={copy.read} />
          ) : null}

          <section className="collection-section collection-journal-index" id="notes-index">
            <CollectionHeading title={copy.index} description={site.fieldNotes.recentDescription} />
            <ArticleIndex posts={posts} locale={locale} empty={site.fieldNotes.empty} readLabel={copy.read} />
          </section>

          <CollectionNext
            href="/blog"
            title={locale === 'zh' ? '去读长文' : 'Read the essays'}
            description={locale === 'zh' ? '项目、产品和使用 AI 的长文归档。' : 'The longer archive of essays on projects, products, and using AI.'}
          />
        </div>
      </main>
    </>
  );
}
