import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";

import { serviceOptions } from "@/data/services";

const serviceValues = serviceOptions.map((option) => option.value) as [
  string,
  ...string[],
];

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
] as const;

export const appointmentTimeSlots = timeSlots;

function normalizePakistanPhone(raw: string): string | null {
  const trimmed = raw.trim();
  const phone =
    parsePhoneNumberFromString(trimmed, "PK") ?? parsePhoneNumberFromString(trimmed);

  if (!phone || !phone.isValid()) {
    return null;
  }

  return phone.format("E.164");
}

export const appointmentSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Please enter your full name.")
      .max(100, "Name must be 100 characters or fewer.")
      .regex(/^[\p{L}\s'.-]+$/u, "Name contains invalid characters."),
    phone: z
      .string()
      .trim()
      .min(7, "Please enter a valid phone number.")
      .max(20, "Phone number is too long."),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address.")
      .max(254)
      .optional()
      .or(z.literal("")),
    service: z.enum(serviceValues, {
      error: "Please select a preferred service.",
    }),
    preferredDate: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a valid date."),
    preferredTime: z.enum(timeSlots, {
      error: "Please select a preferred time.",
    }),
    message: z
      .string()
      .trim()
      .max(1000, "Message must be 1000 characters or fewer.")
      .optional()
      .or(z.literal("")),
    /** Honeypot — must remain empty. */
    website: z.string().max(0).optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    const normalized = normalizePakistanPhone(data.phone);
    if (!normalized) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Please enter a valid Pakistani or international phone number.",
      });
    }

    const date = new Date(`${data.preferredDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(date.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["preferredDate"],
        message: "Please choose a valid date.",
      });
    } else if (date < today) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["preferredDate"],
        message: "Preferred date cannot be in the past.",
      });
    }
  })
  .transform((data) => {
    const normalizedPhone = normalizePakistanPhone(data.phone)!;
    return {
      name: data.name.trim(),
      phone: normalizedPhone,
      email: data.email ? data.email.trim() : undefined,
      service: data.service,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      message: data.message ? data.message.trim() : undefined,
      website: data.website || "",
    };
  });

export type AppointmentInput = z.input<typeof appointmentSchema>;
export type AppointmentData = z.output<typeof appointmentSchema>;

export const contactSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Please enter your full name.")
      .max(100, "Name must be 100 characters or fewer."),
    phone: z
      .string()
      .trim()
      .min(7, "Please enter a valid phone number.")
      .max(20, "Phone number is too long."),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address.")
      .max(254)
      .optional()
      .or(z.literal("")),
    message: z
      .string()
      .trim()
      .min(10, "Please enter a message of at least 10 characters.")
      .max(1000, "Message must be 1000 characters or fewer."),
    website: z.string().max(0).optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    const normalized = normalizePakistanPhone(data.phone);
    if (!normalized) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Please enter a valid Pakistani or international phone number.",
      });
    }
  })
  .transform((data) => ({
    name: data.name.trim(),
    phone: normalizePakistanPhone(data.phone)!,
    email: data.email ? data.email.trim() : undefined,
    message: data.message.trim(),
    website: data.website || "",
  }));

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

export { normalizePakistanPhone };
