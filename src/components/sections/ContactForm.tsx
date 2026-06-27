"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { ContactFormData } from "@/lib/types";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface TouchedFields {
  name: boolean;
  email: boolean;
  subject: boolean;
  message: boolean;
}

const MAX_MESSAGE_LENGTH = 1000;

function validateField(
  name: keyof ContactFormData,
  value: string
): string | undefined {
  switch (name) {
    case "name":
      if (!value.trim()) return "Name is required.";
      if (value.trim().length < 2) return "Name must be at least 2 characters.";
      return undefined;
    case "email":
      if (!value.trim()) return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Please enter a valid email address.";
      return undefined;
    case "subject":
      if (!value.trim()) return "Subject is required.";
      if (value.trim().length < 3)
        return "Subject must be at least 3 characters.";
      return undefined;
    case "message":
      if (!value.trim()) return "Message is required.";
      if (value.trim().length < 10)
        return "Message must be at least 10 characters.";
      if (value.length > MAX_MESSAGE_LENGTH)
        return `Message must be under ${MAX_MESSAGE_LENGTH} characters.`;
      return undefined;
    default:
      return undefined;
  }
}

function validateAll(data: ContactFormData): FieldErrors {
  const errors: FieldErrors = {};
  (Object.keys(data) as Array<keyof ContactFormData>).forEach((key) => {
    const error = validateField(key, data[key]);
    if (error) errors[key] = error;
  });
  return errors;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true, subject: true, message: true });

    // Validate all fields
    const validationErrors = validateAll(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", formData);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTouched({ name: false, email: false, subject: false, message: false });
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (touched[name as keyof TouchedFields]) {
        const error = validateField(name as keyof ContactFormData, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }

      if (status === "success" || status === "error") {
        setStatus("idle");
      }
    },
    [touched, status]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name as keyof ContactFormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    []
  );

  const getInputClassName = (fieldName: keyof ContactFormData) => {
    const hasError = touched[fieldName] && errors[fieldName];
    const isValid =
      touched[fieldName] && !errors[fieldName] && formData[fieldName].length > 0;

    return cn(
      "bg-bg-input rounded-lg px-4 py-3 font-body text-lg text-text-primary",
      "placeholder:text-text-muted",
      "border transition-all duration-[--duration-normal] ease-[--ease-out]",
      "focus:outline-none",
      !hasError && !isValid && "border-transparent",
      !hasError && !isValid && "hover:border-border-subtle",
      "focus:shadow-[0_0_0_3px_rgba(233,30,140,0.15)]",
      !hasError && "focus:border-accent",
      isValid && !hasError && "border-accent/60",
      hasError &&
        "border-error focus:shadow-[0_0_0_3px_rgba(252,165,165,0.15)]"
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10" noValidate>
      <fieldset className="flex flex-col gap-6 border-none p-0 m-0">
        <legend className="sr-only">Contact form</legend>

        {/* Name Field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-name"
            className="font-body font-medium text-sm text-text-secondary tracking-wide uppercase"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="John Doe"
            aria-invalid={touched.name && !!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={getInputClassName("name")}
          />
          {touched.name && errors.name && (
            <p
              id="contact-name-error"
              className="font-body text-xs text-error mt-0.5 flex items-center gap-1.5"
              role="alert"
            >
              <svg
                className="size-3.5 shrink-0"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 3.75a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zM8 11a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-email"
            className="font-body font-medium text-sm text-text-secondary tracking-wide uppercase"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="john@example.com"
            aria-invalid={touched.email && !!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={getInputClassName("email")}
          />
          {touched.email && errors.email && (
            <p
              id="contact-email-error"
              className="font-body text-xs text-error mt-0.5 flex items-center gap-1.5"
              role="alert"
            >
              <svg
                className="size-3.5 shrink-0"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 3.75a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zM8 11a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Subject Field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-subject"
            className="font-body font-medium text-sm text-text-secondary tracking-wide uppercase"
          >
            Subject
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            required
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Project inquiry"
            aria-invalid={touched.subject && !!errors.subject}
            aria-describedby={
              errors.subject ? "contact-subject-error" : undefined
            }
            className={getInputClassName("subject")}
          />
          {touched.subject && errors.subject && (
            <p
              id="contact-subject-error"
              className="font-body text-xs text-error mt-0.5 flex items-center gap-1.5"
              role="alert"
            >
              <svg
                className="size-3.5 shrink-0"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 3.75a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zM8 11a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
              <span>{errors.subject}</span>
            </p>
          )}
        </div>

        {/* Message Field */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="contact-message"
              className="font-body font-medium text-sm text-text-secondary tracking-wide uppercase"
            >
              Message
            </label>
            <span
              className={cn(
                "font-body text-xs tabular-nums transition-colors duration-[--duration-fast]",
                formData.message.length > MAX_MESSAGE_LENGTH
                  ? "text-error"
                  : formData.message.length > MAX_MESSAGE_LENGTH * 0.9
                    ? "text-accent"
                    : "text-text-muted"
              )}
              aria-live="polite"
              aria-atomic="true"
            >
              {formData.message.length}/{MAX_MESSAGE_LENGTH}
            </span>
          </div>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tell me about your project..."
            aria-invalid={touched.message && !!errors.message}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
            className={cn(getInputClassName("message"), "resize-none")}
          />
          {touched.message && errors.message && (
            <p
              id="contact-message-error"
              className="font-body text-xs text-error mt-0.5 flex items-center gap-1.5"
              role="alert"
            >
              <svg
                className="size-3.5 shrink-0"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 3.75a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zM8 11a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
              <span>{errors.message}</span>
            </p>
          )}
        </div>
      </fieldset>

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(
            "bg-accent text-text-dark font-body font-bold text-base",
            "uppercase rounded-full inline-flex items-center justify-center gap-2.5",
            "h-[54px] px-10 py-5",
            "transition-all duration-[--duration-fast] ease-[--ease-out]",
            "hover:bg-accent-hover hover:scale-[1.05]",
            "active:scale-[0.97]",
            "focus-visible:outline-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          )}
        >
          {status === "submitting" && (
            <span
              className="size-4 border-2 border-text-dark/30 border-t-text-dark rounded-full animate-[spin_0.6s_linear_infinite]"
              aria-hidden="true"
            />
          )}
          <span>{status === "submitting" ? "Sending..." : "Submit"}</span>
        </button>

        {/* Status Messages */}
        {status === "success" && (
          <div
            className="flex items-center gap-2 rounded-lg bg-success/10 border border-success/20 px-4 py-3"
            role="status"
            aria-live="polite"
          >
            <svg
              className="size-4 text-success shrink-0"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.22 5.28a.75.75 0 00-1.06-1.06L7 8.38 5.84 7.22a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.63-3.75z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-body text-sm text-success">
              Message sent successfully. I&apos;ll get back to you soon.
            </p>
          </div>
        )}
        {status === "error" && (
          <div
            className="flex items-center gap-2 rounded-lg bg-error/10 border border-error/20 px-4 py-3"
            role="alert"
          >
            <svg
              className="size-4 text-error shrink-0"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 3.75a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zM8 11a1 1 0 100 2 1 1 0 000-2z" />
            </svg>
            <p className="font-body text-sm text-error">
              Something went wrong. Please try again.
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
