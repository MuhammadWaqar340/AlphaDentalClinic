import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/validations/appointment";
import { checkRateLimit, rateLimitHeaders } from "@/lib/rate-limit";
import { createRequestLogger } from "@/lib/logger";
import { captureServerException } from "@/lib/monitoring/sentry";
import { createRequestId, getClientIp } from "@/lib/utils";
import { sendAppointmentNotification } from "@/lib/email";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 8_192;

export async function POST(request: Request) {
  const started = Date.now();
  const requestId = createRequestId();
  const log = createRequestLogger(requestId, "/api/contact");

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Request payload is too large." },
      { status: 413, headers: { "X-Request-Id": requestId } },
    );
  }

  const ip = getClientIp(request.headers);
  const rate = await checkRateLimit("contact", ip);
  const headers = {
    ...rateLimitHeaders(rate),
    "X-Request-Id": requestId,
  };

  if (!rate.success) {
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

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the form and try again.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400, headers },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json(
      { message: "Thank you. Your message has been received." },
      { status: 200, headers },
    );
  }

  try {
    // Reuse appointment email pipeline with a contact-shaped payload.
    const emailResult = await sendAppointmentNotification({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      service: "general-dentistry",
      preferredDate: new Date().toISOString().slice(0, 10),
      preferredTime: "10:00",
      message: `[Contact form]\n${parsed.data.message}`,
      website: "",
    });

    if (!emailResult.ok) {
      return NextResponse.json(
        {
          error:
            "We could not send your message right now. Please call the clinic or try again shortly.",
        },
        { status: 503, headers },
      );
    }

    log.info(
      {
        status: 200,
        durationMs: Date.now() - started,
        emailMode: emailResult.mode,
      },
      "Contact enquiry accepted",
    );

    const message =
      emailResult.mode === "development"
        ? "Thank you. Your message was accepted in development mode (email provider not configured)."
        : "Thank you. Your message has been received. We will get back to you soon.";

    return NextResponse.json(
      { message, mode: emailResult.mode },
      { status: 200, headers },
    );
  } catch (error) {
    await captureServerException(error, { route: "/api/contact", requestId });
    log.error(
      {
        status: 500,
        durationMs: Date.now() - started,
        errorName: error instanceof Error ? error.name : "UnknownError",
      },
      "Unhandled contact API error",
    );
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500, headers },
    );
  }
}
