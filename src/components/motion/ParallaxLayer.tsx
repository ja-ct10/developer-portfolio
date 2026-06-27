"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  maxOffset?: number;
}

export function ParallaxLayer({
  children,
  className,
  speed = 0.05,
  maxOffset = 30,
}: ParallaxLayerProps) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-maxOffset * speed * 10, maxOffset * speed * 10]
  );

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div ref={ref} className={className} style={{ y }}>
      {children}
    </m.div>
  );
}
