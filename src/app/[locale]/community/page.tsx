import { getTranslations } from 'next-intl/server';
import {
  CommunityHero,
  Communities,
  HowWeRun,
  Events,
  PastEvents,
  CoHost,
} from '@/components/community';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'community' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function CommunityPage() {
  return (
    <>
      <CommunityHero />
      <Communities />
      <HowWeRun />
      <Events />
      <PastEvents />
      <CoHost />
    </>
  );
}
