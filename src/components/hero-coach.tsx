export function HeroCoach({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 500"
      fill="none"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <rect
        x="120"
        y="200"
        width="880"
        height="180"
        rx="28"
        fill="#141920"
        stroke="#2B2F34"
        strokeWidth="2"
      />
      <path
        d="M120 228 C120 213 133 200 148 200 L860 200 C930 200 990 230 1000 280 L1000 320 L120 320 Z"
        fill="#171B21"
        stroke="#2B2F34"
        strokeWidth="2"
      />
      {Array.from({ length: 9 }).map((_, i) => (
        <rect
          key={i}
          x={168 + i * 84}
          y="222"
          width="56"
          height="46"
          rx="8"
          fill="#0A0B0D"
          stroke="#00E6C3"
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />
      ))}
      <rect
        x="920"
        y="230"
        width="64"
        height="50"
        rx="8"
        fill="#0A0B0D"
        stroke="#00E6C3"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      <rect x="120" y="360" width="880" height="10" rx="5" fill="#0A0B0D" />
      <circle cx="270" cy="392" r="34" fill="#0A0B0D" stroke="#2B2F34" strokeWidth="6" />
      <circle cx="270" cy="392" r="10" fill="#2B2F34" />
      <circle cx="820" cy="392" r="34" fill="#0A0B0D" stroke="#2B2F34" strokeWidth="6" />
      <circle cx="820" cy="392" r="10" fill="#2B2F34" />
      <rect x="960" y="250" width="14" height="26" rx="3" fill="#00E6C3" opacity="0.55" />
      <rect x="120" y="196" width="880" height="6" rx="3" fill="#00E6C3" opacity="0.35" />
    </svg>
  );
}
