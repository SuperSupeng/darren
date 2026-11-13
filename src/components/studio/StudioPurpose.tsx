import 'server-only';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import ContactActions from '@/components/ContactActions';
import { consultingCopy } from '@/lib/consulting-copy';
import { getConsultingInquiry } from '@/lib/contact';
import { getFeaturedWork } from '@/lib/portfolio';
import { getStudioContent } from '@/lib/studio-content';
import { getSiteContent } from '@/lib/siteContent';
import './studio-purpose.css';

export default function StudioPurpose({ locale }: { locale: string }) {
  const zh = locale === 'zh';
  const consulting = zh ? consultingCopy.zh : consultingCopy.en;
  const inquiry = getConsultingInquiry(locale);
  const { notes } = getStudioContent(locale);
  const work = getFeaturedWork(locale);
  const cases = ['agent-speaking', 'superai-china'].flatMap(id => work.filter(item => item.id === id));
  const podcast = getSiteContent(locale).podcast;

  return <div className="studio-purpose">
    <div className="studio-purpose-wrap">
      <section className="studio-purpose-consulting" aria-labelledby="home-consulting-title">
        <header className="studio-purpose-heading">
          <h2 id="home-consulting-title">{zh ? '你正在考虑哪一类问题？' : 'What are you working through?'}</h2>
        </header>
        <div className="studio-purpose-directions">
          {consulting.directions.map((item, index) => <Link className="studio-purpose-direction" href={`/consulting#${item.id}`} key={item.id}>
            <p className="studio-purpose-eyebrow">{index === 0 ? consulting.page.focusLabel : item.tag}</p>
            <h3>{item.title}</h3><p>{item.question}</p>
            <span className="studio-direction-action">{zh ? '看看怎么咨询' : 'See how I can help'} <span aria-hidden="true">→</span></span>
          </Link>)}
        </div>
      </section>

      <section className="studio-purpose-evidence" aria-labelledby="home-practice-title">
        <header className="studio-purpose-heading">
          <h2 id="home-practice-title">{zh ? '先看看我做过什么' : 'Start with my work'}</h2>
          <Link className="studio-purpose-link" href="/projects">{zh ? '全部案例与产品' : 'All work & products'} <span aria-hidden="true">→</span></Link>
        </header>
        <div className="studio-purpose-cases">{cases.map(item => <article className="studio-purpose-case" key={item.id}>
          <Link className="studio-purpose-case-link" href={`/work/${item.id}`}>
            <div className="studio-purpose-photo">{item.image ? <Image src={item.image} alt="" fill sizes="(max-width: 600px) 100px, 200px" className={item.imageClassName ?? ''} /> : null}</div>
            <div><p className="studio-purpose-eyebrow">{item.role}</p><h3>{item.title}</h3><p>{item.heroSummary ?? item.summary}</p><span className="studio-direction-action">{zh ? '阅读经历' : 'Read the story'} <span aria-hidden="true">→</span></span></div>
          </Link>
        </article>)}</div>
      </section>

      <section className="studio-purpose-writing" aria-labelledby="home-writing-title">
        <div className="studio-purpose-heading">
          <h2 id="home-writing-title">{zh ? '文章与播客' : 'Writing & podcast'}</h2>
          <Link className="studio-purpose-link" href="/blog">{zh ? '全部文章' : 'All writing'} <span aria-hidden="true">→</span></Link>
        </div>
        <div>
          <div className="studio-purpose-note-list">{notes.map(item => <Link className="studio-purpose-note" key={item.id} href={item.href}>
            <div className="studio-purpose-note-image"><Image src={item.image} alt="" fill sizes="(max-width: 600px) 85px, 140px" /></div>
            <div><p className="studio-purpose-note-meta">{item.meta}</p><h3>{item.title}</h3></div>
          </Link>)}</div>
          <Link className="studio-purpose-podcast" href="/podcast"><p className="studio-purpose-eyebrow">{zh ? '播客' : 'Podcast'}</p><h3>{podcast.hero.title} <span aria-hidden="true">→</span></h3><p>{podcast.hero.subtitle}</p></Link>
        </div>
      </section>
      <section className="studio-purpose-closing" aria-labelledby="home-contact-title">
        <div><h2 id="home-contact-title">{zh ? '说说你遇到的问题' : 'Tell me what you’re working on'}</h2><p>{zh ? '简单介绍你的团队和想解决的事。我们先确认是否适合合作，再商定咨询内容、形式和费用。' : 'Tell me about your team and the problem. We can see whether I can help, then agree on the scope, format, and fee.'}</p></div>
        <ContactActions locale={locale} context="home-consulting" className="home-contact-actions" emailSubject={inquiry.emailSubject} emailBody={inquiry.emailBody} />
      </section>
    </div>
  </div>;
}
