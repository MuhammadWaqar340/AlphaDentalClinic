import { PageHero } from "@/components/shared/page-hero";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildMetadata({
  title: "Clinic Gallery | Alpha Dental Clinic Lahore",
  description:
    "Browse clinic interior, equipment, treatment environment, and team illustrations for Alpha Dental Clinic. Replace with licensed clinic photography before launch.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />
      <PageHero
        title="Gallery"
        description="Demonstration illustrations of clinic spaces and care environments. No identifiable patient treatment photographs are used."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />
      <section className="section-space">
        <div className="container-page">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
