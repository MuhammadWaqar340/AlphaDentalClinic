import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { business } from "@/config/business";

export function Hero() {
  const whatsappHref = `https://wa.me/${business.whatsapp.number}`;

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-white via-background to-[#e8f4fc]">
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-secondary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary">
            {business.name}
          </p>
          <h1 className="mt-4 max-w-xl text-balance text-4xl font-bold text-navy md:text-5xl lg:text-[3.15rem] lg:leading-[1.15]">
            Your Trusted Dental Care Partner in Johar Town
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted md:text-lg">
            Experience comfortable, comprehensive dental care with a team dedicated
            to keeping your smile healthy and confident.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/appointment">Book Appointment</Link>
            </Button>
            <Button asChild size="lg" variant="whatsapp">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted">
            Serving patients across {business.location.displayAddress}.
          </p>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-lg">
            <Image
              src="/images/hero/patient-dentist-smile-v2.jpg"
              alt="Smiling patient with a dentist and dental tools at Alpha Dental Clinic"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
