import type { Metadata } from 'next';
import StudioExperience from '@/components/studio/StudioExperience';
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
      title: locale === 'zh' ? '山边工作室' : 'A studio by the hills',
      description: locale === 'zh'
        ? '欢迎来到 Darren 的工作室。从共创长桌、产品工作台和窗边手记，了解我的工作、产品与想法。'
        : 'Step inside Darren’s studio. Explore work, products, and field notes around the shared table, workbench, and window.',
    }),
    robots: { index: false, follow: true },
  };
}

export default async function StudioPage({ params }: Props) {
  const { locale } = await params;

  return <StudioExperience locale={locale} content={getStudioContent(locale)} />;
}
