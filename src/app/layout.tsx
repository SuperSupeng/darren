import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { getLocale } from 'next-intl/server';
import { Geist, Noto_Serif_SC } from 'next/font/google';
import './globals.css';
import './home-directed.css';

const siteSans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-site-sans',
});

const siteSerif = Noto_Serif_SC({
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: false,
  variable: '--font-site-serif',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.darren-su.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Darren Su | China AI, Robotics & Supply Chain Feedback',
  description:
    'Helping global AI, robotics, hardware, and tech teams understand China, meet the right people, and get real feedback.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo/logo-enso-brush.svg', type: 'image/svg+xml' },
    ],
    apple: '/logo/logo-enso-brush.svg',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : 'en'} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${siteSans.variable} ${siteSerif.variable} bg-paper-200 text-ink-950 antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
