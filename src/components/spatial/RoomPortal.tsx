'use client';

import { Component, useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Link, useRouter } from '@/i18n/navigation';
import type { StudioFocusZone, StudioLighting } from '@/components/studio/types';
import { useStudioSettings } from './StudioSettings';

const StudioScene = dynamic(() => import('@/components/studio/StudioScene'), { ssr: false });
const labels = { work: ['共创长桌', 'The shared table'], build: ['产品工作台', 'The workbench'], notes: ['窗边手记', 'By the window'] };
function subscribeMotion(callback: () => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}
function getMotion() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }

function Poster({ lighting }: { lighting: StudioLighting }) {
  return <Image src={lighting === 'day' ? '/images/studio-daylight-preview.png' : '/images/studio-dusk-preview.png'} fill loading="eager" sizes="(max-width: 760px) 90vw, 480px" alt="" className="room-portal-poster" />;
}

class PortalBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function LiveRoom({ zone, lighting }: { zone: StudioFocusZone; lighting: StudioLighting }) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [highlighted, setHighlighted] = useState<StudioFocusZone | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const motion = useSyncExternalStore(subscribeMotion, getMotion, () => true);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => setFailed(true), []);
  useEffect(() => {
    if (ready || failed) return;
    const timer = setTimeout(onFailure, 20000);
    return () => clearTimeout(timer);
  }, [ready, failed, onFailure]);
  return <div ref={root} className="room-portal-render" data-portal-status={failed ? 'static' : ready ? 'ready' : 'loading'}>
    {(!ready || failed) && <Poster lighting={lighting} />}
    {!failed && <PortalBoundary onFailure={onFailure}><StudioScene zone={zone} lighting={lighting} reducedMotion={motion} onReady={onReady} onFailure={onFailure} highlightedZone={highlighted} onHover={setHighlighted} hotspotRoot={root} onSelect={next => router.push(`/${lighting === 'evening' ? '?light=evening' : ''}#${next}`)} /></PortalBoundary>}
  </div>;
}

export default function RoomPortal({ zone, locale, compact = false }: { zone: StudioFocusZone; locale: string; compact?: boolean }) {
  const { lighting, still } = useStudioSettings();
  const [activated, setActivated] = useState(false);
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
  return <figure ref={root} className={`room-portal${compact ? ' room-portal-compact' : ''}`} aria-label={zh ? `${labels[zone][0]}的房间视角` : `A view of ${labels[zone][1].toLowerCase()}`}>
    <div className="room-portal-view">{compact || still || !activated ? <Poster lighting={lighting} /> : <LiveRoom zone={zone} lighting={lighting} />}</div>
    <figcaption><span><i aria-hidden="true" />{labels[zone][zh ? 0 : 1]}</span><Link href={href}>{zh ? '回到房间' : 'Enter the room'} <span aria-hidden="true">↗</span></Link></figcaption>
  </figure>;
}
