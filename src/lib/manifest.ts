import { prisma } from "@/lib/prisma";

/**
 * Loads the full traveler manifest for every trip departing from a given
 * gate within a time window — e.g. everything boarding at Quai 3 in the
 * next hour, for the gate agent's clipboard/screen right before departure.
 *
 * Equivalent raw SQL, for reference (this is exactly what the Prisma query
 * below compiles down to):
 *
 * ```sql
 * SELECT
 *   t.trip_id,
 *   t.route_code,
 *   t.vehicle_id,
 *   t.departure_timestamp,
 *   t.departure_gate,
 *   t.trip_status,
 *   b.booking_id,
 *   b.ticket_code,
 *   b.assigned_seat_number,
 *   b.luggage_weight_kg,
 *   b.boarding_status,
 *   p.passenger_id,
 *   p.full_name,
 *   p.phone_number,
 *   p.identity_document_ref
 * FROM trips t
 * JOIN manifest_bookings b ON b.trip_id = t.trip_id
 * JOIN passengers p ON p.passenger_id = b.passenger_id
 * WHERE t.departure_gate = $1
 *   AND t.departure_timestamp BETWEEN $2 AND $3
 * ORDER BY t.departure_timestamp ASC, b.assigned_seat_number ASC;
 * ```
 */
export async function getManifestForGate(
  gate: string,
  windowStart: Date,
  windowEnd: Date
) {
  return prisma.trip.findMany({
    where: {
      departureGate: gate,
      departureTimestamp: { gte: windowStart, lte: windowEnd },
    },
    include: {
      bookings: {
        include: { passenger: true },
        orderBy: { assignedSeatNumber: "asc" },
      },
    },
    orderBy: { departureTimestamp: "asc" },
  });
}

/**
 * Same idea, scoped to one specific trip rather than a gate + time window —
 * what a boarding screen for a single departure would load.
 */
export async function getManifestForTrip(tripId: string) {
  return prisma.trip.findUnique({
    where: { id: tripId },
    include: {
      bookings: {
        include: { passenger: true },
        orderBy: { assignedSeatNumber: "asc" },
      },
    },
  });
}

/**
 * Flips one booking to CHECKED_IN or BOARDED as a passenger passes the gate.
 * Kept separate from the read queries above since it's a write, not a
 * manifest load.
 */
export async function updateBoardingStatus(
  bookingId: string,
  boardingStatus: "RESERVED" | "CHECKED_IN" | "BOARDED" | "NO_SHOW"
) {
  return prisma.manifestBooking.update({
    where: { id: bookingId },
    data: { boardingStatus },
  });
}
