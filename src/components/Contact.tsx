"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import Reveal from "./Reveal";
import Stars from "./Stars";
import { ClockIcon, MailIcon, MessageIcon, PhoneIcon, PinIcon } from "./Icons";

const serviceOptions = [
  "Weekly mowing",
  "Edging & trimming",
  "Mulching & bed maintenance",
  "Spring or fall cleanup",
  "Tree & shrub care",
  "Aeration & lawn renovation",
  "General landscaping",
  "Snow & ice removal",
  "Something else",
];

const fieldClass =
  "w-full rounded-xl border border-moss/20 bg-stone-light px-4 py-3 text-moss-dark transition-colors placeholder:text-moss/40 hover:border-moss/35 focus:border-moss focus:outline-none";

/** Labels inside the cream form card. */
const labelClass =
  "font-display text-xs font-bold tracking-[0.12em] text-moss/70 uppercase";

/** Same labels on the dark moss background, where the above has no contrast. */
const darkLabelClass =
  "font-display text-xs font-bold tracking-[0.12em] text-sage-light uppercase";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const town = String(data.get("town") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();

    const subject = `Quote request${name ? ` from ${name}` : ""}${
      service ? ` (${service})` : ""
    }`;

    const blank = "not provided";
    const body = [
      `Name: ${name || blank}`,
      `Phone: ${phone || blank}`,
      `Email: ${email || blank}`,
      `Town: ${town || blank}`,
      `Service: ${service || blank}`,
      "",
      "Details:",
      details || blank,
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section id="contact" className="bg-moss-dark py-20 text-stone sm:py-28">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-sage-light">Get a free quote</p>
          <h2 className="mt-3 text-[clamp(2rem,5.4vw,3.25rem)] text-stone-light">
            Call or text {site.owner} directly.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-stone/75">
            Fastest way to get a number on your property. Tell us the town and what the
            yard needs. Most quotes come back the same day.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${site.phoneHref}`}
                className="lift flex flex-1 items-center justify-center gap-3 rounded-2xl bg-clay px-6 py-5 font-display text-lg font-extrabold tracking-[-0.02em] text-stone-light transition-colors hover:bg-clay-dark"
              >
                <PhoneIcon className="size-5" />
                Call {site.phoneDisplay}
              </a>
              <a
                href={`sms:${site.phoneHref}`}
                className="lift flex flex-1 items-center justify-center gap-3 rounded-2xl border-2 border-sage/50 px-6 py-5 font-display text-lg font-extrabold tracking-[-0.02em] text-stone-light transition-colors hover:border-sage hover:bg-sage/10"
              >
                <MessageIcon className="size-5" />
                Text us
              </a>
            </div>

            <dl className="mt-8 space-y-7">
              <div className="flex gap-4">
                <MailIcon className="mt-0.5 size-5 shrink-0 text-sage-light" />
                <div>
                  <dt className={darkLabelClass}>Email</dt>
                  <dd className="mt-1.5">
                    <a
                      href={`mailto:${site.email}`}
                      className="text-lg break-all text-stone-light underline decoration-sage/50 underline-offset-4 transition-colors hover:decoration-sage"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <PinIcon className="mt-0.5 size-5 shrink-0 text-sage-light" />
                <div>
                  <dt className={darkLabelClass}>Service area</dt>
                  <dd className="mt-1.5 leading-relaxed text-stone/80">
                    {site.city}, {site.state} and nearby shoreline towns:{" "}
                    {site.serviceArea
                      .filter((town) => town !== site.city)
                      .join(", ")}
                    .
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <ClockIcon className="mt-0.5 size-5 shrink-0 text-sage-light" />
                <div>
                  <dt className={darkLabelClass}>Hours</dt>
                  <dd className="mt-1.5 space-y-1 text-stone/80">
                    {site.hours.map((row) => (
                      <span key={row.days} className="flex flex-wrap gap-x-2">
                        <span className="font-semibold text-stone-light">
                          {row.days}
                        </span>
                        <span>{row.time}</span>
                      </span>
                    ))}
                  </dd>
                </div>
              </div>
            </dl>

            <p className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-stone/15 pt-6 text-sm text-stone/75">
              <Stars size={15} className="text-sage-light" />
              <span className="font-display font-extrabold text-stone-light">
                {site.rating.toFixed(1)} stars on Google
              </span>
              <span aria-hidden="true" className="h-3.5 w-px bg-stone/30" />
              <span>Serving the shoreline since {site.established}</span>
            </p>
          </Reveal>

          <Reveal delay={120}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-stone p-6 text-moss-dark sm:p-8"
            >
              <h3 className="text-xl text-moss-dark sm:text-2xl">
                Or send a quote request
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-moss/70">
                This opens your email app with the details filled in, addressed to{" "}
                {site.owner}.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className={fieldClass}
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className={labelClass}>
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    className={fieldClass}
                    placeholder="(203) 555-0100"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className={labelClass}>
                    Email <span className="normal-case">(optional)</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={fieldClass}
                    placeholder="you@example.com"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="town" className={labelClass}>
                    Town
                  </label>
                  <input
                    id="town"
                    name="town"
                    type="text"
                    required
                    autoComplete="address-level2"
                    className={fieldClass}
                    placeholder="Madison"
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="service" className={labelClass}>
                    What do you need?
                  </label>
                  <select
                    id="service"
                    name="service"
                    defaultValue={serviceOptions[0]}
                    className={fieldClass}
                  >
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="details" className={labelClass}>
                    Details <span className="normal-case">(optional)</span>
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    rows={4}
                    className={`${fieldClass} resize-y`}
                    placeholder="Roughly a half-acre, front and back, plus two beds along the driveway."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-moss px-6 py-4 font-display text-base font-extrabold tracking-[-0.01em] text-stone-light transition-colors hover:bg-moss-dark"
              >
                Send quote request
              </button>

              <p
                role="status"
                aria-live="polite"
                className="mt-3 min-h-[1.25rem] text-center text-sm text-moss/70"
              >
                {sent
                  ? `Your email app should be open now. If nothing happened, email ${site.email} or just call.`
                  : ""}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
