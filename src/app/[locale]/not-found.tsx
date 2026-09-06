import { Link } from '@/i18n/navigation';
import { locale as getRootLocale } from 'next/root-params';
import RoomPortal from '@/components/spatial/RoomPortal';

export default async function NotFound() {
  const locale = await getRootLocale();
  const copy = locale === 'zh'
    ? {
        label: '404 / 未找到',
        title: '这个页面不在这里。',
        description: '它可能已经移动，也可能暂时没有对应语言的版本。',
        home: '返回首页',
      }
    : {
        label: '404 / NOT FOUND',
        title: 'This page is not here.',
        description: 'It may have moved, or may not yet be available in this language.',
        home: 'Back home',
      };

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="spatial-not-found"
    >
      <div>
        <p className="spatial-kicker">{copy.label}</p>
        <h1>
          {copy.title}
        </h1>
        <p>
          {copy.description}
        </p>
        <Link href="/">
          {copy.home} →
        </Link>
      </div>
      <RoomPortal locale={locale} zone="notes" />
    </main>
  );
}
