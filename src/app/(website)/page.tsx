import { Hero } from "@/components/home/hero";
import { TrustIndicators } from "@/components/home/trust-indicators";
import { ServicesPreview } from "@/components/home/services-preview";
import { AboutPreview } from "@/components/home/about-preview";
import { DentistsPreview } from "@/components/home/dentists-preview";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CtaBanner } from "@/components/shared/cta-banner";
import { JsonLd, organizationJsonLd, localBusinessJsonLd } from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Dentist in Johar Town, Lahore",
  description:
    "Alpha Dental Clinic offers comfortable, comprehensive dental care in Johar Town, Lahore. Book an appointment for check-ups, implants, whitening, and more.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationJsonLd(), localBusinessJsonLd()]} />
      <Hero />
      <TrustIndicators />
      <ServicesPreview />
      <AboutPreview />
      <DentistsPreview />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
