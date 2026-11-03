import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/shared/page-hero";
import { CtaBanner } from "@/components/shared/cta-banner";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/tilt-card";
import { business } from "@/config/business";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildMetadata({
  title: "About Alpha Dental Clinic | Johar Town, Lahore",
  description:
    "Learn about Alpha Dental Clinic’s patient-first philosophy, modern clinical environment, and commitment to comfortable dental care in Johar Town, Lahore.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />
      <PageHero
        title="About Alpha Dental Clinic"
        description="A modern dental clinic in Johar Town focused on clear communication, comfortable visits, and carefully planned care."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      <section className="section-space">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div className="border-border relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border shadow-md">
            <Image
              src="/images/about/clinic.jpg"
              alt="Alpha Dental Clinic treatment environment"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-navy text-3xl font-bold">Clinic introduction</h2>
            <p className="text-muted">{business.longDescription}</p>
            <p className="text-muted">
              Whether you need a routine check-up, restorative treatment, or a cosmetic
              consultation, our goal is to help you feel informed and supported at every
              step.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <TiltCard intensity={5.5} className="h-full rounded-2xl">
            <article className="border-border h-full rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-navy text-xl font-bold [transform:translateZ(18px)]">
                Mission
              </h2>
              <p className="text-muted mt-3 [transform:translateZ(12px)]">
                To provide accessible, high-quality dental care that helps patients in Johar
                Town and across Lahore maintain healthier, more confident smiles.
              </p>
            </article>
          </TiltCard>
          <TiltCard intensity={5.5} className="h-full rounded-2xl">
            <article className="border-border h-full rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-navy text-xl font-bold [transform:translateZ(18px)]">
                Vision
              </h2>
              <p className="text-muted mt-3 [transform:translateZ(12px)]">
                To be a trusted neighbourhood dental clinic known for comfort, clinical
                integrity, and a warm patient experience.
              </p>
            </article>
          </TiltCard>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page grid gap-8 lg:grid-cols-3">
          {[
            {
              title: "Patient-first philosophy",
              body: "We listen carefully, explain options clearly, and never rush important decisions about your care.",
            },
            {
              title: "Clinic facilities",
              body: "A clean, organised clinical environment designed to support comfortable examinations and treatments.",
            },
            {
              title: "Dental technology",
              body: "Modern tools and careful processes help us assess needs accurately and plan appropriate care.",
            },
          ].map((item) => (
            <TiltCard
              key={item.title}
              intensity={5}
              className="h-full rounded-2xl"
            >
              <article className="border-border h-full rounded-2xl border bg-white p-6">
                <h2 className="text-navy text-lg font-bold [transform:translateZ(18px)]">
                  {item.title}
                </h2>
                <p className="text-muted mt-3 text-sm [transform:translateZ(12px)]">
                  {item.body}
                </p>
              </article>
            </TiltCard>
          ))}
        </div>
        <div className="container-page mt-10">
          <Button asChild>
            <Link href="/dentists">Meet our dentists</Link>
          </Button>
        </div>
      </section>

      <CtaBanner
        title="Ready to visit Alpha Dental Clinic?"
        description="Request an appointment and we will confirm a suitable time with you."
      />
    </>
  );
}
