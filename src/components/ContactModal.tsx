import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ContactForm from "./ContactForm";
import { enableModalAccessibility, getModalRoot } from "./modalUtils";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formInstance, setFormInstance] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const modalRoot = getModalRoot();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setFormInstance((instance) => instance + 1);

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

  const handleSuccess = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      onClose();
      closeTimeoutRef.current = null;
    }, 3000);
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

            <ContactForm
              key={formInstance}
              idPrefix="contact-modal"
              onSuccess={handleSuccess}
              successTitle="Message Sent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return modalRoot ? createPortal(modalMarkup, modalRoot) : modalMarkup;
}
