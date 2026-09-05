export type FleetVehicle = {
  id: string;
  category: string;
  model?: string;
  modelYear: string;
  seats: number;
  imagePath: string;
  features: string[];
};

export const fleetData: FleetVehicle[] = [
  {
    id: "1",
    category: "Car de luxe",
    model: "Yutong T12",
    modelYear: "Modèle 2024",
    seats: 52,
    imagePath: "/images/fleet/luxury-coach.jpg",
    features: [
      "Climatisation",
      "Suivi GPS",
      "Sièges réclinables",
      "Port USB",
      "Wi-Fi",
      "Écran TV",
    ],
  },
  {
    id: "4",
    category: "Car de luxe",
    model: "Volvo 9600",
    modelYear: "Modèle 2024",
    seats: 55,
    imagePath: "/images/fleet/volvo-9600.jpg",
    features: [
      "Climatisation",
      "Suivi GPS",
      "Sièges réclinables",
      "Port USB",
      "Wi-Fi",
      "Écran TV",
    ],
  },
  {
    id: "5",
    category: "Car de luxe",
    model: "Marcopolo G8",
    modelYear: "Modèle 2024",
    seats: 50,
    imagePath: "/images/fleet/marcopolo-g8.jpg",
    features: [
      "Climatisation",
      "Suivi GPS",
      "Sièges réclinables",
      "Port USB",
      "Wi-Fi",
      "Écran TV",
    ],
  },
  {
    id: "2",
    category: "Minibus",
    modelYear: "Modèle 2023",
    seats: 19,
    imagePath: "/images/fleet/minibus-premium.jpg",
    features: [
      "Climatisation",
      "Suivi GPS",
      "Sièges réclinables",
      "Port USB",
      "Wi-Fi",
      "Écran TV",
    ],
  },
  {
    id: "3",
    category: "Minibus",
    modelYear: "Modèle 2023",
    seats: 19,
    imagePath: "/images/fleet/minibus-express.jpg",
    features: [
      "Climatisation",
      "Suivi GPS",
      "Sièges réclinables",
      "Port USB",
      "Wi-Fi",
      "Écran TV",
    ],
  },
];
