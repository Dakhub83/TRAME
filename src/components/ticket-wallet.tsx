"use client";

import Link from "next/link";
import { useBooking } from "@/context/booking-context";
import { formatFcfa } from "@/lib/trips";
import { buildLocalizedPath } from "@/lib/i18n";
import { useLocale } from "@/hooks/use-locale";
import type { PaymentMethod } from "@/lib/types";

const PAYMENT_LABELS: Record<PaymentMethod, { name: string; color: string }> = {
  orange: { name: "Orange Money", color: "#FF6600" },
  moov: { name: "Moov Money", color: "#1BA255" },
};

export function TicketWallet() {
  const { booking, setPaymentMethod } = useBooking();
  const locale = useLocale();

  if (!booking) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-5 py-16 text-center">
        <p className="text-titanium-dim">Aucun billet actif pour le moment.</p>
        <Link
          href={buildLocalizedPath("/book", locale)}
          className="rounded-xl bg-teal px-6 py-3.5 font-semibold text-obsidian"
        >
          Réserver un siège
        </Link>
      </div>
    );
  }

  const { trip, seat, pnr, paymentMethod } = booking;
  const price = seat.vip ? trip.vipPrice : trip.standardPrice;

  return (
    <div className="mx-auto max-w-md px-5 pb-12 pt-6">
      <h1 className="mb-4 font-display text-lg font-medium">Mon billet</h1>

      <div className="overflow-hidden rounded-[18px] border border-graphite-line bg-graphite">
        <div className="bg-[linear-gradient(160deg,var(--color-teal-dim),var(--color-graphite)_70%)] px-5 pb-4 pt-5">
          <div className="flex items-start justify-between">
            <div className="font-display text-[22px] font-semibold leading-tight">
              {trip.fromCity}
              <span className="mt-0.5 block font-body text-[11px] font-normal text-titanium-dim">
                {trip.fromDetail}
              </span>
            </div>
            <div className="pt-2 font-data text-xs text-teal">→</div>
            <div className="text-right font-display text-[22px] font-semibold leading-tight">
              {trip.toCity}
              <span className="mt-0.5 block font-body text-[11px] font-normal text-titanium-dim">
                {trip.toDetail}
              </span>
            </div>
          </div>
          <div className="mt-4.5 flex justify-between font-data text-[11px] text-titanium-dim">
            <div>
              DÉPART
              <span className="mt-0.5 block text-[13px] text-titanium">
                {trip.departure}
              </span>
            </div>
            <div>
              SIÈGE
              <span className="mt-0.5 block text-[13px] text-titanium">
                {seat.id} · {seat.vip ? "VIP" : "Standard"}
              </span>
            </div>
            <div>
              DATE
              <span className="mt-0.5 block text-[13px] text-titanium">
                {trip.date}
              </span>
            </div>
          </div>
        </div>

        <div className="relative mx-5 border-t border-dashed border-graphite-line">
          <span className="absolute -left-[29px] -top-2.5 h-[18px] w-[18px] rounded-full bg-obsidian" />
          <span className="absolute -right-[29px] -top-2.5 h-[18px] w-[18px] rounded-full bg-obsidian" />
        </div>

        <div className="flex items-center gap-4 p-5">
          <div className="h-[84px] w-[84px] shrink-0 rounded-lg bg-titanium p-1.5">
            <TicketQr />
          </div>
          <div>
            <div className="font-data text-[10px] text-titanium-dim">CODE PNR</div>
            <div className="font-data text-[15px] tracking-widest text-teal">
              {pnr}
            </div>
            <div className="mt-2.5 flex items-center gap-1.5 font-data text-[11px] text-teal">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
              VÉRIFIÉ
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2.5 font-data text-[11px] text-titanium-dim">
          MOYEN DE PAIEMENT
        </div>
        <div className="flex flex-col gap-2">
          {(Object.keys(PAYMENT_LABELS) as PaymentMethod[]).map((method) => {
            const { name, color } = PAYMENT_LABELS[method];
            const active = paymentMethod === method;
            return (
              <button
                key={method}
                type="button"
                onClick={() => setPaymentMethod(method)}
                className="flex items-center justify-between rounded-[10px] border border-graphite-line bg-graphite px-3.5 py-3 text-sm"
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className="h-5 w-5 rounded-md"
                    style={{ background: color }}
                  />
                  {name}
                </span>
                <span
                  className={`font-data text-[11px] ${active ? "text-teal" : "text-titanium-dim"}`}
                >
                  {active ? "✓ CONNECTÉ" : "SÉLECTIONNER"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl border border-graphite-line bg-graphite px-4 py-3">
        <span className="font-data text-[10px] text-titanium-dim">TOTAL</span>
        <span className="font-display text-lg font-semibold">
          {formatFcfa(price)}
        </span>
      </div>

      <button className="mt-5 w-full rounded-xl bg-teal px-6 py-3.5 font-semibold text-obsidian">
        Ajouter au portefeuille
      </button>
    </div>
  );
}

function TicketQr() {
  return (
    <svg viewBox="0 0 29 29" className="h-full w-full">
      <rect width="29" height="29" fill="#E9EBEC" />
      <g fill="#0A0B0D">
        <rect x="0" y="0" width="7" height="7" />
        <rect x="1" y="1" width="5" height="5" fill="#E9EBEC" />
        <rect x="2" y="2" width="3" height="3" />
        <rect x="22" y="0" width="7" height="7" />
        <rect x="23" y="1" width="5" height="5" fill="#E9EBEC" />
        <rect x="24" y="2" width="3" height="3" />
        <rect x="0" y="22" width="7" height="7" />
        <rect x="1" y="23" width="5" height="5" fill="#E9EBEC" />
        <rect x="2" y="24" width="3" height="3" />
        <rect x="9" y="1" width="2" height="2" />
        <rect x="13" y="1" width="2" height="2" />
        <rect x="17" y="3" width="2" height="2" />
        <rect x="9" y="9" width="3" height="3" />
        <rect x="14" y="9" width="2" height="2" />
        <rect x="18" y="9" width="3" height="3" />
        <rect x="9" y="14" width="2" height="2" />
        <rect x="13" y="13" width="3" height="3" />
        <rect x="18" y="15" width="2" height="2" />
        <rect x="9" y="18" width="2" height="5" />
        <rect x="14" y="18" width="2" height="2" />
        <rect x="18" y="19" width="3" height="3" />
        <rect x="22" y="10" width="2" height="2" />
        <rect x="26" y="10" width="2" height="2" />
        <rect x="22" y="14" width="2" height="6" />
        <rect x="26" y="14" width="2" height="2" />
        <rect x="26" y="18" width="2" height="6" />
        <rect x="22" y="22" width="5" height="2" />
      </g>
    </svg>
  );
}
