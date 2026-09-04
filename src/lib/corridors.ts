export type CorridorStatus = "active" | "upcoming";

export type Corridor = {
  id: string;
  fromCity: string;
  toCity: string;
  international: boolean;
  durationHours: number;
  frequency: string;
  status: CorridorStatus;
};

export const corridors: Corridor[] = [
  {
    id: "ouaga-bobo",
    fromCity: "Ouagadougou",
    toCity: "Bobo-Dioulasso",
    international: false,
    durationHours: 4.17,
    frequency: "4 départs / jour",
    status: "active",
  },
  {
    id: "ouaga-koudougou",
    fromCity: "Ouagadougou",
    toCity: "Koudougou",
    international: false,
    durationHours: 1.5,
    frequency: "6 départs / jour",
    status: "active",
  },
  {
    id: "bobo-koudougou",
    fromCity: "Bobo-Dioulasso",
    toCity: "Koudougou",
    international: false,
    durationHours: 3,
    frequency: "2 départs / jour",
    status: "active",
  },
  {
    id: "ouaga-bamako",
    fromCity: "Ouagadougou",
    toCity: "Bamako (Mali)",
    international: true,
    durationHours: 12,
    frequency: "3 départs / semaine",
    status: "active",
  },
  {
    id: "ouaga-abidjan",
    fromCity: "Ouagadougou",
    toCity: "Abidjan (Côte d'Ivoire)",
    international: true,
    durationHours: 18,
    frequency: "2 départs / semaine",
    status: "upcoming",
  },
];

export function formatDuration(hours: number): string {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  return minutes > 0 ? `${wholeHours}H${String(minutes).padStart(2, "0")}` : `${wholeHours}H`;
}
