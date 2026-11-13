import { Link } from '@/i18n/navigation';
import { getPortfolio, getWorkById } from '@/lib/portfolio';
import { getExperienceArchive } from '@/lib/experience-archive';
import ContactActions from '@/components/ContactActions';
import {
  pricingLine,
  serviceIds,
  serviceOffers,
  talkList,
  visitArchiveLinks,
  visitCaseIds,
} from '@/lib/services-copy';
import '@/components/spatial/interiors.css';
import '@/components/spatial/collaboration-reading.css';

export default function ServicesClient({ locale }: { locale: string }) {
  const language = locale === 'zh' ? 'zh' : 'en';
  const { collaborations } = getPortfolio(locale);
  const talks = talkList[language];
  const archiveTitles = new Map(
    getExperienceArchive(locale).flatMap((section) => section.entries.map((entry) => [entry.id, entry.title]))
  );
  const visitLinks = [
    ...visitCaseIds.map((id) => {
      const work = getWorkById(locale, id);
      if (!work) throw new Error(`Missing visit case: ${id}`);
      return { href: `/work/${work.id}`, title: work.title };
    }),
    ...visitArchiveLinks.map((item) => ({
      href: item.href,
      title: archiveTitles.get(item.id) ?? item.id,
    })),
  ];
  const copy = language === 'zh'
    ? {
        title: '讲座与交流',
        directions: '合作方式',
        otherDirections: '其他合作方式',
        studio: '看看工作室',
        cta: '想邀请一场分享，或安排一次交流？',
        ctaBody: '来信介绍一下参与者、想讨论的话题和预计时间。形式还没定，也可以一起商量。',
      }
    : {
        title: 'Talks & exchanges',
        directions: 'Ways to collaborate',
        otherDirections: 'Other ways to collaborate',
        studio: 'Look around the studio',
        cta: 'Planning a talk, workshop, or visit?',
        ctaBody: 'Tell me who would take part, what you want to discuss, and when. We can work out the format together.',
      };

  return (
    <main id="main-content" tabIndex={-1} className="interior-page interior-services collaboration-reading">
      <div className="collaboration-reading-wrap">
        <header className="collaboration-reading-intro">
          <h1>{copy.title}</h1>
          <p>{language === 'zh' ? '我会结合做产品、用 Agent 和组织社区的经历，做分享、带工作坊，也陪海外团队走访中国 AI 公司和社区。企业管理和市场策略方面的问题，可以通过咨询来讨论。' : 'I draw on my work with products, agents, and communities for talks and workshops. I also accompany overseas teams visiting AI companies and communities in China. For questions about management or market strategy, I offer consulting.'}</p>
          <Link className="collaboration-reading-link" href="/consulting">{language === 'zh' ? '了解咨询方向 ↗' : 'Explore consulting ↗'}</Link>
        </header>
        <nav id="collaboration-options" className="collaboration-reading-index" aria-label={copy.directions}>
          {collaborations.map((path) => <a href={`#${path.id}`} key={path.id}>{path.title}<span aria-hidden="true">↓</span></a>)}
        </nav>
        <div className="collaboration-reading-directions">
          {collaborations.map((path) => {
            const offer = path.id === serviceIds.talks ? serviceOffers.talks[language] : serviceOffers.visits[language];
            return (
              <article id={path.id} key={path.id} tabIndex={-1} aria-labelledby={`${path.id}-title`} className={`collaboration-reading-direction collaboration-reading-${path.id}`}>
                <header className="collaboration-reading-heading">
                  <h2 id={`${path.id}-title`}>{offer.title}</h2>
                </header>
                <div className="collaboration-reading-detail">
                  <section className="collaboration-reading-help" aria-labelledby={`${path.id}-title`}>
                    {offer.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {path.id === serviceIds.talks ? (
                      <ul>{talks.map((talk) => <li key={talk}>{talk}</li>)}</ul>
                    ) : (
                      <ul>
                        {visitLinks.map((item) => (
                          <li key={item.href}><Link href={item.href}>{item.title}</Link></li>
                        ))}
                      </ul>
                    )}
                  </section>
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
            <p>{pricingLine[language]}</p>
            <ContactActions locale={locale} context="services-cta" className="collaboration-reading-contact" />

          </div>
        </section>
      </div>
    </main>
  );
}
