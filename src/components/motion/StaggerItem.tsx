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
