import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact — TRAME",
  description: "Contactez une agence TRAME à Ouagadougou ou Bobo-Dioulasso.",
};

const agencies = [
  {
    city: "Ouagadougou",
    detail: "Gare TRAME · Zone 1",
  },
  {
    city: "Bobo-Dioulasso",
    detail: "Terminus Sud",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-data text-xs text-teal">CONTACT</p>
      <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
        Une question, un colis, un partenariat.
      </h1>
      <p className="mt-5 max-w-xl text-titanium-dim">
        Écrivez-nous ou passez dans l&rsquo;une de nos agences.
      </p>

      <div className="mt-10 grid gap-10 sm:grid-cols-[1fr_1.2fr]">
        <div>
          <div className="flex flex-col gap-4">
            {agencies.map((agency) => (
              <div
                key={agency.city}
                className="rounded-xl border border-graphite-line bg-graphite px-5 py-4"
              >
                <div className="font-display text-base font-semibold">
                  {agency.city}
                </div>
                <div className="mt-0.5 font-data text-xs text-titanium-dim">
                  {agency.detail}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 font-data text-xs text-titanium-dim">
            contact@trame.bf
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
