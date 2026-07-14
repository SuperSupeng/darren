import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { getLocale } from 'next-intl/server';
import './globals.css';

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
    <html lang={locale === 'zh' ? 'zh-CN' : 'en'} suppressHydrationWarning>
      <body
        className="bg-paper-200 text-ink-950 antialiased"
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
