import { getTranslations } from 'next-intl/server';
import {
  AboutHero,
  Background,
  Journey,
  Connect,
} from '@/components/about';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Background />
      <Journey />
      <Connect />
    </>
  );
}
