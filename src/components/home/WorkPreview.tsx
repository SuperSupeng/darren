import { Link } from '@/i18n/navigation';
import { getSiteContent } from '@/lib/siteContent';

export default function WorkPreview({ locale }: { locale: string }) {
  const site = getSiteContent(locale);
  const cases = site.work.cases.slice(0, 3);
  const [featuredCase, ...secondaryCases] = cases;
  const labels =
    locale === 'zh'
      ? { proved: '它说明什么', pattern: '可复用做法' }
      : { proved: 'What it proves', pattern: 'Reusable pattern' };

  return (
    <section className="landscape-band px-4 py-24 text-ink-950 md:px-6 md:py-32">
      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="academy-kicker">{site.home.work.eyebrow}</p>
            <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
              {site.home.work.title}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-9 text-ink-600 lg:justify-self-end">
            {site.home.work.subtitle}
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          {featuredCase ? (
            <Link
              key={featuredCase.id}
              href="/work"
              className="group natural-slip relative min-h-[430px] p-7 md:p-9"
            >
              <span className="absolute right-6 top-5 font-serif text-8xl leading-none text-ink-950/[0.028] transition-colors duration-500 group-hover:text-ink-950/[0.055]">
                01
              </span>
              <div className="relative grid h-full gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="academy-kicker text-zen-gold-dim/72">
                      01 · {featuredCase.type}
                    </span>
                    <span className="border-b border-zen-gold/28 pb-1 text-[0.68rem] uppercase tracking-[0.12em] text-ink-600/62">
                      {site.labels.draftCase}
                    </span>
                  </div>
                  <h3 className="mt-6 text-3xl font-medium leading-tight text-ink-950 transition-transform duration-500 group-hover:translate-x-1 md:text-4xl">
                    {featuredCase.title}
                  </h3>
                  <p className="mt-6 text-sm leading-8 text-ink-600">
                    {featuredCase.summary}
                  </p>
                  <div className="mt-auto pt-8">
                    <div className="quiet-link">{site.labels.viewWork}</div>
                  </div>
                </div>

                <div className="space-y-7 border-t border-dashed border-ink-950/12 pt-7 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  <div>
                    <p className="academy-kicker text-zen-gold-dim/70">{labels.proved}</p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-ink-600">
                      {featuredCase.happened.slice(0, 2).map((signal) => (
                        <li key={signal} className="flex gap-3">
                          <span className="mt-3 h-px w-5 shrink-0 bg-zen-gold/45" />
                          <span>{signal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="academy-kicker text-ink-700/48">{labels.pattern}</p>
                    <p className="mt-3 text-sm leading-7 text-ink-600">
                      {featuredCase.reusablePattern}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {featuredCase.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs uppercase tracking-[0.12em] text-ink-600/58">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ) : null}

          <div className="relative lg:pt-10">
            <div className="absolute left-0 top-14 hidden h-[calc(100%-3rem)] w-px bg-[linear-gradient(180deg,transparent,rgba(138,113,71,0.32),transparent)] lg:block" />
            {secondaryCases.map((item, index) => (
              <Link
                key={item.id}
                href="/work"
                className="group ledger-entry relative block py-8 pl-8 transition duration-500"
              >
                <span className="absolute left-0 top-10 hidden -translate-x-1/2 lg:inline-flex">
                  <span className="path-dot" />
                </span>
                <p className="academy-kicker text-zen-gold-dim/72">
                  {String(index + 2).padStart(2, '0')} · {item.type}
                </p>
                <h3 className="mt-5 text-2xl font-medium leading-snug text-ink-950 transition-transform duration-500 group-hover:translate-x-1">
                  {item.title}
                </h3>
                <p className="mt-5 text-sm leading-8 text-ink-600">
                  {item.happened[0] ?? item.summary}
                </p>
                <div className="quiet-link mt-7">{site.labels.viewWork}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
