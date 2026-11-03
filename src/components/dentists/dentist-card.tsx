import Image from "next/image";
import Link from "next/link";

import type { DentistProfile } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TiltCard } from "@/components/ui/tilt-card";

interface DentistCardProps {
  dentist: DentistProfile;
}

export function DentistCard({ dentist }: DentistCardProps) {
  return (
    <TiltCard intensity={6} perspective={1100} className="h-full rounded-2xl">
      <Card className="flex h-full flex-col overflow-hidden bg-white">
        <div className="bg-background relative aspect-[4/5] [transform:translateZ(16px)]">
          <Image
            src={dentist.image}
            alt={
              dentist.isPlaceholder
                ? `${dentist.name} placeholder portrait`
                : `Portrait of ${dentist.name}`
            }
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <CardContent className="flex flex-1 flex-col space-y-3 p-5 [transform:translateZ(26px)]">
          {dentist.isPlaceholder ? (
            <Badge variant="warning">Awaiting clinic confirmation</Badge>
          ) : null}
          <div>
            <h3 className="text-navy text-lg font-bold">{dentist.name}</h3>
            <p className="text-primary mt-1 text-sm font-medium">{dentist.specialty}</p>
          </div>
          <ul className="text-muted space-y-1 text-sm">
            {dentist.qualifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-body flex-1 text-sm">{dentist.biography}</p>
          <Button asChild className="w-full">
            <Link href="/appointment">Book Appointment</Link>
          </Button>
        </CardContent>
      </Card>
    </TiltCard>
  );
}
