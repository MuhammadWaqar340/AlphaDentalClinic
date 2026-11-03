import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  pending: Promise<unknown>;
  /** True when Redis was unavailable and the request was allowed. */
  bypassed: boolean;
}

type LimiterKey = "appointments" | "contact";

const WINDOW = "10 m";
const MAX_REQUESTS = 5;

let redis: Redis | null = null;
const limiters = new Map<LimiterKey, Ratelimit>();

function isRedisConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
  );
}

function getRedis(): Redis | null {
  if (!isRedisConfigured()) {
    return null;
  }

  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }

  return redis;
}

function getLimiter(key: LimiterKey): Ratelimit | null {
  const client = getRedis();
  if (!client) {
    return null;
  }

  const existing = limiters.get(key);
  if (existing) {
    return existing;
  }

  const limiter = new Ratelimit({
    redis: client,
    limiter: Ratelimit.slidingWindow(MAX_REQUESTS, WINDOW),
    analytics: true,
    prefix: `alpha-dental:${key}`,
  });

  limiters.set(key, limiter);
  return limiter;
}

/**
 * Sliding-window rate limit: 5 requests per IP per 10 minutes.
 * Fails open (allows the request) when Redis is not configured or unavailable,
 * so local development and Redis outages do not block legitimate patients.
 */
export async function checkRateLimit(
  key: LimiterKey,
  identifier: string,
): Promise<RateLimitResult> {
  const limiter = getLimiter(key);

  if (!limiter) {
    return {
      success: true,
      limit: MAX_REQUESTS,
      remaining: MAX_REQUESTS,
      reset: Date.now() + 10 * 60 * 1000,
      pending: Promise.resolve(),
      bypassed: true,
    };
  }

  try {
    const result = await limiter.limit(identifier);
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
      pending: result.pending,
      bypassed: false,
    };
  } catch {
    return {
      success: true,
      limit: MAX_REQUESTS,
      remaining: MAX_REQUESTS,
      reset: Date.now() + 10 * 60 * 1000,
      pending: Promise.resolve(),
      bypassed: true,
    };
  }
}

export function rateLimitHeaders(result: RateLimitResult): HeadersInit {
  const retryAfterSeconds = Math.max(1, Math.ceil((result.reset - Date.now()) / 1000));

  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(Math.max(0, result.remaining)),
    "X-RateLimit-Reset": String(result.reset),
    ...(result.success ? {} : { "Retry-After": String(retryAfterSeconds) }),
  };
}

export const RATE_LIMIT_CONFIG = {
  maxRequests: MAX_REQUESTS,
  window: WINDOW,
} as const;
