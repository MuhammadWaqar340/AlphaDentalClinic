import Link from "next/link";

import { DentistCard } from "@/components/dentists/dentist-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { dentists } from "@/data/dentists";

export function DentistsPreview() {
  return (
    <section className="section-space bg-white">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Our dentists"
            title="Meet the clinical team"
            description="Dentist profiles below are placeholders until Alpha Dental Clinic confirms real team details."
          />
          <Button asChild variant="outline">
            <Link href="/dentists">View dentists</Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {dentists.map((dentist) => (
            <DentistCard key={dentist.id} dentist={dentist} />
          ))}
        </div>
      </div>
    </section>
  );
}
