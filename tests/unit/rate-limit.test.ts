import { beforeEach, describe, expect, it, vi } from "vitest";

describe("checkRateLimit", () => {
  beforeEach(() => {
    vi.resetModules();
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
  });

  it("bypasses safely when Redis is not configured", async () => {
    const { checkRateLimit, rateLimitHeaders } = await import("@/lib/rate-limit");
    const result = await checkRateLimit("appointments", "127.0.0.1");

    expect(result.success).toBe(true);
    expect(result.bypassed).toBe(true);

    const headers = rateLimitHeaders(result);
    expect(headers).toMatchObject({
      "X-RateLimit-Limit": "5",
    });
  });
});
