"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

interface DropdownProps {
  label: string;
  children: ReactNode;
  /** Extra classes for the floating panel — mainly to control its width. */
  panelClassName?: string;
}

// Desktop-only hover/focus dropdown for the main nav. Closes on a short delay so moving the
// mouse from the trigger to the panel doesn't flicker it shut, and on Escape for keyboard users.
export function Dropdown({ label, children, panelClassName }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
      >
        {label}
        <ChevronDown
          className={clsx("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className={clsx(
              "absolute left-0 top-full z-50 mt-1 min-w-56 rounded-2xl border border-border bg-white p-2 shadow-lg",
              panelClassName
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DropdownLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted"
    >
      {children}
    </Link>
  );
}
