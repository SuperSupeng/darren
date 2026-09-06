'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Component, useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { getStudioLocation, updateStudioLocation, getStudioHref } from '@/lib/studio-location';
import type { StudioContent, StudioItem, StudioZone, StudioFocusZone, StudioLighting } from './types';
import './studio.css';

const StudioScene = dynamic(() => import('./StudioScene'), { ssr: false });
const zones: Exclude<StudioZone, 'overview'>[] = ['work', 'build', 'notes'];

const copy = {
  zh: {
    location: '杭州 · 中国', edition: '开放工作室 / 02', preview: '欢迎，随意坐坐',
    day: '日光', evening: '暮色', lightingLabel: '工作室光线',
    title: ['山边，有间', '工作室。'], intro: '我在这里连接人、做产品，也把沿途的经历写下来。',
    invitation: '进来坐坐，看看最近发生的事。', explore: '从长桌开始',
    hint: '点击房间里的物件，或选择下方区域',
    overview: '回到全景', back: '浏览网站', contact: '聊聊你的项目',
    still: '静态浏览', live: '开启 3D', loading: '正在打开工作室', ready: '工作室已打开',
    failed: '已切换为静态场景，内容仍可正常浏览。', paused: '静态场景 · 选择区域继续浏览',
    visit: '打开项目', read: '阅读手记', detail: '查看案例',
    all: { work: '全部工作案例', build: '全部产品', notes: '全部手记' },
    labels: { work: '共创长桌', build: '产品工作台', notes: '窗边手记' },
    hotspotCopy: { work: '开发者活动与社区合作', build: '从问题出发，做成产品', notes: 'AI、旅途与生活的记录' },
    captions: { work: '让一群人，一起做成一件事', build: '让一个想法，进入真实的生活', notes: '把发生过的事，慢慢写下来' },
    descriptions: {
      work: '活动、社区与真实的连接。这些是我亲手参与推进的工作。',
      build: '从日常遇到的问题出发，做出可以被使用的产品。',
      notes: '关于 AI、旅途与生活的一些记录，也留一点思考的余地。',
    },
    footer: '连接人 · 创造产品 · 保留思考', room: '杭州山边的三维工作室',
    shortcut: '区域导航', close: '收起内容，回到全景',
  },
  en: {
    location: 'HANGZHOU, CHINA', edition: 'OPEN STUDIO / 02', preview: 'Come in. Make yourself at home.',
    day: 'Daylight', evening: 'Dusk', lightingLabel: 'Studio lighting',
    title: ['A studio', 'by the hills.'], intro: 'A place to bring people together, build things, and write along the way.',
    invitation: 'Come in. See what I’ve been working on.', explore: 'Start at the table',
    hint: 'Select an object in the room, or explore a space below',
    overview: 'Room overview', back: 'Browse the site', contact: 'Let’s work together',
    still: 'Still view', live: 'Enable 3D', loading: 'Opening the studio', ready: 'The studio is ready',
    failed: 'Showing a still scene. All content is available below.', paused: 'Still scene · Choose a space to explore',
    visit: 'Visit project', read: 'Read field note', detail: 'View case study',
    all: { work: 'All selected work', build: 'All products', notes: 'All field notes' },
    labels: { work: 'The shared table', build: 'The workbench', notes: 'By the window' },
    hotspotCopy: { work: 'People, programs & community', build: 'Ideas put into practice', notes: 'Notes on AI, travel & life' },
    captions: { work: 'Good things start with people', build: 'Ideas, out in the real world', notes: 'A few things worth writing down' },
    descriptions: {
      work: 'Developer programs, communities, and the work of bringing people together.',
      build: 'Working products that began with problems I kept encountering.',
      notes: 'Notes on AI, travel, and life. With room for thoughts to change.',
    },
    footer: 'CONNECTING · BUILDING · REFLECTING', room: 'A three-dimensional studio by the Hangzhou hills',
    shortcut: 'Explore the studio', close: 'Close the collection and return to the room',
  },
};

function subscribeMotion(callback: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

function getMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function ZoneIcon({ zone }: { zone: Exclude<StudioZone, 'overview'> }) {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {zone === 'work' ? <><path d="m4 12 12-6 12 6-12 6-12-6Z" /><path d="M7 14v10m18-10v10M16 18v9" /></> : null}
      {zone === 'build' ? <><path d="m7 8 18-3v16l-18 3V8Z" /><path d="m7 20 18-3M16 23v4m-5 1 10-2" /></> : null}
      {zone === 'notes' ? <><path d="M16 10C12 6 7 6 3 7v17c5-1 9 0 13 3 4-3 8-4 13-3V7c-4-1-9-1-13 3Z" /><path d="M16 10v17M7 12l5 1m-5 4 5 1m8-5 5-1m-5 6 5-1" /></> : null}
    </svg>
  );
}

function ItemCard({ item, action }: { item: StudioItem; action: string }) {
  const children = <>
    <div className="studio-card-image"><Image src={item.image} alt="" fill sizes="(max-width: 760px) 88px, 104px" /></div>
    <div className="studio-card-copy">
      {item.meta ? <span className="studio-card-meta">{item.meta}</span> : null}
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <span className="studio-card-action">{action} <span aria-hidden="true">↗</span></span>
    </div>
  </>;
  return item.external
    ? <a className="studio-card" href={item.href} target="_blank" rel="noopener noreferrer">{children}</a>
    : <Link className="studio-card" href={item.href}>{children}</Link>;
}

export default function StudioExperience({ locale, content }: { locale: string; content: StudioContent }) {
  const t = locale === 'zh' ? copy.zh : copy.en;
  const [zone, setZone] = useState<StudioZone>('overview');
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [still, setStill] = useState(false);
  const [lighting, setLighting] = useState<StudioLighting>('day');
  const [highlightedZone, setHighlightedZone] = useState<StudioFocusZone | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getMotion, () => true);
  const roomRef = useRef<HTMLDivElement>(null);
  const collectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const navRefs = useRef<Partial<Record<StudioZone, HTMLButtonElement | null>>>({});
  const activeZone = zone === 'overview' ? null : zone;
  const useStill = still || failed;

  const selectZone = useCallback((next: StudioZone) => {
    setZone(next);
    setHighlightedZone(null);
    const url = updateStudioLocation(new URL(window.location.href), { zone: next });
    window.history.replaceState(window.history.state, '', url);
  }, []);
  const changeLighting = (next: StudioLighting) => {
    setLighting(next);
    const url = updateStudioLocation(new URL(window.location.href), { lighting: next });
    window.history.replaceState(window.history.state, '', url);
  };
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => { setFailed(true); setReady(false); }, []);

  useEffect(() => {
    const restore = () => {
      const restored = getStudioLocation(new URL(window.location.href));
      setZone(restored.zone);
      setLighting(restored.lighting);
    };
    const frame = requestAnimationFrame(restore);
    window.addEventListener('hashchange', restore);
    window.addEventListener('popstate', restore);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', restore);
      window.removeEventListener('popstate', restore);
    };
  }, []);

  useEffect(() => {
    if (zone === 'overview') return;
    const frame = requestAnimationFrame(() => {
      titleRef.current?.focus({ preventScroll: true });
      if (window.matchMedia('(max-width: 760px)').matches) {
        collectionRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
    });
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        selectZone('overview');
        navRefs.current[zone]?.focus({ preventScroll: true });
      }
    };
    window.addEventListener('keydown', escape);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('keydown', escape); };
  }, [zone, selectZone]);

  useEffect(() => {
    if (ready || useStill) return;
    const timeout = window.setTimeout(onFailure, 20000);
    return () => window.clearTimeout(timeout);
  }, [ready, useStill, onFailure]);

  return (
    <main id="main-content" tabIndex={-1} className={`studio-experience ${activeZone ? 'studio-is-focused' : ''}`} data-lighting={lighting} lang={locale}>
      <header className="studio-header">
        <Link href="/" className="studio-brand" aria-label={locale === 'zh' ? 'Darren Su 首页' : 'Darren Su home'}>
          <span className="studio-brand-mark" aria-hidden="true">苏</span><span>Darren Su<span className="studio-brand-period">.</span></span>
        </Link>
        <div className="studio-light-switch" role="group" aria-label={t.lightingLabel}>
          {(['day', 'evening'] as const).map(value => <button key={value} type="button" aria-pressed={lighting === value} onClick={() => changeLighting(value)}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {value === 'day' ? <><circle cx="10" cy="10" r="3.5" /><path d="M10 1v2m0 14v2M1 10h2m14 0h2M3.6 3.6 5 5m10 10 1.4 1.4M3.6 16.4 5 15M15 5l1.4-1.4" /></> : <path d="M16.7 12.2A7 7 0 0 1 7.8 3.3a7 7 0 1 0 8.9 8.9Z" />}
            </svg>{t[value]}
          </button>)}
        </div>
        <div className="studio-header-actions">
          <Link href={getStudioHref({ zone, lighting })} locale={locale === 'zh' ? 'en' : 'zh'} hrefLang={locale === 'zh' ? 'en' : 'zh'} className="studio-language">{locale === 'zh' ? 'EN' : '中文'}</Link>
          <Link href="/" className="studio-site-link">{t.back} <span aria-hidden="true">↗</span></Link>
        </div>
      </header>

      <div className="studio-stage">
        <div ref={roomRef} className="studio-room" aria-label={t.room} role="group" data-scene-status={useStill ? 'static' : ready ? 'ready' : 'loading'}>
          <div className={`studio-poster ${ready && !useStill ? 'studio-poster-hidden' : ''}`} aria-hidden="true">
            <Image src={lighting === 'evening' ? '/images/studio-dusk-preview.png' : '/images/studio-daylight-preview.png'} alt="" fill sizes="(max-width: 760px) 100vw, 76vw" preload className="studio-poster-image" />
          </div>
          {!useStill ? <SceneBoundary onFailure={onFailure}>
            <StudioScene zone={zone} onSelect={selectZone} reducedMotion={reducedMotion} onReady={onReady} onFailure={onFailure} lighting={lighting} highlightedZone={highlightedZone} onHover={setHighlightedZone} hotspotRoot={roomRef} />
          </SceneBoundary> : null}
          <div className="studio-hotspots" hidden={!ready || useStill || Boolean(activeZone)}>
            {zones.map((item, index) => <button key={item} type="button" data-studio-hotspot={item} className={`studio-hotspot ${highlightedZone === item ? 'is-highlighted' : ''}`} style={{ transform: `translate3d(var(--hotspot-${item}-x, -999px), var(--hotspot-${item}-y, -999px), 0) translate(-50%, -100%)` }} onPointerEnter={() => setHighlightedZone(item)} onPointerLeave={() => setHighlightedZone(null)} onFocus={() => setHighlightedZone(item)} onBlur={() => setHighlightedZone(null)} onClick={() => selectZone(item)} aria-label={`${t.labels[item]} · ${t.hotspotCopy[item]}`}>
              <span className="studio-hotspot-label">{t.labels[item]}<small>{t.hotspotCopy[item]}</small></span>
              <span className="studio-hotspot-pin" aria-hidden="true">0{index + 1}<i /></span>
            </button>)}
          </div>
          <span className="studio-scene-caption" aria-hidden="true"><span />{t.location} <i>A PLACE FOR IDEAS</i></span>
        </div>

        <div className="studio-intro" hidden={Boolean(activeZone)}>
          <p className="studio-eyebrow"><span /> {t.preview}</p>
          <h1 aria-label={`${t.title[0]}${locale === 'en' ? ' ' : ''}${t.title[1]}`}>{t.title[0]}<br />{locale === 'en' ? ' ' : null}<em>{t.title[1]}</em></h1>
          <p className="studio-intro-description">{t.intro}</p>
          <p className="studio-invitation">{t.invitation}</p>
          <button type="button" className="studio-enter" onClick={() => selectZone('work')}>{t.explore}<span aria-hidden="true">↗</span></button>
          <span className="studio-intro-rule" aria-hidden="true" />
          <p className="studio-intro-signature">Darren Su <span>/ 苏鹏</span></p>
          <span className="studio-edition studio-intro-edition">{t.edition}</span>
        </div>

        {activeZone ? <section ref={collectionRef} className="studio-collection" aria-labelledby="studio-collection-title" key={activeZone}>
          <div className="studio-collection-top"><p className="studio-eyebrow">0{zones.indexOf(activeZone) + 1} / {t.labels[activeZone]}</p>
            <button type="button" className="studio-close" aria-label={t.close} onClick={() => { selectZone('overview'); navRefs.current[activeZone]?.focus({ preventScroll: true }); }}>×</button>
          </div>
          <h2 id="studio-collection-title" ref={titleRef} tabIndex={-1}>{t.captions[activeZone]}</h2>
          <p className="studio-collection-description">{t.descriptions[activeZone]}</p>
          <div className="studio-collection-cards">{content[activeZone].map(item => <ItemCard key={item.id} item={item} action={activeZone === 'build' ? t.visit : activeZone === 'notes' ? t.read : t.detail} />)}</div>
          <Link href={activeZone === 'notes' ? '/blog' : `/${activeZone}`} className="studio-all-link">{t.all[activeZone]} <span aria-hidden="true">↗</span></Link>
        </section> : null}
      </div>

      <div className="studio-navigation-area">
        <p className="studio-hint" role="status" aria-live="polite">{useStill ? failed ? t.failed : t.paused : ready ? t.hint : t.loading}</p>
        <nav className="studio-zone-nav" aria-label={t.shortcut}>
          {zones.map((item, index) => <button key={item} type="button" ref={node => { navRefs.current[item] = node; }} className={`studio-zone-button ${zone === item ? 'is-active' : ''} ${highlightedZone === item ? 'is-highlighted' : ''}`} aria-pressed={zone === item} onClick={() => selectZone(item)} onPointerEnter={() => setHighlightedZone(item)} onPointerLeave={() => setHighlightedZone(null)} onFocus={() => setHighlightedZone(item)} onBlur={() => setHighlightedZone(null)}>
            <span className="studio-zone-number">0{index + 1}</span><ZoneIcon zone={item} /><span className="studio-zone-text">{t.labels[item]}<small>{item === 'work' ? 'GATHER' : item === 'build' ? 'BUILD' : 'REFLECT'}</small></span><span className="studio-zone-arrow" aria-hidden="true">↗</span>
          </button>)}
        </nav>
      </div>

      <footer className="studio-footer">
        <span className="studio-footer-motto">{t.footer}</span>
        <div className="studio-view-actions">
          {activeZone ? <button type="button" onClick={() => { selectZone('overview'); navRefs.current[activeZone]?.focus({ preventScroll: true }); }}>↶ {t.overview}</button> : null}
          <button type="button" aria-pressed={useStill} onClick={() => { if (useStill) { setStill(false); setFailed(false); setReady(false); } else { setStill(true); setReady(false); } }}><span aria-hidden="true">{useStill ? '◇' : '◈'}</span> {useStill ? t.live : t.still}</button>
        </div>
        <a href="mailto:supeng842499467@gmail.com" className="studio-contact">{t.contact} <span aria-hidden="true">↗</span></a>
      </footer>
      <noscript><nav className="studio-no-script" aria-label={t.shortcut}>
        <Link href="/work">{t.all.work}</Link><Link href="/build">{t.all.build}</Link><Link href="/blog">{t.all.notes}</Link>
      </nav></noscript>
    </main>
  );
}
