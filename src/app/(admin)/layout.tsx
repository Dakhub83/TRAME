import type { Metadata } from "next";
import "../globals.css";
import { spaceGrotesk, ibmPlexSans, ibmPlexMono } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Administration — TRAME",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="min-h-full bg-obsidian text-titanium antialiased">
        {children}
      </body>
    </html>
  );
}
