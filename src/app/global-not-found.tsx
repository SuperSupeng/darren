import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';
import './globals.css';
import '@/components/spatial/spatial.css';

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
      <body className="antialiased">
        <div className="spatial-site">
        <main id="main-content" className="spatial-not-found">
          <div>
            <p className="spatial-kicker">{copy.label}</p>
            <h1>{copy.title}</h1>
            <p>{copy.description}</p>
            <nav aria-label={locale === 'zh' ? '首页入口' : 'Home pages'} className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <Link href={`/${locale}`} prefetch={false}>{copy.home} →</Link>
              <Link href={locale === 'zh' ? '/en' : '/zh'} prefetch={false} lang={locale === 'zh' ? 'en' : 'zh-CN'}>{copy.alternate} →</Link>
            </nav>
          </div>
          <figure className="room-portal"><div className="room-portal-view"><Image src="/images/studio-daylight-preview.png" fill loading="eager" sizes="(max-width: 600px) 88vw, 550px" alt="" className="room-portal-poster" /></div><figcaption>{locale === 'zh' ? '房间还在，随时可以回来。' : 'The studio is here whenever you return.'}</figcaption></figure>
        </main>
        </div>
      </body>
    </html>
  );
}
