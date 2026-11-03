import { describe, expect, it } from "vitest";

import { cn, createRequestId, getClientIp } from "@/lib/utils";
import { business } from "@/config/business";
import { getServiceBySlug, services } from "@/data/services";
import { RATE_LIMIT_CONFIG } from "@/lib/rate-limit";

describe("cn", () => {
  it("merges class names and resolves conflicts", () => {
    expect(cn("px-2", "px-4", false && "hidden")).toBe("px-4");
  });
});

describe("getClientIp", () => {
  it("prefers x-vercel-forwarded-for first hop", () => {
    const headers = new Headers({
      "x-vercel-forwarded-for": "203.0.113.10, 10.0.0.1",
      "x-real-ip": "198.51.100.2",
    });
    expect(getClientIp(headers)).toBe("203.0.113.10");
  });

  it("falls back to unknown", () => {
    expect(getClientIp(new Headers())).toBe("unknown");
  });
});

describe("createRequestId", () => {
  it("creates a prefixed identifier", () => {
    expect(createRequestId().startsWith("req_")).toBe(true);
  });
});

describe("business configuration", () => {
  it("keeps directory-reported fields marked unverified", () => {
    expect(business.phone.status).toBe("unverified");
    expect(business.location.addressLine.status).toBe("unverified");
    expect(business.hours.status).toBe("placeholder");
  });
});

describe("services data", () => {
  it("exposes eight dental services", () => {
    expect(services).toHaveLength(8);
  });

  it("looks up services by slug", () => {
    expect(getServiceBySlug("root-canal")?.name).toBe("Root Canal Treatment");
  });
});

describe("rate limit config", () => {
  it("uses 5 requests per 10 minutes", () => {
    expect(RATE_LIMIT_CONFIG.maxRequests).toBe(5);
    expect(RATE_LIMIT_CONFIG.window).toBe("10 m");
  });
});
