import Image from "next/image";
import Reveal from "./Reveal";

type Photo = {
  src: string;
  alt: string;
  caption: string;
  /** object-position for the crop. */
  focus?: string;
};

/** Ten photos plus the closing call to action fill the grid exactly. */
const photos: Photo[] = [
  {
    src: "/images/lawn-2.jpg",
    alt: "Striped green lawn sloping toward a Madison, CT home after a spring mowing",
    caption: "Spring mowing, Madison, CT",
    focus: "50% 55%",
  },
  {
    src: "/images/mulch-1.jpg",
    alt: "Freshly mulched bed planted with ornamental grasses curving around the side of a Connecticut home",
    caption: "New mulch bed on a side yard",
    focus: "50% 52%",
  },
  {
    src: "/images/leaf-1.jpg",
    alt: "Zero-turn mower on a lawn beside a long row of leaves cleared to the driveway edge during a fall cleanup",
    caption: "Fall cleanup along the driveway",
    focus: "50% 50%",
  },
  {
    src: "/images/flowerbed-3.jpg",
    alt: "Trimmed shrubs and fresh mulch edged against a brick patio beside a Connecticut home",
    caption: "Beds edged to the patio line",
    focus: "50% 50%",
  },
  {
    src: "/images/snow-1.jpg",
    alt: "Residential driveway plowed down to the pavement between snowbanks after a winter storm in Madison, CT",
    caption: "Driveway cleared after a storm",
    focus: "50% 45%",
  },
  {
    src: "/images/flowerbed-6.jpg",
    alt: "Wheelbarrow beside a newly mulched flower bed with pink azaleas in bloom",
    caption: "Beds mulched and replanted for spring",
    focus: "50% 45%",
  },
  {
    src: "/images/flowerbed-2.jpg",
    alt: "Freshly mulched bed cut along a shaded tree line beside a mowed lawn in Madison, CT",
    caption: "New bed cut along the tree line",
    focus: "50% 55%",
  },
  {
    src: "/images/mulch-2.jpg",
    alt: "Mulched roadside bed behind a fieldstone wall with the Triple G Landscaping sign at the curb",
    caption: "Roadside bed edged to the stone wall",
    focus: "50% 50%",
  },
  {
    src: "/images/flowerbed-7.jpg",
    alt: "Crisp mulch bed with rounded shrubs edged tight against a green lawn at a Connecticut home",
    caption: "Shrub beds cut in against the lawn",
    focus: "50% 45%",
  },
  {
    src: "/images/flowerbed-4.jpg",
    alt: "Fresh mulch and clipped boxwoods with pink petunias along a paver retaining wall",
    caption: "Petunias and fresh mulch by the wall",
    focus: "50% 52%",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-stone py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-ink">Our work</p>
          <h2 className="mt-3 text-[clamp(2rem,5.4vw,3.25rem)] text-moss-dark">
            Recent work around Madison and the shoreline.
          </h2>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {photos.map((photo, i) => (
            <Reveal
              key={photo.src}
              as="li"
              // Stagger within each row rather than across all ten, so the
              // last tiles don't wait a full second to appear.
              delay={(i % 3) * 110}
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
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-night/85 to-transparent"
                aria-hidden="true"
              />
              <p className="pointer-events-none absolute inset-x-0 bottom-0 p-5 font-display text-sm font-bold tracking-[-0.01em] text-stone-light sm:text-base">
                {photo.caption}
              </p>
            </Reveal>
          ))}

          {/* Spans the leftover columns so the last row finishes flush, and
              gives the section an exit. */}
          <Reveal
            as="li"
            delay={(photos.length % 3) * 110}
            className="lift group relative flex aspect-[4/3] flex-col justify-center overflow-hidden rounded-2xl bg-moss p-7 sm:col-span-2 sm:aspect-auto sm:min-h-[16rem] sm:p-10"
          >
            <div
              className="absolute inset-0 opacity-20"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(115deg, transparent 0 16px, rgba(143,169,104,0.55) 16px 17px)",
              }}
            />
            <div className="relative">
              <p className="eyebrow text-sage-light">Your yard next</p>
              <p className="mt-4 font-display text-2xl leading-tight font-extrabold tracking-[-0.03em] text-stone-light sm:text-3xl">
                Want your lawn on this page?
              </p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-sage-light px-6 py-3 font-display text-sm font-bold tracking-[-0.01em] text-night transition-colors hover:bg-sage"
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
