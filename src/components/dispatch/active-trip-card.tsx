import type { ActiveTrip } from "@/lib/dispatch";
import { tripStatusLabel } from "@/lib/dispatch";

function overallStatusClasses(status: ActiveTrip["overallStatus"]) {
  if (status === "DELAYED") return "border-amber/30 bg-amber/10 text-amber";
  if (status === "BOARDING") return "border-graphite-line text-titanium-dim";
  return "border-teal-dim bg-teal-dim text-teal";
}

export function ActiveTripCard({
  trip,
  isActive,
  onSelect,
}: {
  trip: ActiveTrip;
  isActive: boolean;
  onSelect: () => void;
}) {
  const onSchedule = trip.delayMinutes <= 0;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-2xl border bg-graphite p-4 text-left transition-all duration-200 hover:bg-graphite-light ${
        isActive ? "border-teal shadow-[0_0_20px_var(--teal-glow)]" : "border-graphite-line"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-base font-semibold text-titanium">{trip.vehicleName}</h3>
        <span className="font-data text-[11px] text-titanium-dim">{trip.tripId}</span>
      </div>

      <div className="mt-0.5 flex items-center justify-between">
        <p className="font-data text-xs tracking-wide text-titanium-dim">{trip.routeCode}</p>
        <p className="font-data text-[10px] tracking-wide text-titanium-dim">{trip.registrationCode}</p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="font-data text-sm text-titanium">
          {trip.currentSpeed} <span className="text-titanium-dim">KM/H</span>
        </span>

        <span
          className={`rounded-full border px-2.5 py-0.5 font-data text-[10px] uppercase tracking-wider ${
            onSchedule ? "border-teal-dim bg-teal-dim text-teal" : "border-amber/30 bg-amber/10 text-amber"
          }`}
        >
          {onSchedule ? "À l'heure" : `+${trip.delayMinutes} min`}
        </span>
      </div>

      <span
        className={`mt-3 inline-block rounded-full border px-2.5 py-0.5 font-data text-[10px] uppercase tracking-wider ${overallStatusClasses(trip.overallStatus)}`}
      >
        {tripStatusLabel(trip.overallStatus)}
      </span>
    </button>
  );
}
