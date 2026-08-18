import Image from "next/image";
import { site } from "@/lib/site";
import Reveal from "./Reveal";

/** Short labels rather than sentences, so six of them read as a scannable set. */
const points = [
  "Owner on the job",
  "The same day, every week",
  "On time, every time",
  "Experienced team members",
  "Eco-friendly",
  "Well trusted",
];

export default function Equipment() {
  return (
    <section data-surface="dark" className="bg-moss-dark py-20 text-stone sm:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="zoom-frame relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[4/5] lg:aspect-[1/1]">
          <Image
            src="/images/lawn-tractor.jpg"
            alt="Triple G Landscaping's commercial zero-turn mower parked on a freshly cut lawn in Madison, CT"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: "50% 48%" }}
          />
        </Reveal>

        <Reveal delay={120}>
          {/* The section runs without a display headline, so the label carries
              the heading semantics and the lead paragraph takes the visual
              weight the headline used to. */}
          <h2 className="eyebrow text-sage-light">Reliability</h2>
          <p className="mt-6 text-xl leading-relaxed text-stone/85 sm:text-2xl sm:leading-relaxed">
            Triple G started in {site.established} with one mower and a handful of
            neighbors. It runs the same way now. {site.owner} quotes the job, does the
            job, and stands behind it.
          </p>

          <ul className="mt-10 grid gap-x-8 gap-y-4 border-t border-stone/15 pt-8 sm:grid-cols-2">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-3 font-display text-base font-extrabold tracking-[-0.02em] text-stone-light sm:text-lg"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="shrink-0 text-sage-light"
                >
                  <path d="M4.5 12.5l5 5 10-11" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
