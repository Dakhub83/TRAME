import type { ScheduledStop, StopStatus } from "@/lib/dispatch";
import { stopDelayMinutes, stopStatusLabel } from "@/lib/dispatch";

function nodeClasses(status: StopStatus) {
  if (status === "PARTI") return "border-teal bg-teal";
  if (status === "ARRIVÉ" || status === "EN_APPROCHE") {
    return "border-teal bg-obsidian shadow-[0_0_0_4px_var(--teal-glow)] animate-pulse";
  }
  return "border-graphite-line bg-obsidian";
}

function lineClasses(status: StopStatus) {
  return status === "PARTI" ? "bg-teal" : "bg-graphite-line";
}

function labelClasses(status: StopStatus) {
  if (status === "EN_ATTENTE") return "text-titanium-dim";
  if (status === "ARRIVÉ" || status === "EN_APPROCHE") return "text-teal";
  return "text-titanium";
}

export function TripTimeline({ stops }: { stops: ScheduledStop[] }) {
  return (
    <div>
      {stops.map((stop, index) => {
        const isLast = index === stops.length - 1;
        const delay = stopDelayMinutes(stop);

        return (
          <div key={stop.stopName} className="flex gap-4">
            <div className="flex w-4 flex-col items-center">
              <span className={`h-3.5 w-3.5 shrink-0 rounded-full border-2 ${nodeClasses(stop.status)}`} />
              {!isLast && <span className={`min-h-10 w-0.5 flex-1 ${lineClasses(stop.status)}`} />}
            </div>

            <div className="pb-8">
              <div className={`font-display text-sm font-semibold ${labelClasses(stop.status)}`}>
                {stop.stopName}
              </div>

              <div className="mt-1 flex items-center gap-2 font-data text-[11px] text-titanium-dim">
                <span>PRÉVU {stop.scheduledTime}</span>
                <span>·</span>
                <span className={delay > 0 ? "text-amber" : "text-titanium-dim"}>
                  ESTIMÉ {stop.estimatedTime}
                  {delay > 0 && ` (+${delay} MIN)`}
                </span>
              </div>

              <span
                className={`mt-2 inline-block rounded-full border px-2.5 py-0.5 font-data text-[10px] uppercase tracking-wider ${
                  stop.status === "EN_ATTENTE"
                    ? "border-graphite-line text-titanium-dim"
                    : stop.status === "PARTI"
                      ? "border-teal-dim bg-teal-dim text-teal"
                      : "border-teal text-teal"
                }`}
              >
                {stopStatusLabel(stop.status)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
