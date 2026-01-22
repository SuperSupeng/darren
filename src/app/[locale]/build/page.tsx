import { getTranslations } from 'next-intl/server';
import {
  BuildHero,
  SelectedBuilds,
  BuildLog,
} from '@/components/build';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'build' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function BuildPage() {
  return (
    <>
      <BuildHero />
      <SelectedBuilds />
      <BuildLog />
    </>
  );
}
