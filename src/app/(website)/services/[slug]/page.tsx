import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { ServiceCard } from "@/components/services/service-card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getRelatedServices, getServiceBySlug, services } from "@/data/services";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo/json-ld";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return buildMetadata({
      title: "Service not found",
      description: "The requested dental service could not be found.",
      path: `/services/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedServices(service.relatedSlugs);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
          serviceJsonLd(service),
          faqJsonLd(service.faqs),
        ]}
      />
      <PageHero
        title={service.name}
        description={service.shortDescription}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
      />

      <section className="section-space">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div>
              <h2 className="text-navy text-2xl font-bold">Treatment overview</h2>
              <p className="text-muted mt-3">{service.overview}</p>
              <p className="text-muted mt-3 text-sm">
                Information on this page is educational and does not guarantee treatment
                outcomes. Your dentist will advise based on a clinical assessment.
              </p>
            </div>

            <div>
              <h2 className="text-navy text-2xl font-bold">
                Common reasons patients seek treatment
              </h2>
              <ul className="mt-4 space-y-2">
                {service.reasons.map((reason) => (
                  <li key={reason} className="text-body flex gap-2 text-sm">
                    <Check className="text-secondary mt-0.5 h-4 w-4 shrink-0" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-navy text-2xl font-bold">Treatment benefits</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {service.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="border-border text-body rounded-xl border bg-white px-4 py-3 text-sm"
                  >
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-navy text-2xl font-bold">What to expect</h2>
              <ol className="mt-4 space-y-3">
                {service.whatToExpect.map((step, index) => (
                  <li key={step} className="text-body flex gap-3 text-sm">
                    <span className="bg-primary/10 text-primary flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="text-navy text-2xl font-bold">Frequently asked questions</h2>
              <Accordion type="single" collapsible className="mt-4">
                {service.faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="border-border relative aspect-[4/3] overflow-hidden rounded-2xl border shadow-sm">
              <Image
                src={service.image}
                alt={`${service.name} at Alpha Dental Clinic`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="border-border rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-navy text-lg font-bold">Book a consultation</h2>
              <p className="text-muted mt-2 text-sm">
                Request an appointment for {service.name}. The clinic will confirm
                availability.
              </p>
              <Button asChild className="mt-4 w-full">
                <Link href="/appointment">Book Appointment</Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      {related.length ? (
        <section className="section-space bg-white">
          <div className="container-page">
            <h2 className="text-navy text-2xl font-bold">Related services</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ServiceCard key={item.slug} service={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
