import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { DentalService } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { TiltCard } from "@/components/ui/tilt-card";

interface ServiceCardProps {
  service: DentalService;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <TiltCard intensity={7} perspective={1000} className="h-full rounded-2xl">
      <Card className="group border-border h-full overflow-hidden bg-white">
        <div className="bg-background relative aspect-[4/3] overflow-hidden [transform:translateZ(18px)]">
          <Image
            src={service.image}
            alt={`${service.name} at Alpha Dental Clinic`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        <CardContent className="flex h-full flex-col p-5 [transform:translateZ(28px)]">
          <h3 className="text-navy text-lg font-bold">{service.name}</h3>
          <p className="text-muted mt-2 flex-1 text-sm">{service.shortDescription}</p>
          <Link
            href={`/services/${service.slug}`}
            className="text-primary mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5"
          >
            Learn More
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </CardContent>
      </Card>
    </TiltCard>
  );
}
