import type { RefObject } from 'react';

export type StudioZone = 'overview' | 'work' | 'build' | 'notes';
export type StudioFocusZone = Exclude<StudioZone, 'overview'>;
export type StudioLighting = 'day' | 'evening';

export type StudioSceneProps = {
  zone: StudioZone;
  onSelect: (zone: StudioZone) => void;
  reducedMotion: boolean;
  onReady: () => void;
  onFailure: () => void;
  lighting: StudioLighting;
  highlightedZone: StudioFocusZone | null;
  onHover: (zone: StudioFocusZone | null) => void;
  hotspotRoot: RefObject<HTMLDivElement | null>;
};

export type StudioItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  external?: boolean;
  meta?: string;
};

export type StudioContent = Record<Exclude<StudioZone, 'overview'>, StudioItem[]>;
