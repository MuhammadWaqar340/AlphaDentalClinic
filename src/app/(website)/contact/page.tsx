import { Clock3, MapPin, Phone } from "lucide-react";

import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";

import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { business } from "@/config/business";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildMetadata({
  title: "Contact Alpha Dental Clinic | Johar Town Lahore",
  description:
    "Contact Alpha Dental Clinic in Johar Town, Lahore. Call, WhatsApp, or send an enquiry. Address and hours should be confirmed with the clinic.",
  path: "/contact",
});

export default function ContactPage() {
  const whatsappHref = `https://wa.me/${business.whatsapp.number}`;
  const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(business.location.addressLine.value)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero
        title="Contact Us"
        description="Reach the clinic by phone, WhatsApp, or the enquiry form. We will respond to confirm details."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="section-space">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="border-border rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-navy text-xl font-bold">Clinic details</h2>
              <ul className="text-body mt-5 space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="text-primary mt-0.5 h-5 w-5" />
                  <span>
                    {business.location.addressLine.value}
                    <span className="text-warning mt-1 block text-xs">
                      Directory-reported — confirm before publication
                    </span>
                  </span>
                </li>
                <li className="flex gap-3">
                  <Phone className="text-primary mt-0.5 h-5 w-5" />
                  <a href={business.phone.telHref} className="hover:text-primary">
                    {business.phone.value}
                  </a>
                </li>
                <li className="flex gap-3">
                  <WhatsAppIcon className="mt-0.5 h-5 w-5 text-primary" />
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    Chat on WhatsApp
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock3 className="text-primary mt-0.5 h-5 w-5" />
                  <span>
                    {business.hours.summary}
                    <span className="text-warning mt-1 block text-xs">
                      {business.hours.note}
                    </span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="border-border overflow-hidden rounded-2xl border shadow-sm">
              <iframe
                title="Google Map showing Alpha Dental Clinic area"
                src={mapsEmbed}
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="border-border rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-navy text-xl font-bold">Send an enquiry</h2>
            <p className="text-muted mt-2 text-sm">
              Prefer a full appointment request?{" "}
              <a
                href="/appointment"
                className="text-primary font-semibold hover:underline"
              >
                Use the appointment form
              </a>
              .
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
