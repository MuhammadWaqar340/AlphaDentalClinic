import { FaWhatsapp } from "react-icons/fa6";

import { cn } from "@/lib/utils";

interface WhatsAppIconProps {
  className?: string;
}

/** Official WhatsApp brand mark (Font Awesome). */
export function WhatsAppIcon({ className }: WhatsAppIconProps) {
  return <FaWhatsapp className={cn("h-5 w-5", className)} aria-hidden="true" />;
}
