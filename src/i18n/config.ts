// Supported languages. Keep this list limited to fully reviewed copy.
export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

// 语言元数据
export const localeNames: Record<Locale, { name: string; nativeName: string; flag: string }> = {
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
  zh: { name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
};
