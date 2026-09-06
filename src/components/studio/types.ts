export type StudioZone = 'overview' | 'work' | 'build' | 'notes';

export type StudioSceneProps = {
  zone: StudioZone;
  onSelect: (zone: StudioZone) => void;
  reducedMotion: boolean;
  onReady: () => void;
  onFailure: () => void;
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
