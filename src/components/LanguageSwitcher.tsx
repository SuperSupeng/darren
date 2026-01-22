'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
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
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-ink-800/50 border border-ink-700/50 hover:border-ink-600/50 hover:bg-ink-800 transition-all duration-300 text-sm"
        aria-label="Select language"
      >
        <svg 
          className="w-4 h-4 text-paper-400" 
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
        <span className="text-paper-300">{currentLocale.nativeName}</span>
        <svg 
          className={`w-3 h-3 text-paper-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-ink-900 border border-ink-700/50 shadow-xl shadow-black/20 overflow-hidden z-50">
          {/* Search */}
          <div className="p-2 border-b border-ink-700/50">
            <div className="relative">
              <svg 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-paper-500" 
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
                placeholder="Search language..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-ink-800/50 border border-ink-700/50 rounded-lg text-paper-200 placeholder-paper-500 focus:outline-none focus:border-geek-cyan/50"
              />
            </div>
          </div>

          {/* Language List */}
          <div className="max-h-64 overflow-y-auto py-1">
            {filteredLocales.length === 0 ? (
              <div className="px-4 py-3 text-sm text-paper-500 text-center">
                No languages found
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
                        ? 'bg-geek-cyan/10 text-geek-cyan' 
                        : 'text-paper-300 hover:bg-ink-800/50 hover:text-paper-100'
                    }`}
                  >
                    <span className="text-lg">{meta.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{meta.nativeName}</div>
                      <div className={`text-xs ${isActive ? 'text-geek-cyan/70' : 'text-paper-500'}`}>
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
          <div className="px-4 py-2 border-t border-ink-700/50 text-xs text-paper-500 text-center">
            More languages coming soon
          </div>
        </div>
      )}
    </div>
  );
}
