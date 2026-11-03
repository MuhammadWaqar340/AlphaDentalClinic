"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { serviceOptions } from "@/data/services";
import {
  appointmentSchema,
  appointmentTimeSlots,
  type AppointmentInput,
} from "@/lib/validations/appointment";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function AppointmentForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverMessage, setServerMessage] = useState<string>("");
  const [submissionToken, setSubmissionToken] = useState(() => crypto.randomUUID());

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: undefined,
      preferredDate: "",
      preferredTime: undefined,
      message: "",
      website: "",
    },
  });

  const selectedService = useWatch({ control, name: "service" });
  const selectedTime = useWatch({ control, name: "preferredTime" });

  const onSubmit = handleSubmit(async (values) => {
    if (status === "submitting") return;

    setStatus("submitting");
    setServerMessage("");

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Submission-Token": submissionToken,
        },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as {
        message?: string;
        error?: string;
        mode?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setServerMessage(
          data.error || "Unable to submit your request. Please try again.",
        );
        return;
      }

      setStatus("success");
      setServerMessage(
        data.message ||
          "Thank you. Your appointment enquiry has been received. The clinic will confirm availability.",
      );
      reset();
      setSubmissionToken(crypto.randomUUID());
    } catch {
      setStatus("error");
      setServerMessage(
        "A network error occurred. Please check your connection and try again.",
      );
    }
  });

  if (status === "success") {
    return (
      <div
        className="border-success/20 bg-success/5 rounded-2xl border p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="text-success mx-auto h-12 w-12" aria-hidden="true" />
        <h3 className="text-navy mt-4 text-xl font-bold">Enquiry received</h3>
        <p className="text-muted mt-2 text-sm">{serverMessage}</p>
        <p className="text-body mt-4 text-sm">
          This is a request only — the clinic must confirm your appointment time.
        </p>
        <Button
          className="mt-6"
          variant="outline"
          onClick={() => {
            setStatus("idle");
            setServerMessage("");
          }}
        >
          Submit another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <p className="bg-primary/5 text-body rounded-xl px-4 py-3 text-sm">
        This form sends an appointment <strong>request</strong>. The clinic will contact
        you to confirm availability.
      </p>

      {/* Honeypot */}
      <div
        className="absolute top-auto -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <Label htmlFor="website">Website</Label>
        <Input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">
            Patient name <span className="text-danger">*</span>
          </Label>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name ? (
            <p id="name-error" className="text-danger text-xs" role="alert">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone number <span className="text-danger">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="03XX XXXXXXX"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
          {errors.phone ? (
            <p id="phone-error" className="text-danger text-xs" role="alert">
              {errors.phone.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email address (optional)</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
        {errors.email ? (
          <p id="email-error" className="text-danger text-xs" role="alert">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="service">
          Preferred service <span className="text-danger">*</span>
        </Label>
        <Select
          value={selectedService}
          onValueChange={(value) => setValue("service", value, { shouldValidate: true })}
        >
          <SelectTrigger
            id="service"
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "service-error" : undefined}
          >
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {serviceOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.service ? (
          <p id="service-error" className="text-danger text-xs" role="alert">
            {errors.service.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="preferredDate">
            Preferred date <span className="text-danger">*</span>
          </Label>
          <Input
            id="preferredDate"
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            aria-invalid={Boolean(errors.preferredDate)}
            aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined}
            {...register("preferredDate")}
          />
          {errors.preferredDate ? (
            <p id="preferredDate-error" className="text-danger text-xs" role="alert">
              {errors.preferredDate.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredTime">
            Preferred time <span className="text-danger">*</span>
          </Label>
          <Select
            value={selectedTime}
            onValueChange={(value) =>
              setValue("preferredTime", value as AppointmentInput["preferredTime"], {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger
              id="preferredTime"
              aria-invalid={Boolean(errors.preferredTime)}
              aria-describedby={errors.preferredTime ? "preferredTime-error" : undefined}
            >
              <SelectValue placeholder="Select a time" />
            </SelectTrigger>
            <SelectContent>
              {appointmentTimeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.preferredTime ? (
            <p id="preferredTime-error" className="text-danger text-xs" role="alert">
              {errors.preferredTime.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Additional message (optional)</Label>
        <Textarea
          id="message"
          rows={4}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        {errors.message ? (
          <p id="message-error" className="text-danger text-xs" role="alert">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <div
          className="border-danger/20 bg-danger/5 text-danger flex items-start gap-2 rounded-xl border px-4 py-3 text-sm"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{serverMessage}</span>
        </div>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending request…
          </>
        ) : (
          "Request Appointment"
        )}
      </Button>
    </form>
  );
}
