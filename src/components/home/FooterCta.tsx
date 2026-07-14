import { Link } from '@/i18n/navigation';
import { getAllPosts } from '@/lib/blog';
import { getSiteContent } from '@/lib/siteContent';

export default function FooterCta({ locale }: { locale: string }) {
  const site = getSiteContent(locale);
  const posts = getAllPosts(locale);
  const preferredSlugs =
    locale === 'zh'
      ? [
          'superai-china-ecosystem-visit',
          'managing-31-ai-employees',
          'zongtong-temple-retreat',
        ]
      : ['superai-china-ecosystem-visit'];
  const featuredPosts = preferredSlugs
    .map((slug) => posts.find((post) => post.slug === slug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));
  const cardOffsets = [
    'lg:ml-0 lg:mr-auto lg:mt-1',
    'lg:ml-auto lg:mr-6 lg:mt-5',
    'lg:ml-12 lg:mr-auto lg:mt-5',
  ];

  return (
    <>
      <section className="landscape-band px-4 py-20 text-ink-950 md:px-6 md:py-28">
        <div className="absolute inset-x-0 top-0 h-px bg-ink-950/8" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(31,33,26,0.055),rgba(31,33,26,0))]" />
        <div className="container relative z-10">
          <div className="mb-12 flex items-center gap-5 text-ink-700/44">
            <span className="h-px flex-1 bg-ink-950/10" />
            <span className="academy-kicker">{site.home.fieldNotes.sectionEyebrow}</span>
            <span className="h-px flex-1 bg-ink-950/10" />
          </div>

          <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="max-w-xl">
                <p className="academy-kicker">{site.home.fieldNotes.eyebrow}</p>
                <h2 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">
                  {site.home.fieldNotes.title}
                </h2>
                <p className="mt-7 text-base leading-9 text-ink-600">
                  {site.home.fieldNotes.subtitle}
                </p>
                <p className="mt-8 border-l border-zen-gold/45 pl-5 font-serif text-2xl leading-relaxed text-ink-800">
                  {site.home.fieldNotes.noteLine}
                </p>
                <div className="mt-10">
                  <Link href="/blog" className="quiet-link">
                    {site.cta.secondary}
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 hidden h-full w-px bg-[linear-gradient(180deg,transparent,rgba(138,113,71,0.28),rgba(31,33,26,0.08),transparent)] lg:block" />
              <div className="grid gap-4 md:grid-cols-3 lg:block lg:pl-12">
                {featuredPosts.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className={`group natural-slip relative block min-h-[210px] p-6 lg:max-w-[30rem] ${cardOffsets[index]}`}
                  >
                    <span className="absolute right-5 top-5 font-serif text-6xl leading-none text-ink-950/[0.028] transition-colors duration-500 group-hover:text-ink-950/[0.055]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="relative z-10">
                      <div>
                        <span className="academy-kicker text-zen-gold-dim/72">
                          {post.date} · {post.readingTime} {site.labels.fieldNotes.minRead}
                        </span>
                        <h3 className="mt-5 max-w-xs text-2xl font-medium leading-snug text-ink-950 transition-transform duration-500 group-hover:translate-x-1">
                          {post.title}
                        </h3>
                      </div>
                      <p className="mt-7 text-sm leading-8 text-ink-600">
                        {post.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink-950 px-4 py-24 text-paper-100 md:px-6 md:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(111,121,103,0.18),rgba(31,33,26,0)_58%)]" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="academy-kicker text-paper-300/62">{site.home.about.eyebrow}</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-paper-100 md:text-6xl">
              {site.home.about.title}
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-9 text-paper-300/82">
              {site.home.about.description}
            </p>
            <p className="mx-auto mt-10 max-w-2xl font-serif text-xl leading-relaxed text-paper-200 sm:text-2xl md:text-3xl">
              {site.home.about.closingLine}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="mailto:supeng842499467@gmail.com" className="btn bg-paper-100 text-ink-950 shadow-none hover:bg-paper-200">
                {site.cta.primary}
              </a>
              <Link href="/about" className="quiet-link-inverse">
                {site.home.about.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
