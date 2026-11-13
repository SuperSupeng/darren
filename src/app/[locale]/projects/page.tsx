import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getPortfolio } from '@/lib/portfolio';
import { getExperienceArchive, getWorkCaseDate } from '@/lib/experience-archive';
import JsonLd from '@/components/JsonLd';
import { CollectionHero, CollectionHeading, CollectionNext } from '@/components/spatial/Collections';
import { createPageMetadata, getProjectsPageKeywords, projectsStructuredData } from '@/lib/seo';
import { getSiteContent } from '@/lib/siteContent';
import '@/components/spatial/experience-archive.css';
import '@/components/spatial/work-directory.css';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });
  return createPageMetadata({ locale, path: '/projects', title: t('meta.title'), description: t('meta.description'), keywords: getProjectsPageKeywords(locale) });
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const zh = locale === 'zh';
  const site = getSiteContent(locale);
  const { work } = getPortfolio(locale);
  const featuredIds = ['agent-speaking', 'superai-china', 'rumata-workshop'];
  const featured = featuredIds.flatMap(id => work.filter(item => item.id === id));
  const otherWork = work.filter(item => !featuredIds.includes(item.id));
  const experienceSections = getExperienceArchive(locale);
  const system = site.products.digitalOrganization;
  const labels = site.labels.productLab;
  const copy = site.projects;

  return <>
    <JsonLd data={projectsStructuredData(locale)} />
    <main id="main-content" tabIndex={-1} className="collection-page work-directory">
      <div className="collection-container">
        <CollectionHero zone="work" title={zh ? '案例与产品' : 'Work & products'} lead={zh ? '从做过的项目，了解我的工作。' : 'Get to know my work through these projects.'}>
          <nav className="collection-hero-actions" aria-label={zh ? '本页内容' : 'On this page'}>
            <a className="collection-text-link" href="#work-archive">{zh ? '项目案例' : 'Case studies'} ↓</a>
            <a className="collection-text-link" href="#product-workbench">{copy.productsTitle} ↓</a>
            <a className="collection-text-link" href="#experience-archive">{zh ? '其他经历' : 'Other experience'} ↓</a>
          </nav>
        </CollectionHero>
        <section className="work-directory-section" id="work-archive" aria-labelledby="work-selected-title">
          <CollectionHeading id="work-selected-title" title={zh ? '代表案例' : 'Selected work'} description={zh ? '包含个人实验和参与的项目，每篇都写明我的角色与经历。' : 'Personal experiments and projects I have taken part in. Each story explains my role.'} />
          <div className="work-directory-cases">
            {featured.map(item => <article key={item.id}>
              <Link className="work-directory-case" href={item.href ?? `/work/${item.id}`}>
                <div className="work-directory-photo">{item.image ? <Image src={item.image} alt="" fill sizes="(max-width:760px) 100px, 400px" className={item.imageClassName ?? ''} /> : null}</div>
                <div><p className="work-directory-meta">{item.role} · {item.year}</p><h3>{item.title}</h3><p>{item.heroSummary ?? item.summary}</p><span className="work-directory-action">{zh ? '阅读经历' : 'Read the story'} →</span></div>
              </Link>
            </article>)}
          </div>
          <h3 className="work-directory-subtitle">{zh ? '更多案例' : 'More projects'}</h3>
          <ul className="work-directory-index">{otherWork.map(item => <li key={item.id}><Link href={item.href ?? `/work/${item.id}`}><div><h3>{item.title}</h3><p>{item.role} · {getWorkCaseDate(item.id, locale) ?? item.year}</p></div><span aria-hidden="true">→</span></Link></li>)}</ul>
          <div className="work-directory-inquiry"><p>{zh ? '想讨论你团队里的 AI、组织或市场问题？' : 'Have a question about AI, your organization, or entering a market?'}</p><Link href="/consulting">{zh ? '了解咨询内容' : 'Explore consulting'} →</Link></div>
        </section>

        <section className="work-directory-section" id="product-workbench" aria-labelledby="work-products-title">
          <CollectionHeading id="work-products-title" title={copy.productsTitle} description={labels.selectedStatement} />
          <div className="work-directory-products">{site.products.items.map(project => {
            const inactive = project.status === 'stopped' || project.status === '已停止';
            return <article id={`product-${project.id}`} key={project.id} className="work-directory-product">
              <div className="work-directory-product-image"><Image src={project.image} alt={project.name} fill sizes="(max-width:760px) 100px, 350px" /></div>
              <div><p className="work-directory-meta">{project.status}</p><h3>{project.name}</h3><p>{project.description}</p>{!inactive ? <a className="work-directory-action" href={project.url} target="_blank" rel="noopener noreferrer">{labels.visitProject} <span aria-hidden="true">↗</span></a> : null}</div>
              <details><summary>{zh ? '为什么做，现在怎样了' : 'Why I built it and how it is going'}</summary><dl><div><dt>{labels.problem}</dt><dd>{project.problem}</dd></div><div><dt>{labels.signal}</dt><dd>{project.signal}</dd></div><div><dt>{labels.nextStep}</dt><dd>{project.nextStep}</dd></div></dl></details>
            </article>;
          })}</div>
          <aside className="work-directory-system"><h3>{system.title}</h3><p>{system.description}</p><Link className="work-directory-action" href={system.href}>{system.linkLabel} →</Link></aside>
        </section>

        <section className="work-directory-section" id="experience-archive">
          {/* Browsers can open this before hydration to reveal an incoming fragment. */}
          <details className="work-directory-experience" suppressHydrationWarning><summary>{copy.experiencesTitle} <span>{zh ? '查看经历' : 'View experience'} ↓</span></summary>
            {experienceSections.map(section => <section key={section.id} className="work-experience-group" aria-labelledby={section.id}>
              <h3 id={section.id}>{section.title}</h3><ul className="work-experience-list">{section.entries.map(entry => <li key={entry.id} id={entry.id}><div className="work-experience-entry-heading"><h4>{entry.title}</h4>{entry.date ? <p className="work-experience-date">{entry.date}</p> : null}</div>{entry.role ? <p className="work-experience-role">{entry.role}</p> : null}</li>)}</ul>
            </section>)}
          </details>
        </section>
        <CollectionNext href="/blog" title={zh ? '阅读文章' : 'Read my writing'} description={zh ? '做项目时的思考，还有工作之外的生活记录。' : 'Thoughts from these projects, along with life outside work.'} />
      </div>
    </main>
  </>;
}
