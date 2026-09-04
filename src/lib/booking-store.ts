import type { Booking, PaymentMethod, Seat, Trip } from "./types";
import { generatePnr } from "./trips";

const STORAGE_KEY = "trame.booking";

type Listener = () => void;

let current: Booking | null = null;
let loaded = false;
const listeners = new Set<Listener>();

function load(): Booking | null {
  if (loaded) return current;
  loaded = true;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) current = JSON.parse(raw) as Booking;
  } catch {
    // sessionStorage unavailable — booking simply won't persist across reloads
  }
  return current;
}

function persist() {
  try {
    if (current) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore persistence failures
  }
}

function emit() {
  for (const listener of listeners) listener();
}

export function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): Booking | null {
  return load();
}

export function getServerSnapshot(): Booking | null {
  return null;
}

export function confirmBooking(trip: Trip, seat: Seat): Booking {
  current = {
    trip,
    seat,
    pnr: generatePnr(),
    paymentMethod: "orange",
    createdAt: Date.now(),
  };
  loaded = true;
  persist();
  emit();
  return current;
}

export function setPaymentMethod(method: PaymentMethod) {
  if (!current) return;
  current = { ...current, paymentMethod: method };
  persist();
  emit();
}

export function clearBooking() {
  current = null;
  loaded = true;
  persist();
  emit();
}
