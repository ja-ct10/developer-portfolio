"use client";

import { m, useReducedMotion } from "framer-motion";

interface PulseGlowProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

/**
 * Wraps content with a pulsing pink glow effect — gives that Barbie sparkle energy.
 */
export function PulseGlow({
  children,
  className,
  color = "rgba(233, 30, 140, 0.3)",
}: PulseGlowProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={`relative ${className ?? ""}`}
      animate={{
        boxShadow: [
          `0 0 0px ${color}`,
          `0 0 20px ${color}`,
          `0 0 0px ${color}`,
        ],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </m.div>
  );
}
