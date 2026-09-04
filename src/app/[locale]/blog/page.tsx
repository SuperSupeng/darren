import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllPosts } from '@/lib/blog';
import { getSiteContent } from '@/lib/siteContent';
import JsonLd from '@/components/JsonLd';
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

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const site = getSiteContent(locale);
  const posts = getAllPosts(locale);
  const titleParts = [site.fieldNotes.hero.title];

  return (
    <>
      <JsonLd data={blogStructuredData(posts, locale)} />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-paper-100 text-ink-950">
      <section className="site-page-hero site-page-hero-blog relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden px-4 py-20 md:px-6 md:py-24">
        <div
          aria-hidden="true"
          className="site-page-hero-media absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-field-notes-desk.webp')" }}
        />
        <div className="site-page-hero-veil" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-ink-950/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_18%,rgba(138,113,71,0.09),rgba(138,113,71,0)_34%)]" />
        <div className="container relative">
          <div className="site-page-roomline mb-14 flex items-center gap-5">
            <span className="h-px flex-1" />
            <span className="academy-kicker site-page-kicker">{site.labels.fieldNotes.roomEyebrow}</span>
            <span className="h-px flex-1" />
          </div>

          <div className="grid gap-10 min-[841px]:grid-cols-[0.66fr_1.34fr] min-[841px]:gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div className="min-w-0">
              <p className="academy-kicker site-page-kicker">{site.labels.fieldNotes.sidebarEyebrow}</p>
              <p className="site-page-quote mt-7 max-w-sm border-l pl-5 font-serif text-2xl leading-relaxed">
                {site.labels.fieldNotes.sidebarQuote}
              </p>
            </div>

            <div className="min-w-0">
              <p className="academy-kicker site-page-kicker">{site.fieldNotes.hero.eyebrow}</p>
              <h1 className="site-page-title heading-chunks mt-5 max-w-5xl font-serif text-[clamp(2.25rem,5.2vw,5.6rem)] leading-[1.08] [overflow-wrap:anywhere]">
                {titleParts.map((part) => (
                  <span key={part}>{part}</span>
                ))}
              </h1>
              <p className="site-page-lead mt-8 max-w-3xl text-lg leading-9">
                {site.fieldNotes.hero.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="site-page-section home-reveal relative bg-paper-100 px-4 py-20 md:px-6 md:py-28">
        <div className="container">
          <div className="grid gap-12 border-t border-ink-950/10 pt-12 lg:grid-cols-[0.34fr_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="academy-kicker">{site.labels.fieldNotes.latestEyebrow}</p>
            <h2 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">
              {site.labels.fieldNotes.recentTitle}
            </h2>
            <p className="mt-7 max-w-xs text-sm leading-8 text-ink-600">
              {site.labels.fieldNotes.recentDescription}
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="space-y-0">
              {posts.map((post) => {
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="site-ledger-entry group ledger-entry grid gap-6 py-7 transition duration-500 md:grid-cols-[150px_1fr] md:px-6"
                  >
                    <div className="text-sm text-zen-gold-dim/90">
                      <p>{post.date}</p>
                      <p className="mt-2">
                        {post.readingTime} {site.labels.fieldNotes.minRead}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-serif text-3xl leading-tight transition-transform duration-300 group-hover:translate-x-1">
                        {post.title}
                      </h3>
                      <p className="mt-4 max-w-3xl text-sm leading-8 text-ink-600">
                        {post.description}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs uppercase tracking-[0.12em] text-ink-700/90"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-ink-600">
              {site.labels.fieldNotes.empty}
            </div>
          )}
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
