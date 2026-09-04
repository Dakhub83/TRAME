import Link from "next/link";
import { getTrip, formatFcfa } from "@/lib/trips";

const network = [
  { label: "RÉSEAU ACTIF", value: "14 LIAISONS" },
  { label: "PAIEMENT", value: "ORANGE · MOOV" },
  { label: "FLOTTE", value: "VOLVO / MARCOPOLO" },
];

const verticals = [
  {
    title: "Transport interurbain",
    description:
      "Coachs premium Volvo & Marcopolo, check-in 100% numérique, plan de sièges dynamique et billet mobile.",
    cta: { href: "/book", label: "Choisir un siège" },
  },
  {
    title: "Fret express",
    description:
      "Vos colis voyagent sur les mêmes liaisons que nos passagers, avec lettre de voiture et suivi en temps réel.",
    cta: { href: "/fret", label: "Envoyer un colis" },
  },
];

const steps = [
  {
    number: "01",
    title: "Choisissez votre trajet",
    detail: "Sélectionnez une liaison, une date et une heure de départ.",
  },
  {
    number: "02",
    title: "Sélectionnez votre siège",
    detail: "Plan de bus en direct — sièges libres, VIP et occupés à jour.",
  },
  {
    number: "03",
    title: "Recevez votre billet",
    detail: "QR code et code PNR ajoutés instantanément à votre portefeuille.",
  },
];

export default function Home() {
  const trip = getTrip("ouaga-bobo-0630")!;

  return (
    <div>
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-20">
        <p className="font-data text-xs text-teal">RÉSEAU ACTIF · 14 LIAISONS</p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
          Le réseau, réinventé — voyageurs &amp; colis, une seule
          infrastructure.
        </h1>
        <p className="mt-5 max-w-xl text-titanium-dim">
          Réservation de siège 100% numérique, billet mobile et suivi de fret
          en temps réel, sur la même colonne vertébrale de transport.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/book"
            className="rounded-xl bg-teal px-6 py-3.5 font-semibold text-obsidian"
          >
            Choisir un siège
          </Link>
          <Link
            href="/fret"
            className="rounded-xl border border-graphite-line px-6 py-3.5 font-semibold text-titanium hover:border-titanium-dim transition-colors"
          >
            Envoyer un colis
          </Link>
        </div>

        <dl className="mt-14 grid grid-cols-1 gap-6 border-t border-graphite-line pt-8 sm:grid-cols-3">
          {network.map((item) => (
            <div key={item.label}>
              <dt className="font-data text-[11px] text-titanium-dim">
                {item.label}
              </dt>
              <dd className="mt-1 font-data text-sm text-teal">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t border-graphite-line bg-graphite/40">
        <div className="mx-auto grid max-w-5xl gap-6 px-6 py-16 sm:grid-cols-2">
          {verticals.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-graphite-line bg-graphite p-7"
            >
              <h2 className="font-display text-xl font-semibold">{v.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-titanium-dim">
                {v.description}
              </p>
              <Link
                href={v.cta.href}
                className="mt-5 inline-block font-data text-xs text-teal hover:opacity-80"
              >
                {v.cta.label} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-display text-2xl font-semibold">
          Comment ça marche
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number}>
              <div className="font-data text-sm text-teal">{step.number}</div>
              <h3 className="mt-2 font-display text-base font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-titanium-dim">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="rounded-2xl border border-graphite-line bg-graphite p-6">
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-semibold">
              {trip.fromCity} → {trip.toCity}
            </span>
            <span className="font-data text-xs text-titanium-dim">
              {trip.duration} · {trip.direct ? "DIRECT" : "AVEC ARRÊT"}
            </span>
          </div>
          <div className="mt-2 font-data text-xs text-titanium-dim">
            Départ {trip.departure} · {trip.date} · {trip.coachModel}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div>
              <div className="font-data text-[10px] text-titanium-dim">
                À PARTIR DE
              </div>
              <div className="font-display text-lg font-semibold">
                {formatFcfa(trip.standardPrice)}
              </div>
            </div>
            <Link
              href="/book"
              className="rounded-xl bg-teal px-6 py-3.5 font-semibold text-obsidian"
            >
              Choisir un siège
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
