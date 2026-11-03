import { PageHero } from "@/components/shared/page-hero";
import { CtaBanner } from "@/components/shared/cta-banner";
import { ReviewsContent } from "@/components/reviews/reviews-content";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildMetadata({
  title: "Patient Reviews | Alpha Dental Clinic",
  description:
    "Patient feedback page for Alpha Dental Clinic. Verified Google reviews will be linked once the Business Profile is confirmed.",
  path: "/reviews",
});

export default function ReviewsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
        ])}
      />
      <PageHero
        title="Patient Reviews"
        description="We only publish verified patient feedback. Until Google Business Profile details are confirmed, the content below is clearly marked as demonstration material."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Reviews" }]}
      />

      <section className="section-space">
        <div className="container-page">
          <ReviewsContent />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
