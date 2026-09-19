import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getFeaturedWork, getPortfolio } from '@/lib/portfolio';
import { getExperienceArchive, getWorkCaseDate } from '@/lib/experience-archive';
import JsonLd from '@/components/JsonLd';
import { CollectionHero, CollectionHeading, CollectionNext } from '@/components/spatial/Collections';
import { createPageMetadata, getPageKeywords, projectsStructuredData } from '@/lib/seo';
import { getSiteContent } from '@/lib/siteContent';
import '@/components/spatial/experience-archive.css';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });

  return createPageMetadata({
    locale,
    path: '/projects',
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: [...getPageKeywords(locale, 'work'), 'MatchPoint', 'GlobalTechEvents', 'Datawhale AI+X Events'],
  });
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const site = getSiteContent(locale);
  const labels = site.labels.productLab;
  const { work } = getPortfolio(locale);
  const featured = getFeaturedWork(locale);
  const experienceSections = getExperienceArchive(locale);
  const system = site.products.digitalOrganization;
  const copy = site.projects;
  const details = locale === 'zh' ? '问题、反馈与下一步' : 'Problem, feedback & next step';

  return (
    <>
      <JsonLd data={projectsStructuredData(locale)} />
      <main id="main-content" tabIndex={-1} className="collection-page collection-work collection-build">
        <div className="collection-container">
          <CollectionHero
            locale={locale}
            zone="work"
            title={locale === 'zh' ? '项目' : 'Projects'}
            lead={copy.hero.title}
            description={copy.hero.subtitle}
          >
            <a className="collection-text-link" href="#product-workbench">
              {copy.productsTitle} <span aria-hidden="true">↓</span>
            </a>
          </CollectionHero>

          <section className="collection-section" id="product-workbench">
            <CollectionHeading title={copy.productsTitle} description={labels.selectedStatement} />
            <nav className="collection-category-nav" aria-label={copy.productsTitle}>
              {site.products.items.map((project) => (
                <a key={project.id} href={`#product-${project.id}`}>{project.name}</a>
              ))}
            </nav>
            <div className="collection-products">
              {site.products.items.map((project, index) => {
                const inactive = project.status === 'stopped' || project.status === '已停止';
                const media = <Image src={project.image} alt={project.name} fill sizes={index === 0 ? '(min-width: 1000px) 55vw, 100vw' : '(min-width: 800px) 45vw, 100vw'} />;
                return (
                  <article key={project.id} id={`product-${project.id}`} className={`collection-product ${index === 0 ? 'collection-product-featured' : ''} ${inactive ? 'collection-product-ended' : ''}`}>
                    <div className="collection-product-display">
                      <div className="collection-screen-bar" aria-hidden="true"><span /><span /><span /></div>
                      {inactive ? <div className="collection-product-image">{media}</div> : (
                        <a className="collection-product-image" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`${labels.visitProject} · ${project.name}`}>{media}</a>
                      )}
                      <div className="collection-product-strip">
                        <span className={`collection-status ${inactive ? 'collection-status-ended' : ''}`}><i aria-hidden="true" />{project.status}</span>
                      </div>
                    </div>
                    <div className="collection-product-body">
                      <h2>{project.name}</h2>
                      <p className="collection-description">{project.description}</p>
                      {inactive ? null : (
                        <a className="collection-text-link" href={project.url} target="_blank" rel="noopener noreferrer">{labels.visitProject} <span aria-hidden="true">↗</span></a>
                      )}
                      <details className="collection-product-details" open={index === 0}>
                        <summary>{details}<span aria-hidden="true">+</span></summary>
                        <dl>
                          <div><dt>{labels.problem}</dt><dd>{project.problem}</dd></div>
                          <div><dt>{labels.signal}</dt><dd>{project.signal}</dd></div>
                          <div><dt>{labels.nextStep}</dt><dd>{project.nextStep}</dd></div>
                        </dl>
                      </details>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="collection-system">
            <div className="collection-system-image"><Image src={system.image} alt={system.imageAlt} fill sizes="(min-width: 900px) 50vw, 100vw" /></div>
            <div className="collection-system-body">
              <h2>{system.title}</h2>
              <p className="collection-description">{system.description}</p>
              <div className="collection-system-metrics"><strong>{system.primaryMetric}</strong><strong>{system.secondaryMetric}</strong></div>
              <Link href={system.href} className="collection-text-link">{system.linkLabel} <span aria-hidden="true">↗</span></Link>
            </div>
          </section>

          <section className="collection-section" aria-labelledby="work-selected-title">
            <CollectionHeading id="work-selected-title" title={copy.casesTitle} />
            <div className="collection-work-featured">
              {featured.map((item, index) => (
                <article key={item.id} className={`collection-work-card ${index === 0 ? 'collection-work-card-featured' : ''}`}>
                  <Link href={item.href ?? '/projects'} className="collection-photo" aria-label={`${copy.read} · ${item.title}`}>
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
                    <h3><Link href={item.href ?? '/projects'}>{item.title}</Link></h3>
                    <p className="collection-description">{item.summary}</p>
                    <dl className="collection-work-facts">
                      <div><dt>{copy.role}</dt><dd>{item.role}</dd></div>
                      <div><dt>{copy.result}</dt><dd>{item.result}</dd></div>
                    </dl>
                    <Link href={item.href ?? '/projects'} className="collection-text-link">{copy.read} <span aria-hidden="true">↗</span></Link>
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
                  <Link href={item.href ?? '/projects'} className="work-case-index-link">
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

          <CollectionNext
            href="/blog"
            title={locale === 'zh' ? '阅读文章' : 'Read my writing'}
            description={locale === 'zh' ? '关于产品开发、Agent 实践和工作经历的长文。' : 'Essays on product development, agent practice, and work.'}
          />
        </div>
      </main>
    </>
  );
}
