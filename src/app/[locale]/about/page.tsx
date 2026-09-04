import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import { getSiteContent } from '@/lib/siteContent';
import { aboutStructuredData, createPageMetadata, getPageKeywords } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return createPageMetadata({
    locale,
    path: '/about',
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: getPageKeywords(locale, 'about'),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const site = getSiteContent(locale);
  const innerGround =
    locale === 'zh'
      ? {
          eyebrow: '内在基础',
          title: '事情多起来以后，我开始更在意自己为什么做它。',
          description:
            'AI、创业和全球化都变化得很快，眼前也总有新的机会。禅修和长期的自我观察，让我在决定做一件事以前多停一下：它是不是真的重要，我是否愿意投入，以及这件事会怎样影响一起参与的人。',
          closing: '有些事情值得快一点，有些事情需要先想清楚。',
        }
      : {
          eyebrow: 'Inner Ground',
          title: 'As the work grew, I began to pay more attention to why I was doing it.',
          description:
            'AI, entrepreneurship, and cross-border work keep presenting new opportunities. Meditation and long-term reflection help me pause before saying yes: whether the work matters, whether I am willing to commit, and how it may affect the people involved.',
          closing: 'Some things deserve speed. Others need to be understood first.',
        };

  return (
    <>
      <JsonLd data={aboutStructuredData(locale)} />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-paper-100 text-ink-950">
      <section className="site-page-hero site-page-hero-about relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden px-4 py-20 md:px-6 md:py-24">
        <div className="site-page-hero-veil" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-ink-950/10" />
        <div className="container relative">
          <div className="site-page-roomline mb-14 flex items-center gap-5">
            <span className="h-px flex-1" />
            <span className="academy-kicker site-page-kicker">{site.labels.about.roomEyebrow}</span>
            <span className="h-px flex-1" />
          </div>

          <div className="grid gap-10 min-[841px]:grid-cols-[0.72fr_1.28fr] min-[841px]:items-center min-[841px]:gap-10 lg:gap-16">
            <div>
              <div className="site-page-portrait natural-slip mx-auto max-w-[17rem] overflow-hidden p-3 min-[841px]:mx-0 min-[841px]:max-w-md">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/photo.jpg"
                    alt="Darren Su"
                    fill
                    sizes="(min-width: 1024px) 420px, (min-width: 841px) 30vw, 272px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="academy-kicker site-page-kicker">{site.labels.about.eyebrow}</p>
              <h1 className="site-page-title heading-balance mt-5 font-serif text-[clamp(2.7rem,5.2vw,5.6rem)] leading-[1.08]">
                {site.about.hero.title}
              </h1>
              <p className="site-page-lead mt-8 max-w-3xl text-lg leading-9">
                {site.about.hero.subtitle}
              </p>
              <p className="site-page-quote mt-9 max-w-2xl border-l pl-5 font-serif text-2xl leading-relaxed">
                {site.labels.about.pullQuote}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                {site.about.hero.tags.map((tag) => (
                  <span
                    key={tag}
                    className="site-page-tag border-b pb-1 text-xs uppercase tracking-[0.12em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-page-section home-reveal relative px-4 py-20 md:px-6 md:py-28">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.34fr_1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="academy-kicker">{site.labels.about.kernelEyebrow}</p>
              <h2 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">
                {site.labels.about.kernelTitle}
              </h2>
              <p className="mt-7 max-w-xs text-sm leading-8 text-ink-600">
                {site.labels.about.kernelDescription}
              </p>
            </div>

            <div className="relative border-l border-ink-950/10 pl-6 md:pl-9">
              {site.about.kernel.map((item, index) => (
                <article
                  key={item.title}
                  className="group relative border-b border-ink-950/10 py-8 transition-colors duration-500 last:border-b-0 hover:bg-paper-200/30 md:grid md:grid-cols-[7rem_1fr] md:gap-8 md:px-6"
                >
                  <span className="absolute -left-[2.05rem] top-9 flex h-7 w-7 items-center justify-center rounded-full border border-zen-gold/24 bg-paper-100 text-[0.68rem] font-medium text-zen-gold-dim transition duration-500 group-hover:border-zen-gold/45 group-hover:bg-paper-200 md:-left-[3.1rem]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="academy-kicker text-zen-gold-dim">
                    {locale === 'zh' ? '阶段' : 'Chapter'} {String(index + 1).padStart(2, '0')}
                  </p>
                  <div>
                    <h3 className="font-serif text-3xl leading-tight transition-transform duration-500 group-hover:translate-x-1 md:text-4xl">
                      {item.title}
                    </h3>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-ink-600">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-index-section home-reveal relative overflow-hidden border-y border-ink-950/8 bg-paper-200/42 px-4 py-20 md:px-6 md:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(111,121,103,0.045)_0_1px,transparent_1px_100%)]" />
        <div className="container relative">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-18">
            <div>
              <p className="academy-kicker">{site.about.whyThisWork.eyebrow}</p>
              <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-tight md:text-6xl">
                {site.about.whyThisWork.title}
              </h2>
              <p className="mt-9 max-w-xl border-l border-zen-gold/45 pl-5 font-serif text-2xl leading-relaxed text-ink-800">
                {site.about.whyThisWork.quote}
              </p>
            </div>

            <div className="self-end">
              <p className="max-w-3xl text-base leading-9 text-ink-600">
                {site.about.whyThisWork.body}
              </p>
              <div className="mt-10 border-t border-ink-950/10">
                {site.about.whyThisWork.points.map((point, index) => (
                  <article
                    key={point}
                    className="grid gap-4 border-b border-ink-950/10 py-6 md:grid-cols-[4.5rem_1fr] md:gap-8"
                  >
                    <p className="academy-kicker text-zen-gold-dim/90">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <p className="max-w-2xl text-base leading-8 text-ink-700">
                      {point}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-page-section home-reveal relative overflow-hidden border-y border-ink-950/8 bg-paper-200/38 px-4 py-20 md:px-6 md:py-28">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-18">
            <div className="natural-slip overflow-hidden p-3 md:p-4">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/blog/zongtong-retreat/temple.jpg"
                  alt={locale === 'zh' ? '宗通寺禅修期间的寺院现场' : 'Temple grounds during Darren’s meditation retreat'}
                  fill
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <p className="academy-kicker">{innerGround.eyebrow}</p>
              <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
                {innerGround.title}
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-9 text-ink-600">
                {innerGround.description}
              </p>
              <p className="mt-9 max-w-xl border-l border-zen-gold/45 pl-5 font-serif text-2xl leading-relaxed text-ink-800">
                {innerGround.closing}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="site-page-cta home-reveal relative overflow-hidden bg-ink-950 px-4 py-20 text-paper-100 md:px-6 md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(111,121,103,0.18),rgba(31,33,26,0)_58%)]" />
        <div className="container relative">
          <div className="grid gap-12 lg:grid-cols-[0.36fr_0.64fr] lg:gap-16">
            <div>
              <p className="academy-kicker text-paper-300/82">{site.labels.about.workEyebrow}</p>
              <h2 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">
                {site.labels.about.workTitle}
              </h2>
            </div>
            <div className="space-y-2">
              {site.labels.about.workItems.map((item, index) => (
                <article
                  key={item}
                  className="group relative overflow-hidden border-t border-paper-100/10 px-1 py-6 transition-colors duration-500 hover:bg-paper-100/[0.035] md:grid md:grid-cols-[5rem_1fr] md:gap-6 md:px-5"
                >
                  <span className="absolute left-0 top-0 h-px w-0 bg-zen-gold-light/42 transition-all duration-700 group-hover:w-full" />
                  <p className="academy-kicker text-paper-300/76 transition-colors duration-500 group-hover:text-zen-gold-light">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-paper-300/78 transition-transform duration-500 group-hover:translate-x-1 md:mt-0">
                    {item}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
