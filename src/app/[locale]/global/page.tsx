import { getTranslations } from 'next-intl/server';
import {
  GlobalHero,
  CityNodes,
  HowWeRunGlobal,
  BecomeNode,
} from '@/components/global';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'global' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function GlobalPage() {
  return (
    <>
      <GlobalHero />
      <CityNodes />
      <HowWeRunGlobal />
      <BecomeNode />
    </>
  );
}
