import { site } from "@/lib/site";
import Reveal from "./Reveal";
import Stars from "./Stars";
import { QuoteMarkIcon } from "./Icons";

const featured = {
  quote:
    "We have been using them for over five years, and the level of care, consistency, and professionalism has been exceptional from day one. Our lawn is meticulously maintained with every cut, and there is always tremendous attention paid to the surrounding landscaping and property, nothing is rushed or overlooked. Owen is diligent, conscientious, respectful, trustworthy, and incredibly hardworking. He shows up when he says he will and clearly holds himself to a very high standard. His pricing is fair and reasonable given the quality and attention to detail he provides. It's remarkable considering the young entrepreneur behind Triple G Landscaping started this business at such a young age.",
  name: "Ashley M.",
  detail: "5-year customer",
};

const quotes = [
  {
    quote:
      "Owen does excellent work. He has done several snow and leaf removal jobs for me and he is clean, efficient and fairly priced. I strongly recommend Owen for your landscaping needs.",
    name: "Mark E.",
  },
  {
    quote:
      "I had a great experience with the young gentleman who ran this company, he did my lawn super well and made it look super nice. He also did a great job mulching my neighbor's lawn.",
    name: "Grayson B.",
  },
  {
    quote:
      "Owen does a great job with our lawn. We've trusted him for years and wouldn't go anywhere else.",
    name: "Michael M.",
  },
  {
    quote: "Fantastic job! 10/10 recommend Triple G Landscaping.",
    name: "Catherine K.",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="bg-stone-light py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-ink">Reviews</p>
            <h2 className="mt-3 text-[clamp(2rem,5.4vw,3.25rem)] text-moss-dark">
              What customers say.
            </h2>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-moss/15 bg-stone px-6 py-4">
            <span className="font-display text-4xl leading-none font-extrabold tracking-[-0.04em] text-moss-dark">
              {site.rating.toFixed(1)}
            </span>
            <span className="flex flex-col gap-1">
              <Stars size={16} className="text-ink" />
              <span className="text-sm text-moss/75">stars on Google</span>
            </span>
          </div>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <figure className="lift relative overflow-hidden rounded-3xl bg-moss p-8 text-stone sm:p-12">
            <QuoteMarkIcon
              className="absolute -top-2 right-6 w-24 text-sage/15 sm:right-10 sm:w-32"
            />
            <Stars size={20} className="text-sage-light" />
            <blockquote className="relative mt-6 font-display text-[1.25rem] leading-[1.5] font-semibold tracking-[-0.02em] text-stone-light sm:text-[1.6rem] sm:leading-[1.45]">
              <p>&ldquo;{featured.quote}&rdquo;</p>
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-stone/20 pt-6">
              <span className="font-display text-base font-extrabold tracking-[-0.01em] text-stone-light">
                {featured.name}
              </span>
              <span aria-hidden="true" className="h-3.5 w-px bg-stone/30" />
              <span className="text-sm text-stone/70">{featured.detail}</span>
            </figcaption>
          </figure>
        </Reveal>

        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quotes.map((item, i) => (
            <Reveal
              key={item.name}
              as="li"
              delay={140 + i * 110}
              className="lift flex h-full flex-col rounded-2xl border border-moss/12 bg-stone p-6"
            >
              <Stars size={15} className="text-ink" />
              <blockquote className="mt-4 flex-1 leading-relaxed text-moss/85">
                <p>&ldquo;{item.quote}&rdquo;</p>
              </blockquote>
              <p className="mt-5 font-display text-sm font-extrabold tracking-[0.02em] text-moss-dark uppercase">
                {item.name}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
