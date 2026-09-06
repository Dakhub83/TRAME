import type { ScheduledStop } from "@/lib/dispatch";

/**
 * Only the fields this map actually draws — deliberately narrower than the
 * full ActiveTrip (which also carries currentSpeed, delayMinutes,
 * registrationCode, etc.), so public-facing callers like the ticket
 * tracker can pass a trimmed-down object instead of an admin-only type.
 */
export type RouteMapTrip = {
  routeCode: string;
  gpsProgress: number;
  stops: ScheduledStop[];
};

const VIEW_W = 640;
const VIEW_H = 200;
const SAMPLES = 48;

function pointAt(t: number) {
  const x = 24 + t * (VIEW_W - 48);
  const y = VIEW_H / 2 + Math.sin(t * Math.PI * 2.5) * (VIEW_H * 0.18);
  return { x, y };
}

function buildRoutePath(): string {
  const segments: string[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const { x, y } = pointAt(i / SAMPLES);
    segments.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return segments.join(" ");
}

function shortStopName(stopName: string): string {
  return stopName.split(" — ")[0];
}

const ROUTE_PATH_D = buildRoutePath();

export function RouteMap({ trip, live = false }: { trip: RouteMapTrip; live?: boolean }) {
  const dot = pointAt(trip.gpsProgress / 100);
  const stopCount = trip.stops.length;

  return (
    <div className="relative mb-6 h-64 overflow-hidden rounded-xl border border-graphite-line bg-obsidian">
      <div className="absolute left-4 top-4 z-10 font-data text-[10px] uppercase tracking-wider text-titanium-dim">
        Suivi GPS — {trip.routeCode}
      </div>
      <div
        className={`absolute right-4 top-4 z-10 flex items-center gap-1.5 font-data text-[10px] uppercase tracking-wider ${
          live ? "text-teal" : "text-titanium-dim"
        }`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${live ? "animate-pulse bg-teal" : "bg-titanium-dim"}`} />
        {live ? "En direct" : "Position simulée"}
      </div>

      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <path d={ROUTE_PATH_D} fill="none" strokeWidth={3} strokeLinecap="round" className="stroke-graphite-line" />
        <path
          d={ROUTE_PATH_D}
          fill="none"
          strokeWidth={3}
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={100 - trip.gpsProgress}
          className="stroke-teal"
        />

        {trip.stops.map((stop, index) => {
          const { x, y } = pointAt(stopCount > 1 ? index / (stopCount - 1) : 0);
          const passed = stop.status === "PARTI" || stop.status === "ARRIVÉ";
          const isFirst = index === 0;
          const isLast = index === stopCount - 1;
          const textAnchor = isFirst ? "start" : isLast ? "end" : "middle";
          const textX = isFirst ? x + 8 : isLast ? x - 8 : x;
          return (
            <g key={stop.stopName}>
              <circle
                cx={x}
                cy={y}
                r={5}
                strokeWidth={2}
                className={passed ? "fill-teal stroke-teal" : "fill-obsidian stroke-graphite-line"}
              />
              <text
                x={textX}
                y={y + 20}
                textAnchor={textAnchor}
                fontSize="9"
                letterSpacing="0.5"
                className="font-data fill-titanium-dim uppercase"
              >
                {shortStopName(stop.stopName)}
              </text>
            </g>
          );
        })}
      </svg>

      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${(dot.x / VIEW_W) * 100}%`, top: `${(dot.y / VIEW_H) * 100}%` }}
      >
        <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-teal opacity-60" />
        <span className="relative block h-3 w-3 rounded-full bg-teal shadow-[0_0_12px_var(--teal-glow)]" />
      </div>
    </div>
  );
}
