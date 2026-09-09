import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import StudioExperience from '@/components/studio/StudioExperience';
import StudioPurpose from '@/components/studio/StudioPurpose';
import JsonLd from '@/components/JsonLd';
import { createPageMetadata, getPageKeywords, homeStructuredData } from '@/lib/seo';
import { getSiteContent } from '@/lib/siteContent';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const metadata = createPageMetadata({
    locale,
    path: '/',
    title: t('title'),
    description: t('description'),
    keywords: getPageKeywords(locale, 'home'),
  });

  return {
    ...metadata,
    title: { absolute: t('title') },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const site = getSiteContent(locale);

  return (
    <>
      <JsonLd data={homeStructuredData(locale)} />
      <StudioExperience locale={locale} intro={site.home.intro} roles={site.about.hero.tags}>
        <StudioPurpose locale={locale} />
      </StudioExperience>
    </>
  );
}
