import Image from "next/image";
import type { ComponentType } from "react";
import Reveal from "./Reveal";
import {
  AerationIcon,
  CleanupIcon,
  MowerIcon,
  MulchIcon,
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
 * Every service now carries a real job photo. The icon-panel branch below is
 * kept for any service added later that has no photo yet.
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
    title: "Mulching & Bed Maintenance",
    body: "Fresh mulch, weeded beds, and shaped shrubs, the detail work that makes the whole property look cared for.",
    Icon: MulchIcon,
    image: {
      src: "/images/mulch-3.jpg",
      alt: "Fresh mulch and rounded boxwoods sweeping along a paver walkway at a Madison, CT home",
    },
    focus: "50% 52%",
  },
  {
    title: "Spring & Fall Cleanups",
    body: "Beds cut back, leaves cleared, debris hauled off, and the yard reset so the season starts and ends the right way.",
    Icon: CleanupIcon,
    image: {
      src: "/images/leaf-2.jpg",
      alt: "Autumn leaves raked into a long row along a driveway during a fall cleanup in Madison, CT",
    },
    focus: "50% 45%",
  },
  {
    title: "Snow & Ice Removal",
    body: "Driveways and walkways plowed after each storm, and salt down on the ice so the property stays walkable all winter.",
    Icon: SnowIcon,
    image: {
      src: "/images/snow-2.jpg",
      alt: "Driveway plowed clear to the pavement up to the garage at a Madison, CT home after a snowstorm",
    },
    focus: "50% 42%",
  },
  {
    title: "Aeration & Lawn Renovation",
    body: "Aeration, dethatching, and overseeding to fix compacted or thin lawns and get real grass growing back.",
    Icon: AerationIcon,
    image: {
      src: "/images/lawn-4.jpg",
      alt: "Thick striped backyard lawn running up to a Madison, CT home after mowing",
    },
    focus: "50% 55%",
  },
  {
    title: "Tree & Shrub Care",
    body: "Pruning and trimming that keeps trees and shrubs healthy and shaped right, done at the times of year that actually help growth.",
    Icon: TreeIcon,
    image: {
      src: "/images/flowerbed-5.jpg",
      alt: "Mulch bed curved around a mature oak with clipped evergreen shrubs on a Madison, CT lawn",
    },
    focus: "50% 50%",
  },
  {
    title: "General Landscaping",
    body: "Design and installation for new landscaping features, plus ongoing upkeep for larger properties.",
    Icon: ShovelIcon,
    image: {
      src: "/images/flowerbed-1.jpg",
      alt: "Brick walkway curving past mulched beds of lavender and shrubs at the front of a shoreline Connecticut home",
    },
    focus: "50% 45%",
  },
];

const hatch =
  "repeating-linear-gradient(115deg, transparent 0 14px, rgba(143,169,104,0.5) 14px 15px)";

export default function Services() {
  return (
    <section id="services" className="bg-stone py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <h2 className="eyebrow text-ink">Our Services</h2>
          <p className="mt-6 text-xl leading-relaxed text-moss/85 sm:text-2xl sm:leading-relaxed">
            A full range of landscaping services, from weekly lawn care to bigger
            seasonal work. Take a look below, and reach out if you need something
            that&apos;s not listed.
          </p>
        </Reveal>

        {/* Seven cards do not divide evenly into four columns, so this is a
            wrapping flex row: four across, then a centred row of three. */}
        <ul className="mt-12 flex flex-wrap justify-center gap-5">
          {services.map((service, i) => (
            <Reveal
              key={service.title}
              as="li"
              delay={(i % 4) * 90}
              className="lift group flex basis-full flex-col overflow-hidden rounded-2xl bg-stone-light shadow-[0_1px_0_0_rgba(44,59,31,0.1)] sm:basis-[calc(50%-10px)] lg:basis-[calc(25%-15px)]"
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
