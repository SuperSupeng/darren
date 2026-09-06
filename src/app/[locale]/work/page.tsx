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
        title: '工作与案例',
        description: 'Darren Su 发起并负责的 AI 开发者生态项目、科技大会合作、跨境 Workshop 与 Agent 分享。',
      }
    : {
        title: 'Work and case studies',
        description: 'AI developer ecosystem programs, technology conference collaborations, cross-border workshops, and agent talks initiated and led by Darren Su.',
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
          { key: 'ecosystem', title: '开发者与城市项目', description: '包括城市社区、多城市联动和面向开发者的长期项目。' },
          { key: 'conference', title: '大会与科技品牌合作', description: '我通常作为项目负责人，参与议题设计、嘉宾邀请、现场执行和后续整理。' },
          { key: 'global', title: '跨境产品与生态合作', description: '包括邀请海外创始人来中国做产品 Workshop，也包括陪海外团队走访中国的高校、社区和 AI 公司。' },
          { key: 'speaking', title: '分享与工作坊', description: '主要分享 AI 使用、Agent 构建，以及我实际运行多 Agent 工作系统的经验。' },
        ]
      : [
          { key: 'ecosystem', title: 'Developer and city programs', description: 'City communities, multi-city collaborations, and longer-running programs for developers.' },
          { key: 'conference', title: 'Conference and technology partnerships', description: 'I usually lead the program, from topic and format design to speaker invitations, on-site delivery, and follow-up.' },
          { key: 'global', title: 'Cross-border product and ecosystem work', description: 'Helping global products meet developers in China, and taking part in exchanges between Chinese and international technology communities.' },
          { key: 'speaking', title: 'Talks and workshops', description: 'Mostly about practical AI use, agent building, and what I have learned from operating a multi-agent work system.' },
        ];
  const copy =
    locale === 'zh'
      ? {
          eyebrow: '我做过的项目',
          title: '这里整理了我近几年发起、负责和参与的项目。',
          subtitle: '其中有开发者活动，也有大会合作、产品 Workshop 和分享。每个项目都会尽量写清楚我负责什么、事情怎样推进，以及最后完成了什么。',
          selected: '几个代表项目',
          selectedTitle: '先从四个最近完成的项目开始。',
          archive: '项目索引',
          archiveTitle: '其余项目按照合作类型整理。',
          role: '我的角色',
          result: '规模与结果',
          read: '查看完整案例',
          ctaEyebrow: '一起工作',
          ctaTitle: '如果你正在做类似的事情，可以给我写信。',
          ctaDescription: '不用准备完整方案。简单说说你正在做什么、这次想解决什么，以及为什么想到找我，就够我们开始聊了。',
          collaborate: '查看合作方式',
        }
      : {
          eyebrow: 'Work archive',
          title: 'A record of projects I have initiated, led, or helped build in recent years.',
          subtitle: 'They include developer programs, conference partnerships, product workshops, and talks. Each entry explains my role, how the project was carried out, and what came out of it.',
          selected: 'Selected work',
          selectedTitle: 'Start with four recent projects.',
          archive: 'Work index',
          archiveTitle: 'Other projects, organized by type.',
          role: 'My role',
          result: 'Scale and outcome',
          read: 'View the full case study',
          ctaEyebrow: 'Work together',
          ctaTitle: 'If you are working on something similar, feel free to write.',
          ctaDescription: 'You do not need a finished proposal. A few lines about what you are building, what you want to solve, and why you thought of me are enough to begin.',
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
            title={locale === 'zh' ? '长桌档案。' : 'Around the table.'}
            lead={copy.title}
            description={copy.subtitle}
          >
            <a className="collection-text-link" href="#work-archive">
              {locale === 'zh' ? `翻阅全部 ${work.length} 个项目` : `Browse all ${work.length} projects`} <span aria-hidden="true">↓</span>
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
              title={locale === 'zh' ? '每一次聚在一起，都有来路。' : 'Every gathering has a story.'}
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
            title={locale === 'zh' ? '去产品工作台看看' : 'Over to the workbench'}
            description={locale === 'zh' ? '看看这些经历，怎样变成正在使用的产品。' : 'See how those experiences become working products.'}
          />
        </div>
      </main>
    </>
  );
}
