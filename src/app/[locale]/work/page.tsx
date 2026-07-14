import { Link } from '@/i18n/navigation';
import { getSiteContent } from '@/lib/siteContent';
import { createPageMetadata, getPageKeywords } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const site = getSiteContent(locale);

  return {
    ...createPageMetadata({
    locale,
    path: '/work',
    title: site.work.hero.title,
    description: site.work.hero.subtitle,
    keywords: getPageKeywords(locale, 'work'),
    }),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const site = getSiteContent(locale);

  return (
    <main className="min-h-screen bg-paper-100 text-ink-950">
      <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-[linear-gradient(180deg,#fbf8f1_0%,#f1eadc_100%)] px-4 py-20 md:px-6 md:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-full bg-cover opacity-[0.58] mix-blend-multiply [mask-image:linear-gradient(180deg,transparent_0%,black_30%,black_100%)] md:w-[76%] md:[mask-image:linear-gradient(90deg,transparent_0%,black_18%,black_100%)]"
          style={{
            backgroundImage: "url('/images/hero-work-archive.webp')",
            backgroundPosition: 'center 58%',
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,248,241,0.99)_0%,rgba(251,248,241,0.9)_44%,rgba(241,234,220,0.36)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-ink-950/10" />

        <div className="container relative">
          <div className="mb-14 flex items-center gap-5">
            <span className="h-px flex-1 bg-ink-950/10" />
            <span className="academy-kicker">{site.labels.work.roomEyebrow}</span>
            <span className="h-px flex-1 bg-ink-950/10" />
          </div>

          <div className="max-w-5xl">
            <p className="academy-kicker">{site.work.hero.eyebrow}</p>
            <h1 className="heading-chunks mt-5 max-w-5xl font-serif text-4xl leading-[1.1] text-ink-950 md:text-6xl lg:text-[4.7rem]">
              <span>{site.work.hero.title}</span>
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-9 text-ink-600">
              {site.work.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-paper-100 px-4 py-20 md:px-6 md:py-28">
        <div className="container">
          <div className="mb-12 grid gap-8 border-b border-ink-950/10 pb-10 lg:grid-cols-[0.34fr_1fr]">
            <div>
              <p className="academy-kicker">{site.labels.work.detailsEyebrow}</p>
            </div>
            <p className="max-w-3xl font-serif text-3xl leading-relaxed text-ink-900 md:text-4xl">
              {site.home.work.title}
            </p>
          </div>

          <div className="space-y-10">
            {site.work.cases.map((item, index) => (
              <article
                key={item.id}
                className="group ledger-entry px-0 py-12 md:px-6 md:py-14"
              >
                <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
                  <aside className="lg:sticky lg:top-28 lg:self-start">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="academy-kicker text-zen-gold-dim/70">
                        {String(index + 1).padStart(2, '0')} · {item.type}
                      </span>
                      <span className="border-b border-zen-gold/30 pb-1 text-[0.68rem] uppercase tracking-[0.12em] text-ink-600/72">
                        {site.labels.draftCase}
                      </span>
                    </div>
                    <h2 className="mt-6 max-w-md font-serif text-3xl leading-tight transition-transform duration-500 group-hover:translate-x-1 md:text-4xl">
                      {item.title}
                    </h2>
                    <p className="mt-5 max-w-md text-base leading-8 text-ink-600">{item.summary}</p>

                    <div className="mt-8 space-y-3 border-l border-zen-gold/35 pl-4 text-xs uppercase tracking-[0.12em] text-ink-600/58">
                      <p>{item.year}</p>
                      <p>{item.location}</p>
                      <p>{item.status}</p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-xs uppercase tracking-[0.12em] text-ink-600/58">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </aside>

                  <div>
                    <div className="ink-thread relative space-y-9 border-b border-dashed border-ink-950/10 pb-9">
                      <CaseStep
                        number="01"
                        title={site.labels.work.context}
                        body={item.context}
                      />
                      <CaseStep
                        number="02"
                        title={site.labels.work.goal}
                        body={item.goal}
                      />
                      <CaseStep
                        number="03"
                        title={site.labels.work.workDone}
                        items={item.workDone}
                      />
                    </div>

                    <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
                      <div>
                        <h3 className="academy-kicker text-zen-gold-dim/70">{site.labels.work.happened}</h3>
                        <ul className="mt-5 space-y-4 text-sm leading-8 text-ink-600">
                          {item.happened.map((happenedItem, happenedIndex) => (
                            <li key={happenedItem} className="grid grid-cols-[2.5rem_1fr] gap-4">
                              <span className="font-mono text-xs text-ink-600/40">
                                {String(happenedIndex + 1).padStart(2, '0')}
                              </span>
                              <span>{happenedItem}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-7">
                        <CaseNote
                          title={site.labels.work.learned}
                          body={item.learned}
                        />
                        <CaseNote
                          title={site.labels.work.reusablePattern}
                          body={item.reusablePattern}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
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
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="mailto:supeng842499467@gmail.com" className="btn bg-paper-100 text-ink-950 shadow-none hover:bg-paper-200">
              {site.cta.primary}
            </a>
            <Link href="/services" className="quiet-link-inverse">
              {site.labels.viewCollaborationPaths}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function CaseStep({
  number,
  title,
  body,
  items,
}: {
  number: string;
  title: string;
  body?: string;
  items?: string[];
}) {
  return (
    <div className="relative pl-10">
      <span className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-zen-gold/25 bg-paper-100 text-[0.64rem] font-medium text-zen-gold-dim">
        {number}
      </span>
      <h3 className="text-lg font-medium leading-7 text-ink-950">{title}</h3>
      {body ? <p className="mt-3 text-sm leading-8 text-ink-600">{body}</p> : null}
      {items ? (
        <ul className="mt-3 space-y-2 text-sm leading-7 text-ink-600">
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zen-gold-dim/55" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function CaseNote({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="border-l border-ink-950/10 pl-5">
      <h3 className="academy-kicker text-ink-700/55">{title}</h3>
      <p className="mt-3 text-sm leading-8 text-ink-600">{body}</p>
    </div>
  );
}
