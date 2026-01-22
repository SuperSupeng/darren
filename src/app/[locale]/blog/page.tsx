import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllPosts } from '@/lib/blog';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function BlogPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('blog');
  const posts = getAllPosts();
  const locale = params.locale;

  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-ink-950" />
      <div className="fixed inset-0 -z-10 bg-grid opacity-20" />

      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-geek-cyan text-2xl">✎</span>
              <h1 className="text-3xl md:text-4xl font-medium">{t('title')}</h1>
            </div>
            <p className="text-paper-400 text-lg">{t('description')}</p>
          </div>

          {/* Posts List */}
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-paper-400">{t('empty')}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block p-6 rounded-2xl bg-ink-900/50 border border-ink-700/50 hover:border-geek-cyan/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-mono px-2 py-1 rounded-md bg-geek-cyan/10 text-geek-cyan"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="text-xl font-medium text-paper-100 group-hover:text-geek-cyan transition-colors mb-2">
                        {locale === 'en' && post.titleEn ? post.titleEn : post.title}
                      </h2>

                      {/* Description */}
                      <p className="text-paper-400 text-sm line-clamp-2">
                        {locale === 'en' && post.descriptionEn ? post.descriptionEn : post.description}
                      </p>
                    </div>

                    {/* Meta */}
                    <div className="flex md:flex-col items-center md:items-end gap-3 text-xs font-mono text-paper-500">
                      <span>{post.date}</span>
                      <span>{post.readingTime} {t('minRead')}</span>
                    </div>
                  </div>

                  {/* Read More */}
                  <div className="mt-4 flex items-center gap-2 text-sm text-geek-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{t('readMore')}</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
