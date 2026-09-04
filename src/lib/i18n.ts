/**
 * i18n routing configuration and helpers, shared between `src/proxy.ts`
 * (edge-level locale negotiation and URL rewriting) and any server code
 * that needs to reason about locales without re-implementing this logic.
 */

export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/**
 * The locale routing falls back to when the negotiated preference is
 * French rather than English.
 */
export const negotiatedFallbackLocale: Locale = "fr";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

const localeSet = new Set<string>(locales);

export function isSupportedLocale(value: string): value is Locale {
  return localeSet.has(value);
}

/**
 * Narrows a raw route param to `Locale`. The `[locale]` segment is typed
 * as `string` by Next's route-props helpers, but the root layout already
 * calls `notFound()` for anything outside `locales` before any page
 * renders — so by the time a page runs, coercion here is just satisfying
 * the type system, not re-validating.
 */
export function toLocale(value: string): Locale {
  return isSupportedLocale(value) ? value : defaultLocale;
}

/**
 * Returns the locale prefix of a pathname (e.g. "/fr/pricing" -> "fr"),
 * or null if the first segment isn't one of the supported locales.
 */
export function getLocaleFromPathname(pathname: string): Locale | null {
  const [, maybeLocale] = pathname.split("/");
  return maybeLocale && isSupportedLocale(maybeLocale) ? maybeLocale : null;
}

export function stripLocaleFromPathname(pathname: string, locale: Locale): string {
  const rest = pathname.slice(`/${locale}`.length);
  return rest.length === 0 ? "/" : rest;
}

export function buildLocalizedPath(pathname: string, locale: Locale): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

type WeightedTag = { subtag: string; quality: number };

/**
 * Parses an RFC 4647 `Accept-Language` header into primary language
 * subtags ranked by quality (highest first). Region/script suffixes are
 * discarded since routing only cares about the primary subtag (e.g.
 * "fr-FR" and "fr-CA" both resolve to "fr").
 */
function parseAcceptLanguage(header: string | null): string[] {
  if (!header) return [];

  const tags: WeightedTag[] = header
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [rawTag, ...params] = part.split(";").map((s) => s.trim());
      const qParam = params.find((p) => p.startsWith("q="));
      const quality = qParam ? Number.parseFloat(qParam.slice(2)) : 1;
      const subtag = rawTag.split("-")[0].toLowerCase();
      return { subtag, quality: Number.isFinite(quality) ? quality : 1 };
    })
    .filter((tag) => tag.subtag && tag.subtag !== "*");

  return tags
    .sort((a, b) => b.quality - a.quality)
    .map((tag) => tag.subtag);
}

/**
 * Implements the header-negotiation business rule:
 * - A cookie-persisted preference (from a prior manual selection) wins
 *   outright, if present and valid.
 * - Otherwise, walk the Accept-Language subtags in quality order; the
 *   first one that is French resolves to "fr", the first one that is
 *   English resolves to "en".
 * - If nothing in the header matches either, fall back to "en".
 */
export function negotiateLocale(acceptLanguageHeader: string | null, cookieLocale?: string | null): Locale {
  if (cookieLocale && isSupportedLocale(cookieLocale)) {
    return cookieLocale;
  }

  const subtags = parseAcceptLanguage(acceptLanguageHeader);

  for (const subtag of subtags) {
    if (subtag === "fr") return negotiatedFallbackLocale;
    if (subtag === "en") return defaultLocale;
  }

  return defaultLocale;
}
