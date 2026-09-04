import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { BookingProvider } from "@/context/booking-context";
import { Mark } from "@/components/mark";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-obsidian text-titanium antialiased">
        <BookingProvider>
          <header className="border-b border-graphite-line">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
              <Link href="/" className="flex items-center gap-3">
                <Mark className="h-8 w-8" />
                <span className="font-display text-xl font-semibold tracking-wide">
                  TRAME
                </span>
              </Link>
              <nav className="flex items-center gap-6 font-data text-xs text-titanium-dim">
                <Link href="/book" className="hover:text-teal transition-colors">
                  RÉSERVER
                </Link>
                <Link href="/track" className="hover:text-teal transition-colors">
                  SUIVI FRET
                </Link>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </BookingProvider>
      </body>
    </html>
  );
}
