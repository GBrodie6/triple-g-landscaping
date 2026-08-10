import Image from "next/image";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-moss-deep py-14 text-stone/70">
      <div className="container-x">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-11 place-items-center rounded-xl bg-stone-light">
                <Image
                  src="/images/logo.png"
                  alt=""
                  width={44}
                  height={44}
                  className="size-9 object-contain"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-base font-extrabold tracking-[-0.03em] text-stone-light uppercase">
                  Triple G
                </span>
                <span className="font-display text-[0.6rem] font-bold tracking-[0.22em] text-stone/60 uppercase">
                  Landscaping
                </span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              Owner-operated lawn care and landscaping on the Connecticut shoreline
              since {site.established}.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xs font-bold tracking-[0.16em] text-sage-light uppercase">
              Contact
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="text-stone-light transition-colors hover:text-sage-light"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="break-all transition-colors hover:text-sage-light"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`sms:${site.phoneHref}`}
                  className="transition-colors hover:text-sage-light"
                >
                  Text for a quote
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xs font-bold tracking-[0.16em] text-sage-light uppercase">
              Service area
            </h2>
            <p className="mt-4 text-sm leading-relaxed">
              {site.serviceArea.join(" · ")}
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              and nearby shoreline towns.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xs font-bold tracking-[0.16em] text-sage-light uppercase">
              Hours
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {site.hours.map((row) => (
                <li key={row.days}>
                  <span className="block text-stone-light">{row.days}</span>
                  <span>{row.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-stone/15 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            {site.city}, {site.state} · {site.rating.toFixed(1)} stars from{" "}
            {site.reviewCount} Google reviews
          </p>
        </div>
      </div>
    </footer>
  );
}
