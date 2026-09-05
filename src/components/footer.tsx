import Link from "next/link";
import { Mark } from "@/components/mark";
import { buildLocalizedPath, type Locale } from "@/lib/i18n";
import { StoreBadges } from "@/components/store-badges";

const columns = [
  {
    title: "TRANSPORT",
    links: [
      { href: "/book", label: "Réserver un siège" },
      { href: "/ticket", label: "Mon billet" },
      { href: "/corridors", label: "Corridors" },
      { href: "/fleet", label: "Notre flotte" },
    ],
  },
  {
    title: "FRET",
    links: [
      { href: "/fret", label: "Envoyer un colis" },
      { href: "/track", label: "Suivre un colis" },
    ],
  },
  {
    title: "ENTREPRISE",
    links: [
      { href: "/services", label: "Services" },
      { href: "/pricing", label: "Tarifs" },
      { href: "/a-propos", label: "À propos" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-graphite-line">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Mark className="h-7 w-7" />
              <span className="font-display text-lg font-semibold tracking-wide">
                TRAME
              </span>
            </div>
            <p className="mt-3 max-w-[26ch] text-sm text-titanium-dim">
              Le réseau, réinventé — voyageurs &amp; colis, une seule
              infrastructure.
            </p>
            <StoreBadges className="mt-5" size="compact" />
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <div className="font-data text-[11px] text-titanium-dim">
                {col.title}
              </div>
              <ul className="mt-3 flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={buildLocalizedPath(link.href, locale)}
                      className="text-sm text-titanium hover:text-teal transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-graphite-line pt-6 font-data text-[11px] text-titanium-dim sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} TRAME. Tous droits réservés.</span>
          <span>Ouagadougou · Bobo-Dioulasso</span>
        </div>
      </div>
    </footer>
  );
}
