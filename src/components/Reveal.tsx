"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  /** Milliseconds to hold before this element animates in. */
  delay?: number;
  /** Vertical travel distance, e.g. "1rem". */
  shift?: string;
  className?: string;
  as?: ElementType;
};

/**
 * Fades and slides its child in the first time it scrolls into view.
 * Pass `delay` to stagger siblings. Motion is disabled entirely by the
 * prefers-reduced-motion rules in globals.css.
 */
export default function Reveal({
  children,
  delay = 0,
  shift,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || revealed) return;

    // Safety net for environments without IntersectionObserver. Show the
    // content rather than leaving it stuck at opacity 0.
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [revealed]);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-revealed={revealed ? "" : undefined}
      className={className}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          ...(shift ? { "--reveal-shift": shift } : {}),
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
