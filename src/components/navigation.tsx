"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildLocalizedPath } from "@/lib/i18n";
import { useLocale } from "@/hooks/use-locale";
import { Mark } from "@/components/mark";
import { LanguageSwitcher } from "@/components/language-switcher";

const navItems = [
  { href: "/", label: "ACCUEIL" },
  { href: "/services", label: "SERVICES" },
  { href: "/book", label: "RÉSERVER" },
  { href: "/pricing", label: "TARIFS" },
  { href: "/corridors", label: "CORRIDORS" },
  { href: "/fleet", label: "FLOTTE" },
  { href: "/a-propos", label: "À PROPOS" },
  { href: "/contact", label: "CONTACT" },
];

export function Navigation({ loggedInPhone }: { loggedInPhone?: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  const accountItem = loggedInPhone
    ? { href: "/compte", label: "MON COMPTE" }
    : { href: "/login", label: "CONNEXION" };
  const items = [...navItems, accountItem];

  return (
    <header className="border-b border-graphite-line">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href={buildLocalizedPath("/", locale)}
          className="flex items-center gap-3"
        >
          <Mark className="h-8 w-8" />
          <span className="font-display text-xl font-semibold tracking-wide">
            TRAME
          </span>
        </Link>
        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-6 font-data text-xs text-titanium-dim md:flex">
            {items.map((item) => {
              const href = buildLocalizedPath(item.href, locale);
              const active = pathname === href;
              return (
                <Link
                  key={item.href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "text-teal"
                      : "hover:text-teal transition-colors"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
      <nav className="flex items-center gap-5 overflow-x-auto border-t border-graphite-line px-6 py-2.5 font-data text-[11px] text-titanium-dim md:hidden">
        {items.map((item) => {
          const href = buildLocalizedPath(item.href, locale);
          const active = pathname === href;
          return (
            <Link
              key={item.href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={active ? "shrink-0 text-teal" : "shrink-0 hover:text-teal transition-colors"}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
