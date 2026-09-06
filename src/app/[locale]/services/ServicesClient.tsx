import { getPortfolio } from '@/lib/portfolio';
import ContactActions from '@/components/ContactActions';
import RoomPortal from '@/components/spatial/RoomPortal';
import '@/components/spatial/interiors.css';

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
    <main id="main-content" tabIndex={-1} className="interior-page interior-services">
      <div className="interior-wrap">
        <div className="interior-running-line"><span>{copy.eyebrow}</span><span>{locale === 'zh' ? '在长桌旁，聊聊下一件事' : 'A CONVERSATION AT THE TABLE'}</span></div>
        <header className="interior-services-hero">
          <div><p className="interior-kicker">{copy.eyebrow} / 03</p><h1 className={locale === 'zh' ? 'interior-service-title-zh' : undefined}>{locale === 'zh'
            ? ['开发者活动、', '产品 Workshop，', '以及 AI 实践分享。'].map(phrase => <span key={phrase}>{phrase}</span>)
            : copy.title}</h1><p className="interior-lead">{copy.subtitle}</p></div>
          <RoomPortal zone="work" locale={locale} />
        </header>
        <nav className="interior-service-index" aria-label={locale === 'zh' ? '合作方式' : 'Ways to collaborate'}>
          {collaborations.map(path => <a href={`#${path.id}`} key={path.id}><span>{path.number}</span><span>{path.title}</span><span aria-hidden="true">↓</span></a>)}
        </nav>
        <div className="interior-service-files">
          {collaborations.map(path => <article id={path.id} key={path.id} aria-labelledby={`${path.id}-title`} className="interior-service-file">
            <header className="interior-service-heading"><p className="interior-kicker">{copy.eyebrow} / {path.number}</p><h2 id={`${path.id}-title`}>{path.title}</h2><p className="interior-kicker">{copy.bestFor}</p><p>{path.bestFor}</p></header>
            <div className="interior-service-details"><p className="interior-body">{path.description}</p><h3 className="interior-kicker">{copy.whatHappens}</h3>
              <ul className="interior-plain-list">{path.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}</ul>
            </div>
            <section className="interior-inquiry" aria-labelledby={`${path.id}-inquiry`}><h3 id={`${path.id}-inquiry`}>{copy.inquiryTitle}</h3>
              <ol>{path.inquiry.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></li>)}</ol>
              <ContactActions locale={locale} context={`services-${path.id}`} emailSubject={`${copy.emailSubject}${copy.fieldSeparator} ${path.title}`} emailBody={path.inquiry.map(item => `${item}${copy.fieldSeparator} `).join('\r\n\r\n')} className="interior-contact" />
            </section>
          </article>)}
        </div>
        <section className="interior-section interior-two-columns">
          <header className="interior-section-heading"><p className="interior-kicker">{copy.methodEyebrow}</p><h2>{copy.methodTitle}</h2></header>
          <div className="interior-process">{copy.steps.map(([number, title, body]) => <article key={number}><span className="interior-kicker">{number}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
        </section>
        <section className="interior-section interior-two-columns interior-inset-section">
          <header className="interior-section-heading"><p className="interior-kicker">{copy.boundaryEyebrow}</p><h2>{copy.boundaryTitle}</h2></header>
          <ul className="interior-plain-list">{copy.boundaries.map(boundary => <li key={boundary}>{boundary}</li>)}</ul>
        </section>
        <section className="interior-invitation"><h2>{copy.cta}</h2><div><p>{copy.ctaBody}</p><ContactActions locale={locale} context="services-cta" className="interior-contact" /></div></section>
      </div>
    </main>
  );
}
