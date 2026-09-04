import type { Seat, Trip } from "./types";

const VIP_ROWS = 2;
const STANDARD_ROWS = 11;
const LAST_ROW_COLUMNS: Seat["column"][] = ["A", "B"];
const FULL_ROW_COLUMNS: Seat["column"][] = ["A", "B", "D"];

const TAKEN_SEAT_IDS = new Set([
  "1D",
  "2B",
  "3D",
  "4A",
  "6B",
  "5D",
  "7A",
  "9B",
  "11D",
  "13A",
]);

function buildSeats(): Seat[] {
  const seats: Seat[] = [];
  const totalRows = VIP_ROWS + STANDARD_ROWS + 1;

  for (let row = 1; row <= totalRows; row++) {
    const isLastRow = row === totalRows;
    const columns = isLastRow ? LAST_ROW_COLUMNS : FULL_ROW_COLUMNS;
    const vip = row <= VIP_ROWS;

    for (const column of columns) {
      const id = `${row}${column}`;
      seats.push({
        id,
        row,
        column,
        vip,
        status: TAKEN_SEAT_IDS.has(id) ? "taken" : "available",
      });
    }
  }

  return seats;
}

export const trips: Trip[] = [
  {
    id: "ouaga-bobo-0630",
    fromCity: "OUAGA",
    fromDetail: "Gare TRAME · Zone 1",
    toCity: "BOBO",
    toDetail: "Terminus Sud",
    date: "12 SEPT.",
    departure: "06:30",
    duration: "4H10",
    direct: true,
    coachModel: "Volvo 9800",
    coachCode: "VIP-42",
    seatCount: 41,
    vipPrice: 18500,
    standardPrice: 12000,
    seats: buildSeats(),
  },
];

export function getTrip(id: string): Trip | undefined {
  return trips.find((trip) => trip.id === id);
}

export function formatFcfa(amount: number): string {
  return `${amount.toLocaleString("fr-FR").replace(/,/g, " ")} F`;
}

export function generatePnr(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `TR-${code}`;
}
