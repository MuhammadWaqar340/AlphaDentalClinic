import { PageHero } from "@/components/shared/page-hero";
import { ServiceCard } from "@/components/services/service-card";
import { CtaBanner } from "@/components/shared/cta-banner";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildMetadata({
  title: "Dental Services in Johar Town, Lahore",
  description:
    "Explore comprehensive dental services at Alpha Dental Clinic — general dentistry, implants, braces, kids dentistry, whitening, root canal, and more.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <PageHero
        title="Comprehensive Dental Care for a Healthy Smile"
        description="Browse our range of dental treatments. Each page explains what to expect without unsupported medical claims."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <section className="section-space">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
