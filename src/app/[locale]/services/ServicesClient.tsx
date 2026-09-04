import { getPortfolio } from '@/lib/portfolio';

export default function ServicesClient({ locale }: { locale: string }) {
  const { collaborations } = getPortfolio(locale);
  const copy =
    locale === 'zh'
      ? {
          eyebrow: '合作',
          title: '有人想办一场开发者活动，也有人想让产品见到第一批用户。',
          subtitle: '过去一年，我参与的合作大多从这些具体问题开始。也有人邀请我做 AI 或 Agent 分享，或者请我帮忙联系合适的嘉宾和生态伙伴。',
          quote: '我通常先问几件简单的事：这次为什么做，希望谁来，活动结束以后，团队准备根据现场的反馈做什么。规模和形式，会在这些问题清楚之后再决定。',
          bestFor: '适合',
          whatHappens: '一次合作可能包括',
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
          cta: '如果你觉得我们可以一起做点什么，欢迎来信。',
          ctaBody: '简单说说你正在做什么、这次想解决什么，以及大致的时间和地点。这些信息已经够我们开始聊了。',
          email: '给我写邮件',
        }
      : {
          eyebrow: 'Collaborate',
          title: 'Some teams come to me to organize a developer event. Others want to put a product in front of its first users.',
          subtitle: 'Over the past year, most collaborations began with one of these needs. Others began with an invitation to speak about AI or agents, or a request to recommend a speaker or ecosystem partner.',
          quote: 'I usually begin with a few simple questions: why are we doing this, who should be in the room, and what will the team do with the feedback afterward? Scale and format come later.',
          bestFor: 'Best for',
          whatHappens: 'A collaboration may include',
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
          cta: 'If you think we could work on something together, feel free to write.',
          ctaBody: 'Tell me briefly what you are building, what you hope to solve, and the rough timing and location. That is enough for us to begin.',
          email: 'Email me',
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
          <p className="site-page-quote mt-10 max-w-3xl border-l pl-5 font-serif text-xl leading-relaxed md:mt-12 md:text-3xl">{copy.quote}</p>
        </div>
      </section>

      <section className="site-page-section home-reveal px-4 py-20 md:px-6 md:py-28">
        <div className="container space-y-0">
          {collaborations.map((path) => (
            <article key={path.number} className="site-path-row grid gap-8 border-t border-ink-950/12 py-12 first:border-t-0 first:pt-0 lg:grid-cols-[0.12fr_0.38fr_0.5fr] lg:gap-12">
              <p className="font-mono text-xs text-zen-gold-dim/90">{path.number}</p>
              <div>
                <h2 className="font-serif text-4xl leading-tight md:text-5xl">{path.title}</h2>
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
            <a href="mailto:supeng842499467@gmail.com" className="btn mt-7 bg-paper-100 text-ink-950 shadow-none hover:bg-paper-200">{copy.email}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
