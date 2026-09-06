import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import StudioExperience from '@/components/studio/StudioExperience';
import { getStudioContent } from '@/lib/studio-content';
import JsonLd from '@/components/JsonLd';
import { createPageMetadata, getPageKeywords, homeStructuredData } from '@/lib/seo';

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

  return (
    <>
      <JsonLd data={homeStructuredData(locale)} />
      <StudioExperience locale={locale} content={getStudioContent(locale)} />
    </>
  );
}
