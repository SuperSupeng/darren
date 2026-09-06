import type { StudioLighting, StudioZone } from '@/components/studio/types';

export type StudioLocation = {
  zone: StudioZone;
  lighting: StudioLighting;
};

export function getStudioLocation(url: URL): StudioLocation {
  const hash = url.hash.slice(1);

  return {
    zone: hash === 'work' || hash === 'build' || hash === 'notes' ? hash : 'overview',
    lighting: url.searchParams.get('light') === 'evening' ? 'evening' : 'day',
  };
}

export function updateStudioLocation(url: URL, patch: Partial<StudioLocation>): URL {
  const current = getStudioLocation(url);
  const zone = patch.zone ?? current.zone;
  const lighting = patch.lighting ?? current.lighting;
  const updated = new URL(url.href);

  updated.hash = zone === 'overview' ? '' : zone;
  if (lighting === 'evening') {
    updated.searchParams.set('light', 'evening');
  } else {
    updated.searchParams.delete('light');
  }

  return updated;
}

export function getStudioHref(state: StudioLocation): string {
  const query = state.lighting === 'evening' ? '?light=evening' : '';
  const hash = state.zone === 'overview' ? '' : `#${state.zone}`;

  return `/studio${query}${hash}`;
}
