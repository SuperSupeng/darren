import 'server-only';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import ContactActions from '@/components/ContactActions';
import { getPortfolio, getWorkById, type CollaborationPath } from '@/lib/portfolio';
import './studio-purpose.css';

const selectedCases: { workId: string; collaborationId: CollaborationPath['id'] }[] = [
  { workId: 'wechat-innovation-workshop', collaborationId: 'developer-events' },
  { workId: 'rumata-workshop', collaborationId: 'product-workshops' },
  { workId: 'agent-speaking', collaborationId: 'ai-talks' },
];

export default function StudioPurpose({ locale }: { locale: string }) {
  const { collaborations } = getPortfolio(locale);
  const cases = selectedCases.flatMap(({ workId, collaborationId }) => {
    const work = getWorkById(locale, workId);
    const collaboration = collaborations.find((item) => item.id === collaborationId);
    return work && collaboration ? [{ work, collaboration }] : [];
  });
  const copy = locale === 'zh'
    ? {
        eyebrow: '精选案例 / SELECTED WORK',
        title: '做过的项目',
        intro: '开发者活动、产品体验和 AI 分享。每份案例都记录了我的职责、过程和结果。',
        role: '我的角色',
        result: '项目结果',
        read: '查看案例',
        all: '更多工作案例',
        invitationEyebrow: '聊聊合作',
        invitation: '有项目想一起做？',
        invitationText: '欢迎写信介绍你的团队、正在筹备的事情和预计时间，我们可以一起讨论我能怎样参与。',
        directions: '合作方向',
      }
    : {
        eyebrow: 'SELECTED WORK',
        title: 'Projects I’ve worked on',
        intro: 'Developer events, product workshops, and AI talks, with my role, the work involved, and the outcomes of each.',
        role: 'My role',
        result: 'Outcome',
        read: 'View case study',
        all: 'More selected work',
        invitationEyebrow: 'WORK TOGETHER',
        invitation: 'Have a project in mind?',
        invitationText: 'Tell me about your team, what you’re planning, and your timeline. We can discuss how I might help.',
        directions: 'Ways to collaborate',
      };

  return (
    <div className="studio-purpose">
      <div className="studio-purpose-wrap">
        <section className="studio-purpose-evidence" aria-labelledby="studio-purpose-title">
          <div className="studio-purpose-heading">
            <div>
              <p className="studio-purpose-kicker">{copy.eyebrow}</p>
              <h2 id="studio-purpose-title">{copy.title}</h2>
            </div>
            <p className="studio-purpose-intro">{copy.intro}</p>
          </div>

          <div className="studio-purpose-cases">
            {cases.map(({ work, collaboration }) => (
              <article key={work.id} className="studio-purpose-case">
                <p className="studio-purpose-category">{collaboration.title}</p>
                <Link className="studio-purpose-photo" href={`/work/${work.id}`} aria-label={`${copy.read} · ${work.title}`}>
                  {work.image ? (
                    <Image
                      src={work.image}
                      alt={work.imageAlt ?? ''}
                      fill
                      sizes="(max-width: 760px) 88vw, (max-width: 1440px) 28vw, 380px"
                      loading="lazy"
                      className={work.imageClassName ?? ''}
                    />
                  ) : null}
                </Link>
                <div className="studio-purpose-case-copy">
                  <h3><Link href={`/work/${work.id}`}>{work.title}</Link></h3>
                  <dl className="studio-purpose-facts">
                    <div><dt>{copy.role}</dt><dd>{work.role}</dd></div>
                    <div><dt>{copy.result}</dt><dd>{work.result}</dd></div>
                  </dl>
                  <Link className="studio-purpose-link" href={`/work/${work.id}`}>{copy.read} <span aria-hidden="true">↗</span></Link>
                </div>
              </article>
            ))}
          </div>

          <div className="studio-purpose-all">
            <Link className="studio-purpose-link" href="/work">{copy.all} <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className="studio-purpose-invitation" aria-labelledby="studio-purpose-invitation-title">
          <div className="studio-purpose-invitation-copy">
            <p className="studio-purpose-kicker">{copy.invitationEyebrow}</p>
            <h2 id="studio-purpose-invitation-title">{copy.invitation}</h2>
            <p>{copy.invitationText}</p>
            <ContactActions locale={locale} context="home-purpose" className="studio-purpose-contact" />
            <noscript><style>{'.studio-purpose-contact > button{display:none!important}'}</style></noscript>
          </div>
          <nav className="studio-purpose-services" aria-label={copy.directions}>
            {cases.map(({ collaboration }) => (
              <Link key={collaboration.id} href={`/services#${collaboration.id}`}>
                <span className="studio-purpose-service-number" aria-hidden="true">{collaboration.number}</span>
                <span>{collaboration.title}</span>
                <span className="studio-purpose-service-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
        </section>
      </div>
    </div>
  );
}
