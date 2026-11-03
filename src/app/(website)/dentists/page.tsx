import { PageHero } from "@/components/shared/page-hero";
import { DentistCard } from "@/components/dentists/dentist-card";
import { CtaBanner } from "@/components/shared/cta-banner";
import { dentists } from "@/data/dentists";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildMetadata({
  title: "Our Dentists | Alpha Dental Clinic Johar Town",
  description:
    "Meet the dental team at Alpha Dental Clinic in Johar Town, Lahore. Profiles are placeholders until clinic details are confirmed.",
  path: "/dentists",
});

export default function DentistsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Our Dentists", path: "/dentists" },
        ])}
      />
      <PageHero
        title="Our Dentists"
        description="Professional dentist profiles will be updated with verified names, qualifications, and photographs once confirmed by the clinic."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our Dentists" }]}
      />
      <section className="section-space">
        <div className="container-page grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {dentists.map((dentist) => (
            <DentistCard key={dentist.id} dentist={dentist} />
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
