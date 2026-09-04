import type { Metadata } from "next";
import { fleetData } from "@/lib/fleet";
import { FleetGrid } from "@/components/fleet-grid";

export const metadata: Metadata = {
  title: "Notre flotte — TRAME",
  description:
    "Cars de luxe et minibus premium — climatisation, suivi GPS, sièges réclinables et port USB sur chaque véhicule.",
};

export default function FleetPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-16 pt-16">
      <div className="mb-6 h-1 w-16 animate-pulse rounded bg-gradient-to-r from-teal to-teal-dim" />
      <h1 className="mb-12 font-display text-4xl font-extrabold uppercase tracking-tight text-titanium sm:text-5xl">
        Nos cars et bus
      </h1>

      <FleetGrid fleet={fleetData} />
    </div>
  );
}
