"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Fade-and-rise entrance animation, triggered on mount (not scroll-into-view).
 * Deliberately avoids whileInView/IntersectionObserver: that approach left
 * content stuck at opacity:0 in real-world testing (observed on a LAN URL —
 * https://192.168.1.11:3000 — where the intersection never reported as
 * visible for above-the-fold content). `animate` always fires once React
 * hydrates, so content can't get stuck invisible.
 *
 * Wraps server-rendered children (valid RSC composition — the child is
 * rendered on the server and passed in as already-resolved content, so
 * wrapping e.g. a server TourCard here doesn't force it into the client
 * bundle). Respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
