"use client";

import { cn } from "@/lib/utils";

const MARQUEE_ITEMS = [
  "Cybersecurity",
  "Backend Development",
  "Database Design",
  "Mobile Development",
  "Open to Collaborate",
  "Available for Internships",
];

interface MarqueeProps {
  className?: string;
}

export function Marquee({ className }: MarqueeProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-text-primary py-4",
        className
      )}
      aria-hidden="true"
    >
      <div className="flex animate-[marquee_25s_linear_infinite] whitespace-nowrap">
        {/* Duplicate items for seamless loop */}
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(
          (item, i) => (
            <span key={i} className="flex items-center shrink-0">
              <span className="font-body font-semibold text-sm uppercase tracking-widest text-bg-primary px-6">
                {item}
              </span>
              <span className="text-accent text-xs" aria-hidden="true">
                ✦
              </span>
            </span>
          )
        )}
      </div>
    </div>
  );
}
