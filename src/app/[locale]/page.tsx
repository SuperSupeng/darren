import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Hero from '@/components/home/Hero';
import FieldReel from '@/components/home/FieldReel';
import SelectedWork from '@/components/home/SelectedWork';
import CollaborationPaths from '@/components/home/CollaborationPaths';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import NotesContact from '@/components/home/NotesContact';
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
      <main id="main-content" tabIndex={-1}>
        <Hero locale={locale} />
        <SelectedWork locale={locale} />
        <FieldReel locale={locale} />
        <CollaborationPaths locale={locale} />
        <FeaturedProjects locale={locale} />
        <NotesContact locale={locale} />
      </main>
    </>
  );
}
