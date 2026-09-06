"use client";

import { useState } from "react";

type Tab = "info" | "history";

export function ProfileDashboard({
  displayName,
  identifier,
  memberSince,
  loyaltyPoints,
  tierLabel,
  hasLinkedAccount,
  onLogout,
}: {
  displayName: string;
  identifier: string;
  memberSince: string | null;
  loyaltyPoints: number;
  tierLabel: string;
  hasLinkedAccount: boolean;
  onLogout: () => void;
}) {
  const [tab, setTab] = useState<Tab>("info");

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <div className="rounded-2xl border border-graphite-line bg-graphite p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-data text-xs uppercase tracking-widest text-teal">Mon compte</p>
            <h1 className="mt-1 font-display text-2xl font-bold text-titanium">{displayName}</h1>
            <p className="mt-1 font-data text-xs text-titanium-dim">{identifier}</p>
          </div>
          <span className="rounded-full border border-teal/20 bg-teal-dim/20 px-3 py-1 font-data text-[11px] uppercase tracking-wider text-teal">
            {tierLabel}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-graphite-line pt-4 font-data text-xs text-titanium-dim">
          <span>
            <span className="text-titanium">{loyaltyPoints.toLocaleString("fr-FR")}</span> points
          </span>
          {memberSince && <span>Membre depuis le {memberSince}</span>}
        </div>
      </div>

      <div className="mt-6 flex rounded-xl border border-graphite-line bg-graphite p-1">
        {(
          [
            { key: "info" as const, label: "Informations Personnelles" },
            { key: "history" as const, label: "Historique des Voyages" },
          ]
        ).map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key)}
            className={`flex-1 rounded-lg py-2.5 font-data text-[11px] uppercase tracking-wider transition-colors ${
              tab === item.key ? "bg-teal-dim text-teal" : "text-titanium-dim hover:text-titanium"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-graphite-line bg-graphite p-6">
        {tab === "info" ? (
          <dl className="space-y-4">
            <div>
              <dt className="font-data text-[10px] uppercase tracking-wider text-titanium-dim">
                Identifiant
              </dt>
              <dd className="mt-1 text-sm text-titanium">{identifier}</dd>
            </div>
            <div>
              <dt className="font-data text-[10px] uppercase tracking-wider text-titanium-dim">
                Statut du compte
              </dt>
              <dd className="mt-1 text-sm text-titanium">
                {hasLinkedAccount ? "Compte vérifié par mot de passe" : "Connecté via code à usage unique"}
              </dd>
            </div>
            {memberSince && (
              <div>
                <dt className="font-data text-[10px] uppercase tracking-wider text-titanium-dim">
                  Membre depuis
                </dt>
                <dd className="mt-1 text-sm text-titanium">{memberSince}</dd>
              </div>
            )}
          </dl>
        ) : (
          <p className="text-sm text-titanium-dim">
            Aucun voyage enregistré pour le moment. Vos billets apparaîtront ici après votre première
            réservation.
          </p>
        )}
      </div>

      <form action={onLogout} className="mt-6">
        <button
          type="submit"
          className="rounded-xl border border-graphite-line px-5 py-2.5 font-data text-xs font-bold uppercase tracking-widest text-titanium-dim transition-colors hover:bg-graphite-light hover:text-titanium"
        >
          Se déconnecter
        </button>
      </form>
    </div>
  );
}
