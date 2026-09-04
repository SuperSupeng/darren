import { Link } from '@/i18n/navigation';

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative -mt-16 flex min-h-screen items-center overflow-hidden bg-ink-950 px-4 py-28 text-paper-100 md:px-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(138,113,71,0.2),transparent_32%),linear-gradient(rgba(241,234,220,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(241,234,220,0.035)_1px,transparent_1px)] bg-[size:auto,8rem_8rem,8rem_8rem]" />
      <div className="container relative max-w-4xl">
        <p className="font-mono text-sm tracking-[0.18em] text-zen-gold-light">404 / 未找到</p>
        <h1 className="mt-6 max-w-3xl font-serif text-[clamp(3rem,8vw,7rem)] leading-[1.02]">
          这个页面不在这里。
          <span className="mt-3 block text-paper-300/78">This page is not here.</span>
        </h1>
        <p className="mt-8 max-w-xl text-base leading-8 text-paper-200/78">
          它可能已经移动，也可能暂时没有对应语言的版本。
          <span className="block">It may have moved, or may not yet be available in this language.</span>
        </p>
        <Link href="/" className="mt-10 inline-flex border-b border-paper-100/40 pb-1 text-sm text-paper-100 hover:border-paper-100">
          返回首页 / Back home →
        </Link>
      </div>
    </main>
  );
}
