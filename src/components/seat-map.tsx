"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Seat, Trip } from "@/lib/types";
import { formatFcfa } from "@/lib/trips";
import { useBooking } from "@/context/booking-context";

function seatClasses(seat: Seat, isSelected: boolean) {
  const base =
    "flex h-9 w-10 items-center justify-center rounded-t-lg rounded-b-sm border font-data text-[11px] transition-colors";

  if (seat.status === "taken") {
    return `${base} cursor-not-allowed border-graphite-line bg-graphite-light text-graphite-line line-through decoration-graphite-line`;
  }
  if (isSelected) {
    return `${base} cursor-pointer border-teal bg-teal-dim text-teal shadow-[0_0_0_3px_var(--teal-glow)]`;
  }
  if (seat.vip) {
    return `${base} cursor-pointer border-[#4a4530] text-amber hover:border-amber`;
  }
  return `${base} cursor-pointer border-graphite-line text-titanium-dim hover:border-titanium-dim hover:text-titanium`;
}

export function SeatMap({ trip }: { trip: Trip }) {
  const router = useRouter();
  const { confirmBooking } = useBooking();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const rows = useMemo(() => {
    const byRow = new Map<number, Seat[]>();
    for (const seat of trip.seats) {
      const list = byRow.get(seat.row) ?? [];
      list.push(seat);
      byRow.set(seat.row, list);
    }
    return [...byRow.entries()].sort((a, b) => a[0] - b[0]);
  }, [trip.seats]);

  const selectedSeat = trip.seats.find((s) => s.id === selectedId) ?? null;
  const price = selectedSeat
    ? selectedSeat.vip
      ? trip.vipPrice
      : trip.standardPrice
    : null;

  function toggleSeat(seat: Seat) {
    if (seat.status === "taken") return;
    setSelectedId((current) => (current === seat.id ? null : seat.id));
  }

  function handleContinue() {
    if (!selectedSeat) return;
    setSubmitting(true);
    confirmBooking(trip, selectedSeat);
    router.push("/ticket");
  }

  return (
    <div className="flex flex-col">
      <div className="mx-5 mt-1 flex items-center justify-between rounded-2xl border border-graphite-line bg-graphite px-4 py-3.5">
        <span className="font-display text-base font-semibold">
          {trip.fromCity}
        </span>
        <div className="flex flex-1 flex-col items-center px-3">
          <div className="relative my-1.5 h-px w-full bg-graphite-line before:absolute before:-left-0.5 before:-top-[3px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-teal after:absolute after:-right-0.5 after:-top-[3px] after:h-[5px] after:w-[5px] after:rounded-full after:bg-teal" />
          <span className="font-data text-[10px] text-titanium-dim">
            {trip.duration} · {trip.direct ? "DIRECT" : "AVEC ARRÊT"}
          </span>
        </div>
        <span className="font-display text-base font-semibold">{trip.toCity}</span>
      </div>

      <div className="mx-5 mb-1 mt-3.5 flex justify-between font-data text-[11px] text-titanium-dim">
        <span>Départ {trip.departure} · {trip.date}</span>
        <span>
          {trip.coachModel} · {trip.seatCount} places
        </span>
      </div>

      <div className="relative mx-5 mt-1.5 rounded-t-[22px] rounded-b-2xl border border-graphite-line bg-graphite px-5 pb-5 pt-4.5">
        <div className="mb-3.5 flex justify-end">
          <span className="rounded-md border border-graphite-line px-2 py-1 font-data text-[9px] text-titanium-dim">
            CABINE
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {rows.map(([row, seats]) => {
            const left = seats.filter((s) => s.column !== "D");
            const right = seats.filter((s) => s.column === "D");
            return (
              <div key={row} className="grid grid-cols-[2.5rem_2.5rem_1.5rem_2.5rem] items-center gap-2.5">
                {left.map((seat) => (
                  <button
                    key={seat.id}
                    type="button"
                    disabled={seat.status === "taken"}
                    onClick={() => toggleSeat(seat)}
                    aria-pressed={seat.id === selectedId}
                    className={seatClasses(seat, seat.id === selectedId)}
                  >
                    {seat.id}
                  </button>
                ))}
                {left.length < 2 && <div />}
                <div />
                {right.map((seat) => (
                  <button
                    key={seat.id}
                    type="button"
                    disabled={seat.status === "taken"}
                    onClick={() => toggleSeat(seat)}
                    aria-pressed={seat.id === selectedId}
                    className={seatClasses(seat, seat.id === selectedId)}
                  >
                    {seat.id}
                  </button>
                ))}
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-4 font-data text-[10px] text-titanium-dim">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm border border-graphite-line bg-graphite-light" />
            Libre
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm border border-teal bg-teal-dim" />
            Sélectionné
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-graphite-light" />
            Occupé
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#4a4530]" />
            VIP
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-graphite-line px-5 py-5">
        <div>
          <div className="font-data text-[10px] text-titanium-dim">
            {selectedSeat
              ? `SIÈGE ${selectedSeat.id} · ${selectedSeat.vip ? "VIP" : "STANDARD"}`
              : "AUCUN SIÈGE SÉLECTIONNÉ"}
          </div>
          <div className="font-display text-xl font-semibold">
            {price !== null ? formatFcfa(price) : "—"}
          </div>
        </div>
        <button
          type="button"
          disabled={!selectedSeat || submitting}
          onClick={handleContinue}
          className="rounded-xl bg-teal px-6 py-3.5 font-semibold text-obsidian transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continuer
        </button>
      </div>
    </div>
  );
}
