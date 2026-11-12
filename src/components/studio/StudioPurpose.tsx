import 'server-only';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { consultingCopy } from '@/lib/consulting-copy';
import { getFeaturedWork } from '@/lib/portfolio';
import { getStudioContent } from '@/lib/studio-content';
import './studio-purpose.css';

export default function StudioPurpose({ locale }: { locale: string }) {
  const cases = getFeaturedWork(locale).slice(0, 3);
  const { build, notes } = getStudioContent(locale);
  const copy = locale === 'zh'
    ? {
        title: '项目与经历',
        read: '了解这件事',
        all: '查看全部项目',
        products: '正在做的产品',
        allProducts: '了解产品与项目',
        writing: '精选文章',
        allWriting: '阅读全部文章',
      }
    : {
        title: 'Selected work',
        read: 'Read the story',
        all: 'All projects',
        products: 'Products I’m building',
        allProducts: 'Explore products and projects',
        writing: 'Selected writing',
        allWriting: 'Read all articles',
      };
  const invitation = locale === 'zh' ? consultingCopy.zh.home : consultingCopy.en.home;

  return (
    <div className="studio-purpose">
      <div className="studio-purpose-wrap">
        <section className="studio-purpose-evidence" aria-labelledby="studio-purpose-title">
          <div className="studio-purpose-heading">
            <h2 id="studio-purpose-title">{copy.title}</h2>
            <Link className="studio-purpose-link" href="/projects">{copy.all} <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="studio-purpose-cases">
            {cases.map((work, index) => (
              <article key={work.id} className={`studio-purpose-case${index === 0 ? ' studio-purpose-case-featured' : ''}`}>
                <Link className="studio-purpose-photo" href={`/work/${work.id}`} aria-label={`${copy.read} · ${work.title}`}>
                  {work.image ? <Image src={work.image} alt={work.imageAlt ?? ''} fill sizes={index === 0 ? '(max-width: 800px) 90vw, 700px' : '(max-width: 800px) 90vw, 380px'} loading="lazy" className={work.imageClassName ?? ''} /> : null}
                </Link>
                <div className="studio-purpose-case-copy">
                  <p className="studio-purpose-role">{work.role}</p>
                  <h3><Link href={`/work/${work.id}`}>{work.title}</Link></h3>
                  <p className="studio-purpose-summary">{work.heroSummary ?? work.summary}</p>
                  {index === 0 ? <p className="studio-purpose-result">{work.result}</p> : null}
                  <Link className="studio-purpose-link" href={`/work/${work.id}`}>{copy.read} <span aria-hidden="true">↗</span></Link>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>

      <section className="studio-purpose-products" aria-labelledby="studio-products-title">
        <div className="studio-purpose-wrap">
          <div className="studio-purpose-heading">
            <h2 id="studio-products-title">{copy.products}</h2>
            <Link className="studio-purpose-link" href="/projects">{copy.allProducts} <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="studio-purpose-product-grid">
            {build.map(item => <a className="studio-purpose-product" key={item.id} href={item.href} target="_blank" rel="noopener noreferrer">
              <div className="studio-purpose-product-image">
                <div className="studio-purpose-product-screen">
                  <Image src={item.image} alt="" fill sizes="(max-width: 800px) 90vw, 380px" />
                </div>
              </div>
              <div className="studio-purpose-product-copy">
                <h3>{item.title} <span aria-hidden="true">↗</span></h3>
                <p>{item.description}</p>
              </div>
            </a>)}
          </div>
        </div>
      </section>

      <div className="studio-purpose-wrap">
        <section className="studio-purpose-writing" aria-labelledby="studio-writing-title">
          <div className="studio-purpose-heading">
            <h2 id="studio-writing-title">{copy.writing}</h2>
            <Link className="studio-purpose-link" href="/blog">{copy.allWriting} <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="studio-purpose-note-list">
            {notes.map(item => <Link className="studio-purpose-note" key={item.id} href={item.href}>
              <div className="studio-purpose-note-image">
                <Image src={item.image} alt="" fill sizes="(max-width: 600px) 110px, 240px" />
              </div>
              <div className="studio-purpose-note-copy">
                <p className="studio-purpose-note-meta">{item.meta}</p>
                <h3>{item.title}</h3>
              </div>
              <p className="studio-purpose-note-description">{item.description}</p>
              <span className="studio-purpose-note-arrow" aria-hidden="true">↗</span>
            </Link>)}
          </div>
        </section>

        <section className="studio-purpose-invitation" aria-labelledby="studio-purpose-invitation-title">
          <div className="studio-purpose-invitation-copy">
            <p className="studio-purpose-invitation-label">{invitation.label}</p>
            <h2 id="studio-purpose-invitation-title">{invitation.heading}</h2>
            <p>{invitation.body}</p>
            <Link className="studio-purpose-link" href="/consulting">{invitation.link} <span aria-hidden="true">↗</span></Link>
          </div>
        </section>
      </div>
    </div>
  );
}
