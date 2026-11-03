import type { DentistProfile } from "@/types";

/**
 * Placeholder dentist profiles until the clinic confirms real team details.
 * Do not invent doctor names for publication.
 */
export const dentists: DentistProfile[] = [
  {
    id: "placeholder-1",
    name: "Lead Dentist",
    specialty: "General & Restorative Dentistry",
    qualifications: ["Qualifications to be confirmed"],
    experience: "Experience details to be confirmed with the clinic",
    biography:
      "Real dentist name, photo, and credentials will be added once confirmed by Alpha Dental Clinic.",
    image: "/images/dentists/dentist-1.jpg",
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    name: "Associate Dentist",
    specialty: "Cosmetic & Preventive Care",
    qualifications: ["Qualifications to be confirmed"],
    experience: "Experience details to be confirmed with the clinic",
    biography:
      "Placeholder profile for an associate dentist. Replace with verified clinic team information before launch.",
    image: "/images/dentists/dentist-2.jpg",
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    name: "Specialist Dentist",
    specialty: "Orthodontics & Family Care",
    qualifications: ["Specialty credentials to be confirmed"],
    experience: "Experience details to be confirmed with the clinic",
    biography:
      "Placeholder profile for specialist care. Update with verified names and credentials from the clinic.",
    image: "/images/dentists/dentist-3.jpg",
    isPlaceholder: true,
  },
];

