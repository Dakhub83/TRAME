import {
  routePerformance,
  fleetTicketVolume,
  monthlyRevenue,
  financeSummary,
  intercityFillRate,
  hiaceFillRate,
  averageFillRate,
  formatFcfa,
} from "@/lib/finance";
import { RevenueChart } from "@/components/finance/revenue-chart";

export function FinanceDashboard() {
  return (
    <div className="min-h-screen bg-obsidian px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <p className="font-data text-xs uppercase tracking-widest text-teal">Trame Ops</p>
        <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-titanium">
          Rapport financier &amp; comptabilité
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-graphite-line bg-graphite p-6 transition-colors hover:bg-graphite-light">
            <p className="font-data text-[10px] uppercase tracking-wider text-titanium-dim">
              Chiffre d&apos;affaires global
            </p>
            <p className="mt-2 font-data text-2xl font-bold text-titanium">
              {formatFcfa(financeSummary.totalRevenueFcfa)}
            </p>
            <span className="mt-3 inline-block rounded-full border border-teal-dim bg-teal-dim px-2.5 py-0.5 font-data text-[11px] text-teal">
              +{financeSummary.revenueGrowthPercent}%
            </span>
          </div>

          <div className="rounded-2xl border border-graphite-line bg-graphite p-6 transition-colors hover:bg-graphite-light">
            <p className="font-data text-[10px] uppercase tracking-wider text-titanium-dim">
              Volume de billets
            </p>
            <p className="mt-2 font-data text-2xl font-bold text-titanium">
              {financeSummary.totalTicketVolume.toLocaleString("fr-FR")}
            </p>
            <ul className="mt-3 space-y-1.5">
              {fleetTicketVolume.map((vehicle) => (
                <li
                  key={vehicle.vehicleName}
                  className="flex justify-between font-data text-[11px] text-titanium-dim"
                >
                  <span>{vehicle.vehicleName}</span>
                  <span className="text-titanium">{vehicle.ticketsSold.toLocaleString("fr-FR")}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-graphite-line bg-graphite p-6 transition-colors hover:bg-graphite-light">
            <p className="font-data text-[10px] uppercase tracking-wider text-titanium-dim">
              Taux de remplissage moyen
            </p>
            <p className="mt-2 font-data text-2xl font-bold text-titanium">{averageFillRate}%</p>
            <div className="mt-3 space-y-1.5 font-data text-[11px]">
              <div className="flex justify-between text-titanium-dim">
                <span>Coachs intercity (52+ places)</span>
                <span className="text-teal">{intercityFillRate}%</span>
              </div>
              <div className="flex justify-between text-titanium-dim">
                <span>HiAce Express (15 places)</span>
                <span className="text-amber">{hiaceFillRate}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="rounded-2xl border border-graphite-line bg-graphite p-6">
            <h2 className="font-display text-sm font-semibold text-titanium">
              Performance par axe routier
            </h2>

            <div className="mt-4 overflow-x-auto">
              <div className="min-w-[640px]">
                <div className="grid grid-cols-4 gap-4 border-b border-graphite-line px-3 pb-2 font-data text-[10px] uppercase tracking-wider text-titanium-dim">
                  <span>Axe routier</span>
                  <span>Revenus comptabilisés</span>
                  <span>Dépenses carburant/péage</span>
                  <span>Profit net</span>
                </div>

                <div className="mt-2 space-y-2">
                  {routePerformance.map((route) => {
                    const profitFcfa = route.revenueFcfa - route.fuelTollExpenseFcfa;
                    return (
                      <div
                        key={route.routeCode}
                        className={`grid grid-cols-4 items-center gap-4 rounded-xl border px-3 py-3 font-data text-xs ${
                          route.highlight
                            ? "border-teal bg-graphite-light shadow-[0_0_20px_var(--teal-glow)]"
                            : "border-transparent"
                        }`}
                      >
                        <span className="text-titanium">{route.axis}</span>
                        <span className="text-teal">{formatFcfa(route.revenueFcfa)}</span>
                        <span className="text-amber">{formatFcfa(route.fuelTollExpenseFcfa)}</span>
                        <span className="font-semibold text-titanium">{formatFcfa(profitFcfa)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-graphite-line bg-graphite p-6">
            <h2 className="font-display text-sm font-semibold text-titanium">
              Tendance des revenus (6 mois)
            </h2>
            <div className="mt-4">
              <RevenueChart data={monthlyRevenue} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
