import Image from "next/image";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer data-surface="dark" className="bg-night py-14 text-stone/70">
      <div className="container-x">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/images/logo-horizontal-light.png"
              alt=""
              width={900}
              height={390}
              className="h-14 w-auto"
            />
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
            {site.city}, {site.state} · {site.rating.toFixed(1)} stars on Google
          </p>
        </div>
      </div>
    </footer>
  );
}
