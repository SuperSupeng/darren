import type { Metadata } from 'next';
import StudioExperience from '@/components/studio/StudioExperience';
import StudioPurpose from '@/components/studio/StudioPurpose';
import { getStudioContent } from '@/lib/studio-content';
import { createPageMetadata } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    ...createPageMetadata({
      locale,
      path: '/',
      title: locale === 'zh' ? 'Darren Su / 苏鹏的个人网站' : 'Darren Su — Personal website',
      description: locale === 'zh'
        ? '了解 Darren Su / 苏鹏的开发者活动、产品 Workshop 和 AI 实践分享，浏览工作案例、产品与文章。'
        : 'Explore Darren Su’s developer events, product workshops, and AI talks, alongside his products and writing.',
    }),
    robots: { index: false, follow: true },
  };
}

export default async function StudioPage({ params }: Props) {
  const { locale } = await params;

  return <StudioExperience locale={locale} content={getStudioContent(locale)}>
    <StudioPurpose locale={locale} />
  </StudioExperience>;
}
