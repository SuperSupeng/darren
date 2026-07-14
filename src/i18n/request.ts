import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { isLocale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !isLocale(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
