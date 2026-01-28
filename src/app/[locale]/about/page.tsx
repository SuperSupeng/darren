import { getTranslations } from 'next-intl/server';
import {
  AboutHero,
  WhatICanHelp,
  Background,
  Proof,
  Connect,
} from '@/components/about';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
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
      <WhatICanHelp />
      <Background />
      <Proof />
      <Connect />
    </>
  );
}
