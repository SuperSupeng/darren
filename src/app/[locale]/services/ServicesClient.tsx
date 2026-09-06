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
          subtitle: '这里列了三种合作方式。可以先看看哪一项符合需要，再告诉我你的团队或产品、想做的事和预计时间。',
          bestFor: '适合',
          whatHappens: '可以一起做什么',
          inquiryTitle: '来信时，可以说说这三点',
          emailSubject: '合作咨询',
          fieldSeparator: '：',
          methodEyebrow: '工作方式',
          methodTitle: '先说清楚目标，再安排怎么做。',
          steps: [
            ['01', '确认目标', '想解决什么问题，希望哪些人参与，结束时需要完成什么。'],
            ['02', '确定参与者', '根据目标，确认需要邀请的开发者、嘉宾或合作社区，再安排沟通。'],
            ['03', '安排内容和形式', '根据目标和参与者，确定采用哪种活动或分享形式，并安排内容。'],
            ['04', '整理反馈', '结束后整理活动记录、产品使用反馈或后续合作意向，和团队商量下一步。'],
          ],
          boundaryEyebrow: '合作说明',
          boundaryTitle: '合作前，先说清楚几件事。',
          boundaries: ['不出售联系人名单，也不提供付费接触社区成员的服务。', '只需要活动执行、但没有明确项目目标的合作，我目前不接。', '只有双方有合适的交流需求时，我才会引荐。', '我的个人合作，与 Datawhale、AGI Villa 的组织合作分开。'],
          cta: '还没确定形式，也可以先聊需求。',
          ctaBody: '简单介绍你的团队、想做的事和预计时间，我们再讨论具体的合作方式。',
        }
      : {
          eyebrow: 'Collaborate',
          title: 'Developer events, product workshops, and talks on AI in practice.',
          subtitle: 'Here are three ways to work together. See which one fits your needs, then tell me about your team or product, what you want to do, and the timing.',
          bestFor: 'Best for',
          whatHappens: 'What I can help with',
          inquiryTitle: 'What to include in your email',
          emailSubject: 'Collaboration inquiry',
          fieldSeparator: ':',
          methodEyebrow: 'How I work',
          methodTitle: 'Agree on the goal, then plan the work.',
          steps: [
            ['01', 'Agree on the goal', 'What do you want to address, who should take part, and what needs to be completed?'],
            ['02', 'Decide who to invite', 'Identify the developers, speakers, or community partners relevant to the goal, then contact them.'],
            ['03', 'Plan the content and format', 'Choose an event or talk format that suits the goal and participants, then plan the content.'],
            ['04', 'Review the feedback', 'Collect the relevant event notes, user feedback, or follow-up interest, then discuss next steps with the team.'],
          ],
          boundaryEyebrow: 'Before we work together',
          boundaryTitle: 'A few things to be clear about.',
          boundaries: ['I do not sell contact lists or paid access to community audiences.', 'I do not take on events where the only ask is on-site execution and there is no clear project goal.', 'I make introductions only when both sides have a reason to talk.', 'My personal collaborations are separate from work undertaken through Datawhale or AGI Villa.'],
          cta: 'You can start with the need, even without a format in mind.',
          ctaBody: 'Tell me about your team, what you want to do, and the timing. We can discuss the details from there.',
        };

  return (
    <main id="main-content" tabIndex={-1} className="interior-page interior-services">
      <div className="interior-wrap">
        <div className="interior-running-line"><span>{copy.eyebrow}</span><span>{locale === 'zh' ? '项目目标、参与者与时间' : 'GOALS, PEOPLE & TIMING'}</span></div>
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
