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
      <header className="mb-10 flex flex-col border-b border-graphite-line pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-data text-xs font-bold uppercase tracking-widest text-teal">
            Flotte Trame
          </span>
          <h1 className="mt-1 font-display text-3xl font-extrabold uppercase tracking-tight text-titanium md:text-4xl">
            Nos cars et bus
          </h1>
        </div>
        <span className="mt-4 w-fit rounded-full border border-teal/20 bg-teal-dim px-3 py-1 font-data text-xs font-semibold uppercase tracking-wider text-teal md:mt-0">
          Flotte active
        </span>
      </header>

      <FleetGrid fleet={fleetData} />
    </div>
  );
}
