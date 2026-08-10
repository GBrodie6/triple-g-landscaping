import Image from "next/image";
import { site } from "@/lib/site";
import Stars from "./Stars";
import { PhoneIcon } from "./Icons";

export default function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[92svh] overflow-hidden bg-moss-deep">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/lawn-1.jpg"
          alt="Freshly mowed backyard lawn with clean mowing stripes at a home in Madison, CT"
          fill
          priority
          sizes="100vw"
          quality={82}
          className="hero-media-in object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-moss-deep/85 via-moss-deep/45 to-moss-deep/92"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-moss-deep/75 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="container-x flex min-h-[92svh] flex-col justify-end pt-32 pb-14 sm:pb-20">
        <div className="max-w-3xl">
          <p
            className="hero-in eyebrow mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sage-light"
            style={{ "--hero-delay": "120ms" } as React.CSSProperties}
          >
            <span>
              {site.city}, {site.state}
            </span>
            <span aria-hidden="true" className="h-3 w-px bg-sage-light/45" />
            <span>Est. {site.established}</span>
            {/* Dropped on the narrowest screens so the row stays on one line. */}
            <span
              aria-hidden="true"
              className="hidden h-3 w-px bg-sage-light/45 min-[430px]:block"
            />
            <span className="hidden min-[430px]:inline">Owner-operated</span>
          </p>

          <h1
            className="hero-in text-[clamp(2.6rem,8.6vw,5.25rem)] text-stone-light"
            style={{ "--hero-delay": "220ms" } as React.CSSProperties}
          >
            A lawn your{" "}
            <br />
            neighbors notice.
          </h1>

          <p
            className="hero-in mt-6 max-w-xl text-lg leading-relaxed text-stone/85 sm:text-xl"
            style={{ "--hero-delay": "340ms" } as React.CSSProperties}
          >
            Weekly mowing, mulching, and seasonal cleanups for homes in {site.city} and
            along the Connecticut shoreline — done by {site.owner}, the same person who
            answers the phone.
          </p>

          <div
            className="hero-in mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ "--hero-delay": "460ms" } as React.CSSProperties}
          >
            <a
              href="#contact"
              className="lift inline-flex items-center justify-center rounded-full bg-clay px-8 py-4 font-display text-base font-bold tracking-[-0.01em] text-stone-light transition-colors hover:bg-clay-dark"
            >
              Get a free quote
            </a>
            <a
              href={`tel:${site.phoneHref}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-stone-light/45 px-8 py-4 font-display text-base font-bold tracking-[-0.01em] text-stone-light transition-colors hover:border-stone-light hover:bg-stone-light/10"
            >
              <PhoneIcon className="size-5" />
              {site.phoneDisplay}
            </a>
          </div>

          {/* Trust badge, kept high on the page. */}
          <div
            className="hero-in mt-10 inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-full border border-stone-light/25 bg-moss-deep/45 px-5 py-3 backdrop-blur-sm"
            style={{ "--hero-delay": "580ms" } as React.CSSProperties}
          >
            <Stars size={17} className="text-sage-light" />
            <span className="font-display text-sm font-extrabold tracking-[-0.01em] text-stone-light">
              {site.rating.toFixed(1)} stars
            </span>
            <span aria-hidden="true" className="h-3.5 w-px bg-stone-light/30" />
            <span className="text-sm text-stone/80">
              {site.reviewCount} Google reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
