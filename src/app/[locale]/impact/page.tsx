import { getTranslations } from 'next-intl/server';
import {
  ImpactHero,
  WhatIDid,
  Mechanism,
  Partners,
  OpenTo,
} from '@/components/impact';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'impact' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function ImpactPage() {
  return (
    <>
      <ImpactHero />
      <WhatIDid />
      <Mechanism />
      <Partners />
      <OpenTo />
    </>
  );
}
