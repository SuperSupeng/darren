'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/navigation';

const chapterCopy = {
  zh: [
    { id: 'top', number: '01', label: '开场' },
    { id: 'work', number: '02', label: '工作' },
    { id: 'field', number: '03', label: '现场' },
    { id: 'collaborate', number: '04', label: '合作' },
    { id: 'build', number: '05', label: '产品' },
    { id: 'writing', number: '06', label: '写作' },
  ],
  en: [
    { id: 'top', number: '01', label: 'Opening' },
    { id: 'work', number: '02', label: 'Work' },
    { id: 'field', number: '03', label: 'Field' },
    { id: 'collaborate', number: '04', label: 'Collaborate' },
    { id: 'build', number: '05', label: 'Building' },
    { id: 'writing', number: '06', label: 'Writing' },
  ],
} as const;

const darkChapters = new Set(['top', 'field', 'build']);

export default function ScrollCulture() {
  const locale = useLocale();
  const pathname = usePathname();
  const isHome = pathname === '/';
  const chapters: readonly { id: string; number: string; label: string }[] =
    locale === 'zh' ? chapterCopy.zh : chapterCopy.en;
  const [activeChapter, setActiveChapter] = useState('top');

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
      const pageProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      const heroProgress = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));

      root.style.setProperty('--page-progress', pageProgress.toFixed(4));
      root.style.setProperty('--hero-scroll', heroProgress.toFixed(4));

      if (isHome) {
        const readingLine = window.innerHeight * 0.48;
        let nextChapter: string = chapters[0].id;
        chapters.forEach((chapter) => {
          const section = document.getElementById(chapter.id);
          if (section && section.getBoundingClientRect().top <= readingLine) {
            nextChapter = chapter.id;
          }
        });
        setActiveChapter((current) => (current === nextChapter ? current : nextChapter));
      }
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      document.documentElement.style.removeProperty('--page-progress');
      document.documentElement.style.removeProperty('--hero-scroll');
    };
  }, [chapters, isHome]);

  if (!isHome) {
    return (
      <div className="scroll-culture scroll-culture-compact" aria-hidden="true">
        <div className="scroll-culture-track"><span /></div>
        <div className="scroll-culture-seal" />
      </div>
    );
  }

  const tone = darkChapters.has(activeChapter) ? 'chapter-rail-on-dark' : 'chapter-rail-on-paper';

  return (
    <nav className={`chapter-rail ${tone}`} aria-label={locale === 'zh' ? '首页章节' : 'Homepage chapters'}>
      <div className="chapter-rail-progress" aria-hidden="true"><span /></div>
      <ol>
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              className={activeChapter === chapter.id ? 'is-active' : undefined}
              aria-current={activeChapter === chapter.id ? 'location' : undefined}
            >
              <span>{chapter.number}</span>
              <strong>{chapter.label}</strong>
              <i aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
