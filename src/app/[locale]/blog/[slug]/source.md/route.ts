import { isLocale } from '@/i18n/config';
import { getLocalizedBlogRoutes, getPostBySlug } from '@/lib/blog';
import { articleMarkdown, markdownResponse } from '@/lib/content-source';
import { absoluteLocalizedUrl } from '@/lib/seo';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getLocalizedBlogRoutes();
}

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = isLocale(locale) ? getPostBySlug(slug, locale) : null;
  if (!post) return new Response('Not found', { status: 404, headers: { 'X-Robots-Tag': 'noindex' } });
  return markdownResponse(articleMarkdown(post, locale), absoluteLocalizedUrl(locale, `/blog/${slug}`), locale);
}
