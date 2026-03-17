import type { ComponentPropsWithoutRef } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle, Loader2 } from "lucide-react";
import { enableModalAccessibility, getModalRoot } from "./modalUtils";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormSubmitHandler = NonNullable<
  ComponentPropsWithoutRef<"form">["onSubmit"]
>;

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const modalRoot = getModalRoot();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    return enableModalAccessibility({
      dialogRef,
      closeButtonRef,
      onClose,
    });
  }, [isOpen, onClose]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit: FormSubmitHandler = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const accessKey = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY as
      | string
      | undefined;

    if (!accessKey) {
      setStatus("error");
      setErrorMessage("Missing contact form key. Please try again later.");
      return;
    }

    const honeypot = String(formData.get("company") || "");
    if (honeypot) {
      setStatus("error");
      setErrorMessage("This looks like spam. Please try again.");
      return;
    }

    const senderName = String(formData.get("name") || "").trim();
    formData.append("access_key", accessKey);
    formData.append("subject", `Portfolio contact from ${senderName}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const responseType = response.headers.get("content-type") ?? "";
      const isJson = responseType.includes("application/json");
      const responseData = isJson
        ? await response.json().catch(() => null)
        : null;

      if (!response.ok || !responseData?.success) {
        throw new Error(
          responseData?.message ?? "Unable to send message right now."
        );
      }

      setStatus("success");
      form.reset();
      closeTimeoutRef.current = window.setTimeout(() => {
        onClose();
        setStatus("idle");
        closeTimeoutRef.current = null;
      }, 3000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  const modalMarkup = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-bg-depth/80 backdrop-blur-sm"
        >
          <motion.div
            ref={dialogRef}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            aria-describedby="contact-modal-description"
            className="bg-surface border border-border-color rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
          >
            <button
              ref={closeButtonRef}
              onClick={onClose}
              type="button"
              aria-label="Close contact form"
              className="absolute top-6 right-6 p-2 bg-surface-hover rounded-full hover:bg-border-color transition-colors text-text-muted hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <h2
                id="contact-modal-title"
                className="text-3xl font-serif font-normal text-text-primary mb-2"
              >
                Let's Chat
              </h2>
              <p
                id="contact-modal-description"
                className="text-text-muted font-sans text-sm leading-relaxed"
              >
                Got a project in mind, or just want to say hello? I'm always up
                for a conversation.
              </p>
            </div>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center text-accent-primary">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-sans font-bold text-text-primary">
                  Message Sent!
                </h3>
                <p className="text-text-muted font-sans">
                  Thanks for reaching out. I'll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="contact-company">Company</label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium text-text-primary ml-1 font-sans"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    id="contact-name"
                    autoComplete="name"
                    className="w-full bg-surface-hover border border-border-color rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors font-sans placeholder:text-text-muted/50"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium text-text-primary ml-1 font-sans"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    id="contact-email"
                    autoComplete="email"
                    className="w-full bg-surface-hover border border-border-color rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors font-sans placeholder:text-text-muted/50"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-medium text-text-primary ml-1 font-sans"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="What's on your mind?"
                    id="contact-message"
                    className="w-full bg-surface-hover border border-border-color rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors font-sans resize-none placeholder:text-text-muted/50"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-text-primary text-bg-depth font-sans font-bold rounded-full py-4 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>
                <p
                  role="status"
                  aria-live="polite"
                  className="text-xs text-center font-sans mt-2 min-h-[1.25rem]"
                >
                  {status === "error" && (
                    <span className="text-red-500">
                      {errorMessage ??
                        "Something went wrong. Please try again."}
                    </span>
                  )}
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return modalRoot ? createPortal(modalMarkup, modalRoot) : modalMarkup;
}
