import { Link } from '@/i18n/navigation';
import { getPortfolio, getWorkById } from '@/lib/portfolio';
import { getExperienceArchive } from '@/lib/experience-archive';
import ContactActions from '@/components/ContactActions';
import JobsNote from '@/components/JobsNote';
import RoomPortal from '@/components/spatial/RoomPortal';
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
        title: '聊聊合作',
        directions: '合作方式',
        otherDirections: '其他合作方式',
        studio: '看看工作室',
        cta: '还没确定形式，也可以先聊需求',
        ctaBody: '来信可以介绍你的团队或产品、希望达成的目标，以及预计时间。',
      }
    : {
        title: 'Work together',
        directions: 'Ways to collaborate',
        otherDirections: 'Other ways to collaborate',
        studio: 'Look around the studio',
        cta: 'Start with the need, even without a format in mind',
        ctaBody: 'Tell me about your team or product, what you hope to achieve, and the approximate timing.',
      };

  return (
    <main id="main-content" tabIndex={-1} className="interior-page interior-services collaboration-reading">
      <div className="collaboration-reading-wrap">
        <header className="collaboration-reading-intro">
          <h1>{copy.title}</h1>
          <details className="collaboration-reading-scene">
            <summary>{copy.studio}</summary>
            <RoomPortal zone="work" locale={locale} compact />
          </details>
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
            <JobsNote locale={locale} />
          </div>
        </section>
      </div>
    </main>
  );
}
