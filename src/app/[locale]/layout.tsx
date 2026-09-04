import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { isLocale } from '@/i18n/config';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollCulture from '@/components/home/ScrollCulture';
import { getLocalizedBlogRoutes } from '@/lib/blog';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: {
      default: locale === 'zh' ? 'Darren Su / 苏鹏' : 'Darren Su',
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
  const blogLocalesBySlug = getLocalizedBlogRoutes().reduce<Record<string, string[]>>(
    (result, route) => {
      result[route.slug] = [...(result[route.slug] ?? []), route.locale];
      return result;
    },
    {},
  );

  return (
    <NextIntlClientProvider messages={messages}>
      <a href="#main-content" className="skip-link">
        {locale === 'zh' ? '跳到主要内容' : 'Skip to main content'}
      </a>
      <Nav blogLocalesBySlug={blogLocalesBySlug} />
      <ScrollCulture />
      <div className="pt-16">{children}</div>
      <Footer />
    </NextIntlClientProvider>
  );
}
