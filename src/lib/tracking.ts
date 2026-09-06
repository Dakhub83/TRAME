import { activeTrips, tripStatusLabel } from "@/lib/dispatch";
import type { ScheduledStop } from "@/lib/dispatch";

export type PublicTrip = {
  ticketCode: string;
  routeCode: string;
  driverName: string;
  statusLabel: string;
  etaWindow: string;
  gpsProgress: number;
  stops: ScheduledStop[];
};

/**
 * First name + last initial only — this page is public (anyone with, or
 * guessing, a ticket code can look it up), so a driver's full name isn't
 * shown here. Keyed by tripId since that's the public "ticket code".
 */
const DRIVER_DIRECTORY: Record<string, string> = {
  "TR-4471": "Issa K.",
  "TR-4472": "Awa S.",
  "TR-4473": "Boureima T.",
  "TR-4474": "Fatimata O.",
};

/**
 * Public, trimmed-down view of a trip for the ticket tracker — deliberately
 * excludes currentSpeed, delayMinutes, and registrationCode, which are
 * operational/dispatch-only details, not something a passenger's family
 * needs (or should be able to look up from a ticket code alone).
 */
export function lookupPublicTrip(rawCode: string): PublicTrip | null {
  const code = rawCode.trim().toUpperCase();
  const trip = activeTrips.find((t) => t.tripId === code);
  if (!trip) return null;

  const lastStop = trip.stops[trip.stops.length - 1];

  return {
    ticketCode: trip.tripId,
    routeCode: trip.routeCode,
    driverName: DRIVER_DIRECTORY[trip.tripId] ?? "Chauffeur TRAME",
    statusLabel: tripStatusLabel(trip.overallStatus),
    etaWindow: `${lastStop.scheduledTime} – ${lastStop.estimatedTime}`,
    gpsProgress: trip.gpsProgress,
    stops: trip.stops,
  };
}
