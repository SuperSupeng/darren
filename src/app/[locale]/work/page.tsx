import { permanentRedirect } from 'next/navigation';

export default async function LegacyWorkIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/projects`);
}
