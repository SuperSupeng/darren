'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { usePathname } from '@/i18n/navigation';
import type { StudioLighting } from '@/components/studio/types';

type Settings = {
  lighting: StudioLighting;
  setLighting: (value: StudioLighting) => void;
  still: boolean;
  setStill: (value: boolean) => void;
};

const SettingsContext = createContext<Settings | null>(null);
const LIGHT_KEY = 'darren-studio-light';
const STILL_KEY = 'darren-studio-still';

export function StudioSettings({ children }: { children: ReactNode }) {
  const [lighting, updateLighting] = useState<StudioLighting>('day');
  const [still, updateStill] = useState(false);
  const initialized = useRef(false);
  const pathname = usePathname();

  const setLighting = useCallback((value: StudioLighting) => {
    updateLighting(value);
    try { window.localStorage.setItem(LIGHT_KEY, value); } catch { /* Browsing also works without storage. */ }
    const url = new URL(window.location.href);
    if (value === 'evening') url.searchParams.set('light', value);
    else url.searchParams.delete('light');
    window.history.replaceState(window.history.state, '', url);
  }, []);

  const setStill = useCallback((value: boolean) => {
    updateStill(value);
    try { window.localStorage.setItem(STILL_KEY, String(value)); } catch { /* The current session remains usable. */ }
  }, []);

  useEffect(() => {
    const restore = () => {
      const url = new URL(window.location.href);
      const explicit = url.searchParams.get('light');
      let nextLighting = lighting;
      if (!initialized.current) {
        try {
          nextLighting = window.localStorage.getItem(LIGHT_KEY) === 'evening' ? 'evening' : 'day';
          updateStill(window.localStorage.getItem(STILL_KEY) === 'true');
        } catch { /* Keep the server-rendered defaults. */ }
        initialized.current = true;
      }
      if (explicit === 'day' || explicit === 'evening') {
        nextLighting = explicit;
        try { window.localStorage.setItem(LIGHT_KEY, explicit); } catch { /* The URL still carries this preference. */ }
      }
      updateLighting(nextLighting);
      // Server-rendered content links keep simple paths; make the resulting view shareable.
      if (nextLighting === 'evening') url.searchParams.set('light', 'evening');
      else url.searchParams.delete('light');
      if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url);
    };
    const frame = requestAnimationFrame(restore);
    window.addEventListener('popstate', restore);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('popstate', restore); };
  }, [pathname, lighting]);

  const value = useMemo(() => ({ lighting, setLighting, still, setStill }), [lighting, setLighting, still, setStill]);
  return <SettingsContext.Provider value={value}>
    <div className="spatial-site" data-lighting={lighting}>{children}</div>
  </SettingsContext.Provider>;
}

export function useStudioSettings() {
  const settings = useContext(SettingsContext);
  if (!settings) throw new Error('StudioSettings is required');
  return settings;
}
