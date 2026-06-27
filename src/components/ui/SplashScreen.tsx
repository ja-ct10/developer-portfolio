"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Sparkle particle positions (distributed around the heart)
const sparkles = [
  { x: -30, y: -20, delay: 0.6, size: 4 },
  { x: 25, y: -25, delay: 0.8, size: 3 },
  { x: -20, y: 25, delay: 1.0, size: 5 },
  { x: 30, y: 20, delay: 0.7, size: 3 },
  { x: -35, y: 5, delay: 0.9, size: 4 },
  { x: 35, y: -5, delay: 1.1, size: 3 },
  { x: 0, y: -35, delay: 0.75, size: 4 },
  { x: 0, y: 35, delay: 1.05, size: 3 },
];

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            "fixed inset-0 z-999 flex flex-col items-center justify-center bg-bg-primary"
          )}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          aria-label="Loading page content"
          role="status"
        >
          {/* Decorative radial glow */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>

          {/* Main content container */}
          <div className="relative flex flex-col items-center gap-5">
            {/* Heart icon with spring bounce + continuous float */}
            <motion.div
              className="relative"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 12,
                delay: 0.2,
              }}
            >
              <motion.svg
                width="56"
                height="56"
                viewBox="0 0 24 24"
                fill="none"
                className="text-accent"
                aria-hidden="true"
                animate={{
                  y: [0, -6, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="currentColor"
                />
              </motion.svg>

              {/* Sparkle particles around the heart */}
              {sparkles.map((sparkle, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 rounded-full bg-accent"
                  style={{
                    width: sparkle.size,
                    height: sparkle.size,
                  }}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0.7, 0],
                    scale: [0, 1.2, 1, 0],
                    x: [0, sparkle.x * 0.5, sparkle.x, sparkle.x * 1.3],
                    y: [0, sparkle.y * 0.5, sparkle.y, sparkle.y * 1.3],
                  }}
                  transition={{
                    duration: 2,
                    delay: sparkle.delay,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    ease: "easeOut",
                  }}
                  aria-hidden="true"
                />
              ))}
            </motion.div>

            {/* Name text — slides up with fade */}
            <motion.h1
              className="font-display text-3xl text-accent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.7,
                ease: [0.33, 1, 0.68, 1],
              }}
            >
              Julie Ann Tiron
            </motion.h1>

            {/* Subtitle — fades in after name */}
            <motion.p
              className="font-body text-base text-text-secondary tracking-widest uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 1.1,
                ease: [0.33, 1, 0.68, 1],
              }}
            >
              Portfolio
            </motion.p>

            {/* Progress bar — grows from 0% to 100% */}
            <motion.div
              className="w-48 h-1.5 rounded-full bg-bg-elevated overflow-hidden mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.3 }}
            >
              <motion.div
                className="h-full rounded-full bg-linear-to-r from-accent to-accent-hover"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 1.4,
                  delay: 1.5,
                  ease: [0.33, 1, 0.68, 1],
                }}
              />
            </motion.div>

            {/* Loading dots — three dots bouncing sequentially */}
            <motion.div
              className="flex items-center gap-1.5 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.3 }}
            >
              <span className="font-body text-sm text-text-muted tracking-wide">
                Loading
              </span>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="inline-block w-1.5 h-1.5 rounded-full bg-accent"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: 1.7 + i * 0.15,
                    ease: "easeInOut",
                  }}
                  aria-hidden="true"
                />
              ))}
            </motion.div>
          </div>

          {/* Screen reader live region */}
          <span className="sr-only" aria-live="polite">
            Page is loading, please wait.
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
