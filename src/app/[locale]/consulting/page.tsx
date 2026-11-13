import { notFound } from 'next/navigation';
import ContactActions from '@/components/ContactActions';
import JsonLd from '@/components/JsonLd';
import { Link } from '@/i18n/navigation';
import { consultingCopy, consultingPracticeId } from '@/lib/consulting-copy';
import { getConsultingInquiry } from '@/lib/contact';
import { getWorkById } from '@/lib/portfolio';
import { absoluteLocalizedUrl, createPageMetadata, siteUrl } from '@/lib/seo';
import '@/components/spatial/interiors.css';
import '@/components/spatial/consulting-reading.css';

function copyFor(locale: string) {
  return locale === 'zh' ? consultingCopy.zh : consultingCopy.en;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = copyFor(locale).page;
  return createPageMetadata({
    locale,
    path: '/consulting',
    title: copy.title,
    description: copy.opening,
    keywords: [copyFor(locale).home.label, ...copyFor(locale).directions.map(item => item.title), 'GEO', 'GTM', 'Darren Su'],
  });
}

export default async function ConsultingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== 'zh' && locale !== 'en') notFound();

  const copy = copyFor(locale);
  const inquiry = getConsultingInquiry(locale);
  const practice = getWorkById(locale, consultingPracticeId);
  if (!practice) {
    throw new Error(`Missing 31-agents work page: ${locale}/work/${consultingPracticeId}`);
  }

  const pageUrl = absoluteLocalizedUrl(locale, '/consulting');

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            '@id': `${pageUrl}#webpage`,
            url: pageUrl,
            name: copy.page.title,
            description: copy.page.opening,
            inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
            isPartOf: { '@id': `${siteUrl}/#website` },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: locale === 'zh' ? '首页' : 'Home',
                item: absoluteLocalizedUrl(locale),
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: copy.page.title,
                item: pageUrl,
              },
            ],
          },
        ],
      }} />
      <main id="main-content" tabIndex={-1} className="interior-page consulting-reading">
        <article className="consulting-reading-wrap">
          <header className="consulting-reading-intro">
            <p className="consulting-eyebrow">{copy.home.label}</p>
            <h1>{copy.page.headline}</h1>
            <p>{copy.page.opening}</p>
            <div className="consulting-intro-actions">
              <ContactActions locale={locale} context="consulting-intro" emailSubject={inquiry.emailSubject} emailBody={inquiry.emailBody} />
              <p>{locale === 'zh' ? '先来信介绍情况，确认适合合作后，再商定形式与费用。' : 'Email me about your situation. We’ll discuss the scope and fee once we know there is a fit.'}</p>
            </div>
            <nav className="consulting-index" aria-label={locale === 'zh' ? '咨询方向' : 'Consulting topics'}>
              {copy.directions.map(item => <a href={`#${item.id}`} key={item.id}>{item.navLabel} <span aria-hidden="true">↓</span></a>)}
            </nav>
          </header>
          <div className="consulting-directions">
            {copy.directions.map((item, index) => <section key={item.id} id={item.id} className={`consulting-direction${index === 0 ? ' consulting-primary' : ''}`} aria-labelledby={`${item.id}-title`}>
              <p className="consulting-eyebrow">{index === 0 ? copy.page.focusLabel : item.tag}</p>
              <h2 id={`${item.id}-title`}>{item.title}</h2>
              <p className="consulting-question">{item.question}</p>
              <dl>
                <div><dt>{copy.page.audienceLabel}</dt><dd>{item.audience}</dd></div>
                <div><dt>{copy.page.outcomeLabel}</dt><dd>{item.outcome}</dd></div>
              </dl>
              <p className="consulting-scope"><span>{copy.page.boundaryLabel}：</span>{item.boundary}</p>
              <a className="consulting-topic-contact" href={getConsultingInquiry(locale, item.title).href}>{locale === 'zh' ? '就这个问题联系我' : 'Email me about this'} <span aria-hidden="true">→</span></a>
              {index === 0 ? <Link className="consulting-reading-link" href={`/work/${practice.id}`}>{copy.page.relatedLink} <span aria-hidden="true">↗</span></Link> : null}
            </section>)}
          </div>
          <section className="consulting-approach" aria-labelledby="consulting-approach-title">
            <h2 id="consulting-approach-title">{copy.page.approachTitle}</h2>
            <ol>{copy.page.steps.map(step => <li key={step.title}><h3>{step.title}</h3><p>{step.body}</p></li>)}</ol>
          </section>
          <section className="consulting-start" aria-labelledby="consulting-start-title">
            <h2 id="consulting-start-title">{copy.page.contactTitle}</h2>
            <p>{copy.page.contact}</p>
            <ContactActions locale={locale} context="consulting" className="consulting-contact" emailSubject={inquiry.emailSubject} emailBody={inquiry.emailBody} />
          </section>
          <aside className="consulting-other">
            <h2>{copy.page.otherTitle}</h2><p>{copy.page.otherBody}</p>
            <Link className="consulting-reading-link" href="/services">{copy.page.otherLink} <span aria-hidden="true">↗</span></Link>
          </aside>
        </article>
      </main>
    </>
  );
}
