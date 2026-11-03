import type { DentalService } from "@/types";

export const services: DentalService[] = [
  {
    slug: "general-dentistry",
    name: "General Dentistry",
    shortDescription:
      "Routine check-ups, cleanings, and preventive care to keep your smile healthy year-round.",
    overview:
      "General dentistry forms the foundation of lifelong oral health. Our team provides thorough examinations, professional cleaning, and practical guidance so you can maintain a healthy smile with confidence.",
    benefits: [
      "Early detection of dental concerns",
      "Professional cleaning for healthier gums",
      "Personalised home-care advice",
      "Comfortable, unhurried appointments",
    ],
    reasons: [
      "You are due for a routine dental check-up",
      "You notice sensitivity, bleeding gums, or discomfort",
      "You want a preventive care plan for your family",
      "You need fillings or other restorative treatment",
    ],
    whatToExpect: [
      "A detailed oral examination and discussion of your concerns",
      "Professional cleaning where clinically appropriate",
      "Clear explanation of findings and recommended next steps",
      "A treatment plan tailored to your comfort and priorities",
    ],
    faqs: [
      {
        question: "How often should I visit for a check-up?",
        answer:
          "Many patients benefit from visits every six months, though your dentist may recommend a different interval based on your oral health needs.",
      },
      {
        question: "Do general dentistry visits involve X-rays?",
        answer:
          "Imaging is recommended only when clinically useful. Your dentist will explain why any imaging is suggested before proceeding.",
      },
    ],
    relatedSlugs: ["periodontal-care", "kids-dentistry", "root-canal"],
    image: "/images/services/general-dentistry.jpg",
    icon: "Smile",
    seoTitle: "General Dentistry in Johar Town, Lahore | Alpha Dental Clinic",
    seoDescription:
      "Book general dentistry appointments in Johar Town, Lahore for check-ups, cleanings, and preventive dental care at Alpha Dental Clinic.",
  },
  {
    slug: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    shortDescription:
      "Smile-enhancing treatments designed to improve appearance while respecting oral health.",
    overview:
      "Cosmetic dentistry at Alpha Dental Clinic focuses on natural-looking improvements. We discuss your goals carefully and recommend options that suit your oral health, facial features, and lifestyle.",
    benefits: [
      "Personalised smile assessment",
      "Options tailored to your goals",
      "Emphasis on natural-looking results",
      "Careful planning before treatment begins",
    ],
    reasons: [
      "You want to improve the appearance of your smile",
      "You have uneven, discoloured, or worn teeth",
      "You are considering veneers or bonding",
      "You want a conservative, well-planned approach",
    ],
    whatToExpect: [
      "A consultation to understand your aesthetic goals",
      "Assessment of oral health before cosmetic work",
      "Discussion of suitable treatment options and timelines",
      "A staged plan with clear expectations",
    ],
    faqs: [
      {
        question: "Is cosmetic dentistry only about appearance?",
        answer:
          "Appearance is the focus, but healthy teeth and gums come first. We assess oral health before recommending any cosmetic procedure.",
      },
      {
        question: "How do I know which treatment is right for me?",
        answer:
          "During your consultation we review your goals, bite, enamel condition, and lifestyle to recommend suitable options.",
      },
    ],
    relatedSlugs: ["teeth-whitening", "braces-orthodontics", "general-dentistry"],
    image: "/images/services/cosmetic-dentistry.jpg",
    icon: "Sparkles",
    seoTitle: "Cosmetic Dentist in Lahore | Alpha Dental Clinic Johar Town",
    seoDescription:
      "Explore cosmetic dentistry options in Johar Town, Lahore. Alpha Dental Clinic offers personalised smile enhancement consultations.",
  },
  {
    slug: "dental-implants",
    name: "Dental Implants",
    shortDescription:
      "A durable option for replacing missing teeth and restoring chewing confidence.",
    overview:
      "Dental implants can replace missing teeth with a stable, natural-feeling solution. We assess bone health, medical history, and your goals before recommending whether implant treatment is suitable.",
    benefits: [
      "Stable tooth replacement option",
      "Supports natural chewing function",
      "Helps preserve surrounding bone where suitable",
      "Individualised planning and aftercare guidance",
    ],
    reasons: [
      "You are missing one or more teeth",
      "You want a longer-term alternative to removable dentures",
      "You prefer a fixed replacement solution",
      "You have been advised that implants may be suitable",
    ],
    whatToExpect: [
      "A thorough clinical assessment and imaging where needed",
      "Discussion of suitability, timeline, and aftercare",
      "Clear explanation of each stage of treatment",
      "Follow-up to monitor healing and restoration",
    ],
    faqs: [
      {
        question: "Are dental implants suitable for everyone?",
        answer:
          "Not always. Suitability depends on bone support, gum health, medical history, and other clinical factors assessed during consultation.",
      },
      {
        question: "How long does implant treatment take?",
        answer:
          "Timelines vary. Some cases require healing periods between stages. Your dentist will outline an expected schedule after assessment.",
      },
    ],
    relatedSlugs: ["general-dentistry", "cosmetic-dentistry", "periodontal-care"],
    image: "/images/services/dental-implants.jpg",
    icon: "Bone",
    seoTitle: "Dental Implants in Lahore | Alpha Dental Clinic Johar Town",
    seoDescription:
      "Learn about dental implant consultations in Johar Town, Lahore at Alpha Dental Clinic. Careful assessment and personalised planning.",
  },
  {
    slug: "braces-orthodontics",
    name: "Braces & Orthodontics",
    shortDescription:
      "Alignment care for children, teens, and adults seeking a more balanced smile.",
    overview:
      "Orthodontic care helps improve tooth alignment and bite relationships. We evaluate your needs and discuss suitable options, from traditional braces to other alignment approaches where appropriate.",
    benefits: [
      "Improved tooth alignment and bite function",
      "Options for different age groups",
      "Progress monitoring throughout treatment",
      "Guidance on retainers and long-term care",
    ],
    reasons: [
      "Crowded, spaced, or crooked teeth",
      "Bite concerns affecting comfort or function",
      "A desire for a more even smile",
      "Referral for orthodontic assessment",
    ],
    whatToExpect: [
      "An orthodontic assessment and records where needed",
      "Explanation of suitable treatment pathways",
      "A clear outline of appointments and expected duration",
      "Ongoing adjustments and progress reviews",
    ],
    faqs: [
      {
        question: "Can adults get braces?",
        answer:
          "Yes. Many adults pursue orthodontic treatment. Suitability depends on oral health and the specific alignment concerns.",
      },
      {
        question: "Will treatment be uncomfortable?",
        answer:
          "Some temporary discomfort after adjustments is common. We share practical tips to help you stay comfortable during treatment.",
      },
    ],
    relatedSlugs: ["kids-dentistry", "cosmetic-dentistry", "general-dentistry"],
    image: "/images/services/braces-orthodontics.jpg",
    icon: "AlignCenter",
    seoTitle: "Braces & Orthodontics in Johar Town | Alpha Dental Clinic",
    seoDescription:
      "Orthodontic consultations for braces and alignment care in Johar Town, Lahore at Alpha Dental Clinic.",
  },
  {
    slug: "kids-dentistry",
    name: "Kids Dentistry",
    shortDescription:
      "Gentle, age-appropriate dental care that helps children feel safe and supported.",
    overview:
      "Children’s dentistry focuses on prevention, early guidance, and a calm experience. We help young patients build positive dental habits in a welcoming environment.",
    benefits: [
      "Child-friendly communication and pacing",
      "Preventive guidance for growing smiles",
      "Early identification of developing concerns",
      "Support for nervous young patients",
    ],
    reasons: [
      "Your child’s first dental visit",
      "Routine check-ups for growing teeth",
      "Concerns about cavities or habits",
      "Guidance on brushing and diet",
    ],
    whatToExpect: [
      "A warm introduction to the clinic environment",
      "Age-appropriate examination and discussion with parents",
      "Preventive advice tailored to your child’s stage",
      "Follow-up recommendations as needed",
    ],
    faqs: [
      {
        question: "When should my child first visit the dentist?",
        answer:
          "Many guidelines suggest a first visit around the eruption of the first tooth or by age one. We can advise based on your child’s needs.",
      },
      {
        question: "How do you help anxious children?",
        answer:
          "We use simple explanations, a calm pace, and positive reinforcement so children feel informed and supported.",
      },
    ],
    relatedSlugs: ["general-dentistry", "braces-orthodontics", "periodontal-care"],
    image: "/images/services/kids-dentistry.jpg",
    icon: "Baby",
    seoTitle: "Kids Dentistry in Johar Town Lahore | Alpha Dental Clinic",
    seoDescription:
      "Gentle kids dentistry in Johar Town, Lahore. Alpha Dental Clinic supports children’s oral health with a calm, caring approach.",
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    shortDescription:
      "Professional whitening options to brighten your smile under clinical guidance.",
    overview:
      "Professional teeth whitening can help reduce surface discoloration when clinically appropriate. We assess enamel health and discuss realistic expectations before recommending a whitening approach.",
    benefits: [
      "Clinically supervised whitening options",
      "Assessment before treatment begins",
      "Guidance on maintaining results",
      "Focus on enamel and gum safety",
    ],
    reasons: [
      "Staining from diet, tea, coffee, or smoking",
      "A desire for a brighter smile before an event",
      "Uneven shade after cleaning",
      "Interest in professional rather than at-home products",
    ],
    whatToExpect: [
      "Shade assessment and oral health check",
      "Discussion of suitable whitening options",
      "Clear guidance on sensitivity and aftercare",
      "Advice on maintaining your new shade",
    ],
    faqs: [
      {
        question: "Is professional whitening better than store kits?",
        answer:
          "Professional options are planned around your oral health and shade goals. A consultation helps determine what is appropriate for you.",
      },
      {
        question: "Will whitening make my teeth sensitive?",
        answer:
          "Temporary sensitivity can occur. We discuss ways to minimise discomfort and whether whitening is suitable for you.",
      },
    ],
    relatedSlugs: ["cosmetic-dentistry", "general-dentistry", "periodontal-care"],
    image: "/images/services/teeth-whitening.jpg",
    icon: "Sun",
    seoTitle: "Teeth Whitening in Lahore | Alpha Dental Clinic Johar Town",
    seoDescription:
      "Professional teeth whitening consultations in Johar Town, Lahore at Alpha Dental Clinic. Safe, guided brightening options.",
  },
  {
    slug: "root-canal",
    name: "Root Canal Treatment",
    shortDescription:
      "Comfort-focused endodontic care to treat infected or damaged tooth pulp.",
    overview:
      "Root canal treatment aims to relieve pain from infected or inflamed pulp while helping preserve the natural tooth where possible. We prioritise comfort, clear communication, and careful follow-up.",
    benefits: [
      "Addresses infection within the tooth",
      "May help preserve a natural tooth",
      "Pain relief with comfort-focused care",
      "Clear aftercare and restoration planning",
    ],
    reasons: [
      "Persistent toothache or sensitivity to hot and cold",
      "Swelling or discomfort around a tooth",
      "Deep decay affecting the pulp",
      "Recommendation after dental examination",
    ],
    whatToExpect: [
      "Clinical assessment and imaging where needed",
      "Local anaesthesia for comfort during treatment",
      "Cleaning and sealing of the root canal system",
      "Discussion of crown or restoration needs afterwards",
    ],
    faqs: [
      {
        question: "Is root canal treatment painful?",
        answer:
          "Modern root canal care is performed with local anaesthesia. Many patients report relief once the source of infection is addressed.",
      },
      {
        question: "Will I need a crown afterwards?",
        answer:
          "Often a protective restoration is recommended. Your dentist will advise based on the tooth’s condition and function.",
      },
    ],
    relatedSlugs: ["general-dentistry", "dental-implants", "periodontal-care"],
    image: "/images/services/root-canal.jpg",
    icon: "Activity",
    seoTitle: "Root Canal Treatment in Lahore | Alpha Dental Clinic",
    seoDescription:
      "Root canal treatment consultations in Johar Town, Lahore. Comfort-focused endodontic care at Alpha Dental Clinic.",
  },
  {
    slug: "periodontal-care",
    name: "Periodontal Care",
    shortDescription:
      "Assessment and treatment focused on healthy gums and supporting structures.",
    overview:
      "Periodontal care supports the gums and bone that hold your teeth in place. Early assessment can help manage inflammation and protect long-term oral health.",
    benefits: [
      "Focused gum health assessment",
      "Support for bleeding or inflamed gums",
      "Guidance on effective home care",
      "Monitoring for longer-term stability",
    ],
    reasons: [
      "Bleeding gums when brushing or flossing",
      "Persistent bad breath or gum tenderness",
      "Receding gums or loose teeth concerns",
      "Maintenance after previous gum treatment",
    ],
    whatToExpect: [
      "Detailed gum assessment and risk discussion",
      "Cleaning and therapy tailored to findings",
      "Home-care coaching for lasting results",
      "Review appointments to monitor progress",
    ],
    faqs: [
      {
        question: "Can gum disease be reversed?",
        answer:
          "Early gum inflammation often responds well to professional care and improved hygiene. Advanced disease needs ongoing management. Your dentist will explain your situation clearly.",
      },
      {
        question: "How important is home care?",
        answer:
          "Very. Professional treatment works best alongside consistent brushing, interdental cleaning, and follow-up visits.",
      },
    ],
    relatedSlugs: ["general-dentistry", "dental-implants", "kids-dentistry"],
    image: "/images/services/periodontal-care.jpg",
    icon: "HeartPulse",
    seoTitle: "Periodontal Care in Johar Town | Alpha Dental Clinic Lahore",
    seoDescription:
      "Periodontal and gum care in Johar Town, Lahore. Alpha Dental Clinic helps patients protect gum health with careful assessment.",
  },
];

export function getServiceBySlug(slug: string): DentalService | undefined {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(slugs: string[]): DentalService[] {
  return slugs
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is DentalService => Boolean(service));
}

export const serviceOptions = services.map((service) => ({
  value: service.slug,
  label: service.name,
}));
