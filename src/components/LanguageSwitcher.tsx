'use client';

import { useState, useRef, useEffect, useId, type KeyboardEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';

export default function LanguageSwitcher({
  inverse = false,
  availableLocales = [...locales],
  embedded = false,
  onSelect,
}: {
  inverse?: boolean;
  availableLocales?: Locale[];
  embedded?: boolean;
  onSelect?: () => void;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations('language');
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionsId = useId();

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape' || !isOpen) return;
    event.preventDefault();
    event.stopPropagation();
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
    onSelect?.();
  };

  const visibleLocales = locales.filter((loc) => availableLocales.includes(loc));

  const currentLocale = localeNames[locale];

  if (availableLocales.length <= 1) {
    return (
      <span
        className={`inline-flex min-h-10 items-center rounded-full border px-3 py-2 text-sm ${
          inverse
            ? 'border-paper-100/18 bg-paper-100/6 text-paper-100/72'
            : 'border-ink-700/10 bg-paper-100/42 text-ink-700/90'
        }`}
        aria-label={`${currentLocale.nativeName}. ${t('onlyAvailable')}`}
        title={t('onlyAvailable')}
      >
        {currentLocale.nativeName}
      </span>
    );
  }

  return (
    <div className={embedded ? 'relative w-full' : 'relative'} ref={dropdownRef} onKeyDown={handleKeyDown}>
      {/* Trigger Button */}
      <button
        type="button"
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex min-h-10 items-center gap-2 rounded-full border px-3 py-2 text-sm transition-colors duration-300 ${embedded ? 'w-full justify-between' : ''} ${
          inverse
            ? 'border-paper-100/24 bg-paper-100/8 text-paper-100 hover:border-paper-100/42 hover:bg-paper-100/16'
            : 'border-ink-700/10 bg-paper-100/52 text-ink-700 hover:border-ink-700/18 hover:bg-paper-100/78'
        }`}
        aria-label={`${t('select')}: ${currentLocale.nativeName}`}
        aria-expanded={isOpen}
        aria-controls={optionsId}
      >
        <svg
          className={`h-4 w-4 ${inverse ? 'text-paper-200/70' : 'text-ink-600/70'}`}
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
          className={`h-3 w-3 transition-transform duration-200 ${
            inverse ? 'text-paper-200/55' : 'text-ink-600/50'
          } ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div id={optionsId} className={`${embedded ? 'relative mt-2 w-full' : 'absolute right-0 mt-2 w-56'} z-50 overflow-hidden rounded-[10px] border border-ink-700/12 bg-paper-100 shadow-lg shadow-ink-950/8`}>
          <div className="py-1" role="group" aria-label={t('select')}>
              {visibleLocales.map((loc) => {
                const meta = localeNames[loc];
                const isActive = loc === locale;
                return (
                  <button
                    type="button"
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      isActive
                        ? 'bg-zen-gold/10 text-zen-gold-dim'
                        : 'text-ink-700 hover:bg-paper-200/75 hover:text-ink-950'
                    }`}
                  >
                    <span className="text-lg">{meta.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{meta.nativeName}</div>
                      <div className={`text-xs ${isActive ? 'text-zen-gold-dim' : 'text-ink-700/90'}`}>
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
              })}
          </div>

          {/* Footer hint */}
          <div className="border-t border-ink-700/10 px-4 py-2 text-center text-xs text-ink-700/90">
            {t('hint')}
          </div>
        </div>
      )}
    </div>
  );
}
