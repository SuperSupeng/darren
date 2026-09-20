import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Geist, Noto_Serif } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { isLocale } from '@/i18n/config';
import SiteChrome from '@/components/SiteChrome';
import { getLocalizedBlogRoutes } from '@/lib/blog';
import { siteUrl } from '@/lib/site-config';
import '../globals.css';
import '../fonts/noto-serif-sc/fonts.css';
import '../typography.css';

const siteSans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-site-sans',
});

const englishSerif = Noto_Serif({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-english-serif',
});

// The same Noto Serif SC outlines, subset from the repository's content.
// Separate Latin/CJK unicode ranges avoid loading Chinese glyphs on English pages.
// See docs/site-fonts.md for the offline coverage check and regeneration command.
const siteSerif = { variable: 'site-serif-local' };

export const dynamicParams = false;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: locale === 'zh' ? 'Darren Su / 苏鹏' : 'Darren Su',
      template: `%s | Darren Su`,
    },
    description: t('description'),
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/logo/logo-enso-brush.svg', type: 'image/svg+xml' },
      ],
      apple: '/logo/logo-enso-brush.svg',
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
    <html lang={locale === 'zh' ? 'zh-CN' : 'en'} data-scroll-behavior="smooth">
      <body className={`${siteSans.variable} ${siteSerif.variable} ${locale === 'en' ? englishSerif.variable : ''} bg-paper-200 text-ink-950 antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-link">
            {locale === 'zh' ? '跳到主要内容' : 'Skip to main content'}
          </a>
          <SiteChrome blogLocalesBySlug={blogLocalesBySlug}>
            {children}
          </SiteChrome>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
