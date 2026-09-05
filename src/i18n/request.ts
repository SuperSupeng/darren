import { getRequestConfig } from 'next-intl/server';
import { locale as getRootLocale } from 'next/root-params';
import { notFound } from 'next/navigation';
import { isLocale } from './config';

export default getRequestConfig(async ({ locale: explicitLocale }) => {
  const locale = explicitLocale ?? await getRootLocale();
  if (!isLocale(locale)) notFound();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
