import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import { CollectionHero, CollectionHeading, CollectionNext } from '@/components/spatial/Collections';
import { Link } from '@/i18n/navigation';
import { getSiteContent } from '@/lib/siteContent';
import { createPageMetadata, productLabStructuredData } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'build' });

  return createPageMetadata({
    locale,
    path: '/build',
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: ['MatchPoint', 'GlobalTechEvents', 'Datawhale AI+X Events', 'multi-agent organization', 'AI products'],
  });
}

export default async function BuildPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const site = getSiteContent(locale);
  const labels = site.labels.productLab;
  const system = site.products.digitalOrganization;
  const copy = locale === 'zh'
    ? { title: '工作台上的作品。', details: '问题、反馈与下一步', inactive: '实验已结束', index: '工作台目录', status: '当前状态', tags: '相关方向' }
    : { title: 'On the workbench.', details: 'Problem, feedback & next step', inactive: 'Experiment ended', index: 'On this workbench', status: 'Current state', tags: 'Related topics' };

  return (
    <>
      <JsonLd data={productLabStructuredData(locale)} />
      <main id="main-content" tabIndex={-1} className="collection-page collection-build">
        <div className="collection-container">
          <CollectionHero
            locale={locale}
            zone="build"
            number="02"
            eyebrow={site.products.hero.eyebrow}
            title={copy.title}
            lead={site.products.hero.title}
            description={site.products.hero.subtitle}
          >
            <a className="collection-text-link" href="#product-workbench">{labels.selectedEyebrow} <span aria-hidden="true">↓</span></a>
          </CollectionHero>

          <div className="collection-note-strip">
            <p className="collection-kicker">{labels.sideEyebrow}</p>
            <p>{labels.sideQuote}</p>
          </div>

          <section className="collection-section" id="product-workbench">
            <CollectionHeading eyebrow={labels.selectedEyebrow} title={locale === 'zh' ? '从具体问题开始。' : 'Start with a real problem.'} description={labels.selectedStatement} />
            <nav className="collection-category-nav" aria-label={copy.index}>
              {site.products.items.map((project, index) => (
                <a key={project.id} href={`#product-${project.id}`}><span>{String(index + 1).padStart(2, '0')}</span>{project.name}</a>
              ))}
            </nav>
            <div className="collection-products">
              {site.products.items.map((project, index) => {
                const inactive = project.status === 'stopped' || project.status === '已停止';
                const media = <Image src={project.image} alt={project.name} fill sizes={index === 0 ? '(min-width: 1000px) 55vw, 100vw' : '(min-width: 800px) 45vw, 100vw'} />;
                return (
                  <article key={project.id} id={`product-${project.id}`} className={`collection-product ${index === 0 ? 'collection-product-featured' : ''} ${inactive ? 'collection-product-ended' : ''}`}>
                    <div className="collection-product-display">
                      <div className="collection-screen-bar" aria-hidden="true"><span /><span /><span /><i>{project.name}</i></div>
                      {inactive ? <div className="collection-product-image">{media}</div> : (
                        <a className="collection-product-image" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`${labels.visitProject} · ${project.name}`}>{media}</a>
                      )}
                      <div className="collection-product-strip">
                        <span className={`collection-status ${inactive ? 'collection-status-ended' : ''}`}><i aria-hidden="true" />{project.status}</span>
                        <span>{labels.projectLabel} {String(index + 1).padStart(2, '0')}</span>
                      </div>
                    </div>
                    <div className="collection-product-body">
                      <p className="collection-kicker">{project.tagline}</p>
                      <h2>{project.name}</h2>
                      <p className="collection-description">{project.description}</p>
                      <ul className="collection-tags" aria-label={copy.tags}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                      {inactive ? <p className="collection-inactive-label">{copy.inactive}</p> : (
                        <a className="collection-text-link" href={project.url} target="_blank" rel="noopener noreferrer">{labels.visitProject} <span aria-hidden="true">↗</span></a>
                      )}
                      <details className="collection-product-details" open={index === 0}>
                        <summary>{copy.details}<span aria-hidden="true">+</span></summary>
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
              <p className="collection-kicker">{system.eyebrow}</p>
              <h2>{system.title}</h2>
              <p className="collection-description">{system.description}</p>
              <div className="collection-system-metrics"><strong>{system.primaryMetric}</strong><strong>{system.secondaryMetric}</strong></div>
              <Link href={system.href} className="collection-text-link">{system.linkLabel} <span aria-hidden="true">↗</span></Link>
            </div>
          </section>

          <section className="collection-section collection-building-notes">
            <CollectionHeading eyebrow={labels.explainerEyebrow} title={labels.explainerTitle} />
            <div className="collection-principles">
              {labels.explainerItems.map((item, index) => (
                <article key={item.title}>
                  <span className="collection-kicker">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p className="collection-description">{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <CollectionNext
            locale={locale}
            zone="notes"
            href="/blog"
            title={locale === 'zh' ? '到窗边，翻一篇手记' : 'A field note by the window'}
            description={locale === 'zh' ? '关于做产品、运行 Agent，以及沿途经历的记录。' : 'Notes on building, running agents, and experiences along the way.'}
          />
        </div>
      </main>
    </>
  );
}
