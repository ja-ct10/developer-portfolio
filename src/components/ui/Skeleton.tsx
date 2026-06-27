import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-bg-card rounded-[--radius-md] animate-[skeleton-pulse_1s_ease-in-out_infinite] motion-reduce:animate-none motion-reduce:opacity-60",
        className
      )}
      aria-hidden="true"
    />
  );
}
