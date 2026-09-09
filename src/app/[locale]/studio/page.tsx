import type { Metadata } from 'next';
import StudioExperience from '@/components/studio/StudioExperience';
import StudioPurpose from '@/components/studio/StudioPurpose';
import { createPageMetadata } from '@/lib/seo';
import { getSiteContent } from '@/lib/siteContent';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    ...createPageMetadata({
      locale,
      path: '/',
      title: locale === 'zh' ? 'Darren Su / 苏鹏的个人网站' : 'Darren Su — Personal website',
      description: t('description'),
    }),
    robots: { index: false, follow: true },
  };
}

export default async function StudioPage({ params }: Props) {
  const { locale } = await params;
  const site = getSiteContent(locale);

  return <StudioExperience locale={locale} intro={site.home.intro} roles={site.about.hero.tags}>
    <StudioPurpose locale={locale} />
  </StudioExperience>;
}
