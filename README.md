# Triple G Landscaping

Marketing site for [Triple G Landscaping](https://github.com/GBrodie6/triple-g-landscaping) —
residential lawn care and landscaping in Madison, CT and the surrounding
shoreline towns.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · deployed on Vercel.

## Local development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
```

## Project layout

```
src/app/          layout, page, global styles, favicon + OG image
src/components/   section components (Hero, Services, Gallery, Reviews, …)
src/lib/site.ts   all business facts — phone, email, hours, service area
public/images/    real job photos, web-optimized
scripts/          one-off image optimization script
```

## Assets

Photos are real customer properties. `scripts/optimize-images.mjs` reads the
untouched camera files from `public/images/originals` (gitignored), bakes in
EXIF rotation, resizes to 2400px, and regenerates `icon.png`, `apple-icon.png`,
and `opengraph-image.jpg`.

## Deployment

Pushed to Vercel production with `vercel --prod`. The site URL is resolved at
build time from `NEXT_PUBLIC_SITE_URL`, falling back to Vercel's
`VERCEL_PROJECT_PRODUCTION_URL`, so attaching a custom domain needs no code
change.
