"use client";

import { m, useReducedMotion } from "framer-motion";

interface WiggleProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function Wiggle({
  children,
  className,
  intensity = 3,
}: WiggleProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      whileHover={{
        rotate: [0, -intensity, intensity, -intensity, 0],
        scale: 1.05,
        transition: {
          rotate: { duration: 0.5, ease: "easeInOut" },
          scale: { duration: 0.2 },
        },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </m.div>
  );
}
