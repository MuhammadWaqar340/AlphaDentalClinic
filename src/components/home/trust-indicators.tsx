import { HeartHandshake, Microscope, Sparkles, Sofa } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";

const indicators = [
  {
    title: "Patient-focused care",
    description:
      "Clear explanations, unhurried consultations, and treatment plans shaped around your comfort.",
    icon: HeartHandshake,
  },
  {
    title: "Modern dental technology",
    description:
      "A clinical environment designed to support accurate assessment and careful treatment.",
    icon: Microscope,
  },
  {
    title: "Personalized treatment",
    description:
      "Recommendations based on your oral health needs, goals, and preferred pace of care.",
    icon: Sparkles,
  },
  {
    title: "Comfortable environment",
    description:
      "A calm clinic experience intended to help patients of all ages feel welcome and at ease.",
    icon: Sofa,
  },
];

export function TrustIndicators() {
  return (
    <section className="section-space">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why patients choose us"
          title="Care built around comfort and clarity"
          description="We focus on trustworthy dental care — without exaggerated claims or unverified statistics."
          align="center"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {indicators.map((item) => (
            <TiltCard
              key={item.title}
              intensity={5.5}
              perspective={900}
              className="h-full rounded-2xl"
            >
              <article className="border-border h-full rounded-2xl border bg-white p-5 shadow-sm">
                <div className="bg-primary/10 text-primary mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl [transform:translateZ(24px)]">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-navy text-base font-bold [transform:translateZ(20px)]">
                  {item.title}
                </h3>
                <p className="text-muted mt-2 text-sm [transform:translateZ(14px)]">
                  {item.description}
                </p>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
