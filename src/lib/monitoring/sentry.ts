/**
 * Sentry helpers. Full Next.js instrumentation lives in
 * sentry.client.config.ts / sentry.server.config.ts / instrumentation.ts
 * when SENTRY_DSN is configured.
 */

export function isSentryConfigured(): boolean {
  return Boolean(process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN);
}

export async function captureServerException(
  error: unknown,
  context?: Record<string, unknown>,
): Promise<void> {
  if (!isSentryConfigured()) {
    return;
  }

  try {
    const Sentry = await import("@sentry/nextjs");
    Sentry.withScope((scope) => {
      if (context) {
        scope.setExtras(sanitizeContext(context));
      }
      Sentry.captureException(error);
    });
  } catch {
    // Swallow monitoring failures — never break the request path.
  }
}

function sanitizeContext(context: Record<string, unknown>): Record<string, unknown> {
  const blocked = new Set(["phone", "email", "name", "message", "payload", "body"]);

  return Object.fromEntries(
    Object.entries(context).filter(([key]) => !blocked.has(key.toLowerCase())),
  );
}
