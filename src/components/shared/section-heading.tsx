import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}
    >
      {eyebrow ? (
        <p className="text-secondary mb-3 text-sm font-semibold tracking-[0.14em] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-navy text-3xl font-bold text-balance md:text-4xl">{title}</h2>
      {description ? (
        <p className="text-muted mt-4 text-base md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
