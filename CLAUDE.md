# Triple G Landscaping — project conventions

Marketing site for Triple G Landscaping, a residential lawn care and landscaping
company in Madison, CT run by Owen. Next.js App Router, TypeScript, Tailwind v4.

## Standing convention — run this every session, without being asked

At the end of any session where files changed, do all four steps in order:

1. `npm run build` — confirm the production build passes with no errors.
2. Commit the work with a clear message.
3. `git push` to GitHub (`GBrodie6/triple-g-landscaping`, branch `main`).
4. `vercel --prod` — deploy to Vercel production.

Do not wait to be asked for any of these. If the build fails, fix it before
committing rather than pushing broken code.

## Copy rules

- **Never use em dashes (—) in any copy on this site.** Use a comma, or split
  the sentence in two. This applies to every user-facing string: headings, body
  copy, captions, button labels, form labels and placeholders, alt text, and
  page metadata. Verbatim customer reviews are the one exception, since those
  are quoted exactly as written.

## Things to know

- **No backend.** The quote form composes a `mailto:` link to
  tripleglandscaping18@gmail.com. Don't add an API route or a form service
  unless asked.
- **Never hardcode the deployment URL.** `siteUrl` in `src/lib/site.ts` reads
  `NEXT_PUBLIC_SITE_URL`, then falls back to Vercel's
  `VERCEL_PROJECT_PRODUCTION_URL`. A custom domain will be attached later and
  must not require a code change.
- **Business facts live in `src/lib/site.ts`.** Phone, email, hours, service
  area, and the review count are all there — change them in one place.
- **Photos are real customer properties.** Everything in `public/images` was
  shot on actual jobs. Don't replace them with stock imagery, and keep alt text
  specific ("freshly mowed lawn in Madison, CT", never "landscaping photo").
- **Image sources are portrait** except `lawn-1.jpg`. Frames use `fill` +
  `object-cover` with a tuned `objectPosition`; check crops after layout
  changes. Originals live in `public/images/originals` (gitignored) and
  `scripts/optimize-images.mjs` regenerates the web copies, the favicon, and
  the OG image.
- **Reviews are real Google reviews.** Attribution is first name plus last
  initial only. Don't invent testimonials or change the rating.
- **Motion is restrained.** Subtle reveals on scroll, staggered in the gallery
  and reviews, hover lift on cards. Everything is disabled under
  `prefers-reduced-motion` in `globals.css` — keep it that way.
- **Accessibility.** Semantic sections, a skip link, and a visible `:focus-visible`
  outline. Don't remove focus styles.
