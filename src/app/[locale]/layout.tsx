import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Geist } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { isLocale } from '@/i18n/config';
import SiteChrome from '@/components/SiteChrome';
import { getLocalizedBlogRoutes } from '@/lib/blog';
import '../globals.css';
import '../fonts/noto-serif-sc/fonts.css';

const siteSans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-site-sans',
});

// The same Noto Serif SC outlines, subset from the repository's content.
// Separate Latin/CJK unicode ranges avoid loading Chinese glyphs on English pages.
// See docs/site-fonts.md for the offline coverage check and regeneration command.
const siteSerif = { variable: 'site-serif-local' };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.darren-su.com';

export const dynamicParams = false;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: locale === 'zh' ? 'Darren Su / 苏鹏' : 'Darren Su',
      template: `%s | Darren Su`,
    },
    description: locale === 'zh'
      ? 'Darren Su 组织 AI 开发者活动，帮助早期产品接触用户，也在做软件产品和分享 AI 与 Agent 实践。'
      : 'Darren Su leads AI developer programs, helps early products meet users, builds software, and shares practical experience with AI and agents.',
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
      <body className={`${siteSans.variable} ${siteSerif.variable} bg-paper-200 text-ink-950 antialiased`}>
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
