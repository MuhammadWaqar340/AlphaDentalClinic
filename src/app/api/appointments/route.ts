import { NextResponse } from "next/server";

import { appointmentSchema } from "@/lib/validations/appointment";
import { checkRateLimit, rateLimitHeaders } from "@/lib/rate-limit";
import { sendAppointmentNotification } from "@/lib/email";
import { createRequestLogger } from "@/lib/logger";
import { captureServerException } from "@/lib/monitoring/sentry";
import { createRequestId, getClientIp } from "@/lib/utils";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 8_192;
const recentTokens = new Map<string, number>();
const TOKEN_TTL_MS = 10 * 60 * 1000;

function pruneTokens(now: number) {
  for (const [token, timestamp] of recentTokens.entries()) {
    if (now - timestamp > TOKEN_TTL_MS) {
      recentTokens.delete(token);
    }
  }
}

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    // Same-origin navigations / non-browser clients may omit Origin.
    return true;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    return process.env.NODE_ENV !== "production";
  }

  try {
    return new URL(origin).origin === new URL(siteUrl).origin;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const started = Date.now();
  const requestId = createRequestId();
  const log = createRequestLogger(requestId, "/api/appointments");

  if (!isAllowedOrigin(request)) {
    log.warn({ status: 403 }, "Blocked appointment request with invalid origin");
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403, headers: { "X-Request-Id": requestId } },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Request payload is too large." },
      { status: 413, headers: { "X-Request-Id": requestId } },
    );
  }

  const ip = getClientIp(request.headers);
  const rate = await checkRateLimit("appointments", ip);
  const headers = {
    ...rateLimitHeaders(rate),
    "X-Request-Id": requestId,
  };

  if (!rate.success) {
    log.warn({ status: 429, durationMs: Date.now() - started }, "Rate limit exceeded");
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers },
    );
  }

  let json: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Request payload is too large." },
        { status: 413, headers },
      );
    }
    json = text ? JSON.parse(text) : {};
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400, headers },
    );
  }

  const parsed = appointmentSchema.safeParse(json);
  if (!parsed.success) {
    log.info({ status: 400, durationMs: Date.now() - started }, "Validation failed");
    return NextResponse.json(
      {
        error: "Please check the form and try again.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400, headers },
    );
  }

  // Honeypot filled — pretend success without sending email.
  if (parsed.data.website) {
    log.warn({ status: 200, event: "honeypot" }, "Honeypot triggered");
    return NextResponse.json(
      {
        message:
          "Thank you. Your appointment enquiry has been received. The clinic will confirm availability.",
      },
      { status: 200, headers },
    );
  }

  const submissionToken = request.headers.get("x-submission-token");
  const now = Date.now();
  pruneTokens(now);

  if (submissionToken) {
    if (recentTokens.has(submissionToken)) {
      log.warn({ status: 409 }, "Duplicate submission token");
      return NextResponse.json(
        { error: "This enquiry was already submitted. Please wait before trying again." },
        { status: 409, headers },
      );
    }
    recentTokens.set(submissionToken, now);
  }

  try {
    const emailResult = await sendAppointmentNotification(parsed.data);

    if (!emailResult.ok) {
      log.error(
        { status: 503, durationMs: Date.now() - started },
        "Email provider unavailable",
      );
      return NextResponse.json(
        {
          error:
            "We could not send your enquiry right now. Please call the clinic or try again shortly.",
        },
        { status: 503, headers },
      );
    }

    log.info(
      {
        status: 200,
        durationMs: Date.now() - started,
        emailMode: emailResult.mode,
        rateLimitBypassed: rate.bypassed,
      },
      "Appointment enquiry accepted",
    );

    const message =
      emailResult.mode === "development"
        ? "Thank you. Your enquiry was accepted in development mode (email provider not configured). The clinic will confirm availability once email is connected."
        : "Thank you. Your appointment enquiry has been received. The clinic will confirm availability.";

    return NextResponse.json(
      { message, mode: emailResult.mode },
      { status: 200, headers },
    );
  } catch (error) {
    await captureServerException(error, {
      route: "/api/appointments",
      requestId,
    });
    log.error(
      {
        status: 500,
        durationMs: Date.now() - started,
        errorName: error instanceof Error ? error.name : "UnknownError",
      },
      "Unhandled appointment API error",
    );
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500, headers },
    );
  }
}
