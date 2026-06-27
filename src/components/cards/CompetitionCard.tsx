"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { cn } from "@/lib/utils";
import { easing } from "@/lib/motion";
import type { Competition } from "@/lib/types";

interface CompetitionCardProps {
  competition: Competition;
}

export function CompetitionCard({ competition }: CompetitionCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <article
      className={cn(
        "relative group rounded-[--radius-lg] overflow-hidden",
        "border-2 border-border-subtle bg-bg-card",
        "transition-all duration-[--duration-normal] ease-[--ease-out]",
        "hover:border-accent/50 hover:shadow-lg",
        "cursor-pointer"
      )}
      onClick={() => setShowDetails(!showDetails)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setShowDetails(!showDetails);
        }
      }}
      tabIndex={0}
      role="button"
      aria-expanded={showDetails}
      aria-label={`${competition.title} - ${competition.achievement}. Click to view details.`}
    >
      {/* Image */}
      <div className="relative aspect-3/4 w-full overflow-hidden">
        <Image
          src={competition.image}
          alt={`${competition.title} competition photo`}
          fill
          className="object-cover transition-transform duration-[--duration-slow] ease-[--ease-out] group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

        {/* Achievement badge */}
        <m.span
          className="absolute top-3 right-3 bg-accent text-text-dark font-body font-bold text-xs px-3 py-1.5 rounded-full shadow-md"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {competition.achievement}
        </m.span>
      </div>

      {/* Title + CTA at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-body font-semibold text-sm md:text-base text-white leading-snug mb-1.5">
          {competition.title} - {competition.achievement}
        </h3>
        <p className="font-body text-xs text-white/70 flex items-center gap-1.5">
          <svg
            className="size-3"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 3.75a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zM8 11a1 1 0 100 2 1 1 0 000-2z" />
          </svg>
          Click to view details
        </p>
      </div>

      {/* Details overlay */}
      <AnimatePresence>
        {showDetails && (
          <m.div
            className="absolute inset-0 bg-bg-primary/95 backdrop-blur-sm flex flex-col items-center justify-start p-6 text-center overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: easing.out }}
          >
            <m.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.3, ease: easing.spring }}
              className="flex flex-col items-center gap-3 my-auto"
            >
              <span className="text-2xl" aria-hidden="true">
                🏆
              </span>
              <h4 className="font-body font-bold text-lg text-text-primary">
                {competition.title}
              </h4>
              <span className="font-body font-semibold text-sm text-accent">
                {competition.achievement}
              </span>
              {competition.description && (
                <p className="font-body text-sm text-text-secondary leading-relaxed mt-2">
                  {competition.description}
                </p>
              )}
              <p className="font-body text-xs text-text-muted mt-3">
                Click to close
              </p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </article>
  );
}
