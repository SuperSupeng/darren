'use client';

import type { ReactNode } from 'react';
import { StudioSettings } from '@/components/spatial/StudioSettings';
import SpatialHeader from '@/components/spatial/SpatialHeader';
import SpatialFooter from '@/components/spatial/SpatialFooter';
import '@/components/spatial/spatial.css';

type Props = {
  children: ReactNode;
  blogLocalesBySlug: Record<string, string[]>;
};

export default function SiteChrome({ children, blogLocalesBySlug }: Props) {
  return <StudioSettings>
    <SpatialHeader blogLocalesBySlug={blogLocalesBySlug} />
    {children}
    <SpatialFooter />
  </StudioSettings>;
}
