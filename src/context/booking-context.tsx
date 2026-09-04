"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import type { Booking, PaymentMethod, Seat, Trip } from "@/lib/types";
import * as bookingStore from "@/lib/booking-store";

type BookingContextValue = {
  booking: Booking | null;
  confirmBooking: (trip: Trip, seat: Seat) => Booking;
  setPaymentMethod: (method: PaymentMethod) => void;
  clearBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const booking = useSyncExternalStore(
    bookingStore.subscribe,
    bookingStore.getSnapshot,
    bookingStore.getServerSnapshot
  );

  const value = useMemo(
    () => ({
      booking,
      confirmBooking: bookingStore.confirmBooking,
      setPaymentMethod: bookingStore.setPaymentMethod,
      clearBooking: bookingStore.clearBooking,
    }),
    [booking]
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
