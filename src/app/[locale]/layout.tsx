import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import "../globals.css";
import { BookingProvider } from "@/context/booking-context";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { isSupportedLocale, locales } from "@/lib/i18n";
import { spaceGrotesk, ibmPlexSans, ibmPlexMono } from "@/lib/fonts";
import { CLIENT_SESSION_COOKIE } from "@/lib/client-auth";

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

  const cookieStore = await cookies();
  const loggedInPhone = cookieStore.get(CLIENT_SESSION_COOKIE)?.value;

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-obsidian text-titanium antialiased">
        <BookingProvider>
          <Navigation loggedInPhone={loggedInPhone} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </BookingProvider>
      </body>
    </html>
  );
}
