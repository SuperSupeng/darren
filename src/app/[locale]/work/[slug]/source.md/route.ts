import { isLocale, locales } from '@/i18n/config';
import { getPortfolio, getWorkById } from '@/lib/portfolio';
import { caseMarkdown, markdownResponse } from '@/lib/content-source';
import { absoluteLocalizedUrl } from '@/lib/seo';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap(locale => getPortfolio(locale).work.map(({ id }) => ({ locale, slug: id })));
}

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const work = isLocale(locale) ? getWorkById(locale, slug) : null;
  if (!work) return new Response('Not found', { status: 404, headers: { 'X-Robots-Tag': 'noindex' } });
  return markdownResponse(caseMarkdown(work, locale), absoluteLocalizedUrl(locale, `/work/${slug}`), locale);
}
