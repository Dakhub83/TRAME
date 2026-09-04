import type { Metadata } from "next";
import { getTrip, formatFcfa } from "@/lib/trips";
import { freightTiers } from "@/lib/freight";

export const metadata: Metadata = {
  title: "Tarifs — TRAME",
  description:
    "Grille de prix des sièges passagers et des tarifs de fret par palier de poids, en F CFA.",
};

export default function PricingPage() {
  const trip = getTrip("ouaga-bobo-0630")!;

  const seatTiers = [
    {
      name: "Standard",
      detail: "Sièges 2+1, climatisation, prise USB",
      price: trip.standardPrice,
    },
    {
      name: "VIP",
      detail: "Rangées avant, espace jambes renforcé, priorité embarquement",
      price: trip.vipPrice,
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-data text-xs text-teal">TARIFS</p>
      <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
        Une grille claire, en F CFA.
      </h1>
      <p className="mt-5 max-w-xl text-titanium-dim">
        Les tarifs ci-dessous sont donnés à titre de référence pour la
        liaison {trip.fromCity} – {trip.toCity}. Le prix exact dépend de la
        distance du corridor choisi.
      </p>

      <h2 className="mt-12 font-display text-xl font-semibold">
        Sièges passagers
      </h2>
      <div className="mt-2 overflow-x-auto rounded-2xl border border-graphite-line">
        <table className="w-full min-w-[420px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-graphite-line bg-graphite">
              <th className="px-5 py-3 font-data text-[11px] font-normal text-titanium-dim">
                CLASSE
              </th>
              <th className="px-5 py-3 font-data text-[11px] font-normal text-titanium-dim">
                DÉTAILS
              </th>
              <th className="px-5 py-3 text-right font-data text-[11px] font-normal text-titanium-dim">
                PRIX
              </th>
            </tr>
          </thead>
          <tbody>
            {seatTiers.map((tier) => (
              <tr key={tier.name} className="border-b border-graphite-line last:border-b-0">
                <td className="px-5 py-4 font-display font-semibold">
                  {tier.name}
                </td>
                <td className="px-5 py-4 text-titanium-dim">{tier.detail}</td>
                <td className="px-5 py-4 text-right font-data text-teal">
                  {formatFcfa(tier.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 font-display text-xl font-semibold">
        Colis &amp; fret
      </h2>
      <div className="mt-2 overflow-x-auto rounded-2xl border border-graphite-line">
        <table className="w-full min-w-[420px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-graphite-line bg-graphite">
              <th className="px-5 py-3 font-data text-[11px] font-normal text-titanium-dim">
                PALIER
              </th>
              <th className="px-5 py-3 font-data text-[11px] font-normal text-titanium-dim">
                POIDS
              </th>
              <th className="px-5 py-3 text-right font-data text-[11px] font-normal text-titanium-dim">
                PRIX
              </th>
            </tr>
          </thead>
          <tbody>
            {freightTiers.map((tier) => (
              <tr key={tier.name} className="border-b border-graphite-line last:border-b-0">
                <td className="px-5 py-4 font-display font-semibold">
                  {tier.name}
                </td>
                <td className="px-5 py-4 text-titanium-dim">
                  {tier.weightRange}
                </td>
                <td className="px-5 py-4 text-right font-data text-teal">
                  {tier.indicativePrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-xs text-titanium-dim">
        Tarifs indicatifs, hors promotions. Contactez une agence pour un
        devis précis selon votre trajet ou votre envoi.
      </p>
    </div>
  );
}
