"use client";

import { useParams } from "next/navigation";
import { defaultLocale, isSupportedLocale, type Locale } from "@/lib/i18n";

export function useLocale(): Locale {
  const params = useParams<{ locale: string }>();
  const locale = params.locale;
  return locale && isSupportedLocale(locale) ? locale : defaultLocale;
}
