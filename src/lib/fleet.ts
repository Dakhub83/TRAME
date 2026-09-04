export type FleetVehicle = {
  id: string;
  category: string;
  modelYear: string;
  seats: number;
  imagePath: string;
  features: string[];
};

export const fleetData: FleetVehicle[] = [
  {
    id: "1",
    category: "Car de luxe",
    modelYear: "Modèle 2024",
    seats: 52,
    imagePath: "/images/fleet/luxury-coach.jpg",
    features: ["Climatisation", "Suivi GPS", "Sièges réclinables", "Port USB"],
  },
  {
    id: "2",
    category: "Minibus",
    modelYear: "Modèle 2023",
    seats: 19,
    imagePath: "/images/fleet/minibus-premium.jpg",
    features: ["Climatisation", "Suivi GPS", "Sièges réclinables", "Port USB"],
  },
  {
    id: "3",
    category: "Minibus",
    modelYear: "Modèle 2023",
    seats: 19,
    imagePath: "/images/fleet/minibus-express.jpg",
    features: ["Climatisation", "Suivi GPS", "Sièges réclinables", "Port USB"],
  },
];
