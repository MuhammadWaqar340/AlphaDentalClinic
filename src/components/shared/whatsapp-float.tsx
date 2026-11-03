"use client";

import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { business } from "@/config/business";
import { cn } from "@/lib/utils";

interface WhatsAppFloatProps {
  className?: string;
  message?: string;
}

export function WhatsAppFloat({
  className,
  message = "Hello Alpha Dental Clinic, I would like to ask about an appointment.",
}: WhatsAppFloatProps) {
  const number = (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? business.whatsapp.number
  ).replace(/\D/g, "");

  if (!number) return null;

  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Alpha Dental Clinic on WhatsApp"
      className={cn(
        "fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2",
        className,
      )}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
