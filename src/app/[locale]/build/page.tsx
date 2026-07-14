import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import { getSiteContent } from '@/lib/siteContent';
import { createPageMetadata, productLabStructuredData } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'build' });

  return createPageMetadata({
    locale,
    path: '/build',
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: ['Product Lab', 'AI product experiments', 'GlobalTechEvents', 'cross-border talent'],
  });
}

export default async function BuildPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const site = getSiteContent(locale);
  const titleParts = [site.products.hero.title];
  const mediaLabels =
    locale === 'zh'
      ? { status: '当前状态', tags: '相关方向', action: '入口', inactive: '实验已结束' }
      : { status: 'Current state', tags: 'Signals', action: 'Open', inactive: 'Experiment ended' };

  return (
    <>
      <JsonLd data={productLabStructuredData(locale)} />
      <main className="min-h-screen bg-paper-200 text-ink-950">
      <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden px-4 py-20 md:px-6 md:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-full bg-cover bg-center opacity-[0.58] mix-blend-multiply [mask-image:linear-gradient(180deg,transparent_0%,black_30%,black_100%)] md:w-[70%] md:[mask-image:linear-gradient(90deg,transparent_0%,black_22%,black_100%)]"
          style={{ backgroundImage: "url('/images/hero-product-bench.webp')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(241,234,220,0.98)_0%,rgba(241,234,220,0.83)_45%,rgba(251,248,241,0.28)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-ink-950/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(111,121,103,0.12),rgba(111,121,103,0)_34%)]" />
        <div className="container relative">
          <div className="mb-14 flex items-center gap-5">
            <span className="h-px flex-1 bg-ink-950/10" />
            <span className="academy-kicker">{site.labels.productLab.roomEyebrow}</span>
            <span className="h-px flex-1 bg-ink-950/10" />
          </div>

          <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <aside>
              <p className="academy-kicker">{site.labels.productLab.sideEyebrow}</p>
              <p className="mt-7 max-w-sm border-l border-zen-gold/45 pl-5 font-serif text-2xl leading-relaxed text-ink-800">
                {site.labels.productLab.sideQuote}
              </p>
            </aside>

            <div>
              <p className="academy-kicker">{site.products.hero.eyebrow}</p>
              <h1 className="heading-chunks mt-5 max-w-5xl font-serif text-[clamp(2.65rem,5.2vw,5.6rem)] leading-[1.08] text-ink-950">
                {titleParts.map((part) => (
                  <span key={part}>{part}</span>
                ))}
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-9 text-ink-600">
                {site.products.hero.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-paper-100 px-4 py-20 md:px-6 md:py-28">
        <div className="container">
          <div className="mb-12 grid gap-8 border-b border-ink-950/10 pb-10 lg:grid-cols-[0.34fr_1fr]">
            <div>
              <p className="academy-kicker">{site.labels.productLab.selectedEyebrow}</p>
            </div>
            <p className="max-w-3xl font-serif text-3xl leading-relaxed text-ink-900 md:text-4xl">
              {site.labels.productLab.selectedStatement}
            </p>
          </div>

          <div className="space-y-12">
          {site.products.items.map((project, index) => {
            const isInactive = project.status === 'stopped' || project.status === '已停止';
            const card = (
              <article className="natural-slip grid overflow-hidden lg:grid-cols-[1fr_1fr] lg:items-start">
                <div className="bg-paper-300/46 p-3 md:p-4">
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-paper-100/70">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        priority={index === 0}
                        className="project-image-muted object-contain transition duration-700"
                      />
                    </div>
                    <div className="grid border-x border-b border-ink-950/8 bg-paper-100/42 md:grid-cols-3">
                      <div className="border-b border-ink-950/8 p-5 md:border-b-0 md:border-r">
                        <p className="academy-kicker text-ink-700/48">{mediaLabels.status}</p>
                        <p className="mt-3 text-sm font-medium leading-7 text-ink-900">
                          {project.status}
                        </p>
                      </div>
                      <div className="border-b border-ink-950/8 p-5 md:border-b-0 md:border-r">
                        <p className="academy-kicker text-ink-700/48">{mediaLabels.tags}</p>
                        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs uppercase tracking-[0.12em] text-ink-600/58"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="academy-kicker text-ink-700/48">{mediaLabels.action}</p>
                        <div className={isInactive ? 'mt-3 text-sm text-ink-600/62' : 'quiet-link mt-3'}>
                          {isInactive ? mediaLabels.inactive : site.labels.productLab.visitProject}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-7 md:p-9 lg:p-10">
                  <p className="academy-kicker text-ink-700/50">
                    {site.labels.productLab.projectLabel} {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">
                    {project.name}
                  </h2>
                  <p className="mt-3 text-base text-zen-gold-dim/78">{project.tagline}</p>
                  <p className="mt-7 max-w-2xl text-base leading-8 text-ink-600">
                    {project.description}
                  </p>
                  <div className="mt-8 grid gap-5 border-t border-dashed border-ink-950/12 pt-7">
                    <div>
                      <p className="academy-kicker text-ink-700/48">{site.labels.productLab.problem}</p>
                      <p className="mt-3 text-sm leading-8 text-ink-600">{project.problem}</p>
                    </div>
                    <div>
                      <p className="academy-kicker text-ink-700/48">{site.labels.productLab.signal}</p>
                      <p className="mt-3 text-sm leading-8 text-ink-600">{project.signal}</p>
                    </div>
                    <div>
                      <p className="academy-kicker text-ink-700/48">{site.labels.productLab.nextStep}</p>
                      <p className="mt-3 text-sm leading-8 text-ink-600">{project.nextStep}</p>
                    </div>
                  </div>
                </div>
              </article>
            );

            return isInactive ? (
              <div key={project.id} className="block cursor-default opacity-[0.78]">
                {card}
              </div>
            ) : (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                {card}
              </a>
            );
          })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink-950 px-4 py-20 text-paper-100 md:px-6 md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(111,121,103,0.18),rgba(31,33,26,0)_58%)]" />
        <div className="container relative">
          <div className="grid gap-12 lg:grid-cols-[0.34fr_1fr] lg:gap-16">
            <aside>
              <p className="academy-kicker text-paper-300/62">{site.labels.productLab.explainerEyebrow}</p>
              <h2 className="mt-5 font-serif text-4xl leading-tight text-paper-100 md:text-5xl">
                {site.labels.productLab.explainerTitle}
              </h2>
            </aside>

            <div className="grid gap-0 overflow-hidden border-y border-paper-100/10 sm:grid-cols-3">
            {site.labels.productLab.explainerItems.map((item, index) => (
              <article
                key={item.title}
                className="min-h-[220px] border-b border-paper-100/10 p-7 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
              >
                <p className="academy-kicker text-paper-300/52">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-5 text-2xl font-medium text-paper-100">{item.title}</h3>
                <p className="mt-4 text-sm leading-8 text-paper-300/72">
                  {item.description}
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
