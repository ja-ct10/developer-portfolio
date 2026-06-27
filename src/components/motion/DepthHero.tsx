"use client";

import {
  useEffect,
  createContext,
  useContext,
  useSyncExternalStore,
} from "react";
import {
  m,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

interface DepthHeroProps {
  children: React.ReactNode;
  className?: string;
  maxTranslate?: number;
  maxRotation?: number;
}

const springConfig = { stiffness: 100, damping: 30 };

const LARGE_SCREEN_QUERY = "(min-width: 1024px)";

// Subscribe to a media query via useSyncExternalStore to avoid
// calling setState synchronously inside an effect (cascading renders).
function subscribeLargeScreen(callback: () => void) {
  const mediaQuery = window.matchMedia(LARGE_SCREEN_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getLargeScreenSnapshot() {
  return window.matchMedia(LARGE_SCREEN_QUERY).matches;
}

function getLargeScreenServerSnapshot() {
  return false;
}

// Context to share spring values with child DepthLayer components
interface DepthContextValue {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  maxTranslate: number;
  isActive: boolean;
}

const DepthContext = createContext<DepthContextValue | null>(null);

export function DepthHero({
  children,
  className,
  maxTranslate = 15,
  maxRotation = 2,
}: DepthHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const isLargeScreen = useSyncExternalStore(
    subscribeLargeScreen,
    getLargeScreenSnapshot,
    getLargeScreenServerSnapshot
  );

  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const springMouseX = useSpring(rawMouseX, springConfig);
  const springMouseY = useSpring(rawMouseY, springConfig);

  // Subtle container rotation
  const rotateX = useTransform(springMouseY, [-1, 1], [maxRotation, -maxRotation]);
  const rotateY = useTransform(springMouseX, [-1, 1], [-maxRotation, maxRotation]);

  useEffect(() => {
    if (prefersReducedMotion || !isLargeScreen) return;

    function handleMouseMove(e: MouseEvent) {
      // Normalize mouse position to -1 to 1
      const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2;


      rawMouseX.set(normalizedX);
      rawMouseY.set(normalizedY);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion, isLargeScreen, rawMouseX, rawMouseY]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const isActive = isLargeScreen && !prefersReducedMotion;

  return (
    <DepthContext.Provider
      value={{
        mouseX: springMouseX,
        mouseY: springMouseY,
        maxTranslate,
        isActive,
      }}
    >
      <m.div
        className={className}
        style={{
          perspective: 1200,
          rotateX: isActive ? rotateX : 0,
          rotateY: isActive ? rotateY : 0,
        }}
      >
        {children}
      </m.div>
    </DepthContext.Provider>
  );
}

/**
 * Child component that applies depth-based parallax inside a DepthHero.
 * Use the `depth` prop (0 to 1) to control parallax intensity.
 * depth=0 means no movement, depth=1 means full maxTranslate movement.
 */
export function DepthLayer({
  children,
  depth = 0,
  className,
}: {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}) {
  const context = useContext(DepthContext);

  // If no context or not active, render children statically
  if (!context || !context.isActive || depth === 0) {
    return <div className={className}>{children}</div>;
  }

  return <DepthLayerInner depth={depth} className={className} context={context}>{children}</DepthLayerInner>;
}

function DepthLayerInner({
  children,
  depth,
  className,
  context,
}: {
  children: React.ReactNode;
  depth: number;
  className?: string;
  context: DepthContextValue;
}) {
  const { mouseX, mouseY, maxTranslate } = context;

  const translateX = useTransform(mouseX, [-1, 1], [
    -maxTranslate * depth,
    maxTranslate * depth,
  ]);
  const translateY = useTransform(mouseY, [-1, 1], [
    -maxTranslate * depth,
    maxTranslate * depth,
  ]);

  return (
    <m.div
      className={className}
      style={{
        x: translateX,
        y: translateY,
      }}
    >
      {children}
    </m.div>
  );
}
