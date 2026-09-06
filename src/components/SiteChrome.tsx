'use client';

import type { ReactNode } from 'react';
import { usePathname } from '@/i18n/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollCulture from '@/components/home/ScrollCulture';

type Props = {
  children: ReactNode;
  blogLocalesBySlug: Record<string, string[]>;
};

export default function SiteChrome({ children, blogLocalesBySlug }: Props) {
  const pathname = usePathname();

  if (pathname === '/studio') {
    return children;
  }

  return (
    <>
      <Nav blogLocalesBySlug={blogLocalesBySlug} />
      <ScrollCulture />
      <div className="pt-16">{children}</div>
      <Footer />
    </>
  );
}
