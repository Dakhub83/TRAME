export type TrackStepState = "done" | "current" | "pending";

export type TrackStep = {
  state: TrackStepState;
  label: string;
  time: string;
  detail: string;
  coachChip?: string;
};

export type Waybill = {
  id: string;
  route: string;
  weight: string;
  steps: TrackStep[];
};

export type FreightTier = {
  name: string;
  weightRange: string;
  indicativePrice: string;
};

export const freightTiers: FreightTier[] = [
  { name: "Léger", weightRange: "Jusqu'à 2 kg", indicativePrice: "À partir de 2 000 F" },
  { name: "Standard", weightRange: "2 à 10 kg", indicativePrice: "À partir de 5 000 F" },
  { name: "Volumineux", weightRange: "10 kg et plus", indicativePrice: "Sur devis" },
];

export const waybill: Waybill = {
  id: "WB-8827-OGB",
  route: "Ouaga → Bobo",
  weight: "2.4 kg · Standard",
  steps: [
    {
      state: "done",
      label: "Colis collecté",
      time: "12 SEPT. — 07:12",
      detail: "Agence TRAME, Zone 1, Ouagadougou",
    },
    {
      state: "current",
      label: "En transit",
      time: "12 SEPT. — 09:47",
      detail: "À bord du véhicule reliant Ouaga → Bobo",
      coachChip: "COACH VIP-42 · MÊME LIAISON PASSAGERS",
    },
    {
      state: "pending",
      label: "Arrivée au hub",
      time: "ESTIMÉ — 13:50",
      detail: "Terminus Sud, Bobo-Dioulasso",
    },
    {
      state: "pending",
      label: "Livraison",
      time: "ESTIMÉ — 15:30",
      detail: "Remise au destinataire",
    },
  ],
};
