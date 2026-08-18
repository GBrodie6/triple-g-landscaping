"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { PhoneIcon } from "./Icons";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Our Work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // The bar is transparent over the near-black hero and cream once
  // scrolled, so the call button flips to keep contrast on both.
  const callTone =
    scrolled || open
      ? "bg-ink text-stone-light hover:bg-ink-soft"
      : "bg-sage-light text-night hover:bg-sage";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-stone/95 shadow-[0_1px_0_0_rgba(44,59,31,0.14)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-4">
        <a
          href="#top"
          className="flex shrink-0 items-center"
          aria-label={`${site.name}, back to top`}
        >
          {/* Both variants have the white knocked out of the artwork, so the
              mark sits straight on the header. The light one is for the dark
              hero behind the transparent header, the dark one for the cream
              bar after scrolling. */}
          <Image
            src={
              scrolled || open
                ? "/images/logo-horizontal.png"
                : "/images/logo-horizontal-light.png"
            }
            alt=""
            width={900}
            height={390}
            className="h-12 w-auto sm:h-14"
            priority
          />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-display text-sm font-bold tracking-[-0.01em] transition-colors ${
                scrolled
                  ? "text-moss-dark hover:text-ink"
                  : "text-stone-light hover:text-sage-light"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phoneHref}`}
            className={`hidden items-center gap-2 rounded-full px-5 py-3 font-display text-sm font-bold tracking-[-0.01em] transition-colors sm:inline-flex ${callTone}`}
          >
            <PhoneIcon className="size-4" />
            {site.phoneDisplay}
          </a>

          <a
            href={`tel:${site.phoneHref}`}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-3 font-display text-sm font-bold transition-colors sm:hidden ${callTone}`}
          >
            <PhoneIcon className="size-4" />
            Call
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className={`grid size-11 place-items-center rounded-full border transition-colors lg:hidden ${
              scrolled || open
                ? "border-moss/25 text-moss-dark"
                : "border-stone-light/45 text-stone-light"
            }`}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <path d="M5 5l14 14" />
                  <path d="M19 5L5 19" />
                </>
              ) : (
                <>
                  <path d="M3.5 7h17" />
                  <path d="M3.5 12h17" />
                  <path d="M3.5 17h17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-moss/12 bg-stone/98 backdrop-blur-md lg:hidden"
      >
        <nav aria-label="Mobile" className="container-x flex flex-col py-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-moss/10 py-4 font-display text-base font-bold tracking-[-0.02em] text-moss-dark last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            onClick={() => setOpen(false)}
            className="py-4 font-display text-base font-bold tracking-[-0.02em] break-all text-ink"
          >
            {site.email}
          </a>
        </nav>
      </div>
    </header>
  );
}
