import { business } from "./business";

const fallbackUrl = "http://localhost:3000";

export const siteConfig = {
  name: business.name,
  tagline: business.tagline,
  description: business.shortDescription,
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || fallbackUrl,
  locale: "en_PK",
  language: "en",
  creator: business.name,
  ogImage: "/images/og-default.jpg",
  links: {
    appointment: "/appointment",
    contact: "/contact",
    services: "/services",
    about: "/about",
    dentists: "/dentists",
    gallery: "/gallery",
    reviews: "/reviews",
  },
} as const;

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}
