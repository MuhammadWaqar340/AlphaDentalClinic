import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { business } from "@/config/business";

export function AboutPreview() {
  return (
    <section className="section-space">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="border-border relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border bg-white shadow-md">
          <Image
            src="/images/about/clinic.jpg"
            alt="Alpha Dental Clinic treatment environment"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <p className="text-secondary text-sm font-semibold tracking-[0.14em] uppercase">
            About the clinic
          </p>
          <h2 className="text-navy mt-3 text-3xl font-bold md:text-4xl">
            A calm, modern dental home in Johar Town
          </h2>
          <p className="text-muted mt-4 text-base md:text-lg">
            {business.longDescription}
          </p>
          <ul className="text-body mt-6 space-y-3 text-sm">
            <li className="flex gap-2">
              <span className="bg-primary mt-1 h-2 w-2 shrink-0 rounded-full" />
              Clear communication before every treatment step
            </li>
            <li className="flex gap-2">
              <span className="bg-primary mt-1 h-2 w-2 shrink-0 rounded-full" />
              Family-friendly care for children and adults
            </li>
            <li className="flex gap-2">
              <span className="bg-primary mt-1 h-2 w-2 shrink-0 rounded-full" />
              Focus on comfort, prevention, and lasting oral health
            </li>
          </ul>
          <Button asChild className="mt-8">
            <Link href="/about">Learn more about us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
