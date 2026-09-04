'use client';

import Image from 'next/image';
import { useRef, type PointerEvent } from 'react';

export default function Hero({ locale }: { locale: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const copy =
    locale === 'zh'
      ? {
          eyebrow: '杭州 / HANGZHOU · 2026',
          title: '过去一年，我做得最多的，是开\u2060发\u2060者活动、产\u2060品 Workshop 和分享。',
          intro:
            '这些项目里，我通常是发起人或负责人。从内容策划、嘉宾邀请，到参与者招募和现场执行，我都会直接参与。',
          role: '活动之外，我也在做 MatchPoint，并在日常工作里实际使用 31\u00a0个\u00a0Agent。',
          primary: '看看我最近做过的事',
          contact: '联系我',
          portrait: '苏鹏在科技活动现场分享',
          scene: 'AI 与 Agent 分享 · 2026',
          facts: [
            ['40 城', 'AI+X 创造节全国联动'],
            ['近 1,000 人', '四城开发者系列活动'],
            ['2 位创始人', '来中国做产品 Workshop'],
            ['31 个 Agent', '一篇文章带来多次分享'],
          ],
        }
      : {
          eyebrow: 'HANGZHOU, CHINA / 2026',
          title: 'Over the past year, I spent most of my time organizing developer events, running product workshops, and speaking about AI and agents.',
          intro:
            'I usually initiated or led these projects and stayed involved from program design and speaker invitations through participant outreach and on-site delivery.',
          role: 'Alongside this work, I am building MatchPoint and using 31 agents in my day-to-day work.',
          primary: 'See my recent work',
          contact: 'Contact me',
          portrait: 'Darren speaking at a technology event',
          scene: 'AI and agent talk · 2026',
          facts: [
            ['40 cities', 'The nationwide AI+X Creation Festival'],
            ['Nearly 1,000', 'A four-city developer series'],
            ['2 Israeli founders', 'A product workshop with early users in China'],
            ['31 agents', 'One essay led to several talks'],
          ],
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
          <p className="directed-hero-role">{copy.role}</p>
          <div className="directed-hero-actions">
            <a href="#work" className="directed-primary-link">
              <span>{copy.primary}</span>
              <i aria-hidden="true">↓</i>
            </a>
            <a href="mailto:supeng842499467@gmail.com" className="directed-text-link">
              {copy.contact} ↗
            </a>
          </div>
        </div>

        <figure className="directed-hero-portrait">
          <div className="directed-hero-portrait-window">
            <Image
              src="/photo.jpg"
              alt={copy.portrait}
              fill
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

      <ul className="container directed-proof-rail" aria-label={locale === 'zh' ? '近一年事实' : 'Facts from the past year'}>
        {copy.facts.map(([value, label], index) => (
          <li key={value}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{value}</strong>
            <p>{label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
