import { cn } from "@/lib/utils";
import { LinkedInIcon, GitHubIcon, FacebookIcon, InstagramIcon } from "./Icons";

interface SocialIconProps {
  icon: "linkedin" | "github" | "facebook" | "instagram";
  href: string;
  label: string;
  size?: "sm" | "md";
  className?: string;
}

const iconMap = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
};

export function SocialIcon({
  icon,
  href,
  label,
  size = "md",
  className,
}: SocialIconProps) {
  const Icon = iconMap[icon];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "group bg-bg-icon rounded-full flex items-center justify-center",
        "border border-transparent",
        "transition-all duration-[--duration-fast] ease-[--ease-out]",
        "hover:bg-accent-muted hover:border-accent/30 hover:scale-110",
        "active:scale-95",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
        size === "md" && "size-[54px]",
        size === "sm" && "size-9",
        className
      )}
    >
      <Icon
        className={cn(
          "text-text-secondary transition-colors duration-[--duration-fast] group-hover:text-accent",
          size === "md" && "size-[26px]",
          size === "sm" && "size-5"
        )}
      />
    </a>
  );
}
