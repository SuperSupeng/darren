import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getFeaturedWork, getPortfolio, type PortfolioWork } from '@/lib/portfolio';
import JsonLd from '@/components/JsonLd';
import ContactActions from '@/components/ContactActions';
import { createPageMetadata, getPageKeywords, workStructuredData } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = locale === 'zh'
    ? {
        title: '工作与案例',
        description: 'Darren Su 发起并负责的 AI 开发者生态项目、科技大会合作、跨境 Workshop 与 Agent 分享。',
      }
    : {
        title: 'Work and case studies',
        description: 'AI developer ecosystem programs, technology conference collaborations, cross-border workshops, and agent talks initiated and led by Darren Su.',
      };

  return createPageMetadata({
    locale,
    path: '/work',
    title: copy.title,
    description: copy.description,
    keywords: getPageKeywords(locale, 'work'),
  });
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { work, metrics } = getPortfolio(locale);
  const featured = getFeaturedWork(locale);
  const categories: Array<{ key: PortfolioWork['category']; title: string; description: string }> =
    locale === 'zh'
      ? [
          { key: 'ecosystem', title: '开发者与城市项目', description: '包括城市社区、多城市联动和面向开发者的长期项目。' },
          { key: 'conference', title: '大会与科技品牌合作', description: '我通常作为项目负责人，参与议题设计、嘉宾邀请、现场执行和后续整理。' },
          { key: 'global', title: '跨境产品与生态合作', description: '包括邀请海外创始人来中国做产品 Workshop，也包括陪海外团队走访中国的高校、社区和 AI 公司。' },
          { key: 'speaking', title: '分享与工作坊', description: '主要分享 AI 使用、Agent 构建，以及我实际运行多 Agent 工作系统的经验。' },
        ]
      : [
          { key: 'ecosystem', title: 'Developer and city programs', description: 'City communities, multi-city collaborations, and longer-running programs for developers.' },
          { key: 'conference', title: 'Conference and technology partnerships', description: 'I usually lead the program, from topic and format design to speaker invitations, on-site delivery, and follow-up.' },
          { key: 'global', title: 'Cross-border product and ecosystem work', description: 'Helping global products meet developers in China, and taking part in exchanges between Chinese and international technology communities.' },
          { key: 'speaking', title: 'Talks and workshops', description: 'Mostly about practical AI use, agent building, and what I have learned from operating a multi-agent work system.' },
        ];
  const copy =
    locale === 'zh'
      ? {
          eyebrow: '我做过的项目',
          title: '这里整理了我近几年发起、负责和参与的项目。',
          subtitle: '其中有开发者活动，也有大会合作、产品 Workshop 和分享。每个项目都会尽量写清楚我负责什么、事情怎样推进，以及最后完成了什么。',
          selected: '几个代表项目',
          selectedTitle: '先从四个最近完成的项目开始。',
          archive: '项目索引',
          archiveTitle: '其余项目按照合作类型整理。',
          role: '我的角色',
          result: '规模与结果',
          read: '查看完整案例',
          ctaEyebrow: '一起工作',
          ctaTitle: '如果你正在做类似的事情，可以给我写信。',
          ctaDescription: '不用准备完整方案。简单说说你正在做什么、这次想解决什么，以及为什么想到找我，就够我们开始聊了。',
          collaborate: '查看合作方式',
        }
      : {
          eyebrow: 'Work archive',
          title: 'A record of projects I have initiated, led, or helped build in recent years.',
          subtitle: 'They include developer programs, conference partnerships, product workshops, and talks. Each entry explains my role, how the project was carried out, and what came out of it.',
          selected: 'Selected work',
          selectedTitle: 'Start with four recent projects.',
          archive: 'Work index',
          archiveTitle: 'Other projects, organized by type.',
          role: 'My role',
          result: 'Scale and outcome',
          read: 'View the full case study',
          ctaEyebrow: 'Work together',
          ctaTitle: 'If you are working on something similar, feel free to write.',
          ctaDescription: 'You do not need a finished proposal. A few lines about what you are building, what you want to solve, and why you thought of me are enough to begin.',
          collaborate: 'Explore collaboration',
        };

  return (
    <>
    <JsonLd data={workStructuredData(locale)} />
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-paper-100 text-ink-950">
      <section className="site-page-hero site-page-hero-work relative overflow-hidden px-4 py-24 md:px-6 md:py-32">
        <Image
          src="/images/hero-work-archive.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="site-page-hero-media object-cover object-center"
        />
        <div className="site-page-hero-veil" />
        <div className="container relative pt-8 md:pt-12">
          <p className="academy-kicker site-page-kicker">{copy.eyebrow}</p>
          <h1 className="site-page-title mt-6 max-w-5xl font-serif text-[clamp(2.6rem,7vw,7rem)] leading-[0.98] tracking-[-0.035em]">
            {copy.title}
          </h1>
          <p className="site-page-lead mt-8 max-w-3xl text-lg leading-9">{copy.subtitle}</p>

          <div className="site-page-metrics mt-10 grid grid-cols-2 gap-px md:mt-14 lg:grid-cols-4">
            {metrics.map((metric) => (
              <article key={metric.note} className="site-page-metric p-4 backdrop-blur-sm md:p-6">
                <p className="font-serif text-3xl">{metric.value}</p>
                <p className="mt-2 text-sm font-medium">{metric.label}</p>
                <p className="mt-4 font-mono text-xs leading-6">{metric.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-page-section home-reveal px-4 py-20 md:px-6 md:py-28">
        <div className="container">
          <div className="grid gap-6 border-b border-ink-950/10 pb-9 md:grid-cols-[0.3fr_1fr] md:gap-12">
            <p className="academy-kicker">{copy.selected}</p>
            <h2 className="max-w-4xl font-serif text-4xl leading-tight md:text-6xl">{copy.selectedTitle}</h2>
          </div>

          <div className="mt-12 space-y-12">
            {featured.map((item, index) => {
              const article = (
                <article className="site-case-card group grid overflow-hidden border border-ink-950/12 bg-paper-100 lg:grid-cols-[1.16fr_0.84fr]">
                  <div className={`relative min-h-[22rem] overflow-hidden bg-paper-300 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.imageAlt ?? ''}
                        fill
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className={`${item.imageClassName ?? 'object-cover'} saturate-[0.9] transition duration-700 group-hover:scale-[1.015]`}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgba(31,33,26,0.42))]" />
                    <p className="absolute bottom-5 left-5 font-mono text-xs uppercase tracking-[0.12em] text-paper-100">
                      {item.location} · {item.year}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between p-7 md:p-10 lg:p-12">
                    <div>
                      <p className="font-mono text-xs text-zen-gold-dim/90">{String(index + 1).padStart(2, '0')}</p>
                      <h3 className="mt-6 font-serif text-4xl leading-tight md:text-5xl">{item.title}</h3>
                      <p className="mt-7 text-base leading-8 text-ink-600">{item.summary}</p>
                    </div>
                    <dl className="mt-10 grid gap-5 border-t border-ink-950/10 pt-6">
                      <div>
                        <dt className="text-xs uppercase tracking-[0.12em] text-ink-700/90">{copy.role}</dt>
                        <dd className="mt-2 text-sm font-medium leading-7 text-ink-800">{item.role}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.12em] text-ink-700/90">{copy.result}</dt>
                        <dd className="mt-2 text-sm font-medium leading-7 text-ink-800">{item.result}</dd>
                      </div>
                    </dl>
                    {item.href ? <p className="mt-7 text-xs uppercase tracking-[0.12em] text-zen-gold-dim/90">{copy.read} →</p> : null}
                  </div>
                </article>
              );

              return item.href ? <Link key={item.id} href={item.href} className="block">{article}</Link> : <div key={item.id}>{article}</div>;
            })}
          </div>
        </div>
      </section>

      <section className="site-index-section home-reveal border-y border-ink-950/10 bg-paper-200/58 px-4 py-20 md:px-6 md:py-28">
        <div className="container">
          <div className="grid gap-7 lg:grid-cols-[0.34fr_1fr] lg:gap-16">
            <div>
              <p className="academy-kicker">{copy.archive}</p>
              <h2 className="mt-5 max-w-md font-serif text-4xl leading-tight md:text-5xl">{copy.archiveTitle}</h2>
            </div>
            <div>
              {categories.map((category) => {
                const items = work.filter((item) => item.category === category.key);
                return (
                  <section key={category.key} className="site-index-group border-t border-ink-950/12 py-9 first:border-t-0 first:pt-0">
                    <div className="grid gap-4 md:grid-cols-[0.42fr_0.58fr] md:gap-10">
                      <div>
                        <h3 className="font-serif text-3xl leading-tight">{category.title}</h3>
                        <p className="mt-4 max-w-md text-sm leading-7 text-ink-600">{category.description}</p>
                      </div>
                      <div>
                        {items.map((item) => (
                          <article key={item.id} className="border-b border-ink-950/10 py-5 first:pt-0 last:border-b-0 last:pb-0">
                            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                              <h4 className="text-lg font-medium text-ink-950">
                                <Link href={item.href ?? '/work'} className="transition-colors hover:text-zen-gold-dim">
                                  {item.title} <span aria-hidden="true">↗</span>
                                </Link>
                              </h4>
                              <p className="font-mono text-xs text-ink-700/90">{item.year} · {item.location}</p>
                            </div>
                            <div className="mt-3 grid gap-2 text-sm leading-7 text-ink-600 md:grid-cols-[0.42fr_0.58fr] md:gap-6">
                              <p>{item.role}</p>
                              <p className="font-medium text-ink-800">{item.result}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="site-page-cta home-reveal relative overflow-hidden bg-ink-950 px-4 py-20 text-paper-100 md:px-6 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(138,113,71,0.2),transparent_34%)]" />
        <div className="container relative grid gap-8 lg:grid-cols-[1.08fr_0.72fr] lg:items-end lg:gap-20">
          <div>
            <p className="academy-kicker text-paper-300/82">{copy.ctaEyebrow}</p>
            <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">{copy.ctaTitle}</h2>
          </div>
          <div>
            <p className="max-w-xl text-base leading-8 text-paper-300/74">{copy.ctaDescription}</p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link href="/services" className="btn bg-paper-100 text-ink-950 shadow-none hover:bg-paper-200">{copy.collaborate}</Link>
              <ContactActions locale={locale} context="work-cta" variant="dark" />
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
