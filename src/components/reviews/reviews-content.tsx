import Link from "next/link";
import { BadgeCheck, ExternalLink, FlaskConical, Quote, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TiltCard } from "@/components/ui/tilt-card";
import { business } from "@/config/business";
import { testimonials } from "@/data/testimonials";

export function ReviewsContent() {
  const googleUrl = business.social.googleBusinessProfileUrl;
  const rating = business.ratings.google;

  return (
    <div className="space-y-12">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6">
          <h2 className="text-navy text-xl font-bold">Google review summary</h2>
          <Badge variant="warning" className="mt-3">
            Directory-reported — unverified
          </Badge>
          <div className="text-navy mt-5 flex items-center gap-2">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" aria-hidden="true" />
            <span className="text-2xl font-bold">{rating.rating}</span>
            <span className="text-muted text-sm">
              / 5 · {rating.reviewCount} reviews (reported)
            </span>
          </div>
          <p className="text-muted mt-4 text-sm">{rating.note}</p>
          <p className="text-muted mt-3 text-sm">
            Aggregate ratings are not included in structured data until verified.
          </p>
          {googleUrl ? (
            <Button asChild className="mt-6 w-full">
              <a href={googleUrl} target="_blank" rel="noopener noreferrer">
                Open Google Business Profile
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          ) : (
            <Button asChild variant="outline" className="mt-6 w-full">
              <Link href="/contact">Ask us for the Google listing</Link>
            </Button>
          )}
        </Card>

        <div className="grid gap-6 sm:grid-cols-2">
          <TiltCard intensity={5} className="h-full rounded-2xl">
            <Card className="h-full p-6">
              <span className="text-warning flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 [transform:translateZ(20px)]">
                <FlaskConical className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="text-navy mt-4 text-xl font-semibold [transform:translateZ(16px)]">
                Demonstration placeholders
              </h2>
              <p className="text-muted mt-2 text-sm [transform:translateZ(12px)]">
                The testimonials below are sample content used to preview the page design.
                They are not real patient reviews.
              </p>
            </Card>
          </TiltCard>
          <TiltCard intensity={5} className="h-full rounded-2xl">
            <Card className="h-full p-6">
              <span className="bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-xl [transform:translateZ(20px)]">
                <BadgeCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="text-navy mt-4 text-xl font-semibold [transform:translateZ(16px)]">
                Verified reviews
              </h2>
              <p className="text-muted mt-2 text-sm [transform:translateZ(12px)]">
                Star ratings and review counts are only presented as verified once the
                clinic&apos;s Google Business Profile is confirmed.
              </p>
            </Card>
          </TiltCard>
        </div>
      </div>

      <section aria-labelledby="sample-feedback-heading">
        <div className="flex flex-wrap items-center gap-3">
          <h2 id="sample-feedback-heading" className="text-navy text-2xl font-bold">
            Sample feedback
          </h2>
          <Badge variant="warning">Demonstration placeholders</Badge>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TiltCard
              key={testimonial.id}
              intensity={5}
              className="h-full rounded-2xl"
            >
              <blockquote className="border-border h-full rounded-2xl border bg-white p-5 shadow-sm">
                <Quote
                  className="text-primary/40 h-5 w-5 [transform:translateZ(20px)]"
                  aria-hidden="true"
                />
                {testimonial.isPlaceholder ? (
                  <Badge variant="warning" className="mt-2">
                    Demonstration placeholder
                  </Badge>
                ) : null}
                <p className="text-body mt-3 text-sm [transform:translateZ(16px)]">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <footer className="text-navy mt-4 text-sm font-semibold [transform:translateZ(12px)]">
                  {testimonial.author}
                  <span className="text-muted mt-1 block text-xs font-normal">
                    {testimonial.context ?? "Demonstration testimonial"}
                  </span>
                </footer>
              </blockquote>
            </TiltCard>
          ))}
        </div>
      </section>
    </div>
  );
}
