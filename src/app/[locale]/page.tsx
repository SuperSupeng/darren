import {
  Hero,
  ClientQuestions,
  NowBuilding,
  FeaturedProjects,
  Signals,
  FooterCta,
} from '@/components/home';
import JsonLd from '@/components/JsonLd';
import { homeStructuredData } from '@/lib/seo';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <JsonLd data={homeStructuredData(locale)} />
      <Hero locale={locale} />
      <ClientQuestions locale={locale} />
      <NowBuilding locale={locale} />
      <Signals locale={locale} />
      <FeaturedProjects locale={locale} />
      <FooterCta locale={locale} />
    </>
  );
}
