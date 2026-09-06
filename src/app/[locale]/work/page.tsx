import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getFeaturedWork, getPortfolio, type PortfolioWork } from '@/lib/portfolio';
import JsonLd from '@/components/JsonLd';
import ContactActions from '@/components/ContactActions';
import { CollectionHero, CollectionHeading, CollectionNext } from '@/components/spatial/Collections';
import { createPageMetadata, getPageKeywords, workStructuredData } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = locale === 'zh'
    ? {
        title: '工作案例',
        description: 'Darren Su 的开发者活动、科技大会合作、产品 Workshop 与 AI 分享案例，记录项目职责、执行过程和结果。',
      }
    : {
        title: 'Selected work',
        description: 'Developer events, technology conference collaborations, product workshops, and AI talks, with Darren Su’s role, process, and results in each case.',
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
  const { work, metrics } = getPortfolio(locale);
  const featured = getFeaturedWork(locale);
  const categories: Array<{ key: PortfolioWork['category']; title: string; description: string }> =
    locale === 'zh'
      ? [
          { key: 'ecosystem', title: '开发者生态项目', description: '城市社区、多城市联动和面向开发者的长期项目。' },
          { key: 'conference', title: '大会与科技品牌合作', description: '活动内容、嘉宾邀请、现场执行，以及我在项目中的具体职责。' },
          { key: 'global', title: '跨境产品与交流', description: '邀请海外创始人来中国做产品 Workshop，也陪海外团队走访高校、社区和 AI 公司。' },
          { key: 'speaking', title: 'AI 与 Agent 分享', description: 'AI 使用、Agent 构建，以及运行多 Agent 工作系统的实践经验。' },
        ]
      : [
          { key: 'ecosystem', title: 'Developer ecosystem programs', description: 'City communities, multi-city collaborations, and longer-running programs for developers.' },
          { key: 'conference', title: 'Conference and technology partnerships', description: 'Program content, speaker invitations, on-site delivery, and my responsibilities in each project.' },
          { key: 'global', title: 'Cross-border products and exchanges', description: 'Inviting overseas founders to China for product workshops, and accompanying teams on visits to universities, communities, and AI companies.' },
          { key: 'speaking', title: 'AI and agent talks', description: 'Practical experience with AI tools, agent building, and running a multi-agent work system.' },
        ];
  const copy =
    locale === 'zh'
      ? {
          eyebrow: '项目与合作',
          title: '我发起、负责或参与的项目。',
          subtitle: '开发者活动、大会合作、产品 Workshop 与 AI 分享。每个案例记录合作背景、我的职责、执行过程和结果。',
          selected: '几个代表项目',
          selectedTitle: '近期项目',
          archive: '项目索引',
          archiveTitle: '按类型查看项目，了解相应的合作经验。',
          role: '我的角色',
          result: '项目结果',
          read: '查看完整案例',
          ctaEyebrow: '项目合作',
          ctaTitle: '一起讨论你的项目',
          ctaDescription: '来信说明项目目标、参与对象和预计时间。我们可以先确认需要我参与的环节，再讨论具体安排。',
          collaborate: '查看合作方式',
        }
      : {
          eyebrow: 'Projects and collaborations',
          title: 'Projects I have initiated, led, or contributed to.',
          subtitle: 'Developer events, conference partnerships, product workshops, and AI talks. Each case records the context, my role, the process, and the results.',
          selected: 'Selected work',
          selectedTitle: 'Recent projects',
          archive: 'Work index',
          archiveTitle: 'Browse by type to find relevant collaboration experience.',
          role: 'My role',
          result: 'Project results',
          read: 'View the full case study',
          ctaEyebrow: 'Project collaboration',
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
            number="01"
            eyebrow={copy.eyebrow}
            title={locale === 'zh' ? '工作案例' : 'Selected work'}
            lead={copy.title}
            description={copy.subtitle}
          >
            <a className="collection-text-link" href="#work-archive">
              {locale === 'zh' ? `查看全部 ${work.length} 个项目` : `Browse all ${work.length} projects`} <span aria-hidden="true">↓</span>
            </a>
          </CollectionHero>

          <div className="collection-metrics">
            {metrics.map((metric) => (
              <div key={metric.note}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
                <small>{metric.note}</small>
              </div>
            ))}
          </div>

          <section className="collection-section" aria-labelledby="work-selected-title">
            <CollectionHeading id="work-selected-title" eyebrow={copy.selected} title={copy.selectedTitle} />
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
                    <span className="collection-photo-number">{String(index + 1).padStart(2, '0')}</span>
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

          <section className="collection-section collection-archive" id="work-archive">
            <CollectionHeading
              eyebrow={copy.archive}
              title={locale === 'zh' ? '全部项目' : 'All projects'}
              description={copy.archiveTitle}
            />
            <nav className="collection-category-nav" aria-label={locale === 'zh' ? '按合作类型浏览' : 'Browse by collaboration type'}>
              {categories.map((category) => (
                <a key={category.key} href={`#category-${category.key}`}>
                  {category.title}<span>{work.filter((item) => item.category === category.key).length}</span>
                </a>
              ))}
            </nav>
            {categories.map((category) => (
              <section key={category.key} id={`category-${category.key}`} className="collection-work-group">
                <div className="collection-work-group-intro">
                  <h3>{category.title}</h3>
                  <p className="collection-description">{category.description}</p>
                </div>
                <div className="collection-work-index">
                  {work.filter((item) => item.category === category.key).map((item) => (
                    <Link key={item.id} href={item.href ?? '/work'} className="collection-work-row">
                      <div className="collection-work-row-image">
                        {item.image ? <Image src={item.image} alt="" fill sizes="(max-width: 600px) 80px, 112px" className={item.imageClassName ?? ''} /> : null}
                      </div>
                      <div>
                        <p className="collection-meta">{item.year} · {item.location}</p>
                        <h4>{item.title}</h4>
                        <p className="collection-work-row-role">{item.role}</p>
                        <p className="collection-description">{item.result}</p>
                      </div>
                      <span className="collection-row-arrow" aria-hidden="true">↗</span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </section>

          <section className="collection-collaborate">
            <p className="collection-kicker">{copy.ctaEyebrow}</p>
            <h2>{copy.ctaTitle}</h2>
            <p className="collection-description">{copy.ctaDescription}</p>
            <div className="collection-collaborate-actions">
              <Link href="/services" className="collection-button">{copy.collaborate} <span aria-hidden="true">↗</span></Link>
              <ContactActions locale={locale} context="work-cta" variant="light" />
            </div>
          </section>

          <CollectionNext
            locale={locale}
            zone="build"
            href="/build"
            title={locale === 'zh' ? '看看我做的产品' : 'Explore my products'}
            description={locale === 'zh' ? '了解产品解决的问题、收到的反馈和当前状态。' : 'The problems they address, the feedback so far, and their current status.'}
          />
        </div>
      </main>
    </>
  );
}
