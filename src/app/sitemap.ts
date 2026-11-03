import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/dentists",
    "/gallery",
    "/reviews",
    "/contact",
    "/appointment",
  ];

  const lastModified = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route || "/"}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...services.map((service) => ({
      url: `${siteConfig.url}/services/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
