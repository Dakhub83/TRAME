import { notFound } from "next/navigation";
import { getTrip } from "@/lib/trips";
import { SeatMap } from "@/components/seat-map";

export default function BookPage() {
  const trip = getTrip("ouaga-bobo-0630");
  if (!trip) notFound();

  return (
    <div className="mx-auto max-w-md pb-12">
      <div className="px-5 pt-6 pb-2">
        <h1 className="font-display text-lg font-medium">Choisir un siège</h1>
        <p className="font-data text-xs text-teal">{trip.coachCode}</p>
      </div>
      <SeatMap trip={trip} />
    </div>
  );
}
