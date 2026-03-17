import type { RefObject } from "react";

const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "textarea",
  "input",
  "select",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

interface ModalAccessibilityOptions {
  dialogRef: RefObject<HTMLElement | null>;
  closeButtonRef?: RefObject<HTMLElement | null>;
  onClose: () => void;
}

export const getModalRoot = () =>
  typeof document === "undefined"
    ? null
    : document.getElementById("modal-root");

export const setMainInert = (enabled: boolean) => {
  if (typeof document === "undefined") return;

  const main = document.getElementById("main-content");
  if (!main) return;

  const currentCount = Number(main.dataset.modalCount || "0");

  if (enabled) {
    const nextCount = currentCount + 1;
    main.dataset.modalCount = String(nextCount);
    main.setAttribute("inert", "");
    main.setAttribute("aria-hidden", "true");
    return;
  }

  const nextCount = Math.max(0, currentCount - 1);

  if (nextCount === 0) {
    main.removeAttribute("inert");
    main.removeAttribute("aria-hidden");
    delete main.dataset.modalCount;
    return;
  }

  main.dataset.modalCount = String(nextCount);
};

export const enableModalAccessibility = ({
  dialogRef,
  closeButtonRef,
  onClose,
}: ModalAccessibilityOptions) => {
  setMainInert(true);

  const dialogNode = dialogRef.current;
  const focusableElements = dialogNode
    ? Array.from(dialogNode.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS))
    : [];
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }

    if (event.key !== "Tab" || focusableElements.length === 0) {
      return;
    }

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement?.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement?.focus();
    }
  };

  (closeButtonRef?.current ?? firstElement)?.focus();
  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
    setMainInert(false);
  };
};
