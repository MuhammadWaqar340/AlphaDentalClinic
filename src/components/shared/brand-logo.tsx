import { useId } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type BrandLogoVariant = "full" | "icon";

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  className?: string;
  /** Wrap the mark in a link to the homepage. Defaults to true. */
  linked?: boolean;
  /** Kept for API compatibility with prior Image-based usage. */
  priority?: boolean;
}

function IconMark({ className }: { className?: string }) {
  const gradId = useId().replace(/:/g, "");

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="24"
          y1="12"
          x2="104"
          y2="116"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0CA6C6" />
          <stop offset="0.48" stopColor="#0890C6" />
          <stop offset="1" stopColor="#0866C6" />
        </linearGradient>
      </defs>
      <path
        stroke={`url(#${gradId})`}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M64 14c-15.2 0-26.8 11.2-29.2 26.4-1.8 11.6-3.8 22.2-8.2 32.4-5.2 12.2-3.6 26.4 7.8 33.2 8.2 4.8 15.2-1.6 19.4-12.2 3.2-8.2 5.2-16.6 8.2-16.6s5 8.4 8.2 16.6c4.2 10.6 11.2 17 19.4 12.2 11.4-6.8 13-21 7.8-33.2-4.4-10.2-6.4-20.8-8.2-32.4C90.8 25.2 79.2 14 64 14Z"
      />
      <path
        stroke={`url(#${gradId})`}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M46.5 78.5 64 36.5l17.5 42"
      />
      <path
        stroke={`url(#${gradId})`}
        strokeWidth="6"
        strokeLinecap="round"
        d="M53.5 62.5h21"
      />
      <path
        stroke={`url(#${gradId})`}
        strokeWidth="5"
        strokeLinecap="round"
        d="M97 20v16M89 28h16"
      />
    </svg>
  );
}

function FullLockup({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const iconGrad = `${uid}-icon`;
  const ruleGrad = `${uid}-rule`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 560 200"
      fill="none"
      className={className}
      role="img"
      aria-label="Alpha Dental Clinic"
    >
      <title>Alpha Dental Clinic</title>
      <defs>
        <linearGradient
          id={iconGrad}
          x1="28"
          y1="18"
          x2="150"
          y2="178"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0CA6C6" />
          <stop offset="0.48" stopColor="#0890C6" />
          <stop offset="1" stopColor="#0866C6" />
        </linearGradient>
        <linearGradient
          id={ruleGrad}
          x1="198"
          y1="0"
          x2="520"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0CA6C6" />
          <stop offset="1" stopColor="#0866C6" />
        </linearGradient>
      </defs>

      <g transform="translate(4 8)">
        <path
          stroke={`url(#${iconGrad})`}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M86 10c-20.4 0-36 15-39.2 35.4-2.4 15.6-5.1 29.8-11 43.5-7 16.4-4.8 35.4 10.5 44.5 11 6.4 20.4-2.1 26-16.4 4.3-11 7-22.3 11-22.3s6.7 11.3 11 22.3c5.6 14.3 15 22.8 26 16.4 15.3-9.1 17.5-28.1 10.5-44.5-5.9-13.7-8.6-27.9-11-43.5C122 25 106.4 10 86 10Z"
        />
        <path
          stroke={`url(#${iconGrad})`}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M62.5 96.5 86 40.5l23.5 56"
        />
        <path
          stroke={`url(#${iconGrad})`}
          strokeWidth="6.5"
          strokeLinecap="round"
          d="M71.5 75h29"
        />
        <path
          stroke={`url(#${iconGrad})`}
          strokeWidth="5.5"
          strokeLinecap="round"
          d="M130 18v22M119 29h22"
        />
      </g>

      <text
        x="198"
        y="78"
        fill="#102B50"
        fontFamily="var(--font-manrope), Manrope, Arial, Helvetica, sans-serif"
        fontSize="58"
        fontWeight="700"
        letterSpacing="-0.8"
      >
        Alpha
      </text>
      <text
        x="198"
        y="118"
        fill="#0866C6"
        fontFamily="var(--font-manrope), Manrope, Arial, Helvetica, sans-serif"
        fontSize="28"
        fontWeight="700"
        letterSpacing="1.8"
      >
        DENTAL CLINIC
      </text>
      <rect
        x="198"
        y="134"
        width="310"
        height="3.5"
        rx="1.75"
        fill={`url(#${ruleGrad})`}
      />
      <text
        x="198"
        y="168"
        fill="#64748B"
        fontFamily="var(--font-manrope), Manrope, Arial, Helvetica, sans-serif"
        fontSize="14"
        fontWeight="600"
        letterSpacing="2.6"
      >
        HEALTHY SMILE. HAPPIER YOU.
      </text>
    </svg>
  );
}

/**
 * Official Alpha Dental Clinic brand mark.
 * Crisp inline SVG — full lockup or tooth+A monogram.
 */
export function BrandLogo({
  variant = "full",
  className,
  linked = true,
}: BrandLogoProps) {
  const mark =
    variant === "icon" ? (
      <IconMark
        className={cn("h-10 w-10 shrink-0", className)}
      />
    ) : (
      <FullLockup
        className={cn(
          "h-11 w-auto max-w-[min(100%,13.5rem)] shrink-0 sm:h-12 sm:max-w-[15.5rem]",
          className,
        )}
      />
    );

  if (!linked) {
    return mark;
  }

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex shrink-0 items-center rounded-md py-1.5 outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
        variant === "full" ? "pr-3" : "p-1.5",
      )}
      aria-label="Alpha Dental Clinic home"
    >
      <span className="transition-opacity duration-200 group-hover:opacity-90">
        {mark}
      </span>
    </Link>
  );
}
