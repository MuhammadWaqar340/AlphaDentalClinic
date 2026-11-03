import Link from "next/link";
import { Quote } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/tilt-card";
import { business } from "@/config/business";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  const googleUrl = business.social.googleBusinessProfileUrl;

  return (
    <section className="section-space">
      <div className="container-page">
        <SectionHeading
          eyebrow="Patient feedback"
          title="What patients say"
          description="The quotes below are demonstration placeholders — not verified Google reviews."
          align="center"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <TiltCard
              key={item.id}
              intensity={5}
              perspective={880}
              className="h-full rounded-2xl"
            >
              <blockquote className="border-border h-full rounded-2xl border bg-white p-6 shadow-sm">
                <Quote
                  className="text-primary/40 h-6 w-6 [transform:translateZ(22px)]"
                  aria-hidden="true"
                />
                {item.isPlaceholder ? (
                  <Badge variant="warning" className="mt-3">
                    Demonstration placeholder
                  </Badge>
                ) : null}
                <p className="text-body mt-4 text-sm [transform:translateZ(18px)]">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="text-navy mt-5 text-sm font-semibold [transform:translateZ(14px)]">
                  {item.author}
                  {item.context ? (
                    <span className="text-muted mt-1 block text-xs font-normal">
                      {item.context}
                    </span>
                  ) : null}
                </footer>
              </blockquote>
            </TiltCard>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-muted text-sm">
            Google review integration will use the clinic&apos;s verified Business Profile
            once confirmed.
          </p>
          {googleUrl ? (
            <Button asChild variant="outline">
              <a href={googleUrl} target="_blank" rel="noopener noreferrer">
                View Google reviews
              </a>
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link href="/reviews">Review page placeholder</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
