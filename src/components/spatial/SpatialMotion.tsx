'use client';

import { useEffect, useMemo, type RefObject } from 'react';
import { usePathname } from '@/i18n/navigation';
import { observeSiteMotion } from './site-motion';
import './site-motion.css';

export default function SpatialMotion({ rootRef, still }: { rootRef: RefObject<HTMLDivElement | null>; still: boolean }) {
  const pathname = usePathname();
  const pageMotion = useMemo(() => ({ pathname, revealed: new WeakSet<Element>() }), [pathname]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cleanup: (() => void) | undefined;
    let paused: boolean | undefined;
    const sync = () => {
      const isStatic = still || reduced.matches;
      const nextPaused = isStatic || document.hidden;
      root.dataset.motionStatic = String(isStatic);
      root.dataset.motionPaused = String(nextPaused);
      if (paused === nextPaused) return;
      paused = nextPaused;
      cleanup?.();
      cleanup = nextPaused ? undefined : observeSiteMotion(root, pageMotion.revealed);
    };
    sync();
    reduced.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      cleanup?.();
      reduced.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      root.dataset.motionPaused = 'true';
    };
  }, [pageMotion, rootRef, still]);

  return null;
}
