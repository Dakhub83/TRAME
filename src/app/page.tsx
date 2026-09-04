import Link from "next/link";
import { getTrip, formatFcfa } from "@/lib/trips";

export default function Home() {
  const trip = getTrip("ouaga-bobo-0630")!;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-data text-xs text-teal">RÉSEAU ACTIF · 14 LIAISONS</p>
      <h1 className="mt-3 max-w-xl font-display text-4xl font-semibold leading-tight">
        Le réseau, réinventé — voyageurs &amp; colis, une seule infrastructure.
      </h1>
      <p className="mt-4 max-w-lg text-titanium-dim">
        Réservation de siège 100% numérique, billet mobile et suivi de fret en
        temps réel, sur la même colonne vertébrale de transport.
      </p>

      <div className="mt-10 rounded-2xl border border-graphite-line bg-graphite p-6">
        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-semibold">
            {trip.fromCity} → {trip.toCity}
          </span>
          <span className="font-data text-xs text-titanium-dim">
            {trip.duration} · {trip.direct ? "DIRECT" : "AVEC ARRÊT"}
          </span>
        </div>
        <div className="mt-2 font-data text-xs text-titanium-dim">
          Départ {trip.departure} · {trip.date} · {trip.coachModel}
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div>
            <div className="font-data text-[10px] text-titanium-dim">
              À PARTIR DE
            </div>
            <div className="font-display text-lg font-semibold">
              {formatFcfa(trip.standardPrice)}
            </div>
          </div>
          <Link
            href="/book"
            className="rounded-xl bg-teal px-6 py-3.5 font-semibold text-obsidian"
          >
            Choisir un siège
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <Link href="/track" className="font-data text-xs text-titanium-dim hover:text-teal">
          Suivre un colis existant →
        </Link>
      </div>
    </div>
  );
}
