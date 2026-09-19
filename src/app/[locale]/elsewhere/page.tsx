import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import { CollectionHero, CollectionHeading, CollectionNext } from '@/components/spatial/Collections';
import { absoluteLocalizedUrl, createPageMetadata } from '@/lib/seo';
import { socialLinks } from '@/lib/site-config';
import { getSiteContent } from '@/lib/siteContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'elsewhere' });

  return createPageMetadata({
    locale,
    path: '/elsewhere',
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: ['Substack', 'GitHub', 'MatchPoint', 'AGI Villa', 'WeChat'],
  });
}

export default async function ElsewherePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const site = getSiteContent(locale);
  const copy = site.elsewhere;

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: copy.hero.title,
        description: copy.hero.subtitle,
        url: absoluteLocalizedUrl(locale, '/elsewhere'),
      }} />
      <main id="main-content" tabIndex={-1} className="collection-page collection-elsewhere">
        <div className="collection-container">
          <CollectionHero
            locale={locale}
            zone="notes"
            title={locale === 'zh' ? '别处' : 'Elsewhere'}
            lead={copy.hero.title}
            description={copy.hero.subtitle}
            contentHref="#elsewhere-reserved-title"
          />

          <section className="collection-section" aria-labelledby="elsewhere-reserved-title">
            <CollectionHeading id="elsewhere-reserved-title" title={copy.reservedTitle} />
            <ul className="elsewhere-list">
              {copy.items.map((item) => {
                const links = 'links' in item && item.links
                  ? item.links
                  : item.href
                    ? [{ label: copy.visit, href: item.href, internal: item.external === false }]
                    : [];
                return (
                  <li key={item.id} className="elsewhere-item">
                    <div>
                      <h2>{item.name}</h2>
                      <p className="collection-description">{item.description}</p>
                    </div>
                    <div className="elsewhere-item-links">
                      {links.map((link) => (
                        link.internal
                          ? <Link key={link.href} href={link.href} className="collection-text-link">{link.label} <span aria-hidden="true">↗</span></Link>
                          : <a key={link.href} href={link.href} className="collection-text-link" target="_blank" rel="noopener noreferrer">{link.label} <span aria-hidden="true">↗</span></a>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="collection-section" aria-labelledby="elsewhere-socials-title">
            <CollectionHeading id="elsewhere-socials-title" title={copy.socialsTitle} />
            <div className="elsewhere-socials">
              {socialLinks.map(([label, href]) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer">{label} ↗</a>
              ))}
            </div>
          </section>

          <CollectionNext
            href="/about"
            title={locale === 'zh' ? '关于我' : 'About'}
            description={locale === 'zh' ? '一段更完整的个人介绍。' : 'A short page with more of the background.'}
          />
        </div>
      </main>
    </>
  );
}
