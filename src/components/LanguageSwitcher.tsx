'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const t = useTranslations('language');
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 打开时聚焦搜索框
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
    setSearch('');
  };

  // 过滤语言
  const filteredLocales = locales.filter((loc) => {
    const meta = localeNames[loc];
    const searchLower = search.toLowerCase();
    return (
      meta.name.toLowerCase().includes(searchLower) ||
      meta.nativeName.toLowerCase().includes(searchLower) ||
      loc.toLowerCase().includes(searchLower)
    );
  });

  const currentLocale = localeNames[locale];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex min-h-10 items-center gap-2 rounded-full border border-ink-700/10 bg-paper-100/52 px-3 py-2 text-sm text-ink-700 transition-colors duration-300 hover:border-ink-700/18 hover:bg-paper-100/78"
        aria-label={t('select')}
        aria-expanded={isOpen}
      >
        <svg
          className="w-4 h-4 text-ink-600/70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
        <span>{currentLocale.nativeName}</span>
        <svg
          className={`h-3 w-3 text-ink-600/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-[10px] border border-ink-700/12 bg-paper-100 shadow-lg shadow-ink-950/8">
          {/* Search */}
          <div className="p-2 border-b border-ink-700/10">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-600/45"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('search')}
                className="w-full rounded-full border border-ink-700/10 bg-paper-200/65 py-2 pl-9 pr-3 text-sm text-ink-800 placeholder:text-ink-600/45 focus:border-zen-gold/38 focus:outline-none focus-visible:outline-none"
              />
            </div>
          </div>

          {/* Language List */}
          <div className="max-h-64 overflow-y-auto py-1">
            {filteredLocales.length === 0 ? (
              <div className="px-4 py-3 text-center text-sm text-ink-600/55">
                {t('empty')}
              </div>
            ) : (
              filteredLocales.map((loc) => {
                const meta = localeNames[loc];
                const isActive = loc === locale;
                return (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      isActive
                        ? 'bg-zen-gold/10 text-zen-gold-dim'
                        : 'text-ink-700 hover:bg-paper-200/75 hover:text-ink-950'
                    }`}
                  >
                    <span className="text-lg">{meta.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{meta.nativeName}</div>
                      <div className={`text-xs ${isActive ? 'text-zen-gold-dim/70' : 'text-ink-600/50'}`}>
                        {meta.name}
                      </div>
                    </div>
                    {isActive && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer hint */}
          <div className="border-t border-ink-700/10 px-4 py-2 text-center text-xs text-ink-600/50">
            {t('hint')}
          </div>
        </div>
      )}
    </div>
  );
}
