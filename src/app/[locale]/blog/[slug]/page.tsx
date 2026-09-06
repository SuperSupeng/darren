import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { locales } from '@/i18n/config';
import JsonLd from '@/components/JsonLd';
import RoomPortal from '@/components/spatial/RoomPortal';
import '@/components/spatial/interiors.css';
import { absoluteLocalizedUrl, articleStructuredData, createPageMetadata } from '@/lib/seo';
import { renderMarkdown } from '@/lib/render-markdown';

export function generateStaticParams({ params }: { params: { locale: string } }) {
  return getAllPosts(params.locale).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    return {
      title: locale === 'zh' ? '页面未找到' : 'Page not found',
      description: locale === 'zh' ? '这个页面不存在，或者暂时没有对应语言的版本。' : 'This page does not exist, or is not yet available in this language.',
      alternates: { canonical: `/${locale}/blog/${slug}` },
      robots: { index: false, follow: false },
    };
  }

  const availableLocales = locales.filter((item) => getPostBySlug(slug, item));
  return createPageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.description,
    keywords: [...post.tags, 'Darren Su', 'field notes'],
    image: post.image.url,
    imageWidth: post.image.width,
    imageHeight: post.image.height,
    imageAlt: post.title,
    availableLocales,
    openGraphType: 'article',
    publishedTime: post.date,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: 'blog' });

  if (!post) {
    notFound();
  }

  const renderedContent = renderMarkdown(post.content, post.title, locale, { responsiveImages: true });
  const shareUrl = absoluteLocalizedUrl(locale, `/blog/${post.slug}`);
  const authorLabel = locale === 'zh' ? '作者' : 'By';

  return (
    <>
      <JsonLd data={articleStructuredData(post, locale)} />
      <main id="main-content" tabIndex={-1} className="interior-page reading-page">
        <div className="interior-wrap">
          <div className="interior-running-line"><Link href="/blog" className="interior-text-link">← {t('backToList')}</Link><span>{locale === 'zh' ? '文章与手记 / WRITING' : 'ARTICLES AND NOTES'}</span></div>
          <div className="reading-layout">
            <aside className="reading-sidebar">
              <RoomPortal zone="notes" locale={locale} compact />
              <div className="reading-colophon">
                <span className="interior-kicker">{authorLabel}</span>
                <Link href="/about" rel="author">Darren Su / 苏鹏</Link>
                <time dateTime={post.date}>{post.date}</time>
                <span>{post.readingTime} {t('minRead')}</span>
              </div>
              <p className="reading-side-note">{locale === 'zh' ? '记录工作、实践与生活中的思考。' : 'Notes and reflections on work, practice, and life.'}</p>
            </aside>
            <article className="reading-sheet">
              <header className="reading-header">
                {post.tags.length > 0 && <div className="interior-tags">{post.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}
                <h1>{post.title}</h1>
                <p className="reading-deck">{post.description}</p>
                <div className="reading-byline"><time dateTime={post.date}>{post.date}</time><span aria-hidden="true">·</span><span>{post.readingTime} {t('minRead')}</span><span aria-hidden="true">·</span><Link href="/about" rel="author">Darren Su</Link></div>
                <a className="interior-text-link reading-source" href={`/${locale}/blog/${post.slug}/source.md`} type="text/markdown" download={`${post.slug}.${locale}.md`}>{locale === 'zh' ? '下载纯文本原文' : 'Download article text'} ↓</a>
              </header>
              <div className="reading-prose" dangerouslySetInnerHTML={{ __html: renderedContent }} />
              <footer className="reading-footer">
                <Link href="/blog" className="interior-text-link">← {t('backToList')}</Link>
                <div className="reading-share"><span>{t('share')}</span><a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label={locale === 'zh' ? '分享到 X' : 'Share on X'}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a></div>
              </footer>
            </article>
          </div>
        </div>
      </main>
    </>
  );
}
