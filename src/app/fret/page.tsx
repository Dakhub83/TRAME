import type { Metadata } from "next";
import Link from "next/link";
import { freightTiers } from "@/lib/freight";

export const metadata: Metadata = {
  title: "Fret express — TRAME",
  description:
    "Vos colis voyagent sur les mêmes liaisons que nos passagers, avec lettre de voiture et suivi en temps réel.",
};

const lifecycle = [
  "Colis collecté en agence",
  "En transit, à bord d'un coach TRAME",
  "Arrivée au hub de destination",
  "Livraison au destinataire",
];

export default function FretPage() {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-6 pb-14 pt-16">
        <p className="font-data text-xs text-teal">FRET EXPRESS</p>
        <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          Vos colis, sur la même colonne vertébrale que nos passagers.
        </h1>
        <p className="mt-5 text-titanium-dim">
          Chaque coach TRAME transporte aussi du fret. Pas de flotte séparée,
          pas de délais additionnels — votre colis suit les mêmes liaisons
          premium, avec une lettre de voiture numérique et un suivi en temps
          réel jusqu&rsquo;à la livraison.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/track"
            className="rounded-xl bg-teal px-6 py-3.5 font-semibold text-obsidian"
          >
            Suivre un colis
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-graphite-line px-6 py-3.5 font-semibold text-titanium hover:border-titanium-dim transition-colors"
          >
            Envoyer un colis — nous contacter
          </Link>
        </div>
      </section>

      <section className="border-t border-graphite-line bg-graphite/40">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <h2 className="font-display text-xl font-semibold">
            Tarifs indicatifs
          </h2>
          <div className="mt-6 flex flex-col gap-3">
            {freightTiers.map((tier) => (
              <div
                key={tier.name}
                className="flex items-center justify-between rounded-xl border border-graphite-line bg-graphite px-5 py-4"
              >
                <div>
                  <div className="font-display text-base font-semibold">
                    {tier.name}
                  </div>
                  <div className="mt-0.5 font-data text-xs text-titanium-dim">
                    {tier.weightRange}
                  </div>
                </div>
                <div className="font-data text-sm text-teal">
                  {tier.indicativePrice}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-titanium-dim">
            Tarifs donnés à titre indicatif pour la liaison Ouaga–Bobo.
            Contactez une agence pour un devis précis selon votre trajet.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14">
        <h2 className="font-display text-xl font-semibold">
          Cycle de vie d&rsquo;un envoi
        </h2>
        <ol className="mt-6 flex flex-col gap-4">
          {lifecycle.map((step, i) => (
            <li key={step} className="flex items-center gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-teal font-data text-xs text-teal">
                {i + 1}
              </span>
              <span className="text-sm text-titanium">{step}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
