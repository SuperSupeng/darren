import Image from 'next/image';
import { notFound } from 'next/navigation';
import ContactActions from '@/components/ContactActions';
import JsonLd from '@/components/JsonLd';
import RoomPortal from '@/components/spatial/RoomPortal';
import '@/components/spatial/interiors.css';
import { Link } from '@/i18n/navigation';
import { locales } from '@/i18n/config';
import { getAllWorkIds, getPortfolio, getWorkById, getWorkCollaboration } from '@/lib/portfolio';
import { createPageMetadata, getPageKeywords, workCaseStructuredData } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllWorkIds().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const work = getWorkById(locale, slug);

  if (!work) {
    return {
      title: locale === 'zh' ? '案例未找到' : 'Case study not found',
      robots: { index: false, follow: false },
    };
  }

  return createPageMetadata({
    locale,
    path: `/work/${work.id}`,
    title: work.title,
    description: work.summary,
    keywords: [...getPageKeywords(locale, 'work'), work.title, work.location],
    image: work.image,
    imageWidth: work.imageWidth,
    imageHeight: work.imageHeight,
    imageAlt: work.imageAlt,
    availableLocales: locales,
  });
}

export default async function WorkCasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const work = getWorkById(locale, slug);

  if (!work) notFound();

  const works = getPortfolio(locale).work;
  const currentIndex = works.findIndex((item) => item.id === work.id);
  const nextWork = works[(currentIndex + 1) % works.length];
  const collaboration = getWorkCollaboration(locale, work.id);
  const copy = locale === 'zh'
    ? {
        back: '返回全部案例',
        role: '我的角色',
        result: '规模与结果',
        place: '时间与地点',
        context: '项目背景',
        responsibilities: '我负责的部分',
        outcome: '完成了什么',
        reflection: '我的体会',
        materials: '相关文章与资料',
        readMaterial: '查看资料',
        note: '阅读相关手记',
        next: '下一个项目',
        contactTitle: '告诉我你想解决的问题。',
        contactBody: '来信说说你的团队、目标、预计时间和地点，我们可以先聊聊。',
        collaborationBody: '合作页面介绍了适合的项目和具体做法。也可以直接来信，说说你的团队、目标和预计时间。',
      }
    : {
        back: 'Back to all case studies',
        role: 'My role',
        result: 'Scale and outcome',
        place: 'Time and place',
        context: 'Project background',
        responsibilities: 'What I handled',
        outcome: 'What was completed',
        reflection: 'What the work taught me',
        materials: 'Related articles and resources',
        readMaterial: 'View resource',
        note: 'Read the related field note',
        next: 'Next project',
        contactTitle: 'Tell me what you are trying to solve.',
        contactBody: 'Send a short note about your team, project goal, rough timing, and location. We can start there.',
        collaborationBody: 'The collaboration page explains the scope and how I work. You can also email me with your team, goal, and rough timing.',
      };

  return (
    <>
      <JsonLd data={workCaseStructuredData(work, locale)} />
      <main id="main-content" tabIndex={-1} className="interior-page case-page">
        <div className="interior-wrap">
          <header className="case-cover">
            <div className="interior-back-link">
              <Link href="/work" className="interior-text-link">← {copy.back}</Link>
            </div>
            <div className="case-cover-grid">
              <div className="case-cover-copy">
                <p className="interior-kicker">{work.year} · {work.location}</p>
                <h1>{work.title}</h1>
                <p className="interior-lead">{work.summary}</p>
                <div className="case-result-stamp"><span>{copy.result}</span><p>{work.result}</p></div>
              </div>
              {work.image ? <figure className="interior-photo case-cover-photo">
                <div className="case-image-frame"><Image src={work.image} alt={work.imageAlt ?? work.title} fill loading="eager" fetchPriority="high" sizes="(min-width: 900px) 47vw, 100vw" className={work.imageClassName ?? 'object-cover'} /></div>
              </figure> : null}
            </div>
          </header>

          <div className="case-layout">
            <aside className="case-sidebar">
              <RoomPortal zone="work" locale={locale} compact />
              <dl className="case-facts">
                <div><dt>{copy.role}</dt><dd>{work.role}</dd></div>
                <div><dt>{copy.result}</dt><dd>{work.result}</dd></div>
                <div><dt>{copy.place}</dt><dd>{work.year} · {work.location}</dd></div>
              </dl>
              <nav className="case-index" aria-label={locale === 'zh' ? '案例目录' : 'Case study contents'}>
                <a href="#case-context">{copy.context}</a>
                <a href="#case-responsibilities">{copy.responsibilities}</a>
                <a href="#case-outcome">{copy.outcome}</a>
                <a href="#case-reflection">{copy.reflection}</a>
              </nav>
              <a href={`/${locale}/work/${work.id}/source.md`} className="interior-text-link" download={`${work.id}.${locale}.md`}>{locale === 'zh' ? '下载纯文本案例' : 'Download case text'} ↓</a>
            </aside>

            <div className="case-document">
              <section id="case-context" className="case-chapter case-opening">
                <h2 className="interior-kicker">{copy.context}</h2>
                <p>{work.caseStudy.context}</p>
              </section>
              <section id="case-responsibilities" className="case-chapter">
                <h2 className="interior-kicker">{copy.responsibilities}</h2>
                <ul className="interior-plain-list">
                  {work.caseStudy.responsibilities.map(item => <li key={item}>{item}</li>)}
                </ul>
              </section>
              <div className="case-outcomes">
                <section id="case-outcome" className="case-chapter">
                  <h2 className="interior-kicker">{copy.outcome}</h2>
                  <p>{work.caseStudy.outcome}</p>
                  {work.caseStudy.outcomeNote ? <p className="case-margin-note">{work.caseStudy.outcomeNote}</p> : null}
                </section>
                <section id="case-reflection" className="case-chapter">
                  <h2 className="interior-kicker">{copy.reflection}</h2>
                  <p>{work.caseStudy.reflection}</p>
                </section>
              </div>
              {work.caseStudy.materials?.length ? <section aria-labelledby="work-materials-title" className="case-chapter">
                <h2 id="work-materials-title" className="interior-kicker">{copy.materials}</h2>
                <ul className="case-materials">
                  {work.caseStudy.materials.map(material => <li key={material.href}><Link href={material.href}>
                    <span className="interior-kicker">{material.type}</span>
                    <h3>{material.title}</h3><p>{material.description}</p>
                    <span className="interior-text-link">{copy.readMaterial} <span aria-hidden="true">↗</span></span>
                  </Link></li>)}
                </ul>
              </section> : work.noteHref ? <Link href={work.noteHref} className="interior-text-link case-note-link">{copy.note} →</Link> : null}
            </div>
          </div>

          <section className="interior-invitation">
            <div><h2>{collaboration?.invitation ?? copy.contactTitle}</h2>
              {collaboration ? <Link href={`/services#${collaboration.id}`} className="interior-text-link">{collaboration.linkLabel} →</Link> : null}
            </div>
            <div><p>{collaboration ? copy.collaborationBody : copy.contactBody}</p><ContactActions locale={locale} context={`work-case-${work.id}`} className="interior-contact" /></div>
          </section>
          <Link href={nextWork.href ?? '/work'} className="case-next">
            <span className="interior-kicker">{copy.next}</span>
            <div><h2>{nextWork.title}</h2><p>{nextWork.location} · {nextWork.year}</p></div>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </main>
    </>
  );
}
