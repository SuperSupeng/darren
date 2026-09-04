'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useState, useEffect, useRef } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';
import type { Locale } from '@/i18n/config';

export default function Nav({ blogLocalesBySlug = {} }: { blogLocalesBySlug?: Record<string, string[]> }) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const darkHeroRoutes = ['/', '/work', '/services', '/build', '/blog', '/about'];
  const hasDarkOpening = darkHeroRoutes.includes(pathname) || pathname.startsWith('/blog/');
  const overDarkHero = hasDarkOpening && !scrolled && !mobileMenuOpen;
  const articleSlug = pathname.match(/^\/blog\/([^/]+)$/)?.[1];
  const availableLocales = articleSlug
    ? (blogLocalesBySlug[articleSlug] as Locale[] | undefined)
    : undefined;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    const initialFrame = window.requestAnimationFrame(handleScroll);
    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '/work', label: t('work') },
    { href: '/services', label: t('services') },
    { href: '/build', label: t('build') },
    { href: '/blog', label: t('blog') },
    { href: '/about', label: t('about') },
  ];

  // 检查当前路径是否激活
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav aria-label={t('primary')} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled || mobileMenuOpen
        ? 'bg-paper-100/88 backdrop-blur-xl shadow-sm shadow-ink-950/[0.035]'
        : 'bg-transparent'
    }`}>
      <div className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 ${
        scrolled ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="h-full bg-ink-700/10" />
      </div>

      <div className="container">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'h-14 min-[900px]:h-16' : 'h-16 min-[900px]:h-20'
        }`}>
          <Link href="/" aria-label={t('home')} aria-current={pathname === '/' ? 'page' : undefined} className="flex items-center gap-2.5 group">
            <span className="relative">
              <Logo
                size={scrolled ? 24 : 28}
                className="transition-all duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 rounded-full bg-zen-gold/8 opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
            <span className={`font-medium tracking-tight transition-all duration-500 ${
              scrolled ? 'text-base' : 'text-lg'
            } ${overDarkHero ? 'text-paper-100' : 'text-ink-950'}`}>
              Darren<span className="text-zen-gold">.</span>Su
            </span>
          </Link>

          <div className="hidden min-[900px]:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`relative px-4 py-2 text-sm transition-colors group ${
                  overDarkHero
                    ? isActive(link.href)
                      ? 'text-paper-100'
                      : 'text-paper-200/72 hover:text-paper-100'
                    : isActive(link.href)
                      ? 'text-ink-950'
                      : 'text-ink-700/90 hover:text-ink-950'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-1 left-4 right-4 h-px bg-zen-gold/70 transition-transform duration-300 origin-left ${
                  isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            ))}
          </div>

          <div className="hidden min-[900px]:flex items-center gap-4">
            <LanguageSwitcher inverse={overDarkHero} availableLocales={availableLocales} />
            <a
              href="mailto:supeng842499467@gmail.com"
              className={`inline-flex h-10 items-center justify-center rounded-full border px-5 text-sm font-medium transition-all duration-300 ${
                overDarkHero
                  ? 'border-paper-100/30 bg-paper-100/8 text-paper-100 backdrop-blur-md hover:border-paper-100/55 hover:bg-paper-100/16'
                  : 'border-ink-700/16 bg-paper-100/42 text-ink-800 hover:border-ink-700/28 hover:bg-paper-100/72 hover:text-ink-950'
              }`}
            >
              {t('contact')}
            </a>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`relative flex h-11 w-11 items-center justify-center rounded-[4px] transition-colors min-[900px]:hidden ${
              overDarkHero
                ? 'text-paper-100 hover:bg-paper-100/12'
                : 'text-ink-700 hover:bg-paper-100/55 hover:text-ink-950'
            }`}
            aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <div className="relative w-5 h-4">
              <span className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </div>
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={`transition-all duration-300 min-[900px]:hidden ${mobileMenuOpen ? 'max-h-[calc(100dvh-4rem)] overflow-y-auto opacity-100' : 'invisible max-h-0 overflow-hidden opacity-0'}`}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="border-t border-ink-700/10 py-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-[4px] px-4 py-3 transition-colors ${
                    isActive(link.href)
                      ? 'bg-paper-200/72 text-ink-950'
                      : 'text-ink-700/90 hover:bg-paper-200/48 hover:text-ink-950'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-2 border-t border-ink-700/10 px-4 py-3">
                <LanguageSwitcher
                  availableLocales={availableLocales}
                  embedded
                  onSelect={() => setMobileMenuOpen(false)}
                />
              </div>

              <div className="px-4 pt-2">
                <a
                  href="mailto:supeng842499467@gmail.com"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex h-12 w-full items-center justify-center rounded-full border border-ink-700/16 bg-paper-100/44 px-5 text-sm font-medium text-ink-800 transition-colors duration-300 hover:border-ink-700/28 hover:bg-paper-100/72 hover:text-ink-950"
                >
                  {t('contact')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
