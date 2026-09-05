import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from 'next/link';
import './globals.css';

async function getErrorLocale() {
  const requestHeaders = await headers();
  return requestHeaders.get('x-next-intl-locale') === 'zh' ? 'zh' : 'en';
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getErrorLocale();
  return {
    title: locale === 'zh' ? '页面未找到 | Darren Su' : 'Page not found | Darren Su',
    description: locale === 'zh'
      ? '这个页面不存在，或已移动。你可以返回首页继续浏览。'
      : 'This page could not be found or may have moved. You can return to the home page to continue browsing.',
    robots: { index: false, follow: false },
  };
}

export default async function GlobalNotFound() {
  const locale = await getErrorLocale();
  const copy = locale === 'zh'
    ? {
        label: '404 / 未找到',
        title: '这个页面不在这里。',
        description: '页面可能已经移动，你可以返回首页继续浏览。',
        home: '返回首页',
        alternate: 'English home',
      }
    : {
        label: '404 / NOT FOUND',
        title: 'This page is not here.',
        description: 'It may have moved. You can return to the home page to continue browsing.',
        home: 'Back home',
        alternate: '中文首页',
      };

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : 'en'}>
      <body className="bg-ink-950 text-paper-100 antialiased">
        <main className="flex min-h-screen items-center px-6 py-20">
          <div className="mx-auto w-full max-w-3xl">
            <p className="font-mono text-sm tracking-[0.18em] text-zen-gold-light">{copy.label}</p>
            <h1 className="mt-6 font-serif text-[clamp(2.75rem,8vw,6rem)] leading-[1.05]">{copy.title}</h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-paper-200/80">{copy.description}</p>
            <nav aria-label={locale === 'zh' ? '首页入口' : 'Home pages'} className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <Link href={`/${locale}`} prefetch={false} className="inline-flex border-b border-paper-100/40 pb-1 hover:border-paper-100">{copy.home} →</Link>
              <Link href={locale === 'zh' ? '/en' : '/zh'} prefetch={false} lang={locale === 'zh' ? 'en' : 'zh-CN'} className="inline-flex border-b border-paper-100/40 pb-1 hover:border-paper-100">{copy.alternate} →</Link>
            </nav>
          </div>
        </main>
      </body>
    </html>
  );
}
