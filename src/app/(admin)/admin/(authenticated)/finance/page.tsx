import type { Metadata } from "next";
import { FinanceDashboard } from "@/components/finance/finance-dashboard";

export const metadata: Metadata = {
  title: "Finance — TRAME",
  description: "Rapport financier et comptabilité du réseau TRAME.",
};

/**
 * Protected today by the shared admin-passcode gate in src/proxy.ts / src/
 * lib/admin-auth.ts, which covers everything under /admin/*. That gate has
 * no per-account identity, so it cannot distinguish an ADMIN from a
 * DISPATCHER — there's no `role` to check yet at this layer. A real
 * `role === "ADMIN"` check (using the User.role added for password auth)
 * needs the admin area to move to per-account login first; faking that
 * check here against data the session doesn't have would be misleading
 * rather than actually secure.
 */
export default function FinancePage() {
  return <FinanceDashboard />;
}
