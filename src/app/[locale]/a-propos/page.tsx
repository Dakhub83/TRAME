import type { Metadata } from "next";
import { HubImage } from "@/components/hub-image";

export const metadata: Metadata = {
  title: "À propos — TRAME",
  description:
    "TRAME est une grille logicielle de mobilité pour le Burkina Faso — pas une flotte avec une application greffée dessus.",
};

const comparisons = [
  {
    old: "Guichet manuel, billet papier",
    new: "Réservation numérique, billet mobile avec QR code",
  },
  {
    old: "Manifeste papier, sièges non garantis",
    new: "Plan de sièges en temps réel, place garantie",
  },
  {
    old: "Fret et transport gérés séparément",
    new: "Une seule infrastructure pour voyageurs et colis",
  },
];

const values = [
  {
    title: "Fiabilité",
    detail:
      "Chaque siège réservé est un siège garanti. Chaque colis expédié est traçable de bout en bout.",
  },
  {
    title: "Transparence",
    detail:
      "Prix affichés, statut de siège en direct, étapes de livraison visibles à chaque instant.",
  },
  {
    title: "Ancrage local",
    detail:
      "Conçu pour le Burkina Faso — paiement Orange Money et Moov Money, liaisons pensées pour le réseau routier local.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-data text-xs text-teal">À PROPOS</p>
      <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
        Une grille logicielle de mobilité, pas une flotte avec une
        application greffée dessus.
      </h1>
      <p className="mt-5 text-titanium-dim">
        TRAME connecte le transport de voyageurs et le fret express sur une
        seule et même infrastructure. Nos coachs premium Volvo et Marcopolo
        relient les grandes villes du Burkina Faso, et chaque trajet double
        aussi comme colonne vertébrale pour l&rsquo;acheminement de colis.
      </p>

      <HubImage />
      <p className="mt-3 font-data text-xs text-titanium-dim">
        Hub TRAME — quais de départ, Ouagadougou.
      </p>

      <h2 className="mt-14 font-display text-xl font-semibold">
        Ce que nous changeons
      </h2>
      <div className="mt-6 flex flex-col gap-3">
        {comparisons.map((row) => (
          <div
            key={row.new}
            className="grid grid-cols-1 gap-2 rounded-xl border border-graphite-line bg-graphite p-5 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4"
          >
            <span className="text-sm text-titanium-dim line-through decoration-graphite-line">
              {row.old}
            </span>
            <span className="hidden font-data text-teal sm:block">→</span>
            <span className="text-sm text-titanium">{row.new}</span>
          </div>
        ))}
      </div>

      <h2 className="mt-14 font-display text-xl font-semibold">
        Nos valeurs
      </h2>
      <div className="mt-6 grid gap-8 sm:grid-cols-3">
        {values.map((value) => (
          <div key={value.title}>
            <h3 className="font-display text-base font-semibold text-teal">
              {value.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-titanium-dim">
              {value.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
