"use client";

import { m, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "max-w-[1440px] mx-auto px-section-x md:px-section-x-md relative",
        className
      )}
      aria-hidden="true"
    >
      <div className="h-px bg-linear-to-r from-transparent via-accent/40 to-transparent" />
      {!prefersReducedMotion && (
        <m.div
          className="absolute top-1/2 -translate-y-1/2 left-1/2 text-accent text-xs"
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✦
        </m.div>
      )}
    </div>
  );
}
