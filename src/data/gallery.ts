import type { GalleryImage } from "@/types";

export const galleryImages: GalleryImage[] = [
  {
    id: "interior-1",
    src: "/images/gallery/interior-1.jpg",
    alt: "Bright dental clinic treatment room with modern chair",
    category: "interior",
    width: 1200,
    height: 900,
  },
  {
    id: "interior-2",
    src: "/images/gallery/interior-2.jpg",
    alt: "Modern dental clinic interior ready for patient care",
    category: "interior",
    width: 1200,
    height: 800,
  },
  {
    id: "equipment-1",
    src: "/images/gallery/equipment-1.jpg",
    alt: "Dental instruments prepared for treatment",
    category: "equipment",
    width: 1200,
    height: 800,
  },
  {
    id: "equipment-2",
    src: "/images/gallery/equipment-2.jpg",
    alt: "Clinical workspace with dental equipment",
    category: "equipment",
    width: 1200,
    height: 801,
  },
  {
    id: "environment-1",
    src: "/images/gallery/environment-1.jpg",
    alt: "Calm, professional clinic environment",
    category: "environment",
    width: 1200,
    height: 800,
  },
  {
    id: "environment-2",
    src: "/images/gallery/environment-2.jpg",
    alt: "Patient consultation space in a dental clinic",
    category: "environment",
    width: 1200,
    height: 800,
  },
  {
    id: "team-1",
    src: "/images/gallery/team-1.jpg",
    alt: "Dental clinician ready for patient care",
    category: "team",
    width: 1200,
    height: 800,
  },
  {
    id: "team-2",
    src: "/images/gallery/team-2.jpg",
    alt: "Healthcare professional reviewing patient notes",
    category: "team",
    width: 1200,
    height: 800,
  },
];

export const galleryCategories = [
  { id: "all", label: "All" },
  { id: "interior", label: "Clinic Interior" },
  { id: "equipment", label: "Dental Equipment" },
  { id: "environment", label: "Treatment Environment" },
  { id: "team", label: "Team" },
] as const;
