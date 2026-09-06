'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Logo from '@/components/Logo';
import type { Locale } from '@/i18n/config';
import { useStudioSettings } from './StudioSettings';

export const roomLinks = [
  { href: '/', zh: '工作室', en: 'Studio', number: '00' },
  { href: '/work', zh: '工作案例', en: 'Work', number: '01' },
  { href: '/build', zh: '产品', en: 'Products', number: '02' },
  { href: '/blog', zh: '手记', en: 'Notes', number: '03' },
  { href: '/services', zh: '合作', en: 'Collaborate', number: '04' },
  { href: '/about', zh: '关于', en: 'About', number: '05' },
] as const;

function LightIcon({ evening }: { evening: boolean }) {
  return <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
    {evening ? <path d="M16.7 12.2A7 7 0 0 1 7.8 3.3a7 7 0 1 0 8.9 8.9Z" /> : <><circle cx="10" cy="10" r="3.5" /><path d="M10 1v2m0 14v2M1 10h2m14 0h2M3.6 3.6 5 5m10 10 1.4 1.4M3.6 16.4 5 15M15 5l1.4-1.4" /></>}
  </svg>;
}

export default function SpatialHeader({ blogLocalesBySlug }: { blogLocalesBySlug: Record<string, string[]> }) {
  const locale = useLocale();
  const zh = locale === 'zh';
  const pathname = usePathname();
  const { lighting, setLighting } = useStudioSettings();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const slug = pathname.match(/^\/blog\/([^/]+)$/)?.[1];
  const availableLocales = slug ? blogLocalesBySlug[slug] as Locale[] | undefined : undefined;
  const current = (href: string) => href === '/' ? pathname === '/' || pathname === '/studio' : pathname === href || pathname.startsWith(`${href}/`);
  const hrefFor = (href: string) => `${href}${lighting === 'evening' ? '?light=evening' : ''}`;

  useEffect(() => {
    const frame = requestAnimationFrame(() => setOpen(false));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); buttonRef.current?.focus(); }
    };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [open]);

  return <header className="spatial-header">
    <div className="spatial-header-row">
      <Link className="spatial-brand" href={hrefFor('/')} aria-label={zh ? 'Darren Su 工作室首页' : 'Darren Su studio home'} onClick={() => setOpen(false)}>
        <span className="spatial-brand-mark" aria-hidden="true"><Logo size={36} /></span>
        <span>Darren<span className="spatial-brand-dot">.</span>Su<small>PERSONAL STUDIO</small></span>
      </Link>
      <nav className="spatial-desktop-nav" aria-label={zh ? '主要导航' : 'Main navigation'}>
        {roomLinks.map(link => <Link key={link.href} href={hrefFor(link.href)} aria-current={current(link.href) ? 'page' : undefined}>{zh ? link.zh : link.en}</Link>)}
      </nav>
      <div className="spatial-header-actions">
        <div className="spatial-light-switch" role="group" aria-label={zh ? '工作室光线' : 'Studio lighting'}>
          {(['day', 'evening'] as const).map(value => <button key={value} type="button" aria-pressed={lighting === value} onClick={() => setLighting(value)}>
            <LightIcon evening={value === 'evening'} /><span>{value === 'day' ? zh ? '日光' : 'Day' : zh ? '暮色' : 'Dusk'}</span>
          </button>)}
        </div>
        <button className="spatial-mobile-light" type="button" aria-label={zh ? `切换为${lighting === 'day' ? '暮色' : '日光'}` : `Switch to ${lighting === 'day' ? 'dusk' : 'daylight'}`} onClick={() => setLighting(lighting === 'day' ? 'evening' : 'day')}><LightIcon evening={lighting === 'evening'} /></button>
        <div className="spatial-language"><LanguageSwitcher availableLocales={availableLocales} onSelect={() => setOpen(false)} /></div>
        <button ref={buttonRef} type="button" className="spatial-menu-toggle" aria-expanded={open} aria-controls="spatial-mobile-nav" aria-label={zh ? open ? '关闭导航' : '打开导航' : open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">{open ? <path d="m5 5 12 12M17 5 5 17" /> : <path d="M3 7h16M3 15h16" />}</svg>
        </button>
      </div>
    </div>
    <nav id="spatial-mobile-nav" className="spatial-mobile-nav" aria-label={zh ? '页面导航' : 'Page navigation'} hidden={!open}>
      {roomLinks.map(link => <Link key={link.href} href={hrefFor(link.href)} aria-current={current(link.href) ? 'page' : undefined} onClick={() => setOpen(false)}><span>{link.number}</span>{zh ? link.zh : link.en}<span aria-hidden="true">↗</span></Link>)}
      <p>{zh ? '每一个入口，都通向正在做的事。' : 'A different corner of the same studio.'}</p>
    </nav>
    <noscript>
      <style>{'.spatial-header-actions,.spatial-desktop-nav,.spatial-footer button{display:none!important}'}</style>
      <nav className="spatial-noscript-nav" aria-label={zh ? '页面与语言' : 'Pages and languages'}>
        {roomLinks.map(link => <a key={link.href} href={`/${locale}${link.href}`}>{zh ? link.zh : link.en}</a>)}
        {(availableLocales ?? ['zh', 'en']).filter(value => value !== locale).map(value => <a key={value} href={`/${value}${pathname}`} hrefLang={value}>{value === 'zh' ? '中文' : 'English'}</a>)}
      </nav>
    </noscript>
  </header>;
}
