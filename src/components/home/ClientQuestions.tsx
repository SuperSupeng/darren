import { getSiteContent } from '@/lib/siteContent';

export default function ClientQuestions({ locale }: { locale: string }) {
  const site = getSiteContent(locale);
  const routes =
    locale === 'zh'
      ? ['判断优先区域', '找到种子用户', '反馈试点']
      : ['Find the first audience', 'Filter credible nodes', 'Design a small test'];

  return (
    <section className="landscape-band px-4 py-20 text-ink-950 md:px-6 md:py-28">
      <div className="container relative z-10">
        <div className="relative grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="academy-kicker">{site.home.problems.eyebrow}</p>
            <h2 className="mt-5 max-w-xl font-serif text-4xl leading-tight md:text-5xl">
              {site.home.problems.title}
            </h2>
            <p className="mt-7 max-w-md text-base leading-8 text-ink-600">
              {site.home.problems.subtitle}
            </p>
          </aside>

          <div className="relative">
            <div className="river-line mb-10 hidden py-4 lg:block">
              <div className="relative z-10 flex items-center justify-between">
                {routes.map((route, index) => (
                  <div key={route} className="flex max-w-[11rem] items-center gap-3 bg-paper-100/74 pr-4">
                    <span className="path-dot" />
                    <span className="text-xs font-medium leading-5 text-ink-600">
                      {String(index + 1).padStart(2, '0')} · {route}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="divide-y divide-ink-950/8">
            {site.home.problems.items.map((item, index) => (
              <article
                key={item.title}
                className="group ledger-entry grid gap-6 py-8 md:grid-cols-[5rem_0.92fr_1.08fr] md:gap-8 md:py-10"
              >
                <span className="font-serif text-6xl leading-none text-ink-950/[0.075] transition-colors duration-500 group-hover:text-zen-gold/35">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="academy-kicker text-zen-gold-dim/70">
                    {locale === 'zh' ? '如果你在问' : 'If you are asking'}
                  </p>
                  <h3 className="mt-4 text-2xl font-medium leading-snug text-ink-950 transition-transform duration-500 group-hover:translate-x-1 md:text-3xl">
                    {item.title}
                  </h3>
                </div>
                <div>
                  <p className="text-sm leading-8 text-ink-600">
                    {item.description}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-3 border-b border-zen-gold/30 pb-1 text-xs font-medium text-ink-700 md:hidden">
                    <span className="path-dot" />
                    {routes[index]}
                  </div>
                </div>
              </article>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
