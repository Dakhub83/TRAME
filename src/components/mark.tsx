export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 52 52" fill="none" aria-hidden="true">
      <circle cx="10" cy="38" r="4.5" fill="#00E6C3" />
      <circle cx="26" cy="12" r="4.5" fill="#00E6C3" />
      <circle cx="42" cy="38" r="4.5" fill="#00E6C3" />
      <path
        d="M10 38 L26 12 L42 38"
        stroke="#00E6C3"
        strokeWidth="1.6"
        fill="none"
        opacity="0.55"
      />
      <path d="M10 38 L42 38" stroke="#00E6C3" strokeWidth="1.6" opacity="0.2" />
    </svg>
  );
}
