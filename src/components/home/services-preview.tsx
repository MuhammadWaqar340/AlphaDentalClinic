import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/services/service-card";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";

export function ServicesPreview() {
  return (
    <section className="section-space bg-white">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Our services"
            title="Comprehensive dental care for every smile"
            description="From preventive check-ups to restorative and cosmetic treatments, explore care options tailored to your needs."
          />
          <Button asChild variant="outline" className="shrink-0 self-start md:self-auto">
            <Link href="/services">View all services</Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
