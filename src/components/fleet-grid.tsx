"use client";

import Image from "next/image";
import Link from "next/link";
import { Shield, MapPin, ArrowRight, Radio, Armchair } from "lucide-react";
import type { FleetVehicle } from "@/lib/fleet";
import { buildLocalizedPath } from "@/lib/i18n";
import { useLocale } from "@/hooks/use-locale";

function featureIcon(feature: string) {
  if (feature.includes("Climatisation")) return Shield;
  if (feature.includes("GPS")) return MapPin;
  if (feature.includes("Sièges")) return Armchair;
  if (feature.includes("USB")) return Radio;
  return null;
}

export function FleetGrid({ fleet }: { fleet: FleetVehicle[] }) {
  const locale = useLocale();

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {fleet.map((bus) => (
        <section
          key={bus.id}
          className="group relative overflow-hidden rounded-2xl border border-graphite-line bg-graphite shadow-2xl transition-all duration-300 hover:border-teal/30 hover:shadow-[0_0_30px_rgba(0,230,195,0.06)]"
        >
          <div className="relative aspect-16/10 w-full overflow-hidden bg-obsidian">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-graphite via-transparent to-transparent opacity-60" />

            <div className="absolute inset-0 flex items-center justify-center bg-graphite-light font-data text-xs uppercase tracking-widest text-titanium-dim">
              [ Image à venir : {bus.category} ]
            </div>

            <Image
              src={bus.imagePath}
              alt={`${bus.category} ${bus.modelYear}`}
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
                {bus.category}
              </h2>
              <span className="font-data text-xs text-titanium-dim">
                {bus.modelYear}
              </span>
            </div>

            <p className="mb-6 font-data text-sm font-semibold tracking-wide text-teal">
              {bus.seats} sièges
            </p>

            <ul className="mb-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-graphite-line pt-4">
              {bus.features.map((feature) => {
                const Icon = featureIcon(feature);
                return (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-xs text-titanium-dim"
                  >
                    {Icon && <Icon className="h-3.5 w-3.5 shrink-0 text-teal-dim" />}
                    <span className="truncate">{feature}</span>
                  </li>
                );
              })}
            </ul>

            <div className="space-y-3">
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
      ))}
    </div>
  );
}
