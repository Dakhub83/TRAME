import { Apple, PlayCircle } from "lucide-react";

const stores = [
  { Icon: Apple, top: "Télécharger sur l'", bottom: "App Store" },
  { Icon: PlayCircle, top: "Disponible sur", bottom: "Google Play" },
];

export function StoreBadges({
  className,
  size = "default",
}: {
  className?: string;
  size?: "default" | "compact";
}) {
  const isCompact = size === "compact";

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className ?? ""}`}>
      {stores.map(({ Icon, top, bottom }) => (
        <div
          key={bottom}
          className={`relative flex select-none items-center gap-2 rounded-xl border border-graphite-line bg-graphite text-titanium-dim ${
            isCompact ? "px-3 py-2" : "px-4 py-2.5"
          }`}
        >
          <Icon className={isCompact ? "h-5 w-5" : "h-6 w-6"} />
          <div className="leading-tight">
            <div
              className={`font-data uppercase tracking-wide text-titanium-dim ${
                isCompact ? "text-[8px]" : "text-[9px]"
              }`}
            >
              {top}
            </div>
            <div
              className={`font-display font-semibold text-titanium ${
                isCompact ? "text-xs" : "text-sm"
              }`}
            >
              {bottom}
            </div>
          </div>
          <span className="absolute -right-2 -top-2 rounded-full border border-teal/30 bg-teal-dim px-1.5 py-0.5 font-data text-[8px] uppercase tracking-wide text-teal">
            Bientôt
          </span>
        </div>
      ))}
    </div>
  );
}
