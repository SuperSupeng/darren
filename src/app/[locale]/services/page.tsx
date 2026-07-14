import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import { createPageMetadata, getPageKeywords, servicesStructuredData } from '@/lib/seo';
import ServicesClient from './ServicesClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'servicesPage' });
  return createPageMetadata({
    locale,
    path: '/services',
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: getPageKeywords(locale, 'services'),
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <JsonLd data={servicesStructuredData(locale)} />
      <ServicesClient />
    </>
  );
}
