import type { Metadata } from "next";
import Link from "next/link";
import { buildLocalizedPath, toLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Services — TRAME",
  description:
    "Transport interurbain de passagers, fret express hub-to-hub, et affrètement VIP privé.",
};

const services = [
  {
    title: "Transport interurbain de passagers",
    description:
      "Coachs premium Volvo et Marcopolo, check-in 100% numérique, plan de sièges dynamique en direct et billet mobile avec QR code. La colonne vertébrale du réseau TRAME.",
    cta: { href: "/book", label: "Choisir un siège" },
  },
  {
    title: "Fret express hub-to-hub",
    description:
      "Vos colis voyagent sur les mêmes liaisons que nos passagers, d’agence à agence, avec lettre de voiture numérique et suivi en temps réel jusqu’à la livraison.",
    cta: { href: "/fret", label: "Envoyer un colis" },
  },
  {
    title: "Affrètement VIP privé",
    description:
      "Location de coach complet pour groupes, entreprises et événements — cabine privée, itinéraire sur mesure, chauffeur dédié. Sur devis, selon la liaison et la durée.",
    cta: { href: "/contact", label: "Demander un devis" },
  },
];

export default async function ServicesPage({
  params,
}: PageProps<"/[locale]/services">) {
  const locale = toLocale((await params).locale);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-data text-xs text-teal">SERVICES</p>
      <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
        Trois services, une seule infrastructure.
      </h1>
      <p className="mt-5 max-w-xl text-titanium-dim">
        Voyageurs, colis, et affrètement privé — tout circule sur le même
        réseau de coachs premium.
      </p>

      <div className="mt-10 flex flex-col gap-4">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-2xl border border-graphite-line bg-graphite p-7"
          >
            <h2 className="font-display text-xl font-semibold">
              {service.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-titanium-dim">
              {service.description}
            </p>
            <Link
              href={buildLocalizedPath(service.cta.href, locale)}
              className="mt-5 inline-block font-data text-xs text-teal hover:opacity-80"
            >
              {service.cta.label} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
