"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { variants } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function TextReveal({ children, className }: TextRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <span ref={ref} className={cn("inline-block overflow-hidden", className)}>
      <m.span
        className="inline-block"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants.textReveal}
      >
        {children}
      </m.span>
    </span>
  );
}
