import type { ComponentPropsWithoutRef } from "react";
import { useId, useState } from "react";
import { CheckCircle, Loader2, Send } from "lucide-react";

type FormSubmitHandler = NonNullable<
  ComponentPropsWithoutRef<"form">["onSubmit"]
>;

type FormStatus = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

interface ContactFormProps {
  idPrefix?: string;
  onSuccess?: () => void;
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const FALLBACK_MESSAGE =
  "Please try again later, or use the LinkedIn link on this site if the form keeps failing.";

const getFieldValue = (formData: FormData, field: string) =>
  String(formData.get(field) || "").trim();

const validateContactForm = (formData: FormData) => {
  const errors: FieldErrors = {};
  const name = getFieldValue(formData, "name");
  const email = getFieldValue(formData, "email");
  const message = getFieldValue(formData, "message");

  if (!name) {
    errors.name = "Enter your name.";
  }

  if (!email) {
    errors.email = "Enter your email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!message) {
    errors.message = "Enter a message.";
  }

  return errors;
};

export default function ContactForm({
  idPrefix,
  onSuccess,
  submitLabel = "Send Message",
  successTitle = "Message Sent",
  successMessage = "Thanks for reaching out. I'll be in touch soon.",
}: ContactFormProps) {
  const generatedId = useId().replace(/:/g, "");
  const prefix = idPrefix ?? `contact-${generatedId}`;
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const describeField = (field: keyof FieldErrors) =>
    fieldErrors[field] ? `${prefix}-${field}-error` : undefined;

  const handleSubmit: FormSubmitHandler = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const errors = validateContactForm(formData);

    setFieldErrors(errors);
    setFormError(null);

    if (Object.keys(errors).length > 0) {
      setStatus("error");
      return;
    }

    const accessKey = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY as
      | string
      | undefined;

    if (!accessKey || accessKey === "your-web3forms-access-key") {
      setStatus("error");
      setFormError(
        `The contact form is temporarily unavailable. ${FALLBACK_MESSAGE}`
      );
      return;
    }

    const honeypot = getFieldValue(formData, "company");
    if (honeypot) {
      setStatus("error");
      setFormError("This message could not be sent. Please try again.");
      return;
    }

    setStatus("submitting");

    formData.append("access_key", accessKey);
    formData.append(
      "subject",
      `Portfolio contact from ${getFieldValue(formData, "name")}`
    );

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      const responseType = response.headers.get("content-type") ?? "";
      const responseData = responseType.includes("application/json")
        ? await response.json().catch(() => null)
        : null;

      if (!response.ok || !responseData?.success) {
        throw new Error(
          responseData?.message ?? "Unable to send message right now."
        );
      }

      setStatus("success");
      setFieldErrors({});
      form.reset();
      onSuccess?.();
    } catch (error) {
      setStatus("error");
      setFormError(
        `${error instanceof Error ? error.message : "Something went wrong."} ${FALLBACK_MESSAGE}`
      );
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
        <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center text-accent-primary">
          <CheckCircle size={32} aria-hidden="true" />
        </div>
        <h2 className="text-xl font-sans font-bold text-text-primary">
          {successTitle}
        </h2>
        <p className="text-text-muted font-sans">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${prefix}-company`}>Company</label>
        <input
          id={`${prefix}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor={`${prefix}-name`}
          className="text-sm font-medium text-text-primary ml-1 font-sans"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="Your name"
          id={`${prefix}-name`}
          autoComplete="name"
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={describeField("name")}
          className="w-full bg-surface-hover border border-border-color rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors font-sans placeholder:text-text-muted/50"
        />
        {fieldErrors.name && (
          <p
            id={`${prefix}-name-error`}
            className="text-sm text-red-600 dark:text-red-300"
          >
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label
          htmlFor={`${prefix}-email`}
          className="text-sm font-medium text-text-primary ml-1 font-sans"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          id={`${prefix}-email`}
          autoComplete="email"
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={describeField("email")}
          className="w-full bg-surface-hover border border-border-color rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors font-sans placeholder:text-text-muted/50"
        />
        {fieldErrors.email && (
          <p
            id={`${prefix}-email-error`}
            className="text-sm text-red-600 dark:text-red-300"
          >
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label
          htmlFor={`${prefix}-message`}
          className="text-sm font-medium text-text-primary ml-1 font-sans"
        >
          Message
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="What's on your mind?"
          id={`${prefix}-message`}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={describeField("message")}
          className="w-full bg-surface-hover border border-border-color rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors font-sans resize-y min-h-36 placeholder:text-text-muted/50"
        ></textarea>
        {fieldErrors.message && (
          <p
            id={`${prefix}-message-error`}
            className="text-sm text-red-600 dark:text-red-300"
          >
            {fieldErrors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-text-primary text-bg-depth font-sans font-bold rounded-full py-4 hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={20} className="animate-spin" aria-hidden="true" />{" "}
            Sending...
          </>
        ) : (
          <>
            <Send size={18} aria-hidden="true" /> {submitLabel}
          </>
        )}
      </button>

      <p
        role="status"
        aria-live="polite"
        className="text-sm text-center font-sans mt-2 min-h-[1.5rem]"
      >
        {status === "error" && formError && (
          <span className="text-red-600 dark:text-red-300">{formError}</span>
        )}
      </p>
    </form>
  );
}
