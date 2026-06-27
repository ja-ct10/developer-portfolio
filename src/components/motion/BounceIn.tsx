"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";

interface BounceInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function BounceIn({
  children,
  className,
  delay = 0,
  once = true,
}: BounceInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: 0.3 });

  return (
    <m.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.3, y: 20 }}
      animate={
        inView
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.3, y: 20 }
      }
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay,
      }}
    >
      {children}
    </m.div>
  );
}
