import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  description?: string;
  eyebrow?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  children?: ReactNode;
  className?: string;
}

export function PageHero({
  title,
  description,
  eyebrow,
  breadcrumbs,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "border-border relative overflow-hidden border-b bg-white py-12 md:py-16",
        className,
      )}
    >
      <div
        className="bg-primary/10 pointer-events-none absolute -top-20 -right-16 h-64 w-64 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="bg-secondary/10 pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div className="container-page relative">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <Breadcrumbs items={breadcrumbs} />
        ) : null}
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-secondary mb-3 text-sm font-semibold tracking-[0.14em] uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-navy text-3xl font-bold text-balance md:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="text-muted mt-4 text-base md:text-lg">{description}</p>
          ) : null}
          {children ? <div className="mt-6">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
