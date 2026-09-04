import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getSiteContent } from '@/lib/siteContent';

export default function FeaturedProjects({ locale }: { locale: string }) {
  const site = getSiteContent(locale);
  const featuredProject = site.products.items[0];
  const otherProjects = site.products.items.slice(1, 3);
  const copy =
    locale === 'zh'
      ? {
          eyebrow: '正在做的产品 / BUILDING',
          title: '过去一年，有几位创\u2060始\u2060人来找我，聊起同一个难题：招人。',
          description:
            '他们关心技能是否匹配，也想知道一个人遇到陌生问题时会怎么想、怎么做。简历很难说明这些，候选人也很难只凭一段职位描述理解真实的工作。MatchPoint 就是在一次次这样的谈话之后开始的。',
          why: '产品已经上线，目前正在实际招聘中继续验证。',
          open: '打开 MatchPoint',
          more: '另外，我还在维护两个工具',
          all: '查看其他产品和实验',
        }
      : {
          eyebrow: 'BUILDING / PRODUCTS',
          title: 'Over the past year, several founders came to me with the same problem: hiring.',
          description:
            'Founders want to know whether a candidate has the right skills, but also how that person thinks and acts when facing an unfamiliar problem. A résumé rarely shows this, and a short job description gives candidates little sense of the day-to-day work. MatchPoint grew out of a series of conversations like these.',
          why: 'The product is live and is now being used in real hiring.',
          open: 'Open MatchPoint',
          more: 'I also maintain two other tools',
          all: 'View other products and experiments',
        };

  return (
    <section id="build" className="product-lab-scene">
      <p className="product-lab-display" aria-hidden="true">
        {locale === 'zh' ? '正在做' : 'BUILDING'}
      </p>

      <div className="container product-lab-heading">
        <p className="directed-kicker">{copy.eyebrow}</p>
        <h2>{copy.title}</h2>
        <div>
          <p>{copy.description}</p>
          <strong>{copy.why}</strong>
        </div>
      </div>

      <a
        href={featuredProject.url}
        target="_blank"
        rel="noopener noreferrer"
        className="container product-lab-feature"
      >
        <div className="product-lab-screen">
          <Image
            src={featuredProject.image}
            alt={featuredProject.name}
            fill
            sizes="(min-width: 1024px) 72vw, 100vw"
            className="object-cover object-top"
          />
          <div className="product-lab-screen-shine" />
        </div>
        <div className="product-lab-caption">
          <div>
            <span>01 / {featuredProject.status}</span>
            <h3>{featuredProject.name}</h3>
            <p>{featuredProject.tagline}</p>
          </div>
          <strong>{copy.open} ↗</strong>
        </div>
      </a>

      <div className="container product-lab-index">
        <p>{copy.more}</p>
        <div>
          {otherProjects.map((project, index) => (
            <a key={project.id} href={project.url} target="_blank" rel="noopener noreferrer">
              <span>{String(index + 2).padStart(2, '0')}</span>
              <strong>{project.name}</strong>
              <small>{project.tagline}</small>
              <i>{project.status} ↗</i>
            </a>
          ))}
        </div>
        <Link href="/build">{copy.all} →</Link>
      </div>
    </section>
  );
}
