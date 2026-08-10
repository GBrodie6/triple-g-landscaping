import Image from "next/image";
import type { ComponentType } from "react";
import Reveal from "./Reveal";
import {
  AerationIcon,
  CleanupIcon,
  MowerIcon,
  MulchIcon,
  ShearsIcon,
  ShovelIcon,
  SnowIcon,
  TreeIcon,
} from "./Icons";

type Service = {
  title: string;
  body: string;
  Icon: ComponentType<{ className?: string }>;
  image?: { src: string; alt: string };
  /** object-position for the crop, since the source photos are portrait. */
  focus?: string;
};

/**
 * Ordered so the four cards backed by real job photos fill the first row on
 * large screens and the four icon panels fill the second.
 */
const services: Service[] = [
  {
    title: "Weekly Mowing",
    body: "A consistent cut on the same day each week, with clean lines, blown-off walkways, and nothing left behind.",
    Icon: MowerIcon,
    image: {
      src: "/images/lawn-3.jpg",
      alt: "Wide roadside lawn in Madison, CT with fresh mower lines fanning out toward the street",
    },
    focus: "50% 42%",
  },
  {
    title: "Edging & Trimming",
    body: "Crisp bed lines, trimmed borders along walks and fences, and clean separation between lawn and landscape.",
    Icon: ShearsIcon,
    image: {
      src: "/images/flowerbed-7.jpg",
      alt: "Crisp mulch bed with rounded shrubs edged tight against a green lawn at a Connecticut home",
    },
    focus: "50% 45%",
  },
  {
    title: "Mulching & Bed Maintenance",
    body: "Fresh mulch, weeded beds, and shaped shrubs, the detail work that makes the whole property look cared for.",
    Icon: MulchIcon,
    image: {
      src: "/images/flowerbed-4.jpg",
      alt: "Fresh mulch and clipped boxwoods with pink petunias along a paver retaining wall",
    },
    focus: "50% 52%",
  },
  {
    title: "Spring & Fall Cleanups",
    body: "Beds cut back, leaves cleared, debris hauled off, and the yard reset so the season starts and ends the right way.",
    Icon: CleanupIcon,
    image: {
      src: "/images/flowerbed-6.jpg",
      alt: "Wheelbarrow beside a newly mulched flower bed with pink azaleas in bloom",
    },
    focus: "50% 45%",
  },
  {
    title: "Tree & Shrub Care",
    body: "Pruning and trimming that keeps trees and shrubs healthy and shaped right, done at the times of year that actually help growth.",
    Icon: TreeIcon,
  },
  {
    title: "Aeration & Lawn Renovation",
    body: "Aeration, dethatching, and overseeding to fix compacted or thin lawns and get real grass growing back.",
    Icon: AerationIcon,
  },
  {
    title: "General Landscaping",
    body: "Design and installation for new landscaping features, plus ongoing upkeep for larger properties.",
    Icon: ShovelIcon,
  },
  {
    title: "Snow & Ice Removal",
    body: "Driveways and walkways plowed after each storm, and salt down on the ice so the property stays walkable all winter.",
    Icon: SnowIcon,
  },
];

const hatch =
  "repeating-linear-gradient(115deg, transparent 0 14px, rgba(143,169,104,0.5) 14px 15px)";

export default function Services() {
  return (
    <section id="services" className="bg-stone py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-clay">What we do</p>
          <h2 className="mt-3 text-[clamp(2rem,5.4vw,3.25rem)] text-moss-dark">
            Eight services, done properly.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-moss/80">
            No packages you don&apos;t need and no upsells. Tell us what the property
            needs and we&apos;ll quote it straight.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal
              key={service.title}
              as="li"
              delay={(i % 4) * 90}
              className="lift group flex flex-col overflow-hidden rounded-2xl bg-stone-light shadow-[0_1px_0_0_rgba(44,59,31,0.1)]"
            >
              {service.image ? (
                <div className="zoom-frame relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: service.focus ?? "center" }}
                  />
                </div>
              ) : (
                <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-moss">
                  <div
                    className="absolute inset-0 opacity-25"
                    aria-hidden="true"
                    style={{ backgroundImage: hatch }}
                  />
                  <service.Icon className="relative size-16 text-sage-light" />
                </div>
              )}

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-moss/8 text-moss">
                  <service.Icon className="size-5" />
                </span>
                {/* Fixed height keeps one- and two-line titles from knocking
                    the body copy out of alignment across the row. Sized to two
                    lines of text-xl, whose 1.75rem line-height overrides the
                    tighter h3 default in globals.css. */}
                <h3 className="mt-4 text-lg text-moss-dark sm:min-h-[3.5rem] sm:text-xl">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-moss/75">
                  {service.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
