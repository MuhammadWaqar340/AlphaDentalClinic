import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";

import { BrandLogo } from "@/components/shared/brand-logo";
import { business } from "@/config/business";
import { footerNavigation } from "@/config/navigation";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const whatsappHref = `https://wa.me/${business.whatsapp.number}`;
  const mapsUrl =
    business.social.googleMapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.location.addressLine.value)}`;

  return (
    <footer className="border-border border-t bg-white">
      <div className="container-page section-space grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="space-y-4">
          <BrandLogo
            variant="full"
            className="h-12 max-w-[min(100%,16rem)] sm:h-14 sm:max-w-[18rem]"
          />
          <p className="text-muted max-w-xs text-sm">{business.shortDescription}</p>
        </div>

        <div>
          <h2 className="text-navy text-sm font-bold tracking-[0.12em] uppercase">
            Clinic
          </h2>
          <ul className="mt-4 space-y-2.5">
            {footerNavigation.clinic.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted hover:text-primary text-sm transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-navy text-sm font-bold tracking-[0.12em] uppercase">
            Dental Services
          </h2>
          <ul className="mt-4 space-y-2.5">
            {footerNavigation.services.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted hover:text-primary text-sm transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-navy text-sm font-bold tracking-[0.12em] uppercase">
            Contact
          </h2>
          <ul className="text-muted mt-4 space-y-3 text-sm">
            <li className="flex gap-2">
              <MapPin className="text-primary mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {business.location.addressLine.value}
                <span className="text-warning mt-1 block text-xs">
                  Directory-reported — confirm before publication
                </span>
              </span>
            </li>
            <li>
              <a
                href={business.phone.telHref}
                className="hover:text-primary inline-flex items-center gap-2"
              >
                <Phone className="text-primary h-4 w-4" />
                {business.phone.value}
              </a>
            </li>
            <li>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary inline-flex items-center gap-2"
              >
                <WhatsAppIcon className="h-4 w-4 text-primary" />
                Chat on WhatsApp
              </a>
            </li>
          </ul>
          <div className="border-border mt-5 overflow-hidden rounded-2xl border">
            <iframe
              title="Alpha Dental Clinic location map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(business.location.addressLine.value)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="h-40 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary mt-2 inline-block text-xs font-medium hover:underline"
          >
            Open in Google Maps
          </a>
        </div>
      </div>

      <div className="border-border border-t">
        <div className="container-page text-muted flex flex-col gap-2 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.name}. All rights reserved.
          </p>
          <p>
            Demo website for client presentation — verify clinic details before launch.
          </p>
        </div>
      </div>
    </footer>
  );
}
