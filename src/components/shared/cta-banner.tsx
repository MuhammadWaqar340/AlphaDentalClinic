import Link from "next/link";

import { Button } from "@/components/ui/button";

interface CtaBannerProps {
  title?: string;
  description?: string;
}

export function CtaBanner({
  title = "Ready to Get a Healthier Smile?",
  description = "Request an appointment and our team will confirm availability with you.",
}: CtaBannerProps) {
  return (
    <section className="section-space">
      <div className="container-page">
        <div className="bg-navy relative overflow-hidden rounded-[1.75rem] px-6 py-12 text-white md:px-12 md:py-16">
          <div
            className="bg-primary/30 pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full blur-2xl"
            aria-hidden="true"
          />
          <div
            className="bg-secondary/25 pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full blur-2xl"
            aria-hidden="true"
          />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
            <p className="mt-4 text-base text-white/75 md:text-lg">{description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="text-navy bg-white hover:bg-white/95">
                <Link href="/appointment">Book Appointment</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
