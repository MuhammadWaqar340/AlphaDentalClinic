export interface NavItem {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  {
    title: "Services",
    href: "/services",
    children: [
      {
        title: "General Dentistry",
        href: "/services/general-dentistry",
        description: "Check-ups, cleanings, and everyday dental care",
      },
      {
        title: "Cosmetic Dentistry",
        href: "/services/cosmetic-dentistry",
        description: "Smile-enhancing treatments tailored to you",
      },
      {
        title: "Dental Implants",
        href: "/services/dental-implants",
        description: "Durable tooth replacement solutions",
      },
      {
        title: "Braces & Orthodontics",
        href: "/services/braces-orthodontics",
        description: "Alignment care for children and adults",
      },
      {
        title: "Kids Dentistry",
        href: "/services/kids-dentistry",
        description: "Gentle dental care for young patients",
      },
      {
        title: "Teeth Whitening",
        href: "/services/teeth-whitening",
        description: "Professional brightening treatments",
      },
      {
        title: "Root Canal Treatment",
        href: "/services/root-canal",
        description: "Comfort-focused endodontic care",
      },
      {
        title: "Periodontal Care",
        href: "/services/periodontal-care",
        description: "Gum health assessment and treatment",
      },
    ],
  },
  { title: "Our Dentists", href: "/dentists" },
  { title: "Gallery", href: "/gallery" },
  { title: "Reviews", href: "/reviews" },
  { title: "Contact", href: "/contact" },
];

export const footerNavigation = {
  clinic: [
    { title: "About Us", href: "/about" },
    { title: "Our Dentists", href: "/dentists" },
    { title: "Gallery", href: "/gallery" },
    { title: "Reviews", href: "/reviews" },
    { title: "Contact", href: "/contact" },
  ],
  services: [
    { title: "General Dentistry", href: "/services/general-dentistry" },
    { title: "Cosmetic Dentistry", href: "/services/cosmetic-dentistry" },
    { title: "Dental Implants", href: "/services/dental-implants" },
    { title: "Braces & Orthodontics", href: "/services/braces-orthodontics" },
    { title: "Kids Dentistry", href: "/services/kids-dentistry" },
    { title: "Teeth Whitening", href: "/services/teeth-whitening" },
  ],
} as const;
