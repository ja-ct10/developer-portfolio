"use client";

import { useState, useEffect, useMemo } from "react";
import { m, useReducedMotion } from "framer-motion";

interface SparkleProps {
  children: React.ReactNode;
  className?: string;
  count?: number;
  color?: string;
}

interface SparkleParticle {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
}

function generateSparkles(count: number): SparkleParticle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: 4 + Math.random() * 8,
    delay: Math.random() * 3,
    duration: 1.5 + Math.random() * 2,
  }));
}

export function Sparkle({
  children,
  className,
  count = 6,
  color = "#E91E8C",
}: SparkleProps) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const sparkles = useMemo(() => generateSparkles(count), [count]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      {children}
      {!prefersReducedMotion &&
        mounted &&
        sparkles.map((sparkle) => (
          <m.svg
            key={sparkle.id}
            className="absolute pointer-events-none"
            style={{
              top: sparkle.top,
              left: sparkle.left,
              width: sparkle.size,
              height: sparkle.size,
            }}
            viewBox="0 0 24 24"
            fill={color}
            aria-hidden="true"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180],
            }}
            transition={{
              duration: sparkle.duration,
              delay: sparkle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
          </m.svg>
        ))}
    </span>
  );
}
