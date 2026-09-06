"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { adminLogoutAction } from "@/lib/actions/admin-auth-actions";

const navItems = [
  { href: "/admin/dispatch", label: "Dispatching Live", live: true },
  { href: "/admin/finance", label: "Finance", live: true },
  { href: "/admin/gares", label: "Planification Gares", live: false },
  { href: "/admin/personnel", label: "Chauffeurs & Personnel", live: false },
  { href: "/admin/securite", label: "Sécurité Réseau", live: false },
];

export default function AuthenticatedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-obsidian">
      <aside className="flex w-64 shrink-0 flex-col border-r border-graphite-line bg-graphite">
        <div className="px-5 py-6">
          <span className="font-display text-lg font-bold uppercase tracking-wide text-titanium">
            Trame Panel
          </span>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {navItems.map((item) => {
            const active = pathname === item.href;

            if (!item.live) {
              return (
                <span
                  key={item.href}
                  className="flex items-center justify-between rounded-xl border border-transparent px-3 py-2.5 font-data text-xs uppercase tracking-wide text-titanium-dim/50"
                >
                  {item.label}
                  <span className="rounded-full border border-graphite-line px-1.5 py-0.5 font-data text-[9px] normal-case tracking-normal text-titanium-dim">
                    Bientôt
                  </span>
                </span>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl border px-3 py-2.5 font-data text-xs uppercase tracking-wide transition-colors ${
                  active
                    ? "border-teal/20 bg-teal-dim/20 text-teal"
                    : "border-transparent text-titanium-dim hover:bg-graphite-light"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-graphite-line p-4">
          <div className="flex items-center justify-between rounded-xl border border-graphite-line bg-graphite-light px-3 py-2.5">
            <div>
              <div className="font-data text-[10px] uppercase tracking-wider text-titanium-dim">
                Agent
              </div>
              <div className="font-data text-xs text-titanium">TRM-0231</div>
            </div>
            <form action={adminLogoutAction}>
              <button
                type="submit"
                aria-label="Se déconnecter"
                className="text-titanium-dim transition-colors hover:text-amber"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </aside>

      <div className="h-full flex-1 overflow-y-auto bg-obsidian">{children}</div>
    </div>
  );
}
