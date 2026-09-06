import type { Metadata } from 'next';
import StudioExperience from '@/components/studio/StudioExperience';
import { getStudioContent } from '@/lib/studio-content';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'zh' ? '山边工作室 · 3D 原型' : 'Hillside Studio · 3D Prototype',
    description: locale === 'zh'
      ? 'Darren 的 3D 工作室实验：从长桌、工作台和窗边手记，探索开发者项目、产品与文章。'
      : 'An experimental 3D studio for exploring Darren’s developer programs, products, and field notes.',
    robots: { index: false, follow: false },
  };
}

export default async function StudioPage({ params }: Props) {
  const { locale } = await params;

  return <StudioExperience locale={locale} content={getStudioContent(locale)} />;
}
