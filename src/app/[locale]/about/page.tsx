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
          title: '慢下来，是为了在快节奏里看清问题。',
          description:
            'AI、创业和全球化都很快。稳定的观察让我更少跟着热闹走，也更清楚地分辨哪些机会值得靠近，哪些动作应该先放下。',
          closing: '看清问题，认真对待人，再小步推进。',
        }
      : {
          eyebrow: 'Inner Ground',
          title: 'Slowing down is not leaving the field.',
          description:
            'I have been drawn to the quiet process of incense burning. It is less a symbol to explain and more a reminder of rhythm: the faster the work moves, the more important it is to keep a stable point of attention.',
          closing: 'See the problem clearly, treat people seriously, then move in small steps.',
        };

  return (
    <>
      <JsonLd data={aboutStructuredData(locale)} />
      <main className="min-h-screen bg-paper-100 text-ink-950">
      <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-[linear-gradient(180deg,#fbf8f1_0%,#f1eadc_100%)] px-4 py-20 md:px-6 md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,248,241,0.98)_0%,rgba(251,248,241,0.88)_50%,rgba(241,234,220,0.62)_100%),linear-gradient(90deg,rgba(111,121,103,0.035)_0_1px,transparent_1px_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-ink-950/10" />
        <div className="container relative">
          <div className="mb-14 flex items-center gap-5">
            <span className="h-px flex-1 bg-ink-950/10" />
            <span className="academy-kicker">{site.labels.about.roomEyebrow}</span>
            <span className="h-px flex-1 bg-ink-950/10" />
          </div>

          <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div>
              <div className="natural-slip max-w-md overflow-hidden p-3">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/photo.jpg"
                    alt="Darren Su"
                    fill
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="academy-kicker">{site.labels.about.eyebrow}</p>
              <h1 className="heading-balance mt-5 font-serif text-[clamp(2.7rem,5.2vw,5.6rem)] leading-[1.08] text-ink-950">
                {site.about.hero.title}
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-9 text-ink-600">
                {site.about.hero.subtitle}
              </p>
              <p className="mt-9 max-w-2xl border-l border-zen-gold/45 pl-5 font-serif text-2xl leading-relaxed text-ink-800">
                {site.labels.about.pullQuote}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                {site.about.hero.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border-b border-ink-950/14 pb-1 text-xs uppercase tracking-[0.12em] text-ink-600/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20 md:px-6 md:py-28">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.34fr_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="academy-kicker">{site.labels.about.kernelEyebrow}</p>
              <h2 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">
                {site.labels.about.kernelTitle}
              </h2>
              <p className="mt-7 max-w-xs text-sm leading-8 text-ink-600">
                {site.labels.about.kernelDescription}
              </p>
            </aside>

            <div className="relative border-l border-ink-950/10 pl-6 md:pl-9">
              {site.about.kernel.map((item, index) => (
                <article
                  key={item.title}
                  className="group relative border-b border-ink-950/10 py-8 transition-colors duration-500 last:border-b-0 hover:bg-paper-200/30 md:grid md:grid-cols-[7rem_1fr] md:gap-8 md:px-6"
                >
                  <span className="absolute -left-[2.05rem] top-9 flex h-7 w-7 items-center justify-center rounded-full border border-zen-gold/24 bg-paper-100 text-[0.68rem] font-medium text-zen-gold-dim transition duration-500 group-hover:border-zen-gold/45 group-hover:bg-paper-200 md:-left-[3.1rem]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="academy-kicker text-zen-gold-dim/65">
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

      <section className="relative overflow-hidden border-y border-ink-950/8 bg-paper-200/42 px-4 py-20 md:px-6 md:py-28">
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
                    <p className="academy-kicker text-zen-gold-dim/70">
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

      <section className="relative overflow-hidden border-y border-ink-950/8 bg-paper-200/38 px-4 py-20 md:px-6 md:py-28">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-18">
            <div className="incense-scene min-h-[380px]" aria-hidden="true">
              <div className="incense-water" />
              <div className="incense-floor" />
              <div className="incense-boat-shadow" />
              <div className="incense-boat" />
              <div className="incense-elder">
                <span className="incense-elder-hat" />
                <span className="incense-elder-head" />
                <span className="incense-elder-body" />
                <span className="incense-elder-arm" />
              </div>
              <div className="incense-rod">
                <div className="incense-stick" />
                <div className="incense-burnt-tip" />
                <div className="incense-ember" />
                <div className="incense-ash" />
              </div>
              <div className="incense-fishing-line" />
              <span className="incense-smoke incense-smoke-one" />
              <span className="incense-smoke incense-smoke-two" />
              <span className="incense-smoke incense-smoke-three" />
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

      <section className="relative overflow-hidden bg-ink-950 px-4 py-20 text-paper-100 md:px-6 md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(111,121,103,0.18),rgba(31,33,26,0)_58%)]" />
        <div className="container relative">
          <div className="grid gap-12 lg:grid-cols-[0.36fr_0.64fr] lg:gap-16">
            <div>
              <p className="academy-kicker text-paper-300/62">{site.labels.about.workEyebrow}</p>
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
                  <p className="academy-kicker text-paper-300/52 transition-colors duration-500 group-hover:text-zen-gold-light">
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
