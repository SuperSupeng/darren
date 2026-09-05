'use client';

import Image from 'next/image';
import { useRef, type PointerEvent } from 'react';
import { Link } from '@/i18n/navigation';
import { getPortfolio } from '@/lib/portfolio';

export default function Hero({ locale }: { locale: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const heroWork = getPortfolio(locale).work.filter((item) => item.heroSummary);
  const copy =
    locale === 'zh'
      ? {
          eyebrow: '杭州 / HANGZHOU · 2026',
          title: '我组织开\u2060发\u2060者活动，也帮助 AI 产\u2060品接触第一批用户。',
          intro:
            '从活动策划、嘉宾与开发者招募，到现场执行和反馈整理，我会直接参与，把一次合作从想法推进到完成。',
          primary: '看相关案例',
          contact: '聊聊你的项目',
          portrait: '苏鹏在科技活动现场分享',
          scene: 'AI 与 Agent 分享 · 2026',
        }
      : {
          eyebrow: 'HANGZHOU, CHINA / 2026',
          title: 'I organize developer events and help AI products meet their first users.',
          intro:
            'I stay involved from planning and inviting speakers and developers through running the event and collecting feedback.',
          primary: 'Explore the work',
          contact: 'Discuss your project',
          portrait: 'Darren speaking at a technology event',
          scene: 'AI and agent talk · 2026',
        };

  const moveScene = (event: PointerEvent<HTMLElement>) => {
    if (
      event.pointerType === 'touch' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    sectionRef.current?.style.setProperty('--hero-look-x', x.toFixed(3));
    sectionRef.current?.style.setProperty('--hero-look-y', y.toFixed(3));
  };

  const resetScene = () => {
    sectionRef.current?.style.setProperty('--hero-look-x', '0');
    sectionRef.current?.style.setProperty('--hero-look-y', '0');
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      className="directed-hero"
      onPointerMove={moveScene}
      onPointerLeave={resetScene}
    >
      <Image
        src="/images/hero-longjing-mist.webp"
        alt=""
        fill
        preload
        sizes="100vw"
        className="directed-hero-mountain"
      />
      <div className="directed-hero-veil" />
      <div className="directed-hero-mist" aria-hidden="true" />
      <svg className="directed-hero-water" viewBox="0 0 1600 900" aria-hidden="true">
        <path d="M-120 628C164 432 354 704 620 545S1039 353 1287 490s316 82 458-43" />
        <path d="M-86 700c302-151 471 92 730-55s389-153 612-16 341 92 494-24" />
        <path d="M20 768c247-108 418 71 626-28s366-113 566-19 310 81 466 4" />
      </svg>

      <div className="container directed-hero-grid">
        <div className="directed-hero-copy">
          <p className="directed-kicker">{copy.eyebrow}</p>
          <h1 className="directed-hero-title">
            <span>Darren Su</span>
            <em>苏鹏</em>
          </h1>
          <p className="directed-hero-thesis">{copy.title}</p>
          <p className="directed-hero-intro">{copy.intro}</p>
          <div className="directed-hero-actions">
            <a href="#work" className="directed-primary-link">
              <span>{copy.primary}</span>
              <i aria-hidden="true">↓</i>
            </a>
            <Link
              href="/services"
              className="directed-text-link"
            >
              {copy.contact} ↗
            </Link>
          </div>
        </div>

        <figure className="directed-hero-portrait">
          <div className="directed-hero-portrait-window">
            <Image
              src="/photo.jpg"
              alt={copy.portrait}
              fill
              loading="eager"
              sizes="(min-width: 1024px) 39vw, 88vw"
              className="directed-hero-photo object-cover object-[52%_center]"
            />
            <div className="directed-hero-portrait-tone" />
            <Image
              src="/images/peng-seal-v1.png"
              alt=""
              width={220}
              height={220}
              className="directed-hero-seal"
              aria-hidden="true"
            />
          </div>
          <figcaption>
            <span>FIELD / 01</span>
            <strong>{copy.scene}</strong>
          </figcaption>
        </figure>
      </div>

      <ul className="container directed-proof-rail" aria-label={locale === 'zh' ? '相关工作经历' : 'Related work'}>
        {heroWork.map((item) => (
          <li key={item.id}>
            <Link href={`/work/${item.id}`}>
              <strong>{item.title}</strong>
              <span aria-hidden="true">↗</span>
              <p>{item.heroSummary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
