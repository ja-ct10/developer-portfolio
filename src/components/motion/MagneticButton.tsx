"use client";

import { useRef } from "react";
import { m, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  maxDistance?: number;
  innerScale?: number;
}

const outerSpringConfig = { stiffness: 400, damping: 28 };
const innerSpringConfig = { stiffness: 400, damping: 28 };

export function MagneticButton({
  children,
  className,
  maxDistance = 8,
  innerScale = 0.6,
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Outer element motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Inner content motion values (moves at a fraction of outer)
  const innerX = useMotionValue(0);
  const innerY = useMotionValue(0);

  const springX = useSpring(x, outerSpringConfig);
  const springY = useSpring(y, outerSpringConfig);
  const springInnerX = useSpring(innerX, innerSpringConfig);
  const springInnerY = useSpring(innerY, innerSpringConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || prefersReducedMotion) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Distance from center, clamped to maxDistance
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDim = Math.max(rect.width, rect.height) / 2;

    // Normalize and clamp
    const factor = Math.min(distance / maxDim, 1);
    const angle = Math.atan2(deltaY, deltaX);

    const moveX = Math.cos(angle) * factor * maxDistance;
    const moveY = Math.sin(angle) * factor * maxDistance;

    x.set(moveX);
    y.set(moveY);
    innerX.set(moveX * innerScale);
    innerY.set(moveY * innerScale);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    innerX.set(0);
    innerY.set(0);
  }

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
        willChange: "transform",
      }}
    >
      <m.div
        style={{
          x: springInnerX,
          y: springInnerY,
        }}
      >
        {children}
      </m.div>
    </m.div>
  );
}
