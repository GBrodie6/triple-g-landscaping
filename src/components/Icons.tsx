type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: "false" as const,
};

export function MowerIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2 17h3.2l2.3-5h7.2l1.4 5H21" />
      <path d="M15.7 12l1.6-6.4h3.2" />
      <circle cx="5.2" cy="19" r="2" />
      <circle cx="18.4" cy="18.6" r="2.4" />
      <path d="M7.5 12V9.4h6.2" />
    </svg>
  );
}

export function MulchIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 20c0-4.6 2.8-8.2 7-9.4-.4 4.9-3 8.3-7 9.4z" />
      <path d="M12 20c0-4.2-2.6-7.4-6.4-8.5.4 4.4 2.8 7.5 6.4 8.5z" />
      <path d="M12 20V9.6" />
      <path d="M12 9.6c0-2.6 1.2-4.7 3.3-5.6-.2 3-1.3 5-3.3 5.6z" />
      <path d="M3 20h18" />
    </svg>
  );
}

export function CleanupIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M14.5 3.2L9.4 8.3" />
      <path d="M8.6 9.1l-4.3 4.3a3.2 3.2 0 004.5 4.5l4.3-4.3" />
      <path d="M11.6 6.1l3.4 3.4" />
      <path d="M17.4 4.8l2.4 2.4" />
      <path d="M18.6 12.4c1.4 0 2.6 1.1 2.6 2.6s-1.2 2.6-2.6 2.6" />
      <path d="M16 21h5" />
    </svg>
  );
}

export function SnowLeafIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2.6v18.8" />
      <path d="M4.3 7.1l15.4 8.8" />
      <path d="M19.7 7.1L4.3 15.9" />
      <path d="M12 6.4l2.1-2.1M12 6.4L9.9 4.3" />
      <path d="M12 17.6l2.1 2.1M12 17.6l-2.1 2.1" />
      <path d="M7.6 9.6L4.7 9.2M7.6 14.4l-2.9.4" />
      <path d="M16.4 9.6l2.9-.4M16.4 14.4l2.9.4" />
    </svg>
  );
}

export function ShearsIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="6" cy="18.4" r="2.4" />
      <circle cx="18" cy="18.4" r="2.4" />
      <path d="M7.7 16.7L18 3.4" />
      <path d="M16.3 16.7L6 3.4" />
      <path d="M10.6 11.2l2.8 0" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6.3 3.5h3l1.5 3.7-1.9 1.4a11.6 11.6 0 006.5 6.5l1.4-1.9 3.7 1.5v3a1.8 1.8 0 01-2 1.8C10.9 18.8 5.2 13.1 4.5 5.5a1.8 1.8 0 011.8-2z" />
    </svg>
  );
}

export function MessageIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 5.5h16v11H8.8L4 20V5.5z" />
      <path d="M8.2 10.8h7.6" />
      <path d="M8.2 13.6h4.6" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="5.2" width="18" height="13.6" rx="2" />
      <path d="M3.6 6.4L12 12.7l8.4-6.3" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6.8V12l3.4 2" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function QuoteMarkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M13.4 0v9.6c0 8-4.3 13-12.2 14.4L0 21.2c4.4-1.2 6.9-3.5 7.4-7H1.9V0h11.5zm18.6 0v9.6c0 8-4.3 13-12.2 14.4l-1.2-2.8c4.4-1.2 6.9-3.5 7.4-7h-5.5V0H32z" />
    </svg>
  );
}
