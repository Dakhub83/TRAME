"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FleetVehicle } from "@/lib/fleet";
import { buildLocalizedPath } from "@/lib/i18n";
import { useLocale } from "@/hooks/use-locale";
import { AmenitiesRow } from "@/components/amenities-row";

export function FleetCard({
  vehicle,
  isActive = false,
  onSelect,
}: {
  vehicle: FleetVehicle;
  isActive?: boolean;
  onSelect?: () => void;
}) {
  const locale = useLocale();

  return (
    <section
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-2xl border bg-graphite shadow-2xl transition-all duration-300 ${
        onSelect ? "cursor-pointer" : ""
      } ${
        isActive
          ? "border-teal bg-graphite-light shadow-[0_0_20px_var(--teal-glow)]"
          : "border-graphite-line hover:border-teal/30 hover:shadow-[0_0_30px_rgba(0,230,195,0.06)]"
      }`}
    >
      <div className="relative aspect-16/10 w-full overflow-hidden bg-obsidian">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-graphite via-transparent to-transparent opacity-60" />

        <div className="absolute inset-0 flex items-center justify-center bg-graphite-light font-data text-xs uppercase tracking-widest text-titanium-dim">
          [ Image à venir : {vehicle.category} ]
        </div>

        <Image
          src={vehicle.imagePath}
          alt={`${vehicle.category} ${vehicle.modelYear}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="transform object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        <span className="absolute right-4 top-4 z-20 rounded-full border border-graphite-line bg-obsidian/90 px-3 py-1 font-data text-[10px] uppercase tracking-wider text-teal backdrop-blur-sm">
          TRAME Fleet
        </span>
      </div>

      <div className="p-6">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-titanium">
            {vehicle.category}
          </h2>
          <span className="font-data text-xs text-titanium-dim">
            {vehicle.modelYear}
          </span>
        </div>

        {vehicle.model && (
          <p className="mb-2 font-data text-[11px] uppercase tracking-wider text-titanium-dim">
            {vehicle.model}
          </p>
        )}

        <p className="mb-6 font-data text-sm font-semibold tracking-wide text-teal">
          {vehicle.seats} sièges
        </p>

        <div className="mb-6">
          <AmenitiesRow features={vehicle.features} />
        </div>

        <div
          className="space-y-3"
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            href={buildLocalizedPath("/book", locale)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal px-4 py-3.5 font-data text-xs font-bold uppercase tracking-widest text-obsidian shadow-md transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(0,230,195,0.3)] active:scale-[0.99]"
          >
            <span>Voir les horaires</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <Link
            href={buildLocalizedPath("/contact", locale)}
            className="block w-full rounded-xl border border-graphite-line px-4 py-2.5 text-center font-data text-[11px] font-bold uppercase tracking-widest text-titanium-dim transition-colors duration-200 hover:bg-graphite-light hover:text-titanium"
          >
            Détails
          </Link>
        </div>
      </div>
    </section>
  );
}
