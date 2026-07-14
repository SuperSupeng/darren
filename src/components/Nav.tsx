'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';

export default function Nav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // 计算页面滚动进度
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('home') },
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled || mobileMenuOpen
        ? 'bg-paper-100/88 backdrop-blur-xl shadow-sm shadow-ink-950/[0.035]'
        : 'bg-transparent'
    }`}>
      {/* 滚动进度条 */}
      <div
        className="absolute bottom-0 left-0 h-px bg-ink-700/16 transition-all duration-150"
        style={{ width: `${scrollProgress}%`, opacity: scrolled ? 0.72 : 0 }}
      />

      {/* 底部边框发光效果 */}
      <div className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 ${
        scrolled ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="h-full bg-ink-700/10" />
      </div>

      <div className="container">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="relative">
              <Logo
                size={scrolled ? 24 : 28}
                className="transition-all duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 rounded-full bg-zen-gold/8 opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
            <span className={`font-medium tracking-tight transition-all duration-500 ${
              scrolled ? 'text-base' : 'text-lg'
            }`}>
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
                  isActive(link.href) ? 'text-ink-950' : 'text-ink-700/72 hover:text-ink-950'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-1 left-4 right-4 h-px bg-zen-gold/70 transition-transform duration-300 origin-left ${
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
            <a
              href="mailto:supeng842499467@gmail.com"
              className="inline-flex h-10 items-center justify-center rounded-full border border-ink-700/16 bg-paper-100/42 px-5 text-sm font-medium text-ink-800 transition-colors duration-300 hover:border-ink-700/28 hover:bg-paper-100/72 hover:text-ink-950"
            >
              {t('contact')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative flex h-11 w-11 items-center justify-center rounded-[4px] text-ink-700 transition-colors hover:bg-paper-100/55 hover:text-ink-950 md:hidden"
            aria-label="Toggle menu"
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

        {/* Mobile Menu */}
        <div
          id="mobile-navigation"
          className={`overflow-hidden transition-all duration-300 md:hidden ${mobileMenuOpen ? 'max-h-[620px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="border-t border-ink-700/10 py-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-[4px] px-4 py-3 transition-colors ${
                    isActive(link.href)
                      ? 'bg-paper-200/72 text-ink-950'
                      : 'text-ink-700/72 hover:bg-paper-200/48 hover:text-ink-950'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Language Switcher Mobile */}
              <div className="mt-2 border-t border-ink-700/10 px-4 py-3">
                <LanguageSwitcher />
              </div>

              {/* CTA Mobile */}
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
