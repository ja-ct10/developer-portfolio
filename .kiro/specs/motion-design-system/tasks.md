# Implementation Plan:

## Overview

Implement a premium motion design system using Framer Motion with minimal client boundaries. The work is organized into 14 tasks that progressively build the motion infrastructure (tokens → providers → primitives) and then apply it to each section of the portfolio.

## Tasks

- [x] 1. Install Framer Motion and create motion token module (`src/lib/motion.ts`) with duration constants, easing arrays, and reusable variant definitions (fadeIn, fadeUp, staggerContainer, staggerItem, textReveal)
- [x] 2. Create MotionProvider client component (`src/components/motion/MotionProvider.tsx`) wrapping LazyMotion + MotionConfig, and integrate it into `src/app/layout.tsx`
- [x] 3. Create ScrollReveal motion wrapper component (`src/components/motion/ScrollReveal.tsx`) using useInView with once:true, amount:0.2, animating opacity 0→1 and scale 0.98→1
- [x] 4. Create FadeIn, StaggerContainer, and StaggerItem components (`src/components/motion/FadeIn.tsx`, `StaggerContainer.tsx`, `StaggerItem.tsx`) with barrel export index file
- [x] 5. Create TextReveal component (`src/components/motion/TextReveal.tsx`) using overflow-hidden mask with translateY 100%→0% animation triggered by useInView
- [x] 6. Implement Hero entrance sequence — wrap Hero content in StaggerContainer/StaggerItem for heading, subtitle, CTA cascade; wrap portrait in FadeIn with 0.3s delay
- [x] 7. Apply ScrollReveal to all content sections (Projects, About, Skills, Experience, Contact) with layered reveal hierarchy and stagger delays
- [x] 8. Add TextReveal to all section headings (Projects, About, Skills, Experience, Contact) rendered with the display font
- [x] 9. Enhance ProjectCard with CSS-only hover interaction — scale 1.02, shadow-lg, focus-within parity, motion-reduce fallback
- [x] 10. Enhance Navbar with AnimatePresence for mobile menu and staggered link entrance (50ms per item, 250ms container transition)
- [x] 11. Create GrainOverlay component (`src/components/motion/GrainOverlay.tsx`) with SVG feTurbulence noise at 3% opacity, animated shift, and add to layout
- [x] 12. Create ParallaxLayer component (`src/components/motion/ParallaxLayer.tsx`) using useScroll/useTransform, apply to About section image and decorative elements
- [x] 13. Create Skeleton loader component (`src/components/ui/Skeleton.tsx`) with custom pulse keyframes (opacity 0.4→1.0) and reduced-motion fallback
- [x] 14. Final verification — build check, performance audit (60fps, no CLS), reduced-motion compliance, bundle size validation, cross-browser testing

## Task Dependency Graph

```json
{
  "waves": [[1], [2, 9, 13], [3, 4, 5, 10, 11, 12], [6, 7, 8], [14]]
}
```

## Notes

- Tasks 1-2 form the foundation and must be completed first
- Tasks 3, 4, 5 can run in parallel after task 2
- Tasks 6, 7, 8 depend on their respective primitives (4, 3, 5)
- Tasks 9 and 13 are CSS-only and have no motion library dependencies
- Task 14 is the final validation gate after all other tasks complete
- All motion wrapper components remain under 50 lines of code
- Section components (Hero, Projects, About, etc.) remain server components — only the motion wrappers are client components
