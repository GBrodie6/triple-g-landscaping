export const site = {
  name: "Triple G Landscaping",
  owner: "Owen",
  tagline: "Residential lawn care & landscaping on the Connecticut shoreline.",
  phoneDisplay: "(203) 994-1680",
  phoneHref: "+12039941680",
  email: "tripleglandscaping18@gmail.com",
  established: 2019,
  city: "Madison",
  state: "CT",
  serviceArea: [
    "Madison",
    "Guilford",
    "Clinton",
    "Killingworth",
    "Westbrook",
    "Durham",
  ],
  rating: 5.0,
  /**
   * Structured data only. The review count is deliberately kept out of visible
   * copy, which says "5.0 stars on Google" with no number attached.
   */
  reviewCount: 7,
  hours: [
    { days: "Monday – Friday", time: "7:30am – 5:00pm" },
    { days: "Saturday – Sunday", time: "8:30am – 5:00pm" },
  ],
} as const;

/**
 * Resolved at build time. Vercel sets VERCEL_PROJECT_PRODUCTION_URL to the
 * project's production domain, and updates it automatically once a custom
 * domain is attached, so no deployment URL is ever hardcoded here.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
