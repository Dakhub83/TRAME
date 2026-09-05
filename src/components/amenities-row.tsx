function AirIcon() {
  return (
    <svg className="h-4 w-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  );
}

function GpsIcon() {
  return (
    <svg className="h-4 w-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function SeatIcon() {
  return (
    <svg className="h-4 w-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5h14l1 7v5H4v-5l1-7z M4 17h16v2H4z" />
    </svg>
  );
}

function UsbIcon() {
  return (
    <svg className="h-4 w-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6M12 3v14M10 7l2-2 2 2M10 13l2 2 2-2" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg className="h-4 w-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TvIcon() {
  return (
    <svg className="h-4 w-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <rect x="2" y="6" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 2l-5 4-5-4" />
    </svg>
  );
}

function amenityIcon(feature: string) {
  if (feature.includes("Climatisation")) return AirIcon;
  if (feature.includes("GPS")) return GpsIcon;
  if (feature.includes("Sièges")) return SeatIcon;
  if (feature.includes("USB")) return UsbIcon;
  if (feature.includes("Wi-Fi")) return WifiIcon;
  if (feature.includes("TV")) return TvIcon;
  return null;
}

export function AmenitiesRow({ features }: { features: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-graphite-line pt-4">
      {features.map((feature) => {
        const Icon = amenityIcon(feature);
        return (
          <div key={feature} className="flex items-center gap-2 text-xs font-medium text-titanium-dim">
            <span className="flex shrink-0 items-center justify-center rounded-md bg-teal-dim/30 p-1">
              {Icon && <Icon />}
            </span>
            <span className="truncate">{feature}</span>
          </div>
        );
      })}
    </div>
  );
}
