import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getFeaturedWork, getPortfolio } from '@/lib/portfolio';
import { getExperienceArchive, getWorkCaseDate } from '@/lib/experience-archive';
import JsonLd from '@/components/JsonLd';
import ContactActions from '@/components/ContactActions';
import { CollectionHero, CollectionHeading, CollectionNext } from '@/components/spatial/Collections';
import { createPageMetadata, getPageKeywords, workStructuredData } from '@/lib/seo';
import '@/components/spatial/experience-archive.css';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = locale === 'zh'
    ? {
        title: '工作案例',
        description: 'Darren Su 的项目与工作经历：开发者活动、产品共创、大会主持、AI 分享与跨境交流，了解他在不同项目中的实际参与。',
      }
    : {
        title: 'Selected work',
        description: 'Darren Su’s projects and experience in developer events, product workshops, hosting, AI talks, and international technology exchanges.',
      };

  return createPageMetadata({
    locale,
    path: '/work',
    title: copy.title,
    description: copy.description,
    keywords: getPageKeywords(locale, 'work'),
  });
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { work } = getPortfolio(locale);
  const featured = getFeaturedWork(locale);
  const experienceSections = getExperienceArchive(locale);
  const copy =
    locale === 'zh'
      ? {
          title: '我发起、负责或参与的项目。',
          subtitle: '从社区活动、产品共创，到大会主持和跨境交流，这里记下我参与过的事。',
          selectedTitle: '代表项目',
          archiveTitle: '项目案例',
          experiencesTitle: '其他活动与交流',
          role: '我的角色',
          result: '项目结果',
          read: '查看完整案例',
          ctaTitle: '一起讨论你的项目',
          ctaDescription: '来信说明项目目标、参与对象和预计时间。我们可以先确认需要我参与的环节，再讨论具体安排。',
          collaborate: '查看合作方式',
        }
      : {
          title: 'Projects I have initiated, led, or contributed to.',
          subtitle: 'I’ve organized community events, worked with founders on product workshops, hosted sessions, and joined exchanges across borders.',
          selectedTitle: 'Selected projects',
          archiveTitle: 'Case studies',
          experiencesTitle: 'Other events and exchanges',
          role: 'My role',
          result: 'Project results',
          read: 'View the full case study',
          ctaTitle: 'Let’s discuss your project',
          ctaDescription: 'Tell me about your goals, intended participants, and timing. We can first agree on where I can contribute, then work through the details.',
          collaborate: 'Explore collaboration',
        };

  return (
    <>
      <JsonLd data={workStructuredData(locale)} />
      <main id="main-content" tabIndex={-1} className="collection-page collection-work">
        <div className="collection-container">
          <CollectionHero
            locale={locale}
            zone="work"
            title={locale === 'zh' ? '工作案例' : 'Selected work'}
            lead={copy.title}
            description={copy.subtitle}
          >
            <a className="collection-text-link" href="#work-archive">
              {locale === 'zh' ? '查看项目与经历' : 'Browse projects and experience'} <span aria-hidden="true">↓</span>
            </a>
          </CollectionHero>

          <section className="collection-section" aria-labelledby="work-selected-title">
            <CollectionHeading id="work-selected-title" title={copy.selectedTitle} />
            <div className="collection-work-featured">
              {featured.map((item, index) => (
                <article key={item.id} className={`collection-work-card ${index === 0 ? 'collection-work-card-featured' : ''}`}>
                  <Link href={item.href ?? '/work'} className="collection-photo" aria-label={`${copy.read} · ${item.title}`}>
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.imageAlt ?? ''}
                        fill
                        sizes={index === 0 ? '(min-width: 1000px) 60vw, 100vw' : '(min-width: 800px) 33vw, 100vw'}
                        className={item.imageClassName ?? ''}
                      />
                    ) : null}
                  </Link>
                  <div className="collection-work-card-body">
                    <p className="collection-meta">{item.location} · {item.year}</p>
                    <h3><Link href={item.href ?? '/work'}>{item.title}</Link></h3>
                    <p className="collection-description">{item.summary}</p>
                    <dl className="collection-work-facts">
                      <div><dt>{copy.role}</dt><dd>{item.role}</dd></div>
                      <div><dt>{copy.result}</dt><dd>{item.result}</dd></div>
                    </dl>
                    <Link href={item.href ?? '/work'} className="collection-text-link">{copy.read} <span aria-hidden="true">↗</span></Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="collection-section" id="work-archive" aria-labelledby="work-archive-title">
            <CollectionHeading id="work-archive-title" title={copy.archiveTitle} />
            <ul className="work-case-index">
              {work.map((item) => (
                <li key={item.id}>
                  <Link href={item.href ?? '/work'} className="work-case-index-link">
                    <div>
                      <h3>{item.title}</h3>
                      <p className="work-case-index-meta">
                        <span>{item.role}</span>
                        <span>{getWorkCaseDate(item.id, locale) ?? item.year}</span>
                      </p>
                    </div>
                    <span className="work-case-index-arrow" aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="collection-section work-experience-archive" id="experience-archive" aria-labelledby="experience-archive-title">
            <CollectionHeading id="experience-archive-title" title={copy.experiencesTitle} />
            {experienceSections.map((section) => (
              <section key={section.id} className="work-experience-group" aria-labelledby={section.id}>
                <h3 id={section.id}>{section.title}</h3>
                <ul className="work-experience-list">
                  {section.entries.map((entry) => (
                    <li key={entry.id}>
                      <div className="work-experience-entry-heading">
                        <h4>{entry.title}</h4>
                        {entry.date ? <p className="work-experience-date">{entry.date}</p> : null}
                      </div>
                      <p className="work-experience-role">{entry.role}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </section>

          <section className="collection-collaborate">
            <h2>{copy.ctaTitle}</h2>
            <p className="collection-description">{copy.ctaDescription}</p>
            <div className="collection-collaborate-actions">
              <Link href="/services" className="collection-button">{copy.collaborate} <span aria-hidden="true">↗</span></Link>
              <ContactActions locale={locale} context="work-cta" variant="light" />
            </div>
          </section>

          <CollectionNext
            href="/build"
            title={locale === 'zh' ? '看看我做的产品' : 'Explore my products'}
            description={locale === 'zh' ? '了解产品解决的问题、收到的反馈和当前状态。' : 'The problems they address, the feedback so far, and their current status.'}
          />
        </div>
      </main>
    </>
  );
}
