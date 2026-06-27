"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { GALLERY_IMAGES } from "@/lib/constants";
import { easing, duration } from "@/lib/motion";
import { ScrollReveal } from "../motion/ScrollReveal";
import { TextReveal } from "../motion/TextReveal";
import { Sparkle } from "../motion/Sparkle";

export function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScrollState = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft: sl, scrollWidth, clientWidth } = container;
    setCanScrollLeft(sl > 5);
    setCanScrollRight(sl < scrollWidth - clientWidth - 5);

    // Calculate active index based on scroll position
    const itemWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth + 16
      : 300;

    // If scrolled to the end, set to last index
    if (sl >= scrollWidth - clientWidth - 5) {
      setActiveIndex(GALLERY_IMAGES.length - 1);
    } else {
      const newIndex = Math.round(sl / itemWidth);
      setActiveIndex(Math.min(newIndex, GALLERY_IMAGES.length - 1));
    }
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateScrollState();
    container.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;

    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
    container.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const container = scrollRef.current;
    if (!container) return;

    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab";
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (scrollRef.current) {
        scrollRef.current.style.cursor = "grab";
      }
    }
  };

  // Navigation button handlers
  const scrollBy = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.7;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="py-20 max-w-[1440px] mx-auto"
    >
      <div className="flex flex-col gap-10">
        {/* Heading + Navigation */}
        <div className="px-section-x md:px-section-x-md flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <ScrollReveal>
            <h2
              id="gallery-heading"
              className="font-display text-4xl md:text-5xl xl:text-[64px] text-text-primary leading-none"
            >
              <Sparkle count={5} color="#FF4DA6">
                <TextReveal>Gallery</TextReveal>
              </Sparkle>
            </h2>
          </ScrollReveal>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollBy("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll gallery left"
              className={cn(
                "size-11 rounded-full flex items-center justify-center",
                "border-2 border-border-subtle bg-bg-card",
                "transition-all duration-[--duration-normal] ease-[--ease-out]",
                "hover:border-accent hover:shadow-[0_4px_20px_rgba(233,30,140,0.4)] hover:scale-105",
                "active:scale-95",
                "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-border-subtle disabled:hover:shadow-none disabled:hover:scale-100"
              )}
            >
              <svg
                className="size-5 text-text-primary"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <button
              onClick={() => scrollBy("right")}
              disabled={!canScrollRight}
              aria-label="Scroll gallery right"
              className={cn(
                "size-11 rounded-full flex items-center justify-center",
                "border-2 border-border-subtle bg-bg-card",
                "transition-all duration-[--duration-normal] ease-[--ease-out]",
                "hover:border-accent hover:shadow-[0_4px_20px_rgba(233,30,140,0.4)] hover:scale-105",
                "active:scale-95",
                "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-border-subtle disabled:hover:shadow-none disabled:hover:scale-100"
              )}
            >
              <svg
                className="size-5 text-text-primary"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Gallery */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex gap-4 overflow-x-auto px-section-x md:px-section-x-md",
            "scroll-smooth snap-x snap-mandatory",
            "select-none cursor-grab"
          )}
          role="region"
          aria-label="Photo gallery - drag to scroll"
          tabIndex={0}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {GALLERY_IMAGES.map((image, index) => (
            <m.div
              key={image.src}
              className="shrink-0 snap-start"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: duration.slow,
                ease: easing.spring,
                delay: index * 0.05,
              }}
            >
              <div
                className={cn(
                  "relative w-[280px] sm:w-[320px] md:w-[360px] aspect-square rounded-[--radius-lg] overflow-hidden",
                  "border-2 border-border-subtle bg-bg-card",
                  "transition-all duration-[--duration-normal] ease-[--ease-out]",
                  "hover:border-accent/50 hover:shadow-lg hover:scale-[1.02]",
                  "group"
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className={cn(
                    "object-cover transition-transform duration-[--duration-slow] ease-[--ease-out]",
                    "group-hover:scale-105",
                    isDragging && "pointer-events-none"
                  )}
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 360px"
                  draggable={false}
                />

                {/* Caption overlay */}
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4 pt-8">
                    <p className="font-body text-sm text-white font-medium">
                      {image.caption}
                    </p>
                  </div>
                )}
              </div>
            </m.div>
          ))}
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 px-section-x md:px-section-x-md">
          {GALLERY_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const container = scrollRef.current;
                if (!container) return;
                // For the last image, scroll to the very end
                if (index === GALLERY_IMAGES.length - 1) {
                  container.scrollTo({
                    left: container.scrollWidth - container.clientWidth,
                    behavior: "smooth",
                  });
                } else {
                  const itemWidth = container.firstElementChild
                    ? (container.firstElementChild as HTMLElement).offsetWidth + 16
                    : 300;
                  container.scrollTo({
                    left: itemWidth * index,
                    behavior: "smooth",
                  });
                }
              }}
              aria-label={`Go to image ${index + 1}`}
              className={cn(
                "rounded-full transition-all duration-[--duration-normal] ease-[--ease-out]",
                activeIndex === index
                  ? "w-8 h-2.5 bg-accent"
                  : "w-2.5 h-2.5 bg-border hover:bg-accent/50"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
