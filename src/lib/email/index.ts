import { Resend } from "resend";

import type { AppointmentData } from "@/lib/validations/appointment";
import { getServiceBySlug } from "@/data/services";
import { business } from "@/config/business";
import { logger } from "@/lib/logger";

export type EmailSendResult =
  | { ok: true; id: string; mode: "live" }
  | { ok: true; id: string; mode: "development" }
  | { ok: false; error: string };

function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.CLINIC_NOTIFICATION_EMAIL);
}

function buildAppointmentEmailHtml(data: AppointmentData): string {
  const service = getServiceBySlug(data.service);
  const serviceName = service?.name ?? data.service;

  return `
    <div style="font-family: Manrope, Arial, sans-serif; color: #102B50; line-height: 1.6;">
      <h1 style="color: #0866C6; font-size: 20px;">New Appointment Enquiry</h1>
      <p>A visitor submitted an appointment request on the ${business.name} website.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 560px;">
        <tr><td style="padding: 8px 0; font-weight: 600;">Patient name</td><td style="padding: 8px 0;">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600;">Phone</td><td style="padding: 8px 0;">${escapeHtml(data.phone)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600;">Email</td><td style="padding: 8px 0;">${escapeHtml(data.email || "Not provided")}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600;">Preferred service</td><td style="padding: 8px 0;">${escapeHtml(serviceName)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600;">Preferred date</td><td style="padding: 8px 0;">${escapeHtml(data.preferredDate)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600;">Preferred time</td><td style="padding: 8px 0;">${escapeHtml(data.preferredTime)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Message</td><td style="padding: 8px 0;">${escapeHtml(data.message || "None")}</td></tr>
      </table>
      <p style="margin-top: 24px; color: #64748B; font-size: 14px;">
        This is an enquiry only. Please contact the patient to confirm availability.
      </p>
    </div>
  `;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendAppointmentNotification(
  data: AppointmentData,
): Promise<EmailSendResult> {
  if (!isResendConfigured()) {
    logger.warn(
      { event: "email.skipped", reason: "missing_credentials" },
      "Resend not configured; appointment email skipped in development mode",
    );

    if (process.env.NODE_ENV === "production") {
      return {
        ok: false,
        error: "Email service is not configured.",
      };
    }

    return {
      ok: true,
      id: `dev_${Date.now()}`,
      mode: "development",
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.CLINIC_NOTIFICATION_EMAIL!;
  const service = getServiceBySlug(data.service);

  try {
    const result = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL || "Alpha Dental Clinic <onboarding@resend.dev>",
      to: [to],
      subject: `Appointment enquiry: ${service?.name ?? data.service}`,
      html: buildAppointmentEmailHtml(data),
    });

    if (result.error) {
      logger.error(
        { event: "email.failed", providerError: result.error.name },
        "Failed to send appointment email",
      );
      return { ok: false, error: "Failed to send notification email." };
    }

    logger.info(
      { event: "email.sent", emailId: result.data?.id },
      "Appointment notification email sent",
    );

    return {
      ok: true,
      id: result.data?.id ?? "unknown",
      mode: "live",
    };
  } catch (error) {
    logger.error(
      {
        event: "email.exception",
        errorName: error instanceof Error ? error.name : "UnknownError",
      },
      "Unexpected email send failure",
    );
    return { ok: false, error: "Failed to send notification email." };
  }
}
