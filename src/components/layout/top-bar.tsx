import { Clock3, MapPin, Phone } from "lucide-react";

import { business } from "@/config/business";

export function TopBar() {
  return (
    <div className="border-border/80 bg-navy hidden border-b text-white md:block">
      <div className="container-page flex items-center justify-between gap-4 py-2.5 text-xs">
        <div className="flex flex-wrap items-center gap-4 lg:gap-6">
          <span
            className="inline-flex items-center gap-1.5"
            title={
              business.location.addressLine.status !== "verified"
                ? business.location.addressLine.note
                : undefined
            }
          >
            <MapPin className="text-secondary h-3.5 w-3.5" aria-hidden="true" />
            <span>{business.location.displayAddress}</span>
          </span>
          <a
            href={business.phone.telHref}
            className="hover:text-secondary inline-flex items-center gap-1.5"
            title={business.phone.status !== "verified" ? business.phone.note : undefined}
          >
            <Phone className="text-secondary h-3.5 w-3.5" aria-hidden="true" />
            {business.phone.value}
          </a>
        </div>
        <span
          className="inline-flex items-center gap-1.5 text-white/80"
          title={business.hours.status !== "verified" ? business.hours.note : undefined}
        >
          <Clock3 className="text-secondary h-3.5 w-3.5" aria-hidden="true" />
          {business.hours.summary}
        </span>
      </div>
    </div>
  );
}
