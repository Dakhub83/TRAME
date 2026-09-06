export type StopStatus = "PARTI" | "ARRIVÉ" | "EN_APPROCHE" | "EN_ATTENTE";

export type ScheduledStop = {
  stopName: string;
  scheduledTime: string;
  estimatedTime: string;
  status: StopStatus;
};

export type TripStatus = "ON_TIME" | "DELAYED" | "BOARDING" | "COMPLETED";

export type ActiveTrip = {
  tripId: string;
  vehicleName: string;
  registrationCode: string;
  routeCode: string;
  currentSpeed: number;
  delayMinutes: number;
  overallStatus: TripStatus;
  gpsProgress: number;
  stops: ScheduledStop[];
};

export const activeTrips: ActiveTrip[] = [
  {
    tripId: "TR-4471",
    vehicleName: "Yutong T12",
    registrationCode: "11 BF 4471",
    routeCode: "OUAGA-BOBO-01",
    currentSpeed: 84,
    delayMinutes: 0,
    overallStatus: "ON_TIME",
    gpsProgress: 72,
    stops: [
      { stopName: "Ouagadougou — Gare TRAME", scheduledTime: "06:30", estimatedTime: "06:30", status: "PARTI" },
      { stopName: "Koudougou", scheduledTime: "08:05", estimatedTime: "08:05", status: "PARTI" },
      { stopName: "Boromo", scheduledTime: "09:20", estimatedTime: "09:20", status: "PARTI" },
      { stopName: "Houndé", scheduledTime: "10:15", estimatedTime: "10:17", status: "EN_APPROCHE" },
      { stopName: "Bobo-Dioulasso — Terminus Sud", scheduledTime: "11:10", estimatedTime: "11:15", status: "EN_ATTENTE" },
    ],
  },
  {
    tripId: "TR-4472",
    vehicleName: "Toyota HiAce",
    registrationCode: "11 BF 4472",
    routeCode: "OUAGA-KDG-02",
    currentSpeed: 0,
    delayMinutes: 6,
    overallStatus: "BOARDING",
    gpsProgress: 4,
    stops: [
      { stopName: "Ouagadougou — Gare TRAME", scheduledTime: "07:00", estimatedTime: "07:06", status: "ARRIVÉ" },
      { stopName: "Sabou", scheduledTime: "07:45", estimatedTime: "07:51", status: "EN_ATTENTE" },
      { stopName: "Koudougou — Terminus", scheduledTime: "08:30", estimatedTime: "08:36", status: "EN_ATTENTE" },
    ],
  },
  {
    tripId: "TR-4473",
    vehicleName: "Volvo 9600",
    registrationCode: "11 BF 4473",
    routeCode: "OUAGA-OHG-03",
    currentSpeed: 76,
    delayMinutes: 12,
    overallStatus: "DELAYED",
    gpsProgress: 45,
    stops: [
      { stopName: "Ouagadougou — Gare TRAME", scheduledTime: "06:45", estimatedTime: "06:45", status: "PARTI" },
      { stopName: "Yako", scheduledTime: "08:10", estimatedTime: "08:22", status: "EN_APPROCHE" },
      { stopName: "Ouahigouya — Terminus Nord", scheduledTime: "09:20", estimatedTime: "09:32", status: "EN_ATTENTE" },
    ],
  },
  {
    tripId: "TR-4474",
    vehicleName: "Marcopolo G8",
    registrationCode: "11 BF 4474",
    routeCode: "BOBO-OUAGA-04",
    currentSpeed: 91,
    delayMinutes: 0,
    overallStatus: "ON_TIME",
    gpsProgress: 48,
    stops: [
      { stopName: "Bobo-Dioulasso — Gare Centrale", scheduledTime: "13:00", estimatedTime: "13:00", status: "PARTI" },
      { stopName: "Houndé", scheduledTime: "13:55", estimatedTime: "13:55", status: "PARTI" },
      { stopName: "Boromo", scheduledTime: "14:50", estimatedTime: "14:50", status: "EN_APPROCHE" },
      { stopName: "Koudougou", scheduledTime: "16:05", estimatedTime: "16:05", status: "EN_ATTENTE" },
      { stopName: "Ouagadougou — Gare TRAME", scheduledTime: "17:40", estimatedTime: "17:40", status: "EN_ATTENTE" },
    ],
  },
];

export function tripStatusLabel(status: TripStatus): string {
  switch (status) {
    case "ON_TIME":
      return "À l'heure";
    case "DELAYED":
      return "Retard";
    case "BOARDING":
      return "Embarquement";
    case "COMPLETED":
      return "Terminé";
  }
}

export function stopStatusLabel(status: StopStatus): string {
  switch (status) {
    case "PARTI":
      return "Parti";
    case "ARRIVÉ":
      return "À quai";
    case "EN_APPROCHE":
      return "Approche";
    case "EN_ATTENTE":
      return "À venir";
  }
}

function minutesSinceMidnight(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function stopDelayMinutes(stop: ScheduledStop): number {
  return minutesSinceMidnight(stop.estimatedTime) - minutesSinceMidnight(stop.scheduledTime);
}
