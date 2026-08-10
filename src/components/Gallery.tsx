import Image from "next/image";
import Reveal from "./Reveal";

type Photo = {
  src: string;
  alt: string;
  caption: string;
  /** object-position for the crop. */
  focus?: string;
};

const photos: Photo[] = [
  {
    src: "/images/lawn-2.jpg",
    alt: "Striped green lawn sloping toward a Madison, CT home after a spring mowing",
    caption: "Spring mowing — Madison, CT",
    focus: "50% 55%",
  },
  {
    src: "/images/flowerbed-1.jpg",
    alt: "Dark mulch bed with lavender and trimmed shrubs along a brick walkway at a shoreline Connecticut home",
    caption: "Mulch beds along the front walk",
    focus: "50% 45%",
  },
  {
    src: "/images/flowerbed-3.jpg",
    alt: "Trimmed shrubs and fresh mulch edged against a brick patio beside a Connecticut home",
    caption: "Beds edged to the patio line",
    focus: "50% 50%",
  },
  {
    src: "/images/flowerbed-2.jpg",
    alt: "Freshly mulched bed cut along a shaded tree line beside a mowed lawn in Madison, CT",
    caption: "New bed cut along the tree line",
    focus: "50% 55%",
  },
  {
    src: "/images/flowerbed-5.jpg",
    alt: "Fresh mulch ring installed around a mature shade tree on a Madison, CT lawn",
    caption: "Mulch ring around a mature oak",
    focus: "50% 50%",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-stone py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-clay">Our work</p>
          <h2 className="mt-3 text-[clamp(2rem,5.4vw,3.25rem)] text-moss-dark">
            Every photo is a real yard.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-moss/80">
            Shot on properties around Madison and the shoreline — no stock photos, no
            other company&apos;s work.
          </p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {photos.map((photo, i) => (
            <Reveal
              key={photo.src}
              as="li"
              delay={i * 110}
              className="lift zoom-frame group relative aspect-[4/3] overflow-hidden rounded-2xl bg-moss-dark sm:aspect-[3/4]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: photo.focus ?? "center" }}
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-moss-deep/85 to-transparent"
                aria-hidden="true"
              />
              <p className="pointer-events-none absolute inset-x-0 bottom-0 p-5 font-display text-sm font-bold tracking-[-0.01em] text-stone-light sm:text-base">
                {photo.caption}
              </p>
            </Reveal>
          ))}

          {/* Sixth cell keeps the grid square and gives the section an exit. */}
          <Reveal
            as="li"
            delay={photos.length * 110}
            className="lift group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl bg-moss p-7 sm:aspect-[3/4]"
          >
            <div
              className="absolute inset-0 opacity-20"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(115deg, transparent 0 16px, rgba(143,169,104,0.55) 16px 17px)",
              }}
            />
            <p className="relative eyebrow text-sage-light">Your yard next</p>
            <div className="relative">
              <p className="font-display text-2xl leading-tight font-extrabold tracking-[-0.03em] text-stone-light sm:text-3xl">
                Want your lawn on this page?
              </p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-clay px-6 py-3 font-display text-sm font-bold tracking-[-0.01em] text-stone-light transition-colors hover:bg-clay-dark"
              >
                Get a free quote
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h13" />
                  <path d="M12.5 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
