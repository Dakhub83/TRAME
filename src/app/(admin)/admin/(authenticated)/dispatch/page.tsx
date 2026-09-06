import type { Metadata } from "next";
import { CentralDispatchDashboard } from "@/components/dispatch/central-dispatch-dashboard";

export const metadata: Metadata = {
  title: "Dispatching — TRAME",
  description: "Suivi en temps réel des trajets actifs du réseau TRAME.",
};

export default function AdminDispatchPage() {
  return <CentralDispatchDashboard />;
}
