import Image from 'next/image';
import { getAboutCopy } from '@/lib/about';
import { getTranslations } from 'next-intl/server';
import ContactActions from '@/components/ContactActions';
import JsonLd from '@/components/JsonLd';
import RoomPortal from '@/components/spatial/RoomPortal';
import { Link } from '@/i18n/navigation';
import '@/components/spatial/interiors.css';
import '@/components/spatial/about-reading.css';
import { aboutStructuredData, createPageMetadata, getPageKeywords } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return createPageMetadata({
    locale,
    path: '/about',
    title: t('meta.title'),
    description: getAboutCopy(locale).description,
    keywords: getPageKeywords(locale, 'about'),
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = getAboutCopy(locale);
  return (
    <>
      <JsonLd data={aboutStructuredData(locale)} />
      <main id="main-content" tabIndex={-1} className="interior-page about-reading">
        <header className="about-reading-hero">
          <div className="about-reading-intro">
            <h1>{copy.title}</h1>
            <p>{copy.intro}</p>
          </div>
          <div className="about-reading-stage">
            <RoomPortal zone="notes" locale={locale} />
            <figure className="about-reading-portrait">
              <Image src="/photo.jpg" alt="Darren Su / 苏鹏" fill sizes="(max-width: 600px) 112px, 148px" loading="eager" className="object-cover" />
            </figure>
          </div>
        </header>

        <div className="about-reading-body">
          <section aria-labelledby="about-engineering-title">
            <h2 id="about-engineering-title">{copy.engineeringTitle}</h2>
            {copy.engineering.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </section>
          <section aria-labelledby="about-community-title">
            <h2 id="about-community-title">{copy.communityTitle}</h2>
            {copy.community.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            <Link href="/work/datawhale-city-ecosystem" className="about-reading-link">{copy.communityLink}<span aria-hidden="true">↗</span></Link>
          </section>
          <section aria-labelledby="about-making-title">
            <h2 id="about-making-title">{copy.makingTitle}</h2>
            {copy.making.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            <div className="about-reading-links">
              <Link href="/build" className="about-reading-link">{copy.productsLink}<span aria-hidden="true">↗</span></Link>
              <Link href="/blog/managing-31-ai-employees" className="about-reading-link">{copy.agentLink}<span aria-hidden="true">↗</span></Link>
            </div>
          </section>
          <section aria-labelledby="about-life-title">
            <h2 id="about-life-title">{copy.lifeTitle}</h2>
            {copy.life.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            <figure className="about-reading-photo">
              <div><Image src="/blog/zongtong-retreat/temple.jpg" alt={copy.lifeImageAlt} fill sizes="(max-width: 850px) 88vw, 740px" className="object-cover" /></div>
              <figcaption>{copy.lifeImageCaption}</figcaption>
            </figure>
            <Link href="/blog/zongtong-temple-retreat" className="about-reading-link">{copy.lifeLink}<span aria-hidden="true">↗</span></Link>
          </section>
          <section className="about-reading-contact" aria-labelledby="about-contact-title">
            <h2 id="about-contact-title">{copy.contactTitle}</h2>
            <p>{copy.contactBody}</p>
            <ContactActions locale={locale} context="about-reading" className="about-reading-contact-actions" />
            <noscript><style>{'.about-reading-contact-actions > button{display:none!important}'}</style></noscript>
            <div className="about-reading-links">
              <Link href="/services" className="about-reading-link">{copy.servicesLink}<span aria-hidden="true">↗</span></Link>
              <Link href="/blog/superai-china-ecosystem-visit" className="about-reading-link">{copy.visitLink}<span aria-hidden="true">↗</span></Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
