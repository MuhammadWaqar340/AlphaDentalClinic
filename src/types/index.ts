export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface DentalService {
  slug: string;
  name: string;
  shortDescription: string;
  overview: string;
  benefits: string[];
  reasons: string[];
  whatToExpect: string[];
  faqs: ServiceFaq[];
  relatedSlugs: string[];
  image: string;
  icon: string;
  seoTitle: string;
  seoDescription: string;
}

export interface DentistProfile {
  id: string;
  name: string;
  specialty: string;
  qualifications: string[];
  experience: string;
  biography: string;
  image: string;
  isPlaceholder: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  context?: string;
  rating?: number;
  isPlaceholder: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "interior" | "equipment" | "environment" | "team";
  width: number;
  height: number;
}

export interface AppointmentPayload {
  name: string;
  phone: string;
  email?: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  website?: string;
}
