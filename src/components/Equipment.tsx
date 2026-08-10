import Image from "next/image";
import { site } from "@/lib/site";
import Reveal from "./Reveal";

const points = [
  {
    title: "Not homeowner-grade",
    body: "Zero-turn mowers, backpack blowers, and proper trimmers, not homeowner gear stretched across a route.",
  },
  {
    title: "Owner on the job",
    body: `${site.owner} is on site for the work, so nothing gets handed off to someone who has never seen your property.`,
  },
  {
    title: "The same day, every week",
    body: "You get a set day on the schedule and we hold it, rain weeks and holiday weeks included.",
  },
];

export default function Equipment() {
  return (
    <section className="bg-moss-dark py-20 text-stone sm:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="zoom-frame relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[4/5] lg:aspect-[5/6]">
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
          <p className="eyebrow text-sage-light">Real crews, real equipment</p>
          <h2 className="mt-3 text-[clamp(1.9rem,5vw,3rem)] text-stone-light">
            Commercial equipment, run by the guy who quotes the job.
          </h2>
          <p className="mt-5 leading-relaxed text-stone/75">
            Triple G started in {site.established} with one mower and a handful of
            neighbors. It runs the same way now. {site.owner} quotes the job, does the
            job, and stands behind it.
          </p>

          <dl className="mt-9 space-y-6">
            {points.map((point) => (
              <div key={point.title} className="border-l-2 border-sage/45 pl-5">
                <dt className="font-display text-lg font-extrabold tracking-[-0.02em] text-stone-light">
                  {point.title}
                </dt>
                <dd className="mt-1.5 leading-relaxed text-stone/70">{point.body}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
