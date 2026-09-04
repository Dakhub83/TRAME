import type { Waybill } from "@/lib/freight";

function nodeClasses(state: "done" | "current" | "pending") {
  if (state === "done") return "border-teal bg-teal";
  if (state === "current") return "border-teal bg-obsidian shadow-[0_0_0_4px_var(--teal-glow)]";
  return "border-graphite-line bg-obsidian";
}

export function FreightTracker({ waybill }: { waybill: Waybill }) {
  return (
    <div className="mx-auto max-w-md px-5 pb-12 pt-6">
      <h1 className="mb-4 font-display text-lg font-medium">Suivi du colis</h1>

      <div className="rounded-2xl border border-graphite-line bg-graphite px-4.5 py-4">
        <div className="font-data text-[10px] text-titanium-dim">
          NUMÉRO DE LETTRE DE VOITURE
        </div>
        <div className="mt-1 font-data text-[19px] tracking-wide text-teal">
          {waybill.id}
        </div>
        <div className="mt-3 flex justify-between text-[11px] text-titanium-dim">
          <span>{waybill.route}</span>
          <span>{waybill.weight}</span>
        </div>
      </div>

      <div className="mt-4.5">
        {waybill.steps.map((step, i) => {
          const isLast = i === waybill.steps.length - 1;
          return (
            <div key={step.label} className="flex gap-3.5">
              <div className="flex w-4 flex-col items-center">
                <span
                  className={`h-3.5 w-3.5 shrink-0 rounded-full border-2 ${nodeClasses(step.state)}`}
                />
                {!isLast && (
                  <span
                    className={`min-h-9 w-0.5 flex-1 ${step.state === "done" ? "bg-teal" : "bg-graphite-line"}`}
                  />
                )}
              </div>
              <div className="pb-7">
                <div
                  className={`text-sm ${step.state === "pending" ? "font-normal text-titanium-dim" : "font-medium text-titanium"}`}
                >
                  {step.label}
                </div>
                <div className="mt-0.5 font-data text-[10px] text-titanium-dim">
                  {step.time}
                </div>
                <div className="mt-1 text-xs leading-relaxed text-titanium-dim">
                  {step.detail}
                </div>
                {step.coachChip && (
                  <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-teal-dim px-2.5 py-1 font-data text-[10px] text-teal">
                    ✓ {step.coachChip}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full rounded-xl bg-teal px-6 py-3.5 font-semibold text-obsidian">
        Contacter le destinataire
      </button>
    </div>
  );
}
