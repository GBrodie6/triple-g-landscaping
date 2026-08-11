import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "Owner-operated lawn care and landscaping in Madison, CT. Mowing, edging, mulching, cleanups, tree and shrub care, aeration, and snow removal. 5.0 stars on Google.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Lawn Care & Landscaping in ${site.city}, ${site.state}`,
    template: `%s | ${site.name}`,
  },
  description,
  keywords: [
    "lawn care Madison CT",
    "landscaping Madison CT",
    "lawn mowing Connecticut shoreline",
    "mulching Madison CT",
    "spring and fall cleanup Madison CT",
    "leaf removal Madison CT",
    "tree and shrub pruning Madison CT",
    "lawn aeration and overseeding Madison CT",
    "landscape design and installation Madison CT",
    "snow plowing Madison CT",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: `${site.name} | Lawn Care & Landscaping in ${site.city}, ${site.state}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Lawn Care & Landscaping in ${site.city}, ${site.state}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#2c3b1f",
  colorScheme: "light",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LandscapingBusiness",
  name: site.name,
  description,
  url: siteUrl,
  telephone: site.phoneDisplay,
  email: site.email,
  founder: { "@type": "Person", name: site.owner },
  foundingDate: String(site.established),
  image: `${siteUrl}/images/lawn-1.jpg`,
  logo: `${siteUrl}/images/logo.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.state,
    addressCountry: "US",
  },
  areaServed: site.serviceArea.map((town) => ({
    "@type": "City",
    name: `${town}, ${site.state}`,
  })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.rating,
    reviewCount: site.reviewCount,
    bestRating: 5,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:30",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "08:30",
      closes: "17:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Lawn care & landscaping services",
    itemListElement: [
      "Weekly mowing",
      "Edging and trimming",
      "Mulching and bed maintenance",
      "Spring and fall cleanups",
      "Tree and shrub care",
      "Aeration and lawn renovation",
      "General landscaping",
      "Snow and ice removal",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        {children}
        <script
          type="application/ld+json"
          // Static, build-time literal. No user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}
