'use client';

import type { ReactNode } from 'react';
import { StudioSettings } from '@/components/spatial/StudioSettings';
import SpatialHeader from '@/components/spatial/SpatialHeader';
import SpatialFooter from '@/components/spatial/SpatialFooter';
import '@/components/spatial/spatial.css';
import '@/components/spatial/objects.css';
import '@/components/spatial/immersive.css';

type Props = {
  children: ReactNode;
  blogLocalesBySlug: Record<string, string[]>;
  fieldNoteSlugs: string[];
};

export default function SiteChrome({ children, blogLocalesBySlug, fieldNoteSlugs }: Props) {
  return <StudioSettings>
    <SpatialHeader blogLocalesBySlug={blogLocalesBySlug} fieldNoteSlugs={fieldNoteSlugs} />
    {children}
    <SpatialFooter />
  </StudioSettings>;
}
