import Link from "next/link";
import { getTrip, formatFcfa } from "@/lib/trips";
import { buildLocalizedPath, toLocale } from "@/lib/i18n";
import { HeroCoach } from "@/components/hero-coach";
import { StoreBadges } from "@/components/store-badges";

const network = [
  { label: "RÉSEAU ACTIF", value: "14 LIAISONS" },
  { label: "PAIEMENT", value: "ORANGE · MOOV" },
  { label: "FLOTTE", value: "VOLVO / MARCOPOLO" },
];

const quickActions = [
  {
    title: "Réserver",
    description: "Choisissez votre siège sur un trajet interurbain.",
    href: "/book",
  },
  {
    title: "Services",
    description: "Passagers, colis express, affrètement VIP.",
    href: "/services",
  },
  {
    title: "Corridors",
    description: "Le réseau de liaisons actives et transfrontalières.",
    href: "/corridors",
  },
  {
    title: "Tarifs",
    description: "Grille de prix sièges et colis, en F CFA.",
    href: "/pricing",
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

export default async function Home({ params }: PageProps<"/[locale]">) {
  const locale = toLocale((await params).locale);
  const trip = getTrip("ouaga-bobo-0630")!;

  return (
    <div>
      <section className="relative overflow-hidden border-b border-graphite-line">
        <div className="absolute inset-0" aria-hidden="true">
          <HeroCoach className="absolute inset-x-0 bottom-0 h-[420px] w-full opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/85 to-obsidian/25" />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-transparent to-obsidian" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-24 sm:pt-32">
          <p className="font-data text-xs text-teal">RÉSEAU ACTIF · 14 LIAISONS</p>
          <h1 className="mt-4 font-display text-6xl font-bold tracking-tight text-white sm:text-7xl">
            TRAME
          </h1>
          <p className="mt-2 font-display text-lg text-titanium-dim">
            Logistique &amp; Transport Interurbain
          </p>
          <p className="mt-6 max-w-xl text-titanium-dim">
            Réservation de siège 100% numérique, billet mobile et suivi de fret
            en temps réel, sur la même colonne vertébrale de transport.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={buildLocalizedPath("/book", locale)}
              className="rounded-xl bg-teal px-6 py-3.5 font-semibold text-obsidian shadow-[0_0_24px_-6px_var(--color-teal)] transition-shadow hover:shadow-[0_0_32px_-4px_var(--color-teal)]"
            >
              Choisir un siège
            </Link>
            <Link
              href={buildLocalizedPath("/services", locale)}
              className="rounded-xl border border-graphite-line px-6 py-3.5 font-semibold text-titanium hover:border-titanium-dim transition-colors"
            >
              Découvrir nos services
            </Link>
          </div>

          <div className="mt-10">
            <p className="font-data text-[11px] uppercase tracking-widest text-titanium-dim">
              L&apos;app TRAME arrive bientôt
            </p>
            <StoreBadges className="mt-3" />
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
        </div>
      </section>

      <section className="border-t border-graphite-line bg-graphite/40">
        <div className="mx-auto grid max-w-5xl gap-5 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={buildLocalizedPath(action.href, locale)}
              className="rounded-2xl border border-graphite-line bg-graphite p-6 transition-colors hover:border-teal"
            >
              <h2 className="font-display text-base font-semibold">
                {action.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-titanium-dim">
                {action.description}
              </p>
              <span className="mt-4 inline-block font-data text-xs text-teal">
                →
              </span>
            </Link>
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

      <section className="border-t border-graphite-line bg-graphite/40">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <p className="font-display text-xl leading-relaxed text-titanium sm:text-2xl">
            &laquo; Le Burkina Faso mérite un réseau de transport aussi
            sérieux que ses voyageurs. TRAME est la grille logicielle que
            nous aurions voulu trouver au guichet. &raquo;
          </p>
          <p className="mt-5 font-data text-xs text-titanium-dim">
            FONDATEUR, TRAME
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
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
              href={buildLocalizedPath("/book", locale)}
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
