import { Link } from '@/i18n/navigation';
import { getSiteContent } from '@/lib/siteContent';

export default function NowBuilding({ locale }: { locale: string }) {
  const site = getSiteContent(locale);
  const labels =
    locale === 'zh'
      ? {
          fit: '适合',
          output: '能带走',
          start: '从这里开始',
          path: '合作路径',
        }
      : {
          fit: 'Best for',
          output: 'You get',
          start: 'Start here',
          path: 'Service path',
        };
  const offsets = [
    'lg:mr-24',
    'lg:ml-20',
    'lg:ml-6 lg:mr-12',
  ];

  return (
    <section className="landscape-band px-4 py-24 md:px-6 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(31,33,26,0.12),transparent)]" />
      <div className="container relative z-10">
        <div className="grid gap-14 lg:grid-cols-[0.74fr_1.26fr] lg:gap-20">
          <div className="max-w-xl">
            <div>
              <p className="academy-kicker">{site.home.services.eyebrow}</p>
              <h2 className="mt-5 font-serif text-4xl leading-tight text-ink-950 md:text-6xl">
                {site.home.services.title}
              </h2>
              <p className="mt-7 text-base leading-9 text-ink-600 md:text-lg">
                {site.home.services.subtitle}
              </p>
              <p className="mt-8 border-l border-ink-950/16 pl-5 text-sm leading-8 text-ink-600">
                {site.home.services.support}
              </p>
            </div>

            <div className="mt-8 border-y border-ink-950/10 py-5">
              <p className="academy-kicker text-ink-700/50">{labels.path}</p>
              <div className="mt-5 grid gap-4">
                {site.serviceItems.slice(0, 3).map((item) => (
                  <Link
                    key={item.id}
                    href="/services"
                    className="group grid grid-cols-[2.5rem_1fr] items-start gap-4"
                  >
                    <span className="font-mono text-xs leading-7 text-zen-gold-dim/70">
                      {item.number}
                    </span>
                    <span className="border-b border-ink-950/8 pb-3 text-sm font-medium leading-7 text-ink-800 transition-colors duration-300 group-hover:text-zen-gold-dim">
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mt-7">
                <Link href="/services" className="quiet-link">
                  {site.labels.viewCollaborationPaths}
                </Link>
              </div>
            </div>
          </div>

          <div className="relative grid gap-7">
            <div className="absolute left-8 top-8 hidden h-[calc(100%-4rem)] w-px bg-[linear-gradient(180deg,transparent,rgba(138,113,71,0.28),rgba(31,33,26,0.08),transparent)] lg:block" />
            {site.serviceItems.slice(0, 3).map((item, index) => (
              <Link
                key={item.id}
                href="/services"
                className={`group natural-slip relative p-6 md:p-7 lg:pl-12 ${offsets[index]}`}
              >
                <span className="absolute left-6 top-7 hidden lg:inline-flex">
                  <span className="path-dot" />
                </span>
                <span className="absolute right-5 top-4 font-serif text-7xl leading-none text-ink-950/[0.04] transition-colors duration-500 group-hover:text-ink-950/[0.07]">
                  {item.number}
                </span>
                <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-start">
                  <div>
                    <p className="academy-kicker text-zen-gold-dim/70">
                      {index === 0 ? labels.start : item.number}
                    </p>
                    <h3 className="mt-5 text-2xl font-medium leading-snug text-ink-950 transition-transform duration-500 group-hover:translate-x-1 md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-5 text-sm leading-8 text-ink-600">
                      {item.short}
                    </p>
                  </div>

                  <div className="border-t border-dashed border-ink-950/12 pt-5 md:border-l md:border-t-0 md:pl-7 md:pt-0">
                    <p className="academy-kicker text-ink-700/48">{labels.fit}</p>
                    <p className="mt-3 text-sm leading-7 text-ink-600">{item.bestFor}</p>
                    <p className="academy-kicker mt-6 text-zen-gold-dim/70">{labels.output}</p>
                    <p className="mt-3 text-sm leading-7 text-ink-700">
                      {item.outcomes[0]}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
