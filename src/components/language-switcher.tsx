"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/lib/i18n";
import { useLocale } from "@/hooks/use-locale";

export function LanguageSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();
  const pathWithoutLocale = pathname.slice(`/${activeLocale}`.length) || "/";

  return (
    <div className="flex items-center gap-3 font-data text-[11px] text-titanium-dim">
      {locales.map((locale) => (
        <LocaleLink
          key={locale}
          locale={locale}
          active={locale === activeLocale}
          href={
            pathWithoutLocale === "/"
              ? `/${locale}`
              : `/${locale}${pathWithoutLocale}`
          }
        />
      ))}
    </div>
  );
}

function LocaleLink({
  locale,
  href,
  active,
}: {
  locale: Locale;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      title={localeLabels[locale]}
      aria-current={active ? "true" : undefined}
      className={active ? "text-teal" : "hover:text-titanium transition-colors"}
    >
      {locale.toUpperCase()}
    </Link>
  );
}
