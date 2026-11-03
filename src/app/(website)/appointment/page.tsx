import { PageHero } from "@/components/shared/page-hero";
import { AppointmentForm } from "@/components/appointment/appointment-form";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildMetadata({
  title: "Book an Appointment | Alpha Dental Clinic",
  description:
    "Request a dental appointment at Alpha Dental Clinic in Johar Town, Lahore. Enquiries require clinic confirmation of availability.",
  path: "/appointment",
});

export default function AppointmentPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Book Appointment", path: "/appointment" },
        ])}
      />
      <PageHero
        title="Book an Appointment"
        description="Submit your preferred date and service. This is an appointment request — the clinic must confirm availability before your visit is booked."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Book Appointment" }]}
      />
      <section className="section-space">
        <div className="container-page max-w-3xl">
          <div className="border-border rounded-2xl border bg-white p-6 shadow-sm md:p-8">
            <AppointmentForm />
          </div>
        </div>
      </section>
    </>
  );
}
