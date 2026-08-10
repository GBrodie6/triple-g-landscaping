type StarsProps = {
  /** Rendered pixel size of each star. */
  size?: number;
  className?: string;
};

/**
 * Five filled stars. Decorative, since the numeric rating is always stated in
 * adjacent text, so this is hidden from assistive tech.
 */
export default function Stars({ size = 18, className }: StarsProps) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className ?? ""}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          focusable="false"
        >
          <path d="M12 2.4l2.9 5.88 6.49.95-4.7 4.58 1.11 6.46L12 17.22l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.95L12 2.4z" />
        </svg>
      ))}
    </span>
  );
}
