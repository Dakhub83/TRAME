import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getLocaleFromPathname,
  buildLocalizedPath,
  negotiateLocale,
  type Locale,
} from "@/lib/i18n";

/**
 * Cookie that persists a user's locale once it has been negotiated or
 * explicitly chosen, so repeat visits skip Accept-Language negotiation
 * and stay on their selected locale even if their browser header changes.
 */
const LOCALE_COOKIE = "NEXT_LOCALE";
const LOCALE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

/**
 * Request/response header downstream Server Components can read (via
 * `headers()`) to get the resolved locale without re-parsing the URL.
 */
const LOCALE_HEADER = "x-app-locale";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathLocale = getLocaleFromPathname(pathname);

  if (pathLocale) {
    return passThrough(request, pathLocale);
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value ?? null;
  const negotiatedLocale = negotiateLocale(
    request.headers.get("accept-language"),
    cookieLocale
  );

  return redirectToLocalizedPath(request, negotiatedLocale);
}

/**
 * Path already carries a supported locale prefix (e.g. "/fr/pricing") —
 * let it through, refreshing the persistence cookie and exposing the
 * resolved locale to Server Components via a forwarded request header.
 */
function passThrough(request: NextRequest, locale: Locale) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set(LOCALE_HEADER, locale);
  setLocaleCookie(response, locale);
  return response;
}

/**
 * Bare path with no locale prefix (e.g. "/" or "/pricing") — redirect to
 * the same path under the negotiated locale so the URL bar always shows
 * a clean localized sub-path.
 */
function redirectToLocalizedPath(request: NextRequest, locale: Locale) {
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = buildLocalizedPath(request.nextUrl.pathname, locale);

  const response = NextResponse.redirect(redirectUrl, 307);
  response.headers.set(LOCALE_HEADER, locale);
  setLocaleCookie(response, locale);
  return response;
}

function setLocaleCookie(response: NextResponse, locale: Locale) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    maxAge: LOCALE_COOKIE_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax",
  });
}

export const config = {
  matcher: [
    /*
     * Run on every route except:
     * - /api/*                 (API route scope)
     * - /_next/static/*        (build output)
     * - /_next/image/*         (image optimization endpoint)
     * - /_next/data/*          (client-side navigation data)
     * - favicon.ico, robots.txt, sitemap.xml (well-known metadata files)
     * - any path containing a dot (public/ static assets: images, fonts,
     *   stylesheets, scripts, and any other file served by extension)
     */
    "/((?!api/|_next/static/|_next/image/|_next/data/|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)",
  ],
};
