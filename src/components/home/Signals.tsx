import { getSiteContent } from '@/lib/siteContent';

export default function Signals({ locale }: { locale: string }) {
  const site = getSiteContent(locale);
  const methodLabels =
    locale === 'zh'
      ? ['问题', '用户', '场景', '策略']
      : ['Question', 'People', 'Room', 'Decision'];
  const proofOffsets = ['lg:mt-0', 'lg:mt-10', 'lg:mt-4', 'lg:mt-14'];

  return (
    <>
      <section className="landscape-band px-4 py-24 md:px-6 md:py-32">
        <div className="container relative z-10">
          <div className="grid gap-14 lg:grid-cols-[0.36fr_0.64fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="academy-kicker">{site.home.method.eyebrow}</p>
              <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-tight text-ink-950 md:text-6xl">
                {site.home.method.title}
              </h2>
              <p className="mt-8 max-w-md text-sm leading-8 text-ink-600">
                {site.home.method.description}
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-7 top-10 hidden h-[calc(100%-5rem)] w-px bg-[linear-gradient(180deg,transparent,rgba(138,113,71,0.28),rgba(31,33,26,0.08),transparent)] md:block" />
              <div className="grid">
                {site.home.method.steps.map((step, index) => (
                  <article
                    key={step.title}
                    className="group ledger-entry relative py-7 transition duration-500 md:grid md:grid-cols-[5rem_0.9fr_1.1fr] md:gap-7 md:py-8 md:pl-0 md:pr-6"
                  >
                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-zen-gold/18 bg-paper-100/72 text-sm font-medium text-zen-gold-dim transition duration-500 group-hover:border-zen-gold/38 group-hover:bg-paper-200">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="academy-kicker text-ink-700/45">{methodLabels[index]}</p>
                      <h3 className="mt-3 text-2xl font-medium leading-snug text-ink-950 transition-transform duration-500 group-hover:translate-x-1">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-5 text-sm leading-8 text-ink-600 md:mt-0">
                      {step.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink-950 px-4 py-24 text-paper-100 md:px-6 md:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(111,121,103,0.16),rgba(31,33,26,0)_62%),linear-gradient(90deg,rgba(251,248,241,0.035)_0_1px,transparent_1px_100%)] bg-[length:auto,18rem_100%]" />
        <div className="container">
          <div className="relative grid gap-14 lg:grid-cols-[0.42fr_0.58fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="academy-kicker text-paper-300/62">{site.home.proof.eyebrow}</p>
              <h2 className="mt-5 font-serif text-4xl leading-tight text-paper-100 md:text-6xl">
                {site.home.proof.title}
              </h2>
              <p className="mt-7 max-w-xl text-base leading-9 text-paper-300/76">
                {site.home.proof.subtitle}
              </p>
              <p className="mt-10 border-l border-zen-gold-light/35 pl-5 font-serif text-2xl leading-relaxed text-paper-200">
                {site.home.proof.closingLine}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {site.proofItems.map((item, index) => (
                  <article
                    key={item.title}
                    className={`group min-h-[230px] border-t border-paper-100/12 bg-paper-100/[0.028] p-7 transition duration-500 hover:-translate-y-0.5 hover:bg-paper-100/[0.048] ${proofOffsets[index] ?? ''}`}
                  >
                    <p className="academy-kicker text-paper-300/52">{item.label}</p>
                    <h3 className="mt-4 text-2xl font-medium text-paper-100 transition-transform duration-500 group-hover:translate-x-1">{item.title}</h3>
                    <p className="mt-4 text-sm leading-8 text-paper-300/72">{item.description}</p>
                  </article>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
