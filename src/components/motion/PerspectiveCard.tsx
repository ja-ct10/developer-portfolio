"use client";

import { useRef } from "react";
import {
  m,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface PerspectiveCardProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number;
  scale?: number;
}

const springConfig = { stiffness: 300, damping: 30 };

export function PerspectiveCard({
  children,
  className,
  maxRotation = 4,
  scale = 1.02,
}: PerspectiveCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scaleValue = useMotionValue(1);

  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  const springScale = useSpring(scaleValue, springConfig);

  // Dynamic shadow based on tilt direction
  const shadowX = useTransform(springRotateY, [-maxRotation, maxRotation], [8, -8]);
  const shadowY = useTransform(springRotateX, [-maxRotation, maxRotation], [-8, 8]);
  const boxShadow = useTransform(
    [shadowX, shadowY],
    ([x, y]) => `${x}px ${y}px 24px rgba(0, 0, 0, 0.1)`
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || prefersReducedMotion) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    // rotateX inverted: mouse moving down tilts top toward viewer
    rotateX.set(-normalizedY * maxRotation);
    rotateY.set(normalizedX * maxRotation);
    scaleValue.set(scale);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    scaleValue.set(1);
  }

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div style={{ perspective: 1000 }}>
      <m.div
        ref={ref}
        className={className}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          scale: springScale,
          transformStyle: "preserve-3d",
          boxShadow,
        }}
      >
        {children}
      </m.div>
    </div>
  );
}
