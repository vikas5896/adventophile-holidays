"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Menu, Phone, X } from "lucide-react";
import clsx from "clsx";
import { site } from "@/lib/site";

const navLinks = [
  { href: "/destinations", label: "Destinations" },
  { href: "/tours", label: "Packages" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu whenever the route changes (covers back/forward nav too).
  const closeOnNavigate = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <div className="hidden border-b border-border bg-brand-900 text-brand-50 sm:block">
        <div className="container-page flex items-center justify-end gap-6 py-1.5 text-xs">
          <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-1.5 hover:text-white">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-white">
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            {site.email}
          </a>
        </div>
      </div>

      <div className="container-page flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5 text-lg font-bold text-foreground" onClick={closeOnNavigate}>
          <Image
            src="/images/site/logo.jpg"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full"
            priority
          />
          {site.name}
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active ? "bg-brand-50 text-brand-700" : "text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link href="/contact" className="btn-primary">
            Plan My Trip
          </Link>
        </div>

        <button
          type="button"
          className="btn-ghost relative z-50 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      <motion.nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden bg-white lg:hidden"
      >
        <div className="container-page flex flex-col gap-1 border-t border-border py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              tabIndex={open ? 0 : -1}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              onClick={closeOnNavigate}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            tabIndex={open ? 0 : -1}
            className="btn-primary mt-2 justify-center"
            onClick={closeOnNavigate}
          >
            Plan My Trip
          </Link>
        </div>
      </motion.nav>
    </header>
  );
}
