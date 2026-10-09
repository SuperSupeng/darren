import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

// Google's OAuth brand check needs a stable privacy URL. Locale routing would
// otherwise redirect this path; rewrite it so /privacy returns the English page.
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/privacy' || pathname === '/privacy/') {
    const url = request.nextUrl.clone();
    url.pathname = '/en/privacy';
    const headers = new Headers(request.headers);
    headers.set('x-next-intl-locale', 'en');
    return NextResponse.rewrite(url, { request: { headers } });
  }
  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/(en|zh)/:path*', '/'],
};
