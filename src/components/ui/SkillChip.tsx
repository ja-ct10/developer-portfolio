import { cn } from "@/lib/utils";

interface SkillChipProps {
  label: string;
  className?: string;
}

export function SkillChip({ label, className }: SkillChipProps) {
  return (
    <span
      className={cn(
        "border-2 border-accent/40 rounded-full px-6 py-3",
        "font-body font-bold text-sm text-accent uppercase tracking-wide",
        "inline-flex items-center justify-center",
        "bg-accent-muted",
        "transition-all duration-[--duration-fast] ease-[--ease-out]",
        "hover:border-accent hover:text-text-dark hover:bg-accent hover:scale-[1.05] hover:shadow-[0_2px_12px_rgba(233,30,140,0.3)]",
        "active:scale-[0.97]",
        className
      )}
    >
      {label}
    </span>
  );
}
