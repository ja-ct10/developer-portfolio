# Design Document

## Overview

This design implements a premium motion system for the developer portfolio using Framer Motion with minimal client boundaries. The architecture maximizes server-side rendering by wrapping only animated elements in lightweight client components, while centralizing all motion configuration in a dedicated module.

The system adds purposeful, performance-optimized animations (opacity + transform only) across all portfolio sections. Every motion wrapper is a small client component (< 50 LOC) that accepts server-rendered children, preserving SSR benefits.

## Architecture

### File Structure

```
src/
├── lib/
│   └── motion.ts              # Motion tokens, variants, and configuration constants
├── components/
│   ├── motion/
│   │   ├── MotionProvider.tsx  # LazyMotion + MotionConfig wrapper for root layout
│   │   ├── ScrollReveal.tsx    # Intersection-observer-based reveal wrapper
│   │   ├── FadeIn.tsx          # Simple fade+scale entrance wrapper
│   │   ├── StaggerContainer.tsx # Orchestrates staggered children
│   │   ├── StaggerItem.tsx     # Individual stagger child
│   │   ├── TextReveal.tsx      # Mask-based heading reveal
│   │   ├── GrainOverlay.tsx    # Animated noise texture overlay
│   │   ├── ParallaxLayer.tsx   # Scroll-linked parallax offset
│   │   └── index.ts           # Barrel export
│   ├── ui/
│   │   └── Skeleton.tsx       # Loading state placeholder
│   ├── sections/              # Updated with motion wrappers (remain server components)
│   ├── cards/                 # Updated with CSS hover enhancements
│   └── layout/               # Navbar enhanced with AnimatePresence
├── app/
│   └── layout.tsx            # Updated to include MotionProvider + GrainOverlay
```

### Component Hierarchy

```
layout.tsx (server)
└── MotionProvider (client boundary - LazyMotion + MotionConfig)
    ├── page.tsx (server)
    │   ├── Navbar (client - existing + AnimatePresence enhancement)
    │   ├── Hero (server → children wrapped in StaggerContainer/FadeIn)
    │   ├── Projects (server → wrapped in ScrollReveal + TextReveal)
    │   ├── About (server → wrapped in ScrollReveal + TextReveal + ParallaxLayer)
    │   ├── Skills (server → wrapped in ScrollReveal + TextReveal)
    │   ├── Experience (server → wrapped in ScrollReveal + TextReveal)
    │   └── Contact (server → wrapped in ScrollReveal + TextReveal)
    └── GrainOverlay (client - fixed viewport overlay)
```

## Components and Interfaces

### Motion Token Module (`src/lib/motion.ts`)

```typescript
// Duration tokens (in seconds for Framer Motion)
export const duration = {
  instant: 0.075,
  fast: 0.15,
  normal: 0.25,
  slow: 0.35,
  slower: 0.5,
} as const;

// Easing curves as cubic-bezier arrays
export const easing = {
  out: [0.33, 1, 0.68, 1] as const,
  in: [0.32, 0, 0.67, 0] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  spring: [0.22, 1, 0.36, 1] as const,
};

// Reusable Framer Motion variants
export const variants = {
  fadeIn: {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1 },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  staggerContainer: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  },
  textReveal: {
    hidden: { y: "100%" },
    visible: {
      y: "0%",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  },
};
```

### MotionProvider (`src/components/motion/MotionProvider.tsx`)

```typescript
"use client";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";

interface MotionProviderProps {
  children: React.ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
```

### ScrollReveal (`src/components/motion/ScrollReveal.tsx`)

```typescript
"use client";
import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { duration, easing } from "@/lib/motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration: dur = duration.slower,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: 0.2 });

  return (
    <m.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
      transition={{ duration: dur, delay, ease: easing.out }}
    >
      {children}
    </m.div>
  );
}
```

### FadeIn (`src/components/motion/FadeIn.tsx`)

```typescript
"use client";
import { m } from "framer-motion";
import { duration, easing } from "@/lib/motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "none";
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const y = direction === "up" ? 12 : direction === "down" ? -12 : 0;

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: duration.slower, delay, ease: easing.spring }}
    >
      {children}
    </m.div>
  );
}
```

### StaggerContainer (`src/components/motion/StaggerContainer.tsx`)

```typescript
"use client";
import { m } from "framer-motion";

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayStart?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.12,
  delayStart = 0,
}: StaggerContainerProps) {
  return (
    <m.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren: delayStart },
        },
      }}
    >
      {children}
    </m.div>
  );
}
```

### StaggerItem (`src/components/motion/StaggerItem.tsx`)

```typescript
"use client";
import { m } from "framer-motion";
import { variants } from "@/lib/motion";

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <m.div className={className} variants={variants.staggerItem}>
      {children}
    </m.div>
  );
}
```

### TextReveal (`src/components/motion/TextReveal.tsx`)

```typescript
"use client";
import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { variants } from "@/lib/motion";

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
```

### GrainOverlay (`src/components/motion/GrainOverlay.tsx`)

```typescript
"use client";

export function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] motion-reduce:animate-none"
      aria-hidden="true"
    >
      <svg className="w-full h-full animate-grain">
        <filter id="grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  );
}
```

### ParallaxLayer (`src/components/motion/ParallaxLayer.tsx`)

```typescript
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-maxOffset, maxOffset]);

  if (prefersReduced) return <div className={className}>{children}</div>;

  return (
    <m.div ref={ref} className={className} style={{ y }}>
      {children}
    </m.div>
  );
}
```

### Skeleton (`src/components/ui/Skeleton.tsx`)

```typescript
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-bg-card rounded-[--radius-md] animate-skeleton-pulse motion-reduce:animate-none motion-reduce:opacity-60",
        className
      )}
    />
  );
}
```

## Data Models

No new data models or database schema changes are required. This feature operates entirely on the client-side presentation layer using existing component props and motion configuration constants.

The motion token system uses TypeScript `as const` assertions for type safety:

```typescript
// Duration type derives from the constant object
type Duration = typeof duration;
type DurationKey = keyof Duration; // "instant" | "fast" | "normal" | "slow" | "slower"

// Easing type for cubic-bezier arrays
type EasingArray = readonly [number, number, number, number];
```

## Error Handling

1. **IntersectionObserver fallback**: If `IntersectionObserver` is not supported (very old browsers), `useInView` from Framer Motion falls back to showing content immediately (no animation, content visible).

2. **Reduced motion**: All components check `useReducedMotion()` or rely on `MotionConfig reducedMotion="user"` — if the OS preference is set to reduce, all transitions resolve instantly without motion.

3. **SSR hydration**: Motion components use `initial` prop which matches the server-rendered state. Content starts hidden (`opacity: 0`) but maintains layout dimensions to prevent CLS. Framer Motion handles hydration gracefully with LazyMotion.

4. **Missing children**: All wrapper components pass through `children` without transformation. If no children are provided, an empty wrapper renders (no crash).

5. **Bundle loading failure**: If the `domAnimation` feature chunk fails to load, LazyMotion gracefully degrades — components render without animation.

## Correctness Properties

### Property 1: No CLS invariant

All animated elements maintain their final layout dimensions at all times. `opacity: 0` hides visually without collapsing space. Animated elements occupy their bounding box from initial render.

**Validates: Requirements 12.5**

### Property 2: Once-trigger invariant

ScrollReveal and TextReveal fire exactly once per element. After triggering, elements remain in their visible state permanently. Re-scrolling past does not replay the animation.

**Validates: Requirements 4.4, 8.3**

### Property 3: Performance invariant

Only `opacity` and `transform` properties are animated. No layout-triggering properties (width, height, top, left, margin, padding) are ever animated by any motion component.

**Validates: Requirements 12.1, 12.2**

### Property 4: Accessibility invariant

When `prefers-reduced-motion: reduce` is active, no decorative motion plays. Essential state feedback (color, opacity for hover) remains functional. Content is always accessible regardless of animation state.

**Validates: Requirements 13.1, 13.2, 13.4**

### Property 5: Timing invariant

Hero sequence completes in ≤1.2s. Mobile menu transitions complete in 200–300ms. Card hover transitions use 150–250ms. No animation exceeds 600ms without explicit justification.

**Validates: Requirements 3.4, 5.3, 6.2**

## Testing Strategy

1. **Visual regression**: Manual testing in development mode — verify animations play correctly, timing feels right, no visual glitches.

2. **Reduced motion**: Toggle `prefers-reduced-motion: reduce` in browser devtools → verify all decorative animations are disabled, content remains visible and accessible.

3. **Build verification**: `npm run build` must pass with zero errors. Check for unused imports and correct client/server boundaries.

4. **Performance**: Use Chrome DevTools Performance panel to verify:
   - Animations run at 60fps (no frame drops)
   - No layout shifts during animation
   - No forced reflows in animation callbacks

5. **Bundle analysis**: Verify framer-motion contribution via build output — domAnimation feature set should be ≤20KB gzipped.

6. **Cross-browser**: Test in Chrome, Firefox, Safari — ensure IntersectionObserver, CSS animations, and Framer Motion all function correctly.

7. **Keyboard navigation**: Tab through all interactive elements — verify focus is never trapped, focus indicators remain visible, and animations don't block interaction.
