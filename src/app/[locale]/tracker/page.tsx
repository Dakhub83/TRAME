import type { Metadata } from "next";
import { TicketTracker } from "@/components/ticket-tracker";

export const metadata: Metadata = {
  title: "Suivre un trajet — TRAME",
  description: "Suivez la position en temps réel de votre véhicule avec votre code de ticket.",
};

export default function TrackerPage() {
  return <TicketTracker />;
}
