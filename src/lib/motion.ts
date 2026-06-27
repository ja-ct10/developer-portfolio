import type { Variants, Transition } from "framer-motion";

// ===========================
// DURATION TOKENS (seconds)
// ===========================
export const duration = {
  instant: 0.075,
  fast: 0.15,
  normal: 0.25,
  slow: 0.35,
  slower: 0.5,
} as const;

// ===========================
// EASING CURVES (cubic-bezier arrays)
// ===========================
export const easing = {
  out: [0.33, 1, 0.68, 1] as [number, number, number, number],
  in: [0.32, 0, 0.67, 0] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
  spring: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

// ===========================
// DEFAULT TRANSITIONS
// ===========================
export const transition = {
  fast: { duration: duration.fast, ease: easing.out } satisfies Transition,
  normal: { duration: duration.normal, ease: easing.out } satisfies Transition,
  slow: { duration: duration.slow, ease: easing.out } satisfies Transition,
  slower: { duration: duration.slower, ease: easing.out } satisfies Transition,
  spring: { duration: duration.slower, ease: easing.spring } satisfies Transition,
  barbieBounce: { type: "spring", stiffness: 300, damping: 15 } satisfies Transition,
  barbieFloat: { duration: 3, repeat: Infinity, ease: "easeInOut" as const, repeatType: "reverse" as const } satisfies Transition,
};

// ===========================
// REUSABLE VARIANTS
// ===========================
export const variants = {
  fadeIn: {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1 },
  } satisfies Variants,

  fadeUp: {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  } satisfies Variants,

  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  } satisfies Variants,

  staggerItem: {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: easing.spring,
      },
    },
  } satisfies Variants,

  textReveal: {
    hidden: { y: "100%" },
    visible: {
      y: "0%",
      transition: {
        duration: 0.6,
        ease: easing.spring,
      },
    },
  } satisfies Variants,
} as const;
