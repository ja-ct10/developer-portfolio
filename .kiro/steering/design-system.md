---
inclusion: auto
---

# Design System Guidelines — Barbie Theme 💖

## Color Tokens

- Always use semantic token names (e.g., `text-text-primary`, `bg-bg-card`) instead of raw hex values
- Background: Light pink base (#FFF0F5) with white cards, soft pink elevated surfaces
- Text: Dark plum (#2D0A1F) for primary, deep rose (#6B2D5B) for secondary, muted pink (#B05A8C) for muted
- Accent: Iconic Barbie hot pink (#E91E8C) with brighter hover (#FF4DA6)
- Borders: Soft pink tones (#F5A3CC, #FCCDE6)

## Typography

- Display font (`font-display`): Pacifico — used ONLY for section headings (cursive, fun, glamorous)
- Body font (`font-body`): Poppins — used for all body text, labels, and UI elements (clean, bubbly, modern)
- Since Pacifico is inherently cursive, do NOT add `italic` to display headings
- Line heights: Use `leading-[1.1]` for headings, `leading-[1.6]` for body text
- Never mix display and body fonts within the same text element

## Spacing

- Section padding: `px-6 md:px-[108px] py-20`
- Max container width: `max-w-[1440px] mx-auto`
- Content gaps: Use consistent scales (gap-2, gap-3, gap-4, gap-6, gap-8, gap-10, gap-12, gap-16, gap-20)

## Motion & Transitions

- Duration tokens: `--duration-instant` (75ms), `--duration-fast` (150ms), `--duration-normal` (250ms), `--duration-slow` (350ms)
- Easing: `--ease-out` for entrances/hover, `--ease-in` for exits, `--ease-in-out` for state changes
- Always respect `prefers-reduced-motion`
- Prefer `transform` and `opacity` for animations (GPU-accelerated)
- Interactive elements should have hover AND active states
- Buttons/chips scale up slightly more on hover (1.05) for playful feel

## Barbie Theme Principles

- Use generous border-radius (rounded-full for buttons/chips, rounded-2xl for cards)
- Pink glow hover effects using `shadow-[0_4px_20px_rgba(233,30,140,0.4)]`
- Light, airy backgrounds with subtle radial gradient overlays
- Cards have white backgrounds with soft pink borders
- The overall vibe: glamorous, fun, feminine, and modern

## Accessibility

- All interactive elements need visible focus states using `focus-visible:ring-2 focus-visible:ring-accent`
- Use semantic HTML elements (`article`, `nav`, `section`, `time`, `dl/dt/dd`)
- Every section must have `aria-labelledby` pointing to its heading
- Icons in interactive elements should have `aria-hidden="true"` (label goes on parent)
- Color contrast: maintain WCAG AA minimum (4.5:1 for text, 3:1 for large text)
- Dark text on light backgrounds ensures strong contrast

## Component Patterns

- Use the `cn()` utility from `@/lib/utils` for conditional class merging
- Components should accept a `className` prop for composition
- Data flows through constants — edit `src/lib/constants.ts` for content changes
- Client components are marked with `"use client"` and kept minimal (only Navbar and ContactForm)

## Responsive Design

- Mobile-first approach using Tailwind breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- Use `flex-col lg:flex-row` pattern for section layouts
- Images use `fill` + `sizes` attribute for responsive loading
- No horizontal overflow — always test with `overflow-x-hidden` on body
