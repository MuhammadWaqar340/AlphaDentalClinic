import { business } from "@/config/business";
import { siteConfig, absoluteUrl } from "@/config/site";
import type { DentalService } from "@/types";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": absoluteUrl("/#organization"),
    name: business.name,
    description: business.shortDescription,
    url: siteConfig.url,
    telephone: business.phone.e164,
    image: absoluteUrl("/images/og-default.jpg"),
    address: {
      "@type": "PostalAddress",
      streetAddress: business.location.addressLine.value,
      addressLocality: business.location.city,
      addressRegion: business.seo.region,
      addressCountry: business.seo.country,
    },
    areaServed: {
      "@type": "Place",
      name: business.location.displayAddress,
    },
    priceRange: "$$",
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": absoluteUrl("/#localbusiness"),
    name: business.name,
    description: business.shortDescription,
    url: siteConfig.url,
    telephone: business.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.location.addressLine.value,
      addressLocality: business.location.city,
      addressRegion: business.seo.region,
      addressCountry: business.seo.country,
    },
  };
}

export function serviceJsonLd(service: DentalService) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.shortDescription,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: {
      "@type": "Dentist",
      name: business.name,
      url: siteConfig.url,
    },
    areaServed: business.location.displayAddress,
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
