import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import "../globals.css";
import { BookingProvider } from "@/context/booking-context";
import { Mark } from "@/components/mark";
import { Footer } from "@/components/footer";
import { LanguageSwitcher } from "@/components/language-switcher";
import { buildLocalizedPath, isSupportedLocale, locales } from "@/lib/i18n";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "TRAME — Le réseau, réinventé",
  description:
    "Voyageurs & colis, une seule infrastructure. Réservation de siège, billet numérique et suivi de fret pour le Burkina Faso.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();

  const navItems = [
    { href: "/book", label: "RÉSERVER" },
    { href: "/fret", label: "FRET" },
    { href: "/a-propos", label: "À PROPOS" },
    { href: "/contact", label: "CONTACT" },
  ];

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-obsidian text-titanium antialiased">
        <BookingProvider>
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
                <nav className="flex items-center gap-6 font-data text-xs text-titanium-dim">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={buildLocalizedPath(item.href, locale)}
                      className="hover:text-teal transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <LanguageSwitcher />
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </BookingProvider>
      </body>
    </html>
  );
}
