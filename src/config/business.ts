/**
 * Centralized clinic business information.
 *
 * Directory-reported values are marked as `unverified`.
 * Confirm with the clinic before presenting them as final public facts.
 */

export type VerificationStatus = "verified" | "unverified" | "placeholder";

export interface ContactDetail {
  value: string;
  status: VerificationStatus;
  note?: string;
}

export const business = {
  name: "Alpha Dental Clinic",
  legalName: "Alpha Dental Clinic",
  tagline: "Healthy Smile. Happier You.",
  shortDescription:
    "A modern dental clinic in Johar Town, Lahore, focused on comfortable, comprehensive care for patients of all ages.",
  longDescription:
    "Alpha Dental Clinic provides patient-centred dental care in Johar Town, Lahore. From routine check-ups to restorative and cosmetic treatments, our team prioritises comfort, clear communication, and carefully planned care.",

  location: {
    area: "Johar Town",
    city: "Lahore",
    country: "Pakistan",
    addressLine: {
      value: "122 Block J, Johar Town, Lahore",
      status: "unverified" as VerificationStatus,
      note: "Directory-reported address. Confirm with the clinic before publication.",
    },
    displayAddress: "Johar Town, Lahore, Pakistan",
  },

  phone: {
    value: "0341 5169411",
    e164: "+923415169411",
    telHref: "tel:+923415169411",
    status: "unverified" as VerificationStatus,
    note: "Directory-reported phone number. Confirm with the clinic before publication.",
  },

  whatsapp: {
    /** Uses the reported phone as a WhatsApp placeholder until confirmed. */
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923415169411",
    status: "placeholder" as VerificationStatus,
    note: "Confirm the WhatsApp Business number with the clinic.",
  },

  email: {
    value: process.env.CLINIC_NOTIFICATION_EMAIL ?? "",
    status: "placeholder" as VerificationStatus,
    note: "Set CLINIC_NOTIFICATION_EMAIL in environment variables.",
  },

  hours: {
    status: "placeholder" as VerificationStatus,
    summary: "Opening hours to be confirmed",
    note: "Do not invent opening hours. Update after clinic confirmation.",
    entries: [] as Array<{ days: string; hours: string }>,
  },

  ratings: {
    google: {
      rating: 4.9,
      reviewCount: 113,
      status: "unverified" as VerificationStatus,
      note: "Directory-reported figures. Do not use in structured data until verified against Google Business Profile.",
    },
  },

  social: {
    googleMapsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ?? "",
    googleBusinessProfileUrl: process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL ?? "",
    facebook: "",
    instagram: "",
    status: "placeholder" as VerificationStatus,
  },

  seo: {
    locality: "Johar Town, Lahore",
    region: "Punjab",
    country: "PK",
    primaryKeywords: [
      "Dentist in Johar Town Lahore",
      "Dental Clinic in Johar Town",
      "Best Dental Clinic in Lahore",
      "Dental Implants in Lahore",
      "Teeth Whitening in Lahore",
      "Cosmetic Dentist in Lahore",
      "Root Canal Treatment in Lahore",
    ],
  },
} as const;

export type BusinessConfig = typeof business;
