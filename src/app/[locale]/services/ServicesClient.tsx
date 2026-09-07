import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getPortfolio, getWorkById, type CollaborationPath } from '@/lib/portfolio';
import ContactActions from '@/components/ContactActions';
import RoomPortal from '@/components/spatial/RoomPortal';
import '@/components/spatial/interiors.css';
import '@/components/spatial/collaboration-reading.css';

const representativeWork: Record<CollaborationPath['id'], string> = {
  'developer-events': 'wechat-innovation-workshop',
  'product-workshops': 'rumata-workshop',
  'ai-talks': 'agent-speaking',
};

export default function ServicesClient({ locale }: { locale: string }) {
  const { collaborations } = getPortfolio(locale);
  const copy =
    locale === 'zh'
      ? {
          title: '聊聊合作',
          subtitle: '我参与开发者活动、产品体验和 AI 实践分享。看看哪一项与你的需求接近，也可以直接写信聊聊。',
          directions: '合作方式',
          otherDirections: '其他合作方式',
          studio: '看看工作室',
          whatHappens: '可以一起做什么',
          viewCase: '参考案例',
          readArticle: '阅读 Agent 实践文章',
          fieldSeparator: '：',
          needs: {
            'developer-events': '想组织开发者活动、多城市联动，或开展大会合作。',
            'product-workshops': '产品已可试用，想听到早期用户反馈，或接触中国开发者。',
            'ai-talks': '企业、大会、高校或开发者社区，想邀请我分享 AI 与 Agent 的实践经验。',
          },
          boundaryTitle: '合作前的几件事',
          boundaries: ['不出售联系人名单，也不提供付费接触社区成员的服务。', '只需要活动执行、但没有明确项目目标的合作，我目前不接。', '只有双方有合适的交流需求时，我才会引荐。', '我的个人合作，与 Datawhale、AGI Villa 的组织合作分开。'],
          cta: '还没确定形式，也可以先聊需求',
          ctaBody: '来信可以介绍你的团队或产品、希望达成的目标，以及预计时间。',
          inquiry: '产品体验可以附上试用链接和最想验证的问题；活动或分享可以说说参与者背景、城市与规模。',
        }
      : {
          title: 'Work together',
          subtitle: 'I work on developer events, product workshops, and talks on AI in practice. Explore a direction below, or email me to discuss what you have in mind.',
          directions: 'Ways to collaborate',
          otherDirections: 'Other ways to collaborate',
          studio: 'Look around the studio',
          whatHappens: 'What I can help with',
          viewCase: 'Related case study',
          readArticle: 'Read the article on my agent system',
          fieldSeparator: ':',
          needs: {
            'developer-events': 'For teams planning developer events, a multi-city series, or conference collaborations.',
            'product-workshops': 'For AI teams with a usable product seeking early feedback or conversations with developers in China.',
            'ai-talks': 'For companies, conferences, universities, and developer communities seeking practical AI talks.',
          },
          boundaryTitle: 'A few things to be clear about',
          boundaries: ['I do not sell contact lists or paid access to community audiences.', 'I do not take on events where the only ask is on-site execution and there is no clear project goal.', 'I make introductions only when both sides have a reason to talk.', 'My personal collaborations are separate from work undertaken through Datawhale or AGI Villa.'],
          cta: 'Start with the need, even without a format in mind',
          ctaBody: 'Tell me about your team or product, what you hope to achieve, and the approximate timing.',
          inquiry: 'For a product workshop, include a link people can try and the main question you want to explore. For an event or talk, describe the audience, location, and scale.',
        };

  return (
    <main id="main-content" tabIndex={-1} className="interior-page interior-services collaboration-reading">
      <div className="collaboration-reading-wrap">
        <header className="collaboration-reading-intro">
          <h1>{copy.title}</h1>
          <p>{copy.subtitle}</p>
          <details className="collaboration-reading-scene">
            <summary>{copy.studio}</summary>
            <RoomPortal zone="work" locale={locale} compact />
          </details>
        </header>
        <nav id="collaboration-options" className="collaboration-reading-index" aria-label={copy.directions}>
          {collaborations.map(path => <a href={`#${path.id}`} key={path.id}>{path.title}<span aria-hidden="true">↓</span></a>)}
        </nav>
        <div className="collaboration-reading-directions">
          {collaborations.map(path => {
            const work = getWorkById(locale, representativeWork[path.id]);

            if (!work) {
              throw new Error(`Missing representative work for collaboration: ${path.id}`);
            }

            return (
              <article id={path.id} key={path.id} tabIndex={-1} aria-labelledby={`${path.id}-title`} className={`collaboration-reading-direction collaboration-reading-${path.id}`}>
                <header className="collaboration-reading-heading">
                  <h2 id={`${path.id}-title`}>{path.title}</h2>
                  <p className="collaboration-reading-need">{copy.needs[path.id]}</p>
                </header>
                <div className="collaboration-reading-detail">
                  <section className="collaboration-reading-help" aria-labelledby={`${path.id}-help-title`}>
                    <h3 id={`${path.id}-help-title`}>{copy.whatHappens}</h3>
                    <ul>{path.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}</ul>
                  </section>
                  <div className="collaboration-reading-references">
                    <Link href={`/work/${work.id}`} className="collaboration-reading-case">
                      {work.image ? <div className="collaboration-reading-case-image"><Image src={work.image} alt={work.imageAlt ?? work.title} fill sizes="(max-width: 760px) 80vw, (max-width: 1200px) 45vw, 600px" className={work.imageClassName ?? 'object-cover'} /></div> : null}
                      <span className="collaboration-reading-case-title">{copy.viewCase}{copy.fieldSeparator} {work.title}<span aria-hidden="true">↗</span></span>
                    </Link>
                    {path.id === 'ai-talks' && work.noteHref ? <Link href={work.noteHref}>{copy.readArticle}<span aria-hidden="true">↗</span></Link> : null}
                  </div>
                  <a className="collaboration-reading-back" href="#collaboration-options">{copy.otherDirections}<span aria-hidden="true">↑</span></a>
                </div>
              </article>
            );
          })}
        </div>
        <section className="collaboration-reading-inquiry" aria-labelledby="collaboration-inquiry-title">
          <header><h2 id="collaboration-inquiry-title">{copy.cta}</h2></header>
          <div className="collaboration-reading-inquiry-body">
            <p>{copy.ctaBody}</p>
            <p>{copy.inquiry}</p>
            <ContactActions locale={locale} context="services-cta" className="collaboration-reading-contact" />
            <details className="collaboration-reading-boundaries">
              <summary>{copy.boundaryTitle}</summary>
              <ul>{copy.boundaries.map(boundary => <li key={boundary}>{boundary}</li>)}</ul>
            </details>
          </div>
        </section>
      </div>
    </main>
  );
}
