import { describe, expect, it } from "vitest";

import {
  appointmentSchema,
  contactSchema,
  normalizePakistanPhone,
} from "@/lib/validations/appointment";

const tomorrow = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
};

describe("normalizePakistanPhone", () => {
  it("normalizes local Pakistani mobile numbers", () => {
    expect(normalizePakistanPhone("0341 5169411")).toBe("+923415169411");
  });

  it("rejects invalid numbers", () => {
    expect(normalizePakistanPhone("123")).toBeNull();
  });
});

describe("appointmentSchema", () => {
  it("accepts a valid appointment payload", () => {
    const result = appointmentSchema.safeParse({
      name: "Ayesha Khan",
      phone: "03415169411",
      email: "ayesha@example.com",
      service: "general-dentistry",
      preferredDate: tomorrow(),
      preferredTime: "10:00",
      message: "Morning preferred",
      website: "",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.phone).toBe("+923415169411");
    }
  });

  it("rejects missing required fields", () => {
    const result = appointmentSchema.safeParse({
      name: "",
      phone: "",
      service: "",
      preferredDate: "",
      preferredTime: "",
    });

    expect(result.success).toBe(false);
  });

  it("rejects past dates", () => {
    const result = appointmentSchema.safeParse({
      name: "Ali Raza",
      phone: "+923001234567",
      service: "teeth-whitening",
      preferredDate: "2020-01-01",
      preferredTime: "11:00",
      website: "",
    });

    expect(result.success).toBe(false);
  });

  it("rejects honeypot content at transform boundary via max length", () => {
    const result = appointmentSchema.safeParse({
      name: "Ali Raza",
      phone: "+923001234567",
      service: "teeth-whitening",
      preferredDate: tomorrow(),
      preferredTime: "11:00",
      website: "https://spam.example",
    });

    expect(result.success).toBe(false);
  });
});

describe("contactSchema", () => {
  it("requires a message of meaningful length", () => {
    const result = contactSchema.safeParse({
      name: "Sara Ahmed",
      phone: "03001234567",
      message: "Hi",
      website: "",
    });

    expect(result.success).toBe(false);
  });

  it("accepts a valid contact message", () => {
    const result = contactSchema.safeParse({
      name: "Sara Ahmed",
      phone: "03001234567",
      message: "I would like clinic timings please.",
      website: "",
    });

    expect(result.success).toBe(true);
  });
});
