import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2 } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const dialogNode = dialogRef.current;
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea',
      'input',
      'select',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    const focusableElements = dialogNode ? Array.from(dialogNode.querySelectorAll<HTMLElement>(focusableSelectors)) : [];
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'Tab' && focusableElements.length > 0) {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    const focusTarget = closeButtonRef.current ?? firstElement;
    focusTarget?.focus();

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const accessKey = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY as string | undefined;

    if (!accessKey) {
      setStatus('error');
      setErrorMessage('Missing contact form key. Please try again later.');
      return;
    }

    const honeypot = String(formData.get('company') || '');
    if (honeypot) {
      setStatus('error');
      setErrorMessage('Spam detected.');
      return;
    }

    formData.append('access_key', accessKey);
    formData.append('subject', `Portfolio contact from ${String(formData.get('name') || '').trim()}`);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const responseType = response.headers.get('content-type') ?? '';
      const isJson = responseType.includes('application/json');
      const data = isJson ? await response.json().catch(() => null) : null;

      if (!response.ok || !data?.success) {
        throw new Error(data?.message ?? 'Unable to send message right now.');
      }

      setStatus('success');
      form.reset();
      setTimeout(() => {
        onClose();
        setStatus('idle'); // Reset form for next time
      }, 3000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
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
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            aria-describedby="contact-modal-description"
            className="bg-surface border border-border-color rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
          >
            {/* Close Button */}
            <button 
              ref={closeButtonRef}
              onClick={onClose}
              type="button"
              aria-label="Close contact form"
              className="absolute top-6 right-6 p-2 bg-surface-hover rounded-full hover:bg-border-color transition-colors text-text-muted hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
            >
              <X size={20} />
            </button>

            {/* Header: Friendly & Editorial */}
            <div className="mb-8">
                {/* Abril Fatface for the big headline */}
                <h2 id="contact-modal-title" className="text-3xl font-serif font-normal text-text-primary mb-2">Let's Chat</h2>
                {/* Poppins for the friendly subtext */}
                <p id="contact-modal-description" className="text-text-muted font-sans text-sm leading-relaxed">
                  Got a project in mind, or just want to say hi? I'm always open to discussing new ideas.
                </p>
            </div>

            {/* Success View: Warm confirmation */}
            {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center text-accent-primary">
                        <CheckCircle size={32} />
                    </div>
                    <h3 className="text-xl font-sans font-bold text-text-primary">Message Sent!</h3>
                    <p className="text-text-muted font-sans">Thanks for reaching out. I'll get back to you shortly.</p>
                </div>
            ) : (
                /* The Form: Clean & Human */
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {/* Honeypot Field */}
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
                    
                    {/* Name Field */}
                    <div className="space-y-1">
                        <label htmlFor="contact-name" className="text-sm font-medium text-text-primary ml-1 font-sans">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            required 
                            placeholder="What should I call you?"
                            id="contact-name"
                            autoComplete="name"
                            className="w-full bg-surface-hover border border-border-color rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors font-sans placeholder:text-text-muted/50"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1">
                        <label htmlFor="contact-email" className="text-sm font-medium text-text-primary ml-1 font-sans">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            required 
                            placeholder="ollie@example.com"
                            id="contact-email"
                            autoComplete="email"
                            className="w-full bg-surface-hover border border-border-color rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors font-sans placeholder:text-text-muted/50"
                        />
                    </div>

                    {/* Message Field */}
                    <div className="space-y-1">
                        <label htmlFor="contact-message" className="text-sm font-medium text-text-primary ml-1 font-sans">Message</label>
                        <textarea 
                            name="message" 
                            required 
                            rows={4}
                            placeholder="How can I help?"
                            id="contact-message"
                            className="w-full bg-surface-hover border border-border-color rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors font-sans resize-none placeholder:text-text-muted/50"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={status === 'submitting'}
                        className="w-full bg-text-primary text-bg-depth font-sans font-bold rounded-full py-4 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                    >
                        {status === 'submitting' ? (
                            <><Loader2 size={20} className="animate-spin" /> Sending...</>
                        ) : (
                            <><Send size={18} /> Send Message</>
                        )}
                    </button>
                    <p 
                        role="status" 
                        aria-live="polite" 
                        className="text-xs text-center font-sans mt-2 min-h-[1.25rem]"
                    >
                        {status === 'error' && (
                            <span className="text-red-500">{errorMessage ?? 'Something went wrong. Please try again.'}</span>
                        )}
                    </p>
                </form>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
