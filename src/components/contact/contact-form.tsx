"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { contactSchema, type ContactInput } from "@/lib/validations/appointment";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    if (status === "submitting") return;
    setStatus("submitting");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        setStatus("error");
        setServerMessage(data.error || "Unable to send your message.");
        return;
      }

      setStatus("success");
      setServerMessage(data.message || "Message sent successfully.");
      reset();
    } catch {
      setStatus("error");
      setServerMessage("A network error occurred. Please try again.");
    }
  });

  if (status === "success") {
    return (
      <div
        className="border-success/20 bg-success/5 rounded-2xl border p-6"
        role="status"
      >
        <CheckCircle2 className="text-success h-8 w-8" />
        <h3 className="text-navy mt-3 text-lg font-bold">Message received</h3>
        <p className="text-muted mt-2 text-sm">{serverMessage}</p>
        <Button className="mt-4" variant="outline" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <Label htmlFor="contact-website">Website</Label>
        <Input
          id="contact-website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-name">
          Name <span className="text-danger">*</span>
        </Label>
        <Input
          id="contact-name"
          aria-invalid={Boolean(errors.name)}
          {...register("name")}
        />
        {errors.name ? (
          <p className="text-danger text-xs" role="alert">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-phone">
          Phone <span className="text-danger">*</span>
        </Label>
        <Input
          id="contact-phone"
          type="tel"
          aria-invalid={Boolean(errors.phone)}
          {...register("phone")}
        />
        {errors.phone ? (
          <p className="text-danger text-xs" role="alert">
            {errors.phone.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-email">Email (optional)</Label>
        <Input id="contact-email" type="email" {...register("email")} />
        {errors.email ? (
          <p className="text-danger text-xs" role="alert">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">
          Message <span className="text-danger">*</span>
        </Label>
        <Textarea id="contact-message" rows={5} {...register("message")} />
        {errors.message ? (
          <p className="text-danger text-xs" role="alert">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <div
          className="border-danger/20 bg-danger/5 text-danger flex gap-2 rounded-xl border px-3 py-2 text-sm"
          role="alert"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          {serverMessage}
        </div>
      ) : null}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}
