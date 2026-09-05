import { getPortfolio } from '@/lib/portfolio';
import ContactActions from '@/components/ContactActions';

export default function ServicesClient({ locale }: { locale: string }) {
  const { collaborations } = getPortfolio(locale);
  const copy =
    locale === 'zh'
      ? {
          eyebrow: '合作',
          title: '开发者活动、产品 Workshop，以及 AI 实践分享。',
          subtitle: '下面是三种常见的合作方式。找到与你的需求相近的一项，简单说说产品或项目、想解决的问题和预计时间，就可以开始聊。',
          bestFor: '适合',
          whatHappens: '一次合作可能包括',
          inquiryTitle: '来信时，带上这三点就好',
          emailSubject: '合作咨询',
          fieldSeparator: '：',
          methodEyebrow: '工作方式',
          methodTitle: '事情开始前，我通常会先确认几个问题。',
          steps: [
            ['01', '明确问题', '这次为什么做，希望谁来，结束以后团队要据此决定什么。'],
            ['02', '组织合适的人', '根据这次合作的目标，邀请合适的开发者、嘉宾、社区与生态伙伴。'],
            ['03', '把形式定下来', '形式可能是开发者活动、产品 Workshop、官方夜场、跨城项目或深度分享。'],
            ['04', '整理结果', '活动结束以后，整理用户反馈和后续合作意向，再和团队一起判断下一步做什么。'],
          ],
          boundaryEyebrow: '合作边界',
          boundaryTitle: '也有一些合作方式，我目前不会做。',
          boundaries: ['不出售联系人名单或社区流量', '如果只需要现场执行、却没有清楚的项目目标，我目前不会承接。', '只有双方确实合适时，我才会做引荐。', 'Datawhale、AGI Villa 与个人合作会保持清楚边界'],
          cta: '还没有确定合作形式，也可以先聊聊。',
          ctaBody: '告诉我你正在做什么，以及眼下最想解决的问题。我们可以从这里一起判断，哪种合作方式更合适。',
        }
      : {
          eyebrow: 'Collaborate',
          title: 'Developer events, product workshops, and talks on AI in practice.',
          subtitle: 'These are three common ways to work together. Start with the one closest to your needs, and tell me about your product or project, the question you want to explore, and your timing.',
          bestFor: 'Best for',
          whatHappens: 'A collaboration may include',
          inquiryTitle: 'Three things to include in your email',
          emailSubject: 'Collaboration inquiry',
          fieldSeparator: ':',
          methodEyebrow: 'How I work',
          methodTitle: 'Before we begin, I usually clarify a few things.',
          steps: [
            ['01', 'Clarify the question', 'Why are we doing this, who should attend, and what decision should the team be able to make afterward?'],
            ['02', 'Gather the right people', 'Invite developers, speakers, communities, and partners who fit the goal of the collaboration.'],
            ['03', 'Choose the format', 'It may be a developer event, product workshop, official side event, multi-city program, or deep-dive talk.'],
            ['04', 'Pull together the results', 'Afterward, I bring together user feedback and any follow-up interest, then work with the team to decide what comes next.'],
          ],
          boundaryEyebrow: 'Working boundaries',
          boundaryTitle: 'There are also a few kinds of work I do not currently take on.',
          boundaries: ['I do not sell contact lists or paid access to community audiences.', 'I do not take on events where the only ask is on-site execution and there is no clear project goal.', 'I make introductions only when there is a genuine fit on both sides.', 'I keep clear boundaries between Datawhale, AGI Villa, and my personal work.'],
          cta: 'You can write before you have a format in mind.',
          ctaBody: 'Tell me what you are working on and the question you most want to resolve. From there, we can work out which kind of collaboration fits.',
        };

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-paper-100 text-ink-950">
      <section className="site-page-hero site-page-hero-services relative overflow-hidden px-4 py-24 md:px-6 md:py-32">
        <div
          aria-hidden="true"
          className="site-page-hero-media absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-services-room.webp')" }}
        />
        <div className="site-page-hero-veil" />
        <div className="container relative pt-8 md:pt-12">
          <p className="academy-kicker site-page-kicker">{copy.eyebrow}</p>
          <h1 className="site-page-title mt-6 max-w-5xl font-serif text-[clamp(2.5rem,7vw,6.8rem)] leading-[0.98] tracking-[-0.035em]">{copy.title}</h1>
          <p className="site-page-lead mt-8 max-w-3xl text-lg leading-9">{copy.subtitle}</p>
        </div>
      </section>

      <section className="site-page-section home-reveal px-4 py-20 md:px-6 md:py-28">
        <div className="container space-y-0">
          {collaborations.map((path) => (
            <article id={path.id} key={path.id} aria-labelledby={`${path.id}-title`} className="site-path-row grid scroll-mt-24 gap-8 border-t border-ink-950/12 py-12 first:border-t-0 first:pt-0 lg:grid-cols-[0.12fr_0.38fr_0.5fr] lg:gap-12">
              <p className="font-mono text-xs text-zen-gold-dim/90">{path.number}</p>
              <div>
                <h2 id={`${path.id}-title`} className="font-serif text-4xl leading-tight md:text-5xl">{path.title}</h2>
                <p className="mt-6 text-sm uppercase tracking-[0.1em] text-zen-gold-dim/90">{copy.bestFor}</p>
                <p className="mt-3 text-sm font-medium leading-7 text-ink-800">{path.bestFor}</p>
              </div>
              <div>
                <p className="text-base leading-8 text-ink-600">{path.description}</p>
                <p className="mt-8 text-xs uppercase tracking-[0.12em] text-zen-gold-dim/90">{copy.whatHappens}</p>
                <ul className="mt-4 grid gap-3">
                  {path.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-3 border-t border-ink-950/8 pt-3 text-sm leading-7 text-ink-700">
                      <span className="text-zen-gold-dim/90">—</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-ink-950/12 pt-6 lg:col-span-2 lg:col-start-2">
                <h3 className="text-sm font-medium text-ink-800">{copy.inquiryTitle}</h3>
                <ol className="mt-4 grid gap-3 md:grid-cols-3">
                  {path.inquiry.map((item, index) => (
                    <li key={item} className="flex gap-3 text-sm leading-7 text-ink-600">
                      <span className="font-mono text-xs leading-7 text-zen-gold-dim/90">{index + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
                <ContactActions
                  locale={locale}
                  context={`services-${path.id}`}
                  emailSubject={`${copy.emailSubject}${copy.fieldSeparator} ${path.title}`}
                  emailBody={path.inquiry.map((item) => `${item}${copy.fieldSeparator} `).join('\r\n\r\n')}
                  className="mt-5"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="site-process-section home-reveal border-y border-ink-950/10 bg-paper-200/58 px-4 py-20 md:px-6 md:py-28">
        <div className="container grid gap-12 lg:grid-cols-[0.38fr_0.62fr] lg:gap-20">
          <div>
            <p className="academy-kicker">{copy.methodEyebrow}</p>
            <h2 className="mt-5 max-w-lg font-serif text-4xl leading-tight md:text-5xl">{copy.methodTitle}</h2>
          </div>
          <div className="border-t border-ink-950/12">
            {copy.steps.map(([number, title, body]) => (
              <article key={number} className="grid gap-4 border-b border-ink-950/12 py-7 md:grid-cols-[4rem_0.36fr_0.64fr] md:gap-7">
                <p className="font-mono text-xs text-zen-gold-dim/90">{number}</p>
                <h3 className="text-xl font-medium text-ink-950">{title}</h3>
                <p className="text-sm leading-7 text-ink-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-page-section home-reveal bg-paper-100 px-4 py-20 md:px-6 md:py-24">
        <div className="container grid gap-10 lg:grid-cols-[0.56fr_0.44fr] lg:gap-20">
          <div>
            <p className="academy-kicker">{copy.boundaryEyebrow}</p>
            <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">{copy.boundaryTitle}</h2>
          </div>
          <ul className="border-t border-ink-950/12">
            {copy.boundaries.map((boundary) => (
              <li key={boundary} className="flex gap-4 border-b border-ink-950/12 py-5 text-sm leading-7 text-ink-600">
                <span className="text-zen-gold-dim/90">—</span>
                <span>{boundary}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="site-page-cta home-reveal relative overflow-hidden bg-ink-950 px-4 py-20 text-paper-100 md:px-6 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(138,113,71,0.22),transparent_33%)]" />
        <div className="container relative grid gap-8 lg:grid-cols-[1.08fr_0.72fr] lg:items-end lg:gap-20">
          <h2 className="max-w-4xl font-serif text-4xl leading-tight md:text-6xl">{copy.cta}</h2>
          <div>
            <p className="max-w-xl text-base leading-8 text-paper-300/74">{copy.ctaBody}</p>
            <ContactActions locale={locale} context="services-cta" variant="dark" className="mt-7" />
          </div>
        </div>
      </section>
    </main>
  );
}
