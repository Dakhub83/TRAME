"use client";

import { useState } from "react";
import { lookupPublicTrip, type PublicTrip } from "@/lib/tracking";
import { RouteMap } from "@/components/dispatch/route-map";

export function TicketTracker() {
  const [code, setCode] = useState("");
  const [trip, setTrip] = useState<PublicTrip | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = lookupPublicTrip(code);
    if (!result) {
      setError("Aucun trajet trouvé pour ce code de ticket.");
      setTrip(null);
      return;
    }
    setError(null);
    setTrip(result);
  }

  return (
    <div className="min-h-screen bg-obsidian px-6 py-16">
      <div className="mx-auto max-w-4xl">
        {!trip ? (
          <div className="mx-auto max-w-md rounded-2xl border border-graphite-line bg-graphite p-8">
            <p className="font-data text-xs uppercase tracking-widest text-teal">Suivi de trajet</p>
            <h1 className="mt-2 font-display text-2xl font-bold text-titanium">
              Suivre un trajet
            </h1>
            <p className="mt-2 text-sm text-titanium-dim">
              Entrez le code inscrit sur le ticket pour voir la position du véhicule en temps réel.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="text"
                required
                autoFocus
                placeholder="Entrez votre code de ticket (ex: TR-4471)"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full rounded-xl border border-graphite-line bg-graphite-light px-4 py-3 font-data text-sm text-titanium placeholder:text-titanium-dim focus:border-teal focus:outline-none"
              />

              {error && <p className="font-data text-xs text-amber">{error}</p>}

              <button
                type="submit"
                className="w-full rounded-xl bg-teal px-4 py-3 font-bold uppercase tracking-wider text-obsidian transition-all hover:brightness-110"
              >
                Suivre le trajet
              </button>
            </form>
          </div>
        ) : (
          <div>
            <button
              type="button"
              onClick={() => {
                setTrip(null);
                setCode("");
              }}
              className="mb-6 font-data text-xs text-titanium-dim hover:text-titanium"
            >
              ← Suivre un autre ticket
            </button>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
              <div className="rounded-2xl border border-graphite-line bg-graphite p-6">
                <p className="font-data text-[10px] uppercase tracking-wider text-titanium-dim">
                  Ticket
                </p>
                <p className="mt-1 font-data text-lg text-teal">{trip.ticketCode}</p>
                <p className="mt-0.5 font-data text-xs text-titanium-dim">{trip.routeCode}</p>

                <div className="mt-6 space-y-5 border-t border-graphite-line pt-5">
                  <div>
                    <p className="font-data text-[10px] uppercase tracking-wider text-titanium-dim">
                      Statut
                    </p>
                    <span className="mt-1 inline-block rounded-full border border-teal-dim bg-teal-dim px-3 py-1 font-data text-xs uppercase tracking-wider text-teal">
                      {trip.statusLabel}
                    </span>
                  </div>

                  <div>
                    <p className="font-data text-[10px] uppercase tracking-wider text-titanium-dim">
                      Chauffeur
                    </p>
                    <p className="mt-1 font-data text-sm text-titanium">{trip.driverName}</p>
                  </div>

                  <div>
                    <p className="font-data text-[10px] uppercase tracking-wider text-titanium-dim">
                      Arrivée estimée
                    </p>
                    <p className="mt-1 font-data text-sm text-titanium">{trip.etaWindow}</p>
                  </div>
                </div>
              </div>

              <div>
                <RouteMap trip={trip} live />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
