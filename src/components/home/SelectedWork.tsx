'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent } from 'react';
import { Link } from '@/i18n/navigation';
import { getFeaturedWork, getWorkCollaboration } from '@/lib/portfolio';

export default function SelectedWork({ locale }: { locale: string }) {
  const work = getFeaturedWork(locale);
  const tabListRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeWork = work[activeIndex] ?? work[0];
  const collaboration = getWorkCollaboration(locale, activeWork.id);
  const copy =
    locale === 'zh'
      ? {
          eyebrow: '最近的工作 / SELECTED WORK',
          title: '从开发者活动，到产品的第一轮反馈。',
          description:
            '选择与你需求相近的项目，看看我负责什么、完成了什么。',
          role: '我负责的部分',
          result: '这次完成了什么',
          view: '查看完整记录',
          viewInIndex: '在项目列表中查看',
          all: '查看其他项目',
        }
      : {
          eyebrow: 'RECENT WORK / 2026',
          title: 'From developer events to a product’s first feedback.',
          description:
            'Choose a project close to what you have in mind to see my role and what was completed.',
          role: 'What I handled',
          result: 'What was completed',
          view: 'View the full record',
          viewInIndex: 'View in the project index',
          all: 'View other projects',
        };

  const moveTabFocus = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const lastIndex = work.length - 1;
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? lastIndex
        : event.key === 'ArrowDown' || event.key === 'ArrowRight'
          ? (index + 1) % work.length
          : (index - 1 + work.length) % work.length;
    setActiveIndex(nextIndex);
    tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[nextIndex]?.focus();
  };

  return (
    <section id="work" className="work-story">
      <div className="work-story-sticky">
        <header className="work-story-heading">
          <div>
            <p className="directed-kicker">{copy.eyebrow}</p>
            <h2>{copy.title}</h2>
          </div>
          <div>
            <p>{copy.description}</p>
            <Link href="/work">{copy.all} ↗</Link>
          </div>
        </header>

        <div className="work-story-stage">
          <div ref={tabListRef} className="work-story-index" role="tablist" aria-label={copy.eyebrow} aria-orientation="vertical">
            {work.map((item, index) => (
              <button
                key={item.id}
                type="button"
                id={`work-tab-${item.id}`}
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls="work-story-panel"
                tabIndex={activeIndex === index ? 0 : -1}
                className={activeIndex === index ? 'is-active' : undefined}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => moveTabFocus(event, index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.title}</strong>
                <small>{item.location}</small>
                <i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>

          <div
            id="work-story-panel"
            className="work-story-visual"
            role="tabpanel"
            aria-labelledby={`work-tab-${activeWork.id}`}
          >
            <div className="work-story-images">
              {work.map((item, index) => (
                item.image ? (
                  <figure
                    key={item.id}
                    className={activeIndex === index ? 'is-active' : undefined}
                    aria-hidden={activeIndex !== index}
                  >
                    <Image
                      src={item.image}
                      alt={activeIndex === index ? (item.imageAlt ?? '') : ''}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className={item.imageClassName ?? 'object-cover'}
                    />
                  </figure>
                ) : null
              ))}
              <div className="work-story-image-tone" />
              <span className="work-story-counter" aria-hidden="true">
                {String(activeIndex + 1).padStart(2, '0')} / {String(work.length).padStart(2, '0')}
              </span>
            </div>

            <div className="work-story-detail">
              <div>
                <span>{copy.role}</span>
                <strong>{activeWork.role}</strong>
              </div>
              <p>{activeWork.summary}</p>
              <div>
                <span>{copy.result}</span>
                <strong>{activeWork.result}</strong>
              </div>
            </div>
            <div className="work-story-next">
              {collaboration ? <p>{collaboration.invitation}</p> : null}
              <div className="work-story-links">
                <Link href={activeWork.href ?? '/work'}>
                  {activeWork.href ? copy.view : copy.viewInIndex} →
                </Link>
                {collaboration ? (
                  <Link href={`/services#${collaboration.id}`}>
                    {collaboration.linkLabel} ↗
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
