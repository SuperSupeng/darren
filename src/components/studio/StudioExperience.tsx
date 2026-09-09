'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Component, useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import { getStudioLocation } from '@/lib/studio-location';
import { useStudioSettings } from '@/components/spatial/StudioSettings';
import ProfileRoles from '@/components/ProfileRoles';
import StudioAtmosphere from './StudioAtmosphere';
import type { StudioZone, StudioFocusZone } from './types';
import './studio.css';

const StudioScene = dynamic(() => import('./StudioScene'), { ssr: false });
const zones: Exclude<StudioZone, 'overview'>[] = ['work', 'build', 'notes'];
const subscribeHydration = () => () => {};
const clientHydrationSnapshot = () => true;
const serverHydrationSnapshot = () => false;

const copy = {
  zh: {
    routes: { work: '工作案例', build: '产品', blog: '文章与手记', services: '合作方式', about: '关于我' },
    title: ['你好，我是', 'Darren'],
    projects: '看项目', collaborate: '聊聊合作', actions: '了解工作与合作',
    hint: '拖动查看房间，点击标签打开对应页面',
    controls: '场景浏览方式',
    still: '静态浏览', live: '开启 3D', loading: '正在打开工作室', ready: '工作室已打开',
    failed: '已切换为静态场景，内容仍可正常浏览。', paused: '静态场景 · 选择区域继续浏览',
    all: { work: '全部工作案例', build: '全部产品', notes: '全部文章与手记' },
    labels: { work: '工作案例', build: '产品', notes: '文章与手记' },
    hotspotCopy: { work: '开发者活动、社区合作与分享', build: '我开发的产品和工具', notes: 'AI 实践、旅行与生活' },
    room: 'Darren 的 3D 工作室',
    shortcut: '按内容浏览',
  },
  en: {
    routes: { work: 'Selected work', build: 'Products', blog: 'Writing', services: 'Work together', about: 'About me' },
    title: ["Hi, I'm", 'Darren'],
    projects: 'See my work', collaborate: 'Work together', actions: 'Explore work and collaboration',
    hint: 'Drag to rotate. Select a label to open a page.',
    controls: 'Scene viewing options',
    still: 'Still view', live: 'Enable 3D', loading: 'Opening the studio', ready: 'The studio is ready',
    failed: 'Showing a still scene. All content is available below.', paused: 'Still scene · Choose a space to explore',
    all: { work: 'All selected work', build: 'All products', notes: 'All writing' },
    labels: { work: 'Selected work', build: 'Products', notes: 'Writing' },
    hotspotCopy: { work: 'Developer events, community projects & talks', build: 'Products and tools I build', notes: 'AI practice, travel & life' },
    room: 'Darren’s 3D studio',
    shortcut: 'Browse by topic',
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

export default function StudioExperience({ locale, intro, roles, children }: { locale: string; intro: string; roles: string[]; children: ReactNode }) {
  const t = locale === 'zh' ? copy.zh : copy.en;
  const hydrated = useSyncExternalStore(subscribeHydration, clientHydrationSnapshot, serverHydrationSnapshot);
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const { lighting, still, setStill } = useStudioSettings();
  const [previousStill, setPreviousStill] = useState(still);
  const [highlightedZone, setHighlightedZone] = useState<StudioFocusZone | null>(null);
  const [viewAngle, setViewAngle] = useState(0);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getMotion, () => true);
  const roomRef = useRef<HTMLDivElement>(null);
  const useStill = still || failed;
  const destinationFor = useCallback((next: StudioFocusZone) => `/${next === 'notes' ? 'blog' : next}${lighting === 'evening' ? '?light=evening' : ''}`, [lighting]);
  const selectZone = useCallback((next: StudioZone) => {
    if (next !== 'overview') router.push(destinationFor(next));
  }, [router, destinationFor]);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => { setFailed(true); setReady(false); setStill(true); }, [setStill]);

  // Preserve old shared room links while all visible navigation now opens a page.
  useEffect(() => {
    const restore = () => {
      const { zone: previousZone, lighting: previousLighting } = getStudioLocation(new URL(window.location.href));
      if (previousZone !== 'overview') router.replace(`/${previousZone === 'notes' ? 'blog' : previousZone}${previousLighting === 'evening' ? '?light=evening' : ''}`);
    };
    restore();
    window.addEventListener('hashchange', restore);
    return () => window.removeEventListener('hashchange', restore);
  }, [router]);

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
    <main id="main-content" tabIndex={-1} className="studio-experience" data-lighting={lighting} lang={locale}>
      <div className="studio-stage">
        <StudioAtmosphere />
        <div ref={roomRef} className="studio-room" aria-label={t.room} role="group" data-scene-status={!hydrated || useStill ? 'static' : ready ? 'ready' : 'loading'}>
          <div className={`studio-poster ${ready && !useStill ? 'studio-poster-hidden' : ''}`} aria-hidden="true">
            <Image src={lighting === 'evening' ? '/images/studio-dusk-preview.png' : '/images/studio-daylight-preview.png'} alt="" fill sizes="(max-width: 760px) 100vw, 76vw" preload className="studio-poster-image" />
          </div>
          {hydrated && !useStill ? <SceneBoundary onFailure={onFailure}>
            <StudioScene zone="overview" onSelect={selectZone} reducedMotion={reducedMotion} onReady={onReady} onFailure={onFailure} lighting={lighting} highlightedZone={highlightedZone} onHover={setHighlightedZone} hotspotRoot={roomRef} viewAngle={viewAngle} onViewAngleChange={setViewAngle} />
          </SceneBoundary> : null}
          <div className="studio-hotspots" hidden={!ready || useStill}>
            {zones.map(item => <Link key={item} href={destinationFor(item)} data-studio-hotspot={item} className={`studio-hotspot ${highlightedZone === item ? 'is-highlighted' : ''}`} style={{ transform: `translate3d(var(--hotspot-${item}-x, -999px), var(--hotspot-${item}-y, -999px), 0) translate(-50%, -100%)` }} onPointerEnter={() => setHighlightedZone(item)} onPointerLeave={() => setHighlightedZone(null)} onFocus={() => setHighlightedZone(item)} onBlur={() => setHighlightedZone(null)} aria-label={`${t.labels[item]} · ${t.hotspotCopy[item]}`}>
              <span className="studio-hotspot-label">{t.labels[item]}</span>
              <span className="studio-hotspot-pin" aria-hidden="true"><i /></span>
            </Link>)}
          </div>
        </div>

        <div className="studio-intro">
          <h1 aria-label={`${t.title[0]} ${t.title[1]}`}>{t.title[0]}<br />{' '}<em>{t.title[1]}</em></h1>
          <p className="studio-intro-description">{intro}</p>
          <ProfileRoles roles={roles} />
          <nav className="studio-hero-actions" aria-label={t.actions}>
            <Link className="studio-enter" href={`/work${lighting === 'evening' ? '?light=evening' : ''}`}>{t.projects}<span aria-hidden="true">↗</span></Link>
            <Link className="studio-collaborate" href={`/services${lighting === 'evening' ? '?light=evening' : ''}`}>{t.collaborate}<span aria-hidden="true">↗</span></Link>
          </nav>
          <Link className="studio-host" href={`/about${lighting === 'evening' ? '?light=evening' : ''}`} aria-label={locale === 'zh' ? '认识 Darren Su / 苏鹏' : 'Meet Darren Su'}>
            <span className="studio-host-photo"><Image src="/photo.jpg" alt="Darren Su" fill sizes="104px" loading="eager" /></span>
            <span className="studio-host-copy"><span className="studio-host-name">Darren Su <span>/ 苏鹏</span></span><span className="studio-host-link">{locale === 'zh' ? '认识一下' : 'A little about me'} <span aria-hidden="true">↗</span></span></span>
          </Link>
        </div>

      </div>

      <div className="studio-navigation-area">
        <p className="studio-hint" role="status" aria-live="polite">{!hydrated ? t.paused : useStill ? failed ? t.failed : t.paused : ready ? t.hint : t.loading}</p>
        <nav className="studio-zone-nav" aria-label={t.shortcut} hidden={!hydrated}>
          {zones.map(item => <Link key={item} href={destinationFor(item)} className={`studio-zone-button ${highlightedZone === item ? 'is-highlighted' : ''}`} onPointerEnter={() => setHighlightedZone(item)} onPointerLeave={() => setHighlightedZone(null)} onFocus={() => setHighlightedZone(item)} onBlur={() => setHighlightedZone(null)}>
            <ZoneIcon zone={item} /><span className="studio-zone-text">{t.labels[item]}</span><span className="studio-zone-arrow" aria-hidden="true">↗</span>
          </Link>)}
        </nav>
      </div>

      <div className="studio-controls">
        <div className="studio-view-actions" role="group" aria-label={t.controls} hidden={!hydrated}>
          {Math.abs(viewAngle) > 0.01 && !useStill ? <button type="button" onClick={() => setViewAngle(0)}>{locale === 'zh' ? '◇ 转回正面' : '◇ Reset angle'}</button> : null}
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
