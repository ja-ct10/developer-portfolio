"use client";

import { useState, useEffect, useMemo } from "react";
import { m, useReducedMotion } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

function generateHearts(): Heart[] {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 12 + Math.random() * 20,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 6,
    opacity: 0.15 + Math.random() * 0.25,
  }));
}

export function FloatingHearts() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const hearts = useMemo(() => generateHearts(), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (prefersReducedMotion || !mounted) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <m.div
          key={heart.id}
          className="absolute text-accent"
          style={{
            left: `${heart.x}%`,
            bottom: "-40px",
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
          }}
          animate={{
            y: [0, -800, -1200],
            x: [0, Math.sin(heart.id) * 30, Math.sin(heart.id) * -20],
            rotate: [0, 15, -15, 0],
            scale: [0.8, 1, 0.6],
            opacity: [0, heart.opacity, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          ♥
        </m.div>
      ))}
    </div>
  );
}
