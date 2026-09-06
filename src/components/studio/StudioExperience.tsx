'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Component, useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { getStudioLocation, updateStudioLocation } from '@/lib/studio-location';
import { useStudioSettings } from '@/components/spatial/StudioSettings';
import StudioAtmosphere from './StudioAtmosphere';
import type { StudioContent, StudioItem, StudioZone, StudioFocusZone } from './types';
import './studio.css';

const StudioScene = dynamic(() => import('./StudioScene'), { ssr: false });
const zones: Exclude<StudioZone, 'overview'>[] = ['work', 'build', 'notes'];
const subscribeHydration = () => () => {};
const clientHydrationSnapshot = () => true;
const serverHydrationSnapshot = () => false;

const copy = {
  zh: {
    location: '杭州 · 中国', welcome: '开发者社区 · AI 实践',
    directory: '页面导航', routes: { work: '工作案例', build: '产品', blog: '文章与手记', services: '合作方式', about: '关于我' },
    title: ['你好，我是', 'Darren。'], intro: '我策划开发者活动，组织 AI 产品体验和反馈 Workshop，也向团队和社区分享 AI 与 Agent 的实践经验。',
    projects: '看项目', collaborate: '聊聊合作', actions: '了解工作与合作',
    hint: '左右拖动查看房间，点击标签或物件浏览内容',
    overview: '回到全景', controls: '场景浏览方式',
    still: '静态浏览', live: '开启 3D', loading: '正在打开工作室', ready: '工作室已打开',
    failed: '已切换为静态场景，内容仍可正常浏览。', paused: '静态场景 · 选择区域继续浏览',
    visit: '打开产品', read: '阅读文章', detail: '查看案例',
    all: { work: '全部工作案例', build: '全部产品', notes: '全部文章与手记' },
    labels: { work: '工作案例', build: '产品', notes: '文章与手记' },
    hotspotCopy: { work: '开发者活动、社区合作与分享', build: '我开发的产品和工具', notes: 'AI 实践、旅行与生活' },
    captions: { work: '我参与的项目', build: '我做的产品', notes: '最近写的文章' },
    descriptions: {
      work: '开发者活动、社区合作和分享。案例里记录了我负责的部分与项目结果。',
      build: '这些产品来自我在工作中遇到的问题，可以直接打开使用。',
      notes: 'AI 与 Agent 的使用经验，以及旅行和生活中的见闻。',
    },
    room: 'Darren 的 3D 工作室',
    shortcut: '按内容浏览', close: '收起内容，回到全景',
  },
  en: {
    location: 'HANGZHOU, CHINA', welcome: 'DEVELOPER COMMUNITIES · AI PRACTICE',
    directory: 'Site navigation', routes: { work: 'Selected work', build: 'Products', blog: 'Writing', services: 'Work together', about: 'About me' },
    title: ["Hi, I'm", 'Darren.'], intro: 'I plan developer events, run hands-on workshops for AI products, and give talks for teams and communities about my work with AI and agents.',
    projects: 'See my work', collaborate: 'Work together', actions: 'Explore work and collaboration',
    hint: 'Drag sideways to look around. Select a label or object to browse.',
    overview: 'Room overview', controls: 'Scene viewing options',
    still: 'Still view', live: 'Enable 3D', loading: 'Opening the studio', ready: 'The studio is ready',
    failed: 'Showing a still scene. All content is available below.', paused: 'Still scene · Choose a space to explore',
    visit: 'Open product', read: 'Read article', detail: 'View case study',
    all: { work: 'All selected work', build: 'All products', notes: 'All writing' },
    labels: { work: 'Selected work', build: 'Products', notes: 'Writing' },
    hotspotCopy: { work: 'Developer events, community projects & talks', build: 'Products and tools I build', notes: 'AI practice, travel & life' },
    captions: { work: 'Projects I’ve worked on', build: 'Products I build', notes: 'Recent writing' },
    descriptions: {
      work: 'Developer events, community projects, and talks, with my role and the outcomes of each.',
      build: 'Products built to solve problems I encountered at work. Open one to try it.',
      notes: 'What I’ve learned from using AI and agents, alongside notes on travel and life.',
    },
    room: 'Darren’s 3D studio',
    shortcut: 'Browse by topic', close: 'Close the collection and return to the room',
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

export default function StudioExperience({ locale, content, children }: { locale: string; content: StudioContent; children: ReactNode }) {
  const t = locale === 'zh' ? copy.zh : copy.en;
  const hydrated = useSyncExternalStore(subscribeHydration, clientHydrationSnapshot, serverHydrationSnapshot);
  const [zone, setZone] = useState<StudioZone>('overview');
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const { lighting, still, setStill } = useStudioSettings();
  const [previousStill, setPreviousStill] = useState(still);
  const [highlightedZone, setHighlightedZone] = useState<StudioFocusZone | null>(null);
  const [viewAngle, setViewAngle] = useState(0);
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
    const url = updateStudioLocation(new URL(window.location.href), { zone: next, lighting });
    window.history.replaceState(window.history.state, '', url);
  }, [lighting]);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => { setFailed(true); setReady(false); setStill(true); }, [setStill]);

  useEffect(() => {
    const restore = () => {
      const restored = getStudioLocation(new URL(window.location.href));
      setZone(restored.zone);
    };
    const syncSamePageLink = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const destination = new URL(link.href);
      if (destination.origin !== window.location.origin || destination.pathname !== window.location.pathname) return;
      if (destination.hash && !zones.includes(destination.hash.slice(1) as StudioFocusZone)) return;
      // Next Link changes same-page hashes through history without a native hashchange.
      setZone(getStudioLocation(destination).zone);
      setHighlightedZone(null);
    };
    const frame = requestAnimationFrame(restore);
    window.addEventListener('hashchange', restore);
    window.addEventListener('popstate', restore);
    document.addEventListener('click', syncSamePageLink);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', restore);
      window.removeEventListener('popstate', restore);
      document.removeEventListener('click', syncSamePageLink);
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
    return () => cancelAnimationFrame(frame);
  }, [zone]);

  useEffect(() => {
    if (zone === 'overview') return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        selectZone('overview');
        navRefs.current[zone]?.focus({ preventScroll: true });
      }
    };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [zone, selectZone]);

  useEffect(() => {
    if (ready || useStill) return;
    const timeout = window.setTimeout(onFailure, 20000);
    return () => window.clearTimeout(timeout);
  }, [ready, useStill, onFailure]);

  // Reset before rendering a new canvas, including changes made in the shared footer.
  if (previousStill !== still) {
    setPreviousStill(still);
    setReady(false);
    if (!still) setFailed(false);
  }

  return (
    <main id="main-content" tabIndex={-1} className={`studio-experience ${activeZone ? 'studio-is-focused' : ''}`} data-lighting={lighting} lang={locale}>
      <div className="studio-stage">
        <StudioAtmosphere />
        <div ref={roomRef} className="studio-room" aria-label={t.room} role="group" data-scene-status={!hydrated || useStill ? 'static' : ready ? 'ready' : 'loading'}>
          <div className={`studio-poster ${ready && !useStill ? 'studio-poster-hidden' : ''}`} aria-hidden="true">
            <Image src={lighting === 'evening' ? '/images/studio-dusk-preview.png' : '/images/studio-daylight-preview.png'} alt="" fill sizes="(max-width: 760px) 100vw, 76vw" preload className="studio-poster-image" />
          </div>
          {hydrated && !useStill ? <SceneBoundary onFailure={onFailure}>
            <StudioScene zone={zone} onSelect={selectZone} reducedMotion={reducedMotion} onReady={onReady} onFailure={onFailure} lighting={lighting} highlightedZone={highlightedZone} onHover={setHighlightedZone} hotspotRoot={roomRef} viewAngle={viewAngle} onViewAngleChange={setViewAngle} />
          </SceneBoundary> : null}
          <div className="studio-hotspots" hidden={!ready || useStill || Boolean(activeZone)}>
            {zones.map((item, index) => <button key={item} type="button" data-studio-hotspot={item} className={`studio-hotspot ${highlightedZone === item ? 'is-highlighted' : ''}`} style={{ transform: `translate3d(var(--hotspot-${item}-x, -999px), var(--hotspot-${item}-y, -999px), 0) translate(-50%, -100%)` }} onPointerEnter={() => setHighlightedZone(item)} onPointerLeave={() => setHighlightedZone(null)} onFocus={() => setHighlightedZone(item)} onBlur={() => setHighlightedZone(null)} onClick={() => selectZone(item)} aria-label={`${t.labels[item]} · ${t.hotspotCopy[item]}`}>
              <span className="studio-hotspot-label">{t.labels[item]}<small>{t.hotspotCopy[item]}</small></span>
              <span className="studio-hotspot-pin" aria-hidden="true">0{index + 1}<i /></span>
            </button>)}
          </div>
          <span className="studio-scene-caption" aria-hidden="true"><span />{t.location} <i>DARREN SU</i></span>
        </div>

        <div className="studio-intro" hidden={Boolean(activeZone)}>
          <p className="studio-eyebrow"><span /> {t.welcome}</p>
          <h1 aria-label={`${t.title[0]} ${t.title[1]}`}>{t.title[0]}<br />{' '}<em>{t.title[1]}</em></h1>
          <p className="studio-intro-description">{t.intro}</p>
          <nav className="studio-hero-actions" aria-label={t.actions}>
            <Link className="studio-enter" href={`/work${lighting === 'evening' ? '?light=evening' : ''}`}>{t.projects}<span aria-hidden="true">↗</span></Link>
            <Link className="studio-collaborate" href={`/services${lighting === 'evening' ? '?light=evening' : ''}`}>{t.collaborate}<span aria-hidden="true">↗</span></Link>
          </nav>
          <Link className="studio-host" href={`/about${lighting === 'evening' ? '?light=evening' : ''}`} aria-label={locale === 'zh' ? '认识 Darren Su / 苏鹏' : 'Meet Darren Su'}>
            <span className="studio-host-photo"><Image src="/photo.jpg" alt="Darren Su" fill sizes="104px" loading="eager" /></span>
            <span className="studio-host-copy"><span className="studio-host-name">Darren Su <span>/ 苏鹏</span></span><span className="studio-host-link">{locale === 'zh' ? '认识一下' : 'A little about me'} <span aria-hidden="true">↗</span></span></span>
          </Link>
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
        <p className="studio-hint" role="status" aria-live="polite">{!hydrated ? t.paused : useStill ? failed ? t.failed : t.paused : ready ? t.hint : t.loading}</p>
        <nav className="studio-zone-nav" aria-label={t.shortcut} hidden={!hydrated}>
          {zones.map((item, index) => <button key={item} type="button" ref={node => { navRefs.current[item] = node; }} className={`studio-zone-button ${zone === item ? 'is-active' : ''} ${highlightedZone === item ? 'is-highlighted' : ''}`} aria-pressed={zone === item} onClick={() => selectZone(item)} onPointerEnter={() => setHighlightedZone(item)} onPointerLeave={() => setHighlightedZone(null)} onFocus={() => setHighlightedZone(item)} onBlur={() => setHighlightedZone(null)}>
            <span className="studio-zone-number">0{index + 1}</span><ZoneIcon zone={item} /><span className="studio-zone-text">{t.labels[item]}<small>{item === 'work' ? 'WORK' : item === 'build' ? 'PRODUCTS' : 'WRITING'}</small></span><span className="studio-zone-arrow" aria-hidden="true">↗</span>
          </button>)}
        </nav>
      </div>

      <div className="studio-controls">
        <nav className="studio-directory" aria-label={t.directory}>
          {(['work', 'build', 'blog', 'services', 'about'] as const).map(path => <Link key={path} href={`/${path}`}>{t.routes[path]}</Link>)}
        </nav>
        <div className="studio-view-actions" role="group" aria-label={t.controls} hidden={!hydrated}>
          {Math.abs(viewAngle) > 0.01 && !useStill ? <button type="button" onClick={() => setViewAngle(0)}>{locale === 'zh' ? '◇ 转回正面' : '◇ Reset angle'}</button> : null}
          {activeZone ? <button type="button" onClick={() => { selectZone('overview'); navRefs.current[activeZone]?.focus({ preventScroll: true }); }}>↶ {t.overview}</button> : null}
          <button type="button" aria-pressed={useStill} onClick={() => { if (useStill) { setStill(false); setFailed(false); setReady(false); } else { setStill(true); setReady(false); } }}><span aria-hidden="true">{useStill ? '◇' : '◈'}</span> {useStill ? t.live : t.still}</button>
        </div>
      </div>
      <noscript><nav className="studio-no-script" aria-label={t.shortcut}>
        <Link href="/work">{t.all.work}</Link><Link href="/build">{t.all.build}</Link><Link href="/blog">{t.all.notes}</Link><Link href="/services">{t.routes.services}</Link><Link href="/about">{t.routes.about}</Link>
      </nav></noscript>
      {children}
    </main>
  );
}
