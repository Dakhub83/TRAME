import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "../globals.css";
import { BookingProvider } from "@/context/booking-context";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { isSupportedLocale, locales } from "@/lib/i18n";

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

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-obsidian text-titanium antialiased">
        <BookingProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </BookingProvider>
      </body>
    </html>
  );
}
