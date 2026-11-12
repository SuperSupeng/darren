import { notFound } from 'next/navigation';
import ContactActions from '@/components/ContactActions';
import JsonLd from '@/components/JsonLd';
import { Link } from '@/i18n/navigation';
import { consultingCopy, consultingPracticeId } from '@/lib/consulting-copy';
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
    keywords: [copyFor(locale).home.label, copy.primaryTitle, 'Darren Su'],
  });
}

export default async function ConsultingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== 'zh' && locale !== 'en') notFound();

  const copy = copyFor(locale);
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
            <h1>{copy.page.title}</h1>
            <p>{copy.page.opening}</p>
          </header>
          <section className="consulting-primary" aria-labelledby="consulting-primary-title">
            <h2 id="consulting-primary-title">{copy.page.primaryTitle}</h2>
            <p>{copy.page.primaryBody}</p>
            <Link className="consulting-reading-link" href={`/work/${practice.id}`}>
              {copy.page.relatedLink}
              <span aria-hidden="true">↗</span>
            </Link>
          </section>
          <section className="consulting-other" aria-labelledby="consulting-other-title">
            <h2 id="consulting-other-title">{copy.page.otherTitle}</h2>
            <p>{copy.page.otherSearch}</p>
            <p>{copy.page.otherMarket}</p>
          </section>
          <section className="consulting-start" aria-label={locale === 'zh' ? '怎么开始' : 'Contact'}>
            <p>{copy.page.contact}</p>
            <ContactActions locale={locale} context="consulting" className="consulting-contact" />
            <noscript><style>{'.consulting-contact > button{display:none!important}'}</style></noscript>
          </section>
        </article>
      </main>
    </>
  );
}
