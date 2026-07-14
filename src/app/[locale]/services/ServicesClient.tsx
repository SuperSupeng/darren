'use client';

import { useLocale } from 'next-intl';
import { getSiteContent } from '@/lib/siteContent';

export default function ServicesClient() {
  const locale = useLocale();
  const site = getSiteContent(locale);
  const titleParts = [site.labels.services.title];

  return (
    <main className="min-h-screen bg-paper-100 text-ink-950">
      <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-[linear-gradient(180deg,#fbf8f1_0%,#f1eadc_100%)] px-4 py-20 md:px-6 md:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-full bg-cover bg-center opacity-[0.62] mix-blend-multiply [mask-image:linear-gradient(180deg,transparent_0%,black_28%,black_100%)] md:w-[72%] md:[mask-image:linear-gradient(90deg,transparent_0%,black_20%,black_100%)]"
          style={{ backgroundImage: "url('/images/hero-services-room.webp')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,248,241,0.98)_0%,rgba(251,248,241,0.84)_45%,rgba(241,234,220,0.3)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-ink-950/10" />
        <div className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,rgba(31,33,26,0.045),rgba(31,33,26,0))]" />
        <div className="container relative">
          <div className="mb-14 flex items-center gap-5">
            <span className="h-px flex-1 bg-ink-950/10" />
            <span className="academy-kicker">{site.labels.services.roomEyebrow}</span>
            <span className="h-px flex-1 bg-ink-950/10" />
          </div>

          <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <aside>
              <p className="academy-kicker">{site.labels.services.entranceEyebrow}</p>
              <p className="mt-7 max-w-sm border-l border-zen-gold/45 pl-5 font-serif text-2xl leading-relaxed text-ink-800">
                {site.labels.services.entranceQuote}
              </p>
            </aside>

            <div>
              <p className="academy-kicker">{site.labels.services.eyebrow}</p>
              <h1 className="heading-chunks mt-5 max-w-5xl font-serif text-[clamp(2.65rem,5.2vw,5.6rem)] leading-[1.08] text-ink-950">
                {titleParts.map((part) => (
                  <span key={part}>{part}</span>
                ))}
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-9 text-ink-600">
                {site.labels.services.subtitle}
              </p>

              <div className="mt-12 grid gap-0 border-y border-ink-950/10 sm:grid-cols-3 sm:border-y-0">
                {site.serviceItems.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="group border-b border-ink-950/10 py-5 last:border-b-0 sm:border-b-0 sm:border-l sm:px-5 sm:first:border-l-0"
                  >
                    <p className="academy-kicker text-zen-gold-dim/70 transition-transform duration-500 group-hover:translate-x-1">
                      {item.number}
                    </p>
                    <p className="mt-4 text-sm font-medium leading-7 text-ink-900 transition-transform duration-500 group-hover:translate-x-1">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20 md:px-6 md:py-28">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.32fr_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="academy-kicker">{site.labels.services.mainEyebrow}</p>
              <h2 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">
                {site.labels.services.mainTitle}
              </h2>
              <p className="mt-7 max-w-xs text-sm leading-8 text-ink-600">
                {site.labels.services.mainDescription}
              </p>
            </aside>

            <div className="space-y-0">
              {site.serviceItems.map((item) => (
                <article
                  key={item.id}
                  className="group ledger-entry relative px-0 py-12 transition-colors duration-500 first:pt-0 md:px-6"
                >
                  <span className="absolute left-0 top-10 h-px w-0 bg-zen-gold/55 transition-all duration-700 group-hover:w-20" />
                  <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:gap-12">
                    <div>
                      <p className="academy-kicker text-zen-gold-dim/70">{item.number}</p>
                      <h3 className="mt-5 max-w-md font-serif text-3xl leading-tight transition-transform duration-500 group-hover:translate-x-1 md:text-4xl">
                        {item.title}
                      </h3>
                      <p className="mt-5 max-w-md text-base leading-8 text-ink-600">{item.short}</p>
                      <p className="mt-7 border-l border-zen-gold/35 pl-4 text-sm leading-8 text-ink-600">
                        <span className="font-medium text-ink-800">{site.labels.services.bestFor}:</span>{' '}
                        {item.bestFor}
                      </p>
                    </div>

                    <div>
                      <div className="grid gap-7 md:grid-cols-2">
                        <ServiceSignal
                          number="01"
                          title={site.labels.services.problem}
                          body={item.problem}
                        />
                        <ServiceSignal
                          number="02"
                          title={site.labels.services.help}
                          body={item.help}
                        />
                      </div>

                      <div className="mt-8">
                        <h4 className="academy-kicker text-zen-gold-dim/70">
                          {site.labels.services.outcomes}
                        </h4>
                        <ul className="mt-4 grid gap-3">
                          {item.outcomes.map((outcome) => (
                            <li key={outcome} className="flex gap-3 text-sm leading-7 text-ink-600">
                              <span className="mt-3 h-px w-6 shrink-0 bg-zen-gold/45" />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="landscape-band px-4 py-20 md:px-6 md:py-24">
        <div className="container relative">
          <div className="grid gap-12 lg:grid-cols-[0.32fr_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="academy-kicker">{site.labels.services.secondaryEyebrow}</p>
              <h2 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">
                {site.labels.services.secondaryTitle}
              </h2>
              <p className="mt-7 max-w-xs text-sm leading-8 text-ink-600">
                {site.labels.services.secondaryDescription}
              </p>
            </aside>

            <div className="relative z-10 space-y-0">
              {site.secondaryServices.map((item) => (
                <article
                  key={item.id}
                  className="group ledger-entry py-8 transition-colors duration-500 md:grid md:grid-cols-[5rem_0.8fr_1.2fr] md:gap-8 md:px-6"
                >
                  <p className="academy-kicker text-zen-gold-dim/70">{item.number}</p>
                  <div>
                    <h3 className="font-serif text-3xl leading-tight transition-transform duration-500 group-hover:translate-x-1">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-base leading-8 text-ink-600">{item.short}</p>
                  </div>
                  <div className="mt-6 md:mt-1">
                    <p className="academy-kicker text-ink-700/55">{site.labels.services.bestFor}</p>
                    <p className="mt-3 text-sm leading-8 text-ink-600">{item.bestFor}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink-950 px-4 py-20 text-paper-100 md:px-6 md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(111,121,103,0.18),rgba(31,33,26,0)_58%)]" />
        <div className="container relative text-center">
          <p className="academy-kicker text-paper-300/62">{site.labels.services.ctaEyebrow}</p>
          <p className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">
            {site.cta.title}
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-paper-300/78">
            {site.cta.description}
          </p>
          <div className="mt-9">
            <a href="mailto:supeng842499467@gmail.com" className="btn bg-paper-100 text-ink-950 shadow-none hover:bg-paper-200">
              {site.cta.primary}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function ServiceSignal({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="relative">
      <p className="academy-kicker text-zen-gold-dim/70">{number}</p>
      <h4 className="mt-3 text-lg font-medium leading-7 text-ink-950">{title}</h4>
      <p className="mt-3 text-sm leading-8 text-ink-600">{body}</p>
    </div>
  );
}
