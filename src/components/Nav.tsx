'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Nav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/build', label: t('build') },
    { href: '/blog', label: t('blog') },
    { href: '/community', label: t('community') },
    { href: '/impact', label: t('impact') },
    { href: '/global', label: t('global') },
    { href: '/about', label: t('about') },
  ];

  // 检查当前路径是否激活
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-ink-950/90 backdrop-blur-xl border-b border-ink-800/50 shadow-lg shadow-black/10' 
        : 'bg-transparent'
    }`}>
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="relative">
              <span className="text-zen-gold font-mono text-xl transition-transform duration-300 group-hover:scale-110 inline-block">◯</span>
              <span className="absolute inset-0 bg-zen-gold/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
            <span className="font-medium tracking-tight text-lg">
              Darren<span className="text-zen-gold">.</span>Su
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm transition-colors group ${
                  isActive(link.href) ? 'text-paper-100' : 'text-paper-300 hover:text-paper-100'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-zen-gold to-geek-cyan transition-transform duration-300 origin-left ${
                  isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            ))}
          </div>

          {/* Right side: Language + CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* CTA Button */}
            <Link href="/co-build" className="btn btn-primary text-sm py-2.5 px-5">
              {t('coBuild')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-paper-300 hover:text-paper-100 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-4">
              <span className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-4 border-t border-ink-800/50">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-all ${
                    isActive(link.href) 
                      ? 'text-paper-100 bg-ink-800/50' 
                      : 'text-paper-300 hover:text-paper-100 hover:bg-ink-800/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Language Switcher Mobile */}
              <div className="px-4 py-3 mt-2 border-t border-ink-800/50">
                <LanguageSwitcher />
              </div>
              
              {/* CTA Mobile */}
              <div className="px-4 pt-2">
                <Link
                  href="/co-build"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary w-full justify-center"
                >
                  {t('coBuild')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
