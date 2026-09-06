"use client";

import { useState } from "react";
import { activeTrips, tripStatusLabel } from "@/lib/dispatch";
import { ActiveTripCard } from "@/components/dispatch/active-trip-card";
import { RouteMap } from "@/components/dispatch/route-map";
import { TripTimeline } from "@/components/dispatch/trip-timeline";
import { useDispatchTelemetry } from "@/hooks/use-dispatch-telemetry";

// The only vehicle server.js actually simulates telemetry for — see
// ROUTE_STATIONS / tripId "yutong-t12" there.
const LIVE_VEHICLE_NAME = "Yutong T12";

export function CentralDispatchDashboard() {
  const [selectedTripId, setSelectedTripId] = useState(activeTrips[0]?.tripId);
  const selectedTrip = activeTrips.find((trip) => trip.tripId === selectedTripId);

  const isLiveVehicleSelected = selectedTrip?.vehicleName === LIVE_VEHICLE_NAME;
  const { status: telemetryStatus, frame } = useDispatchTelemetry(isLiveVehicleSelected);
  const isLive = isLiveVehicleSelected && telemetryStatus === "live";

  // Overlay live speed/progress from the WebSocket onto the base mock trip
  // once connected — the map and timeline stops still come from the static
  // data, since the server only streams speed, progress, and coordinates.
  const displayedTrip =
    selectedTrip && isLive && frame
      ? { ...selectedTrip, currentSpeed: frame.currentSpeed, gpsProgress: frame.gpsProgress }
      : selectedTrip;

  return (
    <div className="min-h-screen bg-obsidian px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center gap-2 font-data text-xs uppercase tracking-wider">
          <span className="text-teal">Trame Ops</span>
          <span className="text-titanium-dim">/</span>
          <span className="text-titanium">Centre de dispatching</span>
          <span className="text-titanium-dim">/</span>
          <span className="text-titanium-dim">{activeTrips.length} trajets actifs en circulation</span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
          <div className="flex max-h-[calc(100vh-220px)] flex-col gap-3 overflow-y-auto pr-1 lg:sticky lg:top-6">
            {activeTrips.map((trip) => (
              <ActiveTripCard
                key={trip.tripId}
                trip={trip}
                isActive={trip.tripId === selectedTripId}
                onSelect={() => setSelectedTripId(trip.tripId)}
              />
            ))}
          </div>

          <div className="rounded-2xl border border-graphite-line bg-graphite p-6">
            {!displayedTrip ? (
              <p className="text-sm text-titanium-dim">Sélectionnez un trajet actif pour voir le détail.</p>
            ) : (
              <>
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-graphite-line pb-5">
                  <div>
                    <h2 className="font-display text-xl font-bold text-titanium">
                      {displayedTrip.vehicleName}
                    </h2>
                    <p className="mt-1 font-data text-xs tracking-wide text-titanium-dim">
                      {displayedTrip.routeCode} · {displayedTrip.tripId} · {displayedTrip.registrationCode}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isLiveVehicleSelected && (
                      <span
                        className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-data text-[10px] uppercase tracking-wider ${
                          isLive
                            ? "border-teal-dim bg-teal-dim text-teal"
                            : "border-graphite-line text-titanium-dim"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${isLive ? "animate-pulse bg-teal" : "bg-titanium-dim"}`}
                        />
                        {telemetryStatus === "connecting" ? "Connexion…" : isLive ? "En direct" : "Hors ligne"}
                      </span>
                    )}
                    <span
                      className={`rounded-full border px-3 py-1 font-data text-[11px] uppercase tracking-wider ${
                        displayedTrip.overallStatus === "DELAYED"
                          ? "border-amber/30 bg-amber/10 text-amber"
                          : displayedTrip.overallStatus === "BOARDING"
                            ? "border-graphite-line text-titanium-dim"
                            : "border-teal-dim bg-teal-dim text-teal"
                      }`}
                    >
                      {tripStatusLabel(displayedTrip.overallStatus)}
                    </span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-4">
                  <div>
                    <div className="font-data text-[10px] uppercase tracking-wider text-titanium-dim">
                      Vitesse
                    </div>
                    <div className="mt-1 font-display text-2xl font-bold text-titanium">
                      {displayedTrip.currentSpeed}
                      <span className="ml-1 font-data text-xs font-normal text-titanium-dim">km/h</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-data text-[10px] uppercase tracking-wider text-titanium-dim">
                      Écart horaire
                    </div>
                    <div
                      className={`mt-1 font-display text-2xl font-bold ${
                        displayedTrip.delayMinutes > 0 ? "text-amber" : "text-teal"
                      }`}
                    >
                      {displayedTrip.delayMinutes > 0 ? `+${displayedTrip.delayMinutes}` : "0"}
                      <span className="ml-1 font-data text-xs font-normal text-titanium-dim">min</span>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="font-data text-[10px] uppercase tracking-wider text-titanium-dim">
                      Prochain arrêt
                    </div>
                    <div className="mt-1 truncate font-display text-2xl font-bold text-titanium">
                      {displayedTrip.stops.find((s) => s.status === "EN_APPROCHE" || s.status === "ARRIVÉ")
                        ?.stopName ?? "—"}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <RouteMap trip={displayedTrip} live={isLive} />
                </div>

                <TripTimeline stops={displayedTrip.stops} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
