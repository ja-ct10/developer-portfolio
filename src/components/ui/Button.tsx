import { cn } from "@/lib/utils";
import { ArrowIcon } from "./Icons";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "submit";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles = cn(
    "bg-accent text-text-dark font-body font-bold text-base",
    "uppercase rounded-full inline-flex items-center",
    "justify-center gap-3",
    "transition-all duration-[--duration-fast] ease-[--ease-out]",
    "hover:bg-accent-hover hover:scale-[1.05] hover:shadow-[0_4px_20px_rgba(233,30,140,0.4)]",
    "active:scale-[0.97] active:shadow-none",
    "focus-visible:outline-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none",
    variant === "primary" && "h-[54px] pl-6 pr-1.5 py-5",
    variant === "submit" && "h-[54px] px-10 py-5",
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {variant === "primary" && (
        <span
          className="size-[42px] rounded-full bg-text-dark flex items-center justify-center transition-transform duration-[--duration-fast] ease-[--ease-out] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        >
          <ArrowIcon className="size-5 text-accent" />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cn(baseStyles, "group")}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(baseStyles, "group")}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
