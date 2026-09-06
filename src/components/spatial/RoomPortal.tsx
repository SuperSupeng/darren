'use client';

import { Component, useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Link, useRouter } from '@/i18n/navigation';
import type { StudioFocusZone, StudioLighting } from '@/components/studio/types';
import { useStudioSettings } from './StudioSettings';

const StudioScene = dynamic(() => import('@/components/studio/StudioScene'), { ssr: false });
const labels = { work: ['工作案例', 'Selected work'], build: ['产品', 'Products'], notes: ['文章与手记', 'Writing'] };
const subscribeHydration = () => () => {};
function subscribeMotion(callback: () => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}
function getMotion() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }

function Poster({ lighting }: { lighting: StudioLighting }) {
  return <Image src={lighting === 'day' ? '/images/studio-daylight-preview.png' : '/images/studio-dusk-preview.png'} fill loading="eager" sizes="(max-width: 760px) 100vw, 65vw" alt="" className="room-portal-poster" />;
}

class PortalBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function LiveRoom({ zone, lighting, locale, compact, contentHref }: { zone: StudioFocusZone; lighting: StudioLighting; locale: string; compact: boolean; contentHref?: string }) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [angle, setAngle] = useState(0);
  const [highlighted, setHighlighted] = useState<StudioFocusZone | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const motion = useSyncExternalStore(subscribeMotion, getMotion, () => true);
  const zh = locale === 'zh';
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => setFailed(true), []);
  useEffect(() => {
    if (ready || failed) return;
    const timer = setTimeout(onFailure, 20000);
    return () => clearTimeout(timer);
  }, [ready, failed, onFailure]);
  const views = [
    { angle: -0.42, label: zh ? '左侧' : 'Left', icon: '↶' },
    { angle: 0, label: zh ? '正面' : 'Front', icon: '◇' },
    { angle: 0.42, label: zh ? '右侧' : 'Right', icon: '↷' },
  ];
  return <div ref={root} className="room-portal-render" data-portal-status={failed ? 'static' : ready ? 'ready' : 'loading'} data-view-angle={angle.toFixed(3)}>
    {(!ready || failed) && <Poster lighting={lighting} />}
    {!failed && <PortalBoundary onFailure={onFailure}><StudioScene presentation="portal" viewAngle={angle} onViewAngleChange={setAngle} zone={zone} lighting={lighting} reducedMotion={motion} onReady={onReady} onFailure={onFailure} highlightedZone={highlighted} onHover={setHighlighted} hotspotRoot={root} onSelect={next => { if (next === zone && contentHref) window.location.hash = contentHref; else router.push(`/${lighting === 'evening' ? '?light=evening' : ''}#${next}`); }} /></PortalBoundary>}
    {ready && !failed && <div className="room-portal-tools">
      {!compact && <p>{zh ? '左右拖动，换个角度' : 'Drag sideways to look around'}<span aria-hidden="true">↔</span></p>}
      <div role="group" aria-label={zh ? '房间视角' : 'Room viewpoint'}>{views.map(view => <button key={view.angle} type="button" aria-label={zh ? `${view.label}视角` : `${view.label} view`} aria-pressed={Math.abs(angle - view.angle) < 0.04} onClick={() => setAngle(view.angle)}><span aria-hidden="true">{view.icon}</span>{!compact && <span>{view.label}</span>}</button>)}</div>
    </div>}
    {failed && <p className="room-portal-fallback" role="status">{zh ? '3D 暂时无法加载，已切换为静态画面。' : 'The 3D scene couldn’t load. Showing a still image.'}</p>}
  </div>;
}

export default function RoomPortal({ zone, locale, compact = false, contentHref }: { zone: StudioFocusZone; locale: string; compact?: boolean; contentHref?: string }) {
  const { lighting, still, setStill } = useStudioSettings();
  const [activated, setActivated] = useState(false);
  const [exploring, setExploring] = useState(false);
  const hydrated = useSyncExternalStore(subscribeHydration, () => true, () => false);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (compact) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setActivated(true); observer.disconnect(); }
    }, { rootMargin: '100px' });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, [compact]);
  const zh = locale === 'zh';
  const href = `/${lighting === 'evening' ? '?light=evening' : ''}#${zone}`;
  const live = !still && (compact ? exploring : activated);
  return <figure ref={root} className={`room-portal${compact ? ' room-portal-compact' : ' room-portal-spatial'}`} data-room-zone={zone} aria-label={zh ? `工作室场景：${labels[zone][0]}` : `Studio view: ${labels[zone][1].toLowerCase()}`}>
    <div className="room-portal-view">
      {live ? <LiveRoom zone={zone} lighting={lighting} locale={locale} compact={compact} contentHref={contentHref} /> : <Poster lighting={lighting} />}
      {hydrated && !live && (compact || still) && <button className="room-portal-explore" type="button" onClick={() => { setStill(false); setExploring(true); setActivated(true); }}>{zh ? '查看 3D' : 'View in 3D'} <span aria-hidden="true">↗</span></button>}
    </div>
    <figcaption><span><i aria-hidden="true" />{labels[zone][zh ? 0 : 1]}</span><Link href={contentHref ?? href}>{contentHref ? zh ? zone === 'notes' ? '查看文章' : zone === 'work' ? '查看案例' : '查看产品' : zone === 'notes' ? 'View articles' : zone === 'work' ? 'View case studies' : 'View products' : zh ? '返回首页' : 'Back to home'} <span aria-hidden="true">↗</span></Link></figcaption>
  </figure>;
}
