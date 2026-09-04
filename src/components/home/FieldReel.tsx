'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type PointerEvent } from 'react';

const fieldImages = [
  {
    src: '/images/work/03.jpg',
    zh: '微信开发者创新工坊',
    en: 'WeChat Developer Innovation Workshop',
    place: 'Chengdu',
    zhRole: '项目负责人',
    enRole: 'Program lead',
    zhResult: '成都场近百位开发者参与',
    enResult: 'Nearly 100 developers joined the Chengdu workshop',
    shape: 'wide',
  },
  {
    src: '/images/work/14.jpg',
    zh: 'Agent Builders Gathering',
    en: 'Agent Builders Gathering',
    place: 'China',
    zhRole: '系列活动发起人、负责人',
    enRole: 'Series initiator and lead',
    zhResult: '北京、上海、杭州、深圳四城近 1,000 位开发者',
    enResult: 'Nearly 1,000 developers across four cities',
    shape: 'portrait',
  },
  {
    src: '/images/work/12.jpg',
    zh: 'OpenClaw 城市开发者现场',
    en: 'OpenClaw Developer Gathering',
    place: 'Beijing',
    zhRole: '城市生态负责人',
    enRole: 'City ecosystem lead',
    zhResult: '和本地组织者一起完成城市开发者活动',
    enResult: 'Delivered a local developer event with city organizers',
    shape: 'wide',
  },
  {
    src: '/images/work/19.jpg',
    zh: '全球 AI 创造者分享',
    en: 'Global AI Builders Talk',
    place: 'Singapore',
    zhRole: '分享嘉宾',
    enRole: 'Invited speaker',
    zhResult: '在新加坡介绍中国开发者社区与 Agent 实践',
    enResult: 'Spoke in Singapore about China’s developer communities and my work with agents',
    shape: 'portrait',
  },
  {
    src: '/images/work/21.jpg',
    zh: '全球开发者生态连接',
    en: 'Global Developer Ecosystem',
    place: 'Singapore',
    zhRole: '生态伙伴',
    enRole: 'Ecosystem partner',
    zhResult: '在现场认识不同地区的创业者与社区伙伴',
    enResult: 'Met founders and community partners from different regions',
    shape: 'wide',
  },
  {
    src: '/images/work/08.jpg',
    zh: 'AI 创业圆桌',
    en: 'AI Founder Roundtable',
    place: 'Shanghai',
    zhRole: '圆桌嘉宾、组织者',
    enRole: 'Panelist and organizer',
    zhResult: '围绕 AI 产品和创业实践展开讨论',
    enResult: 'Discussed AI products and early-stage company building',
    shape: 'wide',
  },
] as const;

export default function FieldReel({ locale }: { locale: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, x: 0, scroll: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = fieldImages[activeIndex];
  const copy =
    locale === 'zh'
      ? {
          eyebrow: '这些现场 / FIELD NOTES',
          title: '过去一年，我去过不少这样的房间。',
          description:
            '这些照片来自开发者工坊、多城系列活动、创业圆桌，以及在新加坡的一次分享。每张照片只记录了很短的一刻，但回头看时，我还能想起当时有哪些人在场，一件事是怎样被大家一起做完的。',
          drag: '继续滚动',
        }
      : {
          eyebrow: 'FIELD NOTES / PAST YEAR',
          title: 'I spent a lot of the past year in rooms like these.',
          description:
            'The photographs come from developer workshops, a multi-city series, a founder roundtable, and a talk in Singapore. Each captures only a brief moment. Looking back, I can still remember who was there and how the work came together.',
          drag: 'KEEP SCROLLING',
        };

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>('.field-gallery-card'));
    let frame = 0;
    const update = () => {
      frame = 0;
      const sectionBounds = section.getBoundingClientRect();
      if (sectionBounds.bottom < 0 || sectionBounds.top > window.innerHeight) return;

      const maxScroll = Math.max(1, section.offsetHeight - window.innerHeight);
      const travelled = Math.min(maxScroll, Math.max(0, -sectionBounds.top));
      const progress = travelled / maxScroll;
      const distance = Math.max(0, track.scrollWidth - window.innerWidth);
      track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
      section.style.setProperty('--field-progress', progress.toFixed(4));

      const viewportCenter = window.innerWidth / 2;
      const compact = window.innerWidth < 768;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      const measurements = cards.map((card) => {
        const bounds = card.getBoundingClientRect();
        const center = bounds.left + bounds.width / 2;
        return { card, center };
      });

      measurements.forEach(({ card, center }, index) => {
        const signed = (center - viewportCenter) / Math.max(1, window.innerWidth * 0.58);
        const clamped = Math.max(-1.45, Math.min(1.45, signed));
        const absolute = Math.abs(clamped);
        const centerDistance = Math.abs(center - viewportCenter);

        card.style.setProperty('--gallery-angle', `${clamped * (compact ? -5 : -12)}deg`);
        card.style.setProperty('--gallery-depth', `${absolute * (compact ? -55 : -175)}px`);
        card.style.setProperty('--gallery-lift', `${Math.pow(absolute, 1.2) * (compact ? 7 : 22)}px`);
        card.style.setProperty('--gallery-scale', Math.max(compact ? 0.92 : 0.82, 1 - absolute * (compact ? 0.055 : 0.12)).toFixed(3));
        card.style.setProperty('--gallery-dim', Math.min(0.72, absolute * 0.46).toFixed(3));

        if (centerDistance < closestDistance) {
          closestDistance = centerDistance;
          closestIndex = index;
        }
      });

      setActiveIndex((current) => (current === closestIndex ? current : closestIndex));
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
    };
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (
      event.pointerType === 'touch' ||
      event.button !== 0 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;
    dragRef.current = { active: true, x: event.clientX, scroll: window.scrollY };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add('is-dragging');
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / Math.max(1, window.innerHeight)) * 100;
    event.currentTarget.style.setProperty('--field-look-x', `${x.toFixed(2)}%`);
    event.currentTarget.style.setProperty('--field-look-y', `${Math.max(18, Math.min(76, y)).toFixed(2)}%`);

    if (dragRef.current.active) {
      const delta = event.clientX - dragRef.current.x;
      window.scrollTo({ top: dragRef.current.scroll - delta * 2.8, behavior: 'auto' });
    }
  };

  const endDrag = (event: PointerEvent<HTMLElement>) => {
    dragRef.current.active = false;
    event.currentTarget.classList.remove('is-dragging');
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section
      id="field"
      ref={sectionRef}
      className="field-gallery"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div className="field-gallery-sticky">
        <div className="field-gallery-atmosphere" aria-hidden="true" />
        <div className="field-gallery-ground" aria-hidden="true" />

        <header className="container field-gallery-heading">
          <div>
            <p className="directed-kicker">{copy.eyebrow}</p>
            <h2>{copy.title}</h2>
          </div>
          <p>{copy.description}</p>
        </header>

        <div className="field-gallery-window">
          <div ref={trackRef} className="field-gallery-track">
            {fieldImages.map((item, index) => {
              const title = locale === 'zh' ? item.zh : item.en;
              return (
                <figure
                  key={item.src}
                  className={`field-gallery-card field-gallery-card-${item.shape} ${activeIndex === index ? 'is-active' : ''}`}
                  aria-current={activeIndex === index ? 'true' : undefined}
                >
                  <Image
                    src={item.src}
                    alt={locale === 'zh' ? title : `${title} in the field`}
                    fill
                    sizes={item.shape === 'portrait' ? '(min-width: 768px) 32vw, 72vw' : '(min-width: 768px) 58vw, 88vw'}
                    className="object-cover"
                  />
                  <div className="field-gallery-card-wash" />
                  <figcaption>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{title}</strong>
                    <small>{item.place}</small>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>

        <div className="container field-gallery-focus">
          <div>
            <span>{String(activeIndex + 1).padStart(2, '0')} / {String(fieldImages.length).padStart(2, '0')}</span>
            <strong>{locale === 'zh' ? activeItem.zhRole : activeItem.enRole}</strong>
          </div>
          <p>{locale === 'zh' ? activeItem.zhResult : activeItem.enResult}</p>
          <span>{copy.drag}</span>
        </div>
      </div>
    </section>
  );
}
