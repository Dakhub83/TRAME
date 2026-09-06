export type RoutePerformance = {
  routeCode: string;
  axis: string;
  revenueFcfa: number;
  fuelTollExpenseFcfa: number;
  highlight?: boolean;
};

export type FleetTicketVolume = {
  vehicleName: string;
  ticketsSold: number;
  seatCapacity: number;
};

export type MonthlyRevenuePoint = {
  month: string;
  revenueFcfa: number;
};

// Matches src/lib/dispatch.ts's routeCode values for continuity.
export const routePerformance: RoutePerformance[] = [
  {
    routeCode: "OUAGA-BOBO-01",
    axis: "Ouagadougou ⟷ Bobo-Dioulasso",
    revenueFcfa: 18_400_000,
    fuelTollExpenseFcfa: 4_120_000,
    highlight: true,
  },
  {
    routeCode: "OUAGA-KDG-02",
    axis: "Ouagadougou ⟷ Koudougou",
    revenueFcfa: 6_150_000,
    fuelTollExpenseFcfa: 1_380_000,
  },
  {
    routeCode: "OUAGA-OHG-03",
    axis: "Ouagadougou ⟷ Ouahigouya",
    revenueFcfa: 9_820_000,
    fuelTollExpenseFcfa: 2_460_000,
  },
  {
    routeCode: "BOBO-OUAGA-04",
    axis: "Bobo-Dioulasso ⟷ Ouagadougou",
    revenueFcfa: 10_910_000,
    fuelTollExpenseFcfa: 2_640_000,
  },
];

// Matches the fleet vehicles used throughout dispatch/fleet — see
// src/lib/fleet.ts and src/lib/dispatch.ts.
export const fleetTicketVolume: FleetTicketVolume[] = [
  { vehicleName: "Yutong T12", ticketsSold: 2140, seatCapacity: 52 },
  { vehicleName: "Volvo 9600", ticketsSold: 1980, seatCapacity: 55 },
  { vehicleName: "Marcopolo G8", ticketsSold: 1725, seatCapacity: 50 },
  // "HiAce Express" is this finance module's illustrative express-shuttle
  // configuration — a 15-seat capacity, distinct from the 19-seat "Minibus"
  // entries in src/lib/fleet.ts's actual catalog.
  { vehicleName: "Toyota HiAce Express", ticketsSold: 1240, seatCapacity: 15 },
];

export const monthlyRevenue: MonthlyRevenuePoint[] = [
  { month: "Avr.", revenueFcfa: 32_100_000 },
  { month: "Mai", revenueFcfa: 35_600_000 },
  { month: "Juin", revenueFcfa: 33_950_000 },
  { month: "Juil.", revenueFcfa: 38_400_000 },
  { month: "Août", revenueFcfa: 41_200_000 },
  { month: "Sept.", revenueFcfa: 45_280_000 },
];

export const financeSummary = {
  totalRevenueFcfa: 45_280_000,
  revenueGrowthPercent: 14.2,
  totalTicketVolume: fleetTicketVolume.reduce((sum, v) => sum + v.ticketsSold, 0),
};

export function formatFcfa(amount: number): string {
  return `${amount.toLocaleString("fr-FR").replace(/,/g, " ")} FCFA`;
}

// Vehicle-class fill rates — average occupied seats per departure as a
// share of capacity. Stated directly rather than derived from ticket
// volume ÷ an assumed departure count, since that formula breaks down for
// a small-capacity class selling relatively many short-hop tickets (it can
// exceed 100%). Real fill rate needs actual departure counts per vehicle,
// which doesn't exist yet — these are illustrative.
export const intercityFillRate = 82.6; // 52+ seat coaches (Yutong/Volvo/Marcopolo)
export const hiaceFillRate = 68.9; // 15-seat HiAce Express
export const averageFillRate = 78.4;
