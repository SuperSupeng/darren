'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Component, useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import { getStudioDestination, getStudioLocation } from '@/lib/studio-location';
import { collaborateHref } from '@/lib/site-config';
import { useStudioSettings } from '@/components/spatial/StudioSettings';
import ProfileRoles from '@/components/ProfileRoles';
import type { StudioZone, StudioFocusZone } from './types';
import { clampViewAngle } from './scene-camera';
import './studio.css';

const StudioScene = dynamic(() => import('./StudioScene'), { ssr: false });
const zones = ['work', 'build', 'notes'] as const;
function subscribeMotion(callback: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}
const getMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function StudioExperience({ locale, intro, detail, roles, children }: { locale: string; intro: string; detail?: string; roles: string[]; children: ReactNode }) {
  const zh = locale === 'zh';
  const router = useRouter();
  const { lighting, still, setStill } = useStudioSettings();
  const [requested, setRequested] = useState(false);
  const [previousStill, setPreviousStill] = useState(still);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [highlightedZone, setHighlightedZone] = useState<StudioFocusZone | null>(null);
  const [viewAngle, setViewAngle] = useState(0);
  const roomRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getMotion, () => true);
  const active = requested && !still && !failed;
  const destinationFor = useCallback((zone: StudioFocusZone) => getStudioDestination(zone, lighting), [lighting]);
  const selectZone = useCallback((zone: StudioZone) => {
    if (zone !== 'overview') router.push(destinationFor(zone));
  }, [router, destinationFor]);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => { setFailed(true); setReady(false); }, []);
  const hrefFor = (href: string) => `${href}${lighting === 'evening' ? '?light=evening' : ''}`;
  const labels = zh ? { work: '案例', build: '产品', notes: '文章' } : { work: 'Case studies', build: 'Products', notes: 'Writing' };

  useEffect(() => {
    const restore = () => {
      const { zone, lighting: previousLighting } = getStudioLocation(new URL(window.location.href));
      if (zone !== 'overview') router.replace(getStudioDestination(zone, previousLighting));
    };
    restore();
    window.addEventListener('hashchange', restore);
    return () => window.removeEventListener('hashchange', restore);
  }, [router]);

  useEffect(() => {
    if (!active || ready) return;
    const timeout = window.setTimeout(onFailure, 20000);
    return () => window.clearTimeout(timeout);
  }, [active, ready, onFailure]);

  const closeScene = () => {
    setRequested(false);
    setReady(false);
    triggerRef.current?.focus();
  };
  if (previousStill !== still) {
    setPreviousStill(still);
    setReady(false);
  }

  return <main id="main-content" tabIndex={-1} className="studio-experience" data-lighting={lighting} lang={locale}>
    <header className="studio-stage">
      <div className="studio-intro">
        <p className="studio-kicker">{zh ? 'Darren Su / 苏鹏 · 个人咨询顾问' : 'Darren Su · Independent consultant'}</p>
        <h1>{zh ? <>AI 进入工作后，<br />团队该怎么变？</> : <>How should your team<br />work with AI?</>}</h1>
        {detail ? <p className="studio-intro-offer">{detail}</p> : null}
        <nav className="studio-hero-actions" aria-label={zh ? '从这里开始' : 'Start here'}>
          <Link className="studio-enter" href={hrefFor(collaborateHref)}>{zh ? '了解咨询内容' : 'Explore consulting'}<span aria-hidden="true">→</span></Link>
          <Link className="studio-collaborate" href={hrefFor('/projects')}>{zh ? '看看我做过什么' : 'See my work'} <span aria-hidden="true">→</span></Link>
        </nav>
        <div className="studio-background">
          <Link className="studio-host-photo" href={hrefFor('/about')} aria-label={zh ? '关于 Darren' : 'About Darren'}><Image src="/photo.jpg" alt="Darren Su" fill sizes="164px" /></Link>
          <div><p>{intro}</p><Link className="studio-about-link" href={hrefFor('/about')}>{zh ? '更多关于我' : 'More about me'} <span aria-hidden="true">→</span></Link></div>
        </div>
        <ProfileRoles roles={roles} />
      </div>
      <div className={`studio-room-panel${requested ? ' studio-room-expanded' : ''}`} onKeyDown={event => { if (event.key === 'Escape' && active) { event.stopPropagation(); closeScene(); } }}>
        <div ref={roomRef} id="home-studio-scene" className="studio-room" aria-label={zh ? 'Darren 的工作室' : 'Darren’s studio'} role="group" data-scene-status={active ? ready ? 'ready' : 'loading' : 'static'}>
          <div className={`studio-poster ${ready && active ? 'studio-poster-hidden' : ''}`} aria-hidden="true">
            <Image src={lighting === 'evening' ? '/images/studio-dusk-preview.png' : '/images/studio-daylight-preview.png'} alt="" fill sizes="(max-width: 760px) 90vw, 45vw" className="studio-poster-image" />
          </div>
          {active ? <SceneBoundary onFailure={onFailure}><StudioScene zone="overview" onSelect={selectZone} reducedMotion={reducedMotion} onReady={onReady} onFailure={onFailure} lighting={lighting} highlightedZone={highlightedZone} onHover={setHighlightedZone} hotspotRoot={roomRef} viewAngle={viewAngle} onViewAngleChange={setViewAngle} /></SceneBoundary> : null}
          <div className="studio-hotspots" hidden={!ready || !active}>
            {zones.map(zone => <Link key={zone} href={destinationFor(zone)} data-studio-hotspot={zone} className={`studio-hotspot ${highlightedZone === zone ? 'is-highlighted' : ''}`} style={{ transform: `translate3d(var(--hotspot-${zone}-x, -999px), var(--hotspot-${zone}-y, -999px), 0) translate(-50%, -100%)` }} onPointerEnter={() => setHighlightedZone(zone)} onPointerLeave={() => setHighlightedZone(null)} onFocus={() => setHighlightedZone(zone)} onBlur={() => setHighlightedZone(null)}><span className="studio-hotspot-label">{labels[zone]}</span></Link>)}
          </div>
        </div>
        <div className="studio-room-controls">
          <button ref={triggerRef} className="studio-scene-toggle" type="button" aria-controls="home-studio-scene" aria-pressed={active} onClick={() => {
            if (active) closeScene();
            else { setRequested(true); setReady(false); setFailed(false); setStill(false); }
          }}>{active ? zh ? '关闭 3D' : 'Close 3D' : zh ? '逛逛我的 3D 工作室' : 'Explore my 3D studio'} <span aria-hidden="true">{active ? '−' : '+'}</span></button>
          {active && ready ? <div className="studio-view-controls" role="group" aria-label={zh ? '调整工作室视角' : 'Adjust studio view'}>
            <button type="button" aria-label={zh ? '向左转动' : 'Rotate left'} onClick={() => setViewAngle(angle => clampViewAngle(angle - .15))}>←</button>
            <button type="button" onClick={() => setViewAngle(0)}>{zh ? '转回正面' : 'Reset view'}</button>
            <button type="button" aria-label={zh ? '向右转动' : 'Rotate right'} onClick={() => setViewAngle(angle => clampViewAngle(angle + .15))}>→</button>
          </div> : null}
        </div>
        <p className="studio-scene-status" role="status">{failed ? zh ? '工作室暂时无法打开，网站其他内容可以正常浏览。' : 'The studio could not load. You can still browse all pages.' : active ? ready ? zh ? '拖动查看，点击标签访问页面。' : 'Drag to look around. Select a label to visit a page.' : zh ? '正在打开工作室…' : 'Opening the studio…' : ''}</p>
      </div>
    </header>
    <noscript><style>{'.studio-room-controls,.studio-scene-status{display:none!important}'}</style></noscript>
    {children}
  </main>;
}
