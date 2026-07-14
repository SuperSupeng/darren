import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { isLocale } from '@/i18n/config';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { createPageMetadata, getPageKeywords } from '@/lib/seo';

type Props = {
  children: React.ReactNode;
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
    title: {
      default: t('title'),
      template: `%s | Darren Su`,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!isLocale(locale)) {
    notFound();
  }

  const allMessages = await getMessages();
  const messages = {
    nav: allMessages.nav,
    footer: allMessages.footer,
    language: allMessages.language,
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <Nav />
      <main className="pt-16">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
