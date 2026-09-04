import type { Metadata } from "next";
import { corridors, formatDuration } from "@/lib/corridors";

export const metadata: Metadata = {
  title: "Corridors — TRAME",
  description:
    "Le réseau de liaisons TRAME : trajets domestiques et liaisons transfrontalières actives ou à venir.",
};

export default function CorridorsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-data text-xs text-teal">CORRIDORS</p>
      <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
        Le réseau, liaison par liaison.
      </h1>
      <p className="mt-5 max-w-xl text-titanium-dim">
        Chaque corridor relie deux gares TRAME sur une fréquence régulière.
        Le réseau domestique s&rsquo;étend progressivement aux liaisons
        transfrontalières.
      </p>

      <div className="mt-10 flex flex-col gap-3">
        {corridors.map((corridor) => (
          <div
            key={corridor.id}
            className="rounded-2xl border border-graphite-line bg-graphite px-6 py-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="font-display text-lg font-semibold">
                  {corridor.fromCity} → {corridor.toCity}
                </span>
                {corridor.international && (
                  <span className="rounded-full border border-graphite-line px-2.5 py-1 font-data text-[10px] text-titanium-dim">
                    INTERNATIONAL
                  </span>
                )}
              </div>
              <span
                className={
                  corridor.status === "active"
                    ? "inline-flex items-center gap-1.5 rounded-full bg-teal-dim px-2.5 py-1 font-data text-[10px] text-teal"
                    : "inline-flex items-center gap-1.5 rounded-full border border-graphite-line px-2.5 py-1 font-data text-[10px] text-titanium-dim"
                }
              >
                <span
                  className={
                    corridor.status === "active"
                      ? "h-1.5 w-1.5 rounded-full bg-teal"
                      : "h-1.5 w-1.5 rounded-full bg-titanium-dim"
                  }
                />
                {corridor.status === "active" ? "ACTIF" : "BIENTÔT"}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-data text-xs text-titanium-dim">
              <span>DURÉE {formatDuration(corridor.durationHours)}</span>
              <span>{corridor.frequency.toUpperCase()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
