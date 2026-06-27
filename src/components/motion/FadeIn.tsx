"use client";

import { m } from "framer-motion";
import { duration, easing } from "@/lib/motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "none";
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const y = direction === "up" ? 12 : direction === "down" ? -12 : 0;

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: duration.slower, delay, ease: easing.spring }}
    >
      {children}
    </m.div>
  );
}
