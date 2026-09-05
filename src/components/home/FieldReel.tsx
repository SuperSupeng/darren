'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { getFieldStories } from '@/lib/portfolio';

export default function FieldReel({ locale }: { locale: string }) {
  const fieldImages = getFieldStories(locale);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = fieldImages[activeIndex];
  const copy = locale === 'zh'
    ? {
        eyebrow: '这些现场 / FIELD NOTES',
        title: '过去一年，我去过不少这样的房间。',
        description: '开发者工坊、多城活动、创业圆桌和新加坡的分享。这些照片记录了我们怎样一起把事情做成。',
        browse: '横向滑动，或用箭头翻看',
        gallery: '活动现场照片，可横向滑动或使用左右方向键',
        previous: '上一张照片',
        next: '下一张照片',
      }
    : {
        eyebrow: 'FIELD NOTES / PAST YEAR',
        title: 'I spent much of the past year in rooms like these.',
        description: 'Developer workshops, events across cities, founder roundtables, and a talk in Singapore. A few moments from the work we did together.',
        browse: 'Swipe or use the arrows',
        gallery: 'Event photographs. Swipe or use the left and right arrow keys.',
        previous: 'Previous photograph',
        next: 'Next photograph',
      };

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const cards = Array.from(gallery.querySelectorAll<HTMLElement>('.field-gallery-card'));
    let frame = 0;
    const update = () => {
      frame = 0;
      const center = gallery.scrollLeft + gallery.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;
      cards.forEach((card, index) => {
        const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      setActiveIndex((current) => current === closestIndex ? current : closestIndex);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(requestUpdate);
    observer.observe(gallery);
    gallery.addEventListener('scroll', requestUpdate, { passive: true });
    requestUpdate();
    return () => {
      observer.disconnect();
      gallery.removeEventListener('scroll', requestUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const showPhoto = (index: number) => {
    const gallery = galleryRef.current;
    const card = gallery?.querySelectorAll<HTMLElement>('.field-gallery-card')[index];
    if (!gallery || !card) return;
    gallery.scrollTo({
      left: card.offsetLeft + card.offsetWidth / 2 - gallery.clientWidth / 2,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  const onGalleryKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const lastIndex = fieldImages.length - 1;
    const index = event.key === 'Home' ? 0
      : event.key === 'End' ? lastIndex
        : Math.max(0, Math.min(lastIndex, activeIndex + (event.key === 'ArrowRight' ? 1 : -1)));
    showPhoto(index);
  };

  return (
    <section id="field" className="field-gallery" aria-labelledby="field-title">
      <div className="field-gallery-sticky">
        <div className="field-gallery-atmosphere" aria-hidden="true" />
        <div className="field-gallery-ground" aria-hidden="true" />
        <header className="container field-gallery-heading">
          <div>
            <p className="directed-kicker">{copy.eyebrow}</p>
            <h2 id="field-title">{copy.title}</h2>
          </div>
          <p>{copy.description}</p>
        </header>

        <div
          id="field-photos"
          ref={galleryRef}
          className="field-gallery-window"
          role="region"
          aria-label={copy.gallery}
          tabIndex={0}
          onKeyDown={onGalleryKeyDown}
        >
          <div className="field-gallery-track">
            {fieldImages.map((item, index) => (
              <figure
                key={item.src}
                className={`field-gallery-card field-gallery-card-${item.shape} ${activeIndex === index ? 'is-active' : ''}`}
              >
                <Image
                  src={item.src}
                  alt={item.imageAlt}
                  fill
                  sizes={item.shape === 'portrait' ? '(min-width: 768px) 32vw, 72vw' : '(min-width: 768px) 58vw, 88vw'}
                  className="object-cover"
                />
                <div className="field-gallery-card-wash" />
                <figcaption>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item.title}</strong>
                  <small>{item.place}</small>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="container field-gallery-focus">
          <div className="field-gallery-caption" role="status" aria-live="polite" aria-atomic="true">
            <span>{String(activeIndex + 1).padStart(2, '0')} / {String(fieldImages.length).padStart(2, '0')}</span>
            <strong>{activeItem.role}</strong>
            <p>{activeItem.result}</p>
          </div>
          <div className="field-gallery-controls">
            <span>{copy.browse}</span>
            <button type="button" aria-label={copy.previous} aria-controls="field-photos" disabled={activeIndex === 0} onClick={() => showPhoto(activeIndex - 1)}>←</button>
            <button type="button" aria-label={copy.next} aria-controls="field-photos" disabled={activeIndex === fieldImages.length - 1} onClick={() => showPhoto(activeIndex + 1)}>→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
