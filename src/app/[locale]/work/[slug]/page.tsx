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
        back: '返回项目索引',
        caseLabel: '项目记录',
        role: '我的角色',
        result: '规模与结果',
        place: '时间与地点',
        context: '事情从哪里开始',
        responsibilities: '我负责的部分',
        outcome: '最后完成了什么',
        reflection: '这件事留下的经验',
        materials: '可查看的公开记录',
        readMaterial: '阅读全文',
        note: '阅读相关现场记录',
        next: '下一个项目',
        contactEyebrow: '如果你正在做类似的事',
        contactTitle: '告诉我你想解决的问题。',
        contactBody: '不需要先准备完整方案。简单说明目标、时间和地点，就够我们开始判断是否适合。',
        collaborationBody: '了解这类合作适合什么情况、可以一起完成什么。已经有具体需求，也可以直接写邮件。',
      }
    : {
        back: 'Back to the work index',
        caseLabel: 'Case record',
        role: 'My role',
        result: 'Scale and outcome',
        place: 'Time and place',
        context: 'Where it started',
        responsibilities: 'What I handled',
        outcome: 'What was completed',
        reflection: 'What the work taught me',
        materials: 'Published records',
        readMaterial: 'Read the full article',
        note: 'Read the related field note',
        next: 'Next project',
        contactEyebrow: 'Working on something similar?',
        contactTitle: 'Tell me what you are trying to solve.',
        contactBody: 'You do not need a finished proposal. A short note with the goal, rough timing, and location is enough for us to decide whether there is a fit.',
        collaborationBody: 'See who this collaboration is for and what we can work on together. If you already have a specific need, you can also email me directly.',
      };

  return (
    <>
      <JsonLd data={workCaseStructuredData(work, locale)} />
      <main id="main-content" tabIndex={-1} className="interior-page case-page">
        <div className="interior-wrap">
          <header className="case-cover">
            <div className="interior-running-line">
              <Link href="/work" className="interior-text-link">← {copy.back}</Link>
              <span>{copy.caseLabel} / {String(currentIndex + 1).padStart(2, '0')}</span>
            </div>
            <div className="case-cover-grid">
              <div className="case-cover-copy">
                <p className="interior-kicker">{work.year} · {work.location}</p>
                <h1>{work.title}</h1>
                <p className="interior-lead">{work.summary}</p>
                <div className="case-result-stamp"><span>{copy.result}</span><p>{work.result}</p></div>
              </div>
              {work.image ? <figure className="interior-photo case-cover-photo">
                <div className="case-image-frame"><Image src={work.image} alt={work.imageAlt ?? work.title} fill priority sizes="(min-width: 900px) 47vw, 100vw" className={work.imageClassName ?? 'object-cover'} /></div>
                <figcaption><span>{work.title}</span><span>{work.year}</span></figcaption>
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
              <nav className="case-index" aria-label={locale === 'zh' ? '项目档案目录' : 'Case file contents'}>
                <a href="#case-context">01 <span>{copy.context}</span></a>
                <a href="#case-responsibilities">02 <span>{copy.responsibilities}</span></a>
                <a href="#case-outcome">03 <span>{copy.outcome}</span></a>
                <a href="#case-reflection">04 <span>{copy.reflection}</span></a>
              </nav>
            </aside>

            <div className="case-document">
              <section id="case-context" className="case-chapter case-opening">
                <h2 className="interior-kicker">01 · {copy.context}</h2>
                <p>{work.caseStudy.context}</p>
              </section>
              <section id="case-responsibilities" className="case-chapter">
                <h2 className="interior-kicker">02 · {copy.responsibilities}</h2>
                <ol className="interior-numbered-list">
                  {work.caseStudy.responsibilities.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></li>)}
                </ol>
              </section>
              <div className="case-outcomes">
                <section id="case-outcome" className="case-chapter">
                  <h2 className="interior-kicker">03 · {copy.outcome}</h2>
                  <p>{work.caseStudy.outcome}</p>
                  {work.caseStudy.outcomeNote ? <p className="case-margin-note">{work.caseStudy.outcomeNote}</p> : null}
                </section>
                <section id="case-reflection" className="case-chapter">
                  <h2 className="interior-kicker">04 · {copy.reflection}</h2>
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
            <div><p className="interior-kicker">{copy.contactEyebrow}</p><h2>{collaboration?.invitation ?? copy.contactTitle}</h2>
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
