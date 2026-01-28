import { getTranslations } from 'next-intl/server';
import ServicesClient from './ServicesClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'servicesPage' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function ServicesPage() {
  return <ServicesClient />;
}
