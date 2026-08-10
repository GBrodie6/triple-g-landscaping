import Image from "next/image";
import type { ComponentType } from "react";
import Reveal from "./Reveal";
import {
  CleanupIcon,
  MowerIcon,
  MulchIcon,
  ShearsIcon,
  SnowLeafIcon,
} from "./Icons";

type Service = {
  title: string;
  body: string;
  Icon: ComponentType<{ className?: string }>;
  image?: { src: string; alt: string };
  /** object-position for the crop, since the source photos are portrait. */
  focus?: string;
};

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
      src: "/images/flowerbed-4.jpg",
      alt: "Fresh mulch and clipped boxwoods with pink petunias along a paver retaining wall",
    },
    focus: "50% 52%",
  },
  {
    title: "Spring & Fall Cleanups",
    body: "Beds cut back, debris hauled off, and the yard reset so the season starts and ends the right way.",
    Icon: CleanupIcon,
    image: {
      src: "/images/flowerbed-6.jpg",
      alt: "Wheelbarrow beside a newly mulched flower bed with pink azaleas in bloom",
    },
    focus: "50% 45%",
  },
  {
    title: "Snow & Leaf Removal",
    body: "Driveways and walkways cleared after the storm, and leaves off the lawn before they smother the grass.",
    Icon: SnowLeafIcon,
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
            Five services, done properly.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-moss/80">
            No packages you don&apos;t need and no upsells. Tell us what the property
            needs and we&apos;ll quote it straight.
          </p>
        </Reveal>

        {/* Six-column grid: three tall cards on top, two wide cards beneath
            that lay out side-by-side so the rows stay balanced. */}
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {services.map((service, i) => {
            const wide = i >= 3;

            return (
              <Reveal
                key={service.title}
                as="li"
                delay={i * 90}
                className={`lift group overflow-hidden rounded-2xl bg-stone-light shadow-[0_1px_0_0_rgba(44,59,31,0.1)] ${
                  wide
                    ? "flex flex-col sm:flex-row lg:col-span-3"
                    : "flex flex-col lg:col-span-2"
                }`}
              >
                {service.image ? (
                  <div
                    className={`zoom-frame relative overflow-hidden ${
                      wide
                        ? "aspect-[4/3] sm:aspect-auto sm:w-[42%] sm:shrink-0 sm:self-stretch"
                        : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: service.focus ?? "center" }}
                    />
                  </div>
                ) : (
                  <div
                    className={`relative grid place-items-center overflow-hidden bg-moss ${
                      wide
                        ? "aspect-[4/3] sm:aspect-auto sm:w-[42%] sm:shrink-0 sm:self-stretch"
                        : "aspect-[4/3]"
                    }`}
                  >
                    <div
                      className="absolute inset-0 opacity-25"
                      aria-hidden="true"
                      style={{ backgroundImage: hatch }}
                    />
                    <service.Icon className="relative size-20 text-sage-light" />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  {/* Fixed height keeps one- and two-line titles from
                      knocking the body copy out of alignment across cards. */}
                  <div className="flex items-center gap-3 sm:min-h-[3.6rem]">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-moss/8 text-moss">
                      <service.Icon className="size-5" />
                    </span>
                    <h3 className="text-xl text-moss-dark sm:text-[1.35rem]">
                      {service.title}
                    </h3>
                  </div>
                  <p className="mt-3.5 leading-relaxed text-moss/75">{service.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
