import { OWNER, NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  linkedin: (
    <svg
      className="size-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  github: (
    <svg
      className="size-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  facebook: (
    <svg
      className="size-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  instagram: (
    <svg
      className="size-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z" />
    </svg>
  ),
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Filter nav links for footer (exclude Contact Me since it's in the contact section)
  const footerNavLinks = NAV_LINKS.filter((link) => link.href !== "#contact");

  return (
    <footer
      className="bg-bg-primary border-t border-border-subtle"
      aria-label="Site footer"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-[60px] pt-16 pb-8">
        {/* Top Section — Brand & Social Links */}
        <div className="flex flex-col items-center text-center gap-6">
          <a
            href="#home"
            className="font-display text-3xl md:text-4xl text-accent transition-colors duration-[--duration-fast] hover:text-accent-hover"
          >
            {OWNER.name}
          </a>
          <p className="font-body text-base text-text-secondary max-w-md leading-[1.6]">
            {OWNER.role} — crafting clean, efficient, and reliable server-side
            solutions.
          </p>

          {/* Social Links */}
          <nav aria-label="Social media links">
            <ul className="flex items-center gap-4" role="list">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={cn(
                      "inline-flex items-center justify-center size-10 rounded-full",
                      "bg-white border border-border-subtle text-text-secondary",
                      "transition-all duration-[--duration-normal] ease-[--ease-out]",
                      "hover:bg-accent hover:text-white hover:border-accent",
                      "hover:shadow-[0_4px_20px_rgba(233,30,140,0.4)]",
                      "hover:scale-[1.1]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    )}
                  >
                    {SOCIAL_ICONS[social.icon]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-linear-to-r from-transparent via-border-subtle to-transparent" />

        {/* Middle Section — Navigation & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="font-body font-semibold text-sm uppercase tracking-wider text-text-primary">
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col items-center md:items-start gap-2.5" role="list">
                {footerNavLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={cn(
                        "font-body text-sm text-text-secondary",
                        "transition-colors duration-[--duration-fast] ease-[--ease-out]",
                        "hover:text-accent",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:rounded-sm"
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="font-body font-semibold text-sm uppercase tracking-wider text-text-primary">
              Get in Touch
            </h3>
            <ul className="flex flex-col items-center md:items-start gap-2.5" role="list">
              <li className="flex items-center gap-2.5">
                <svg
                  className="size-4 text-accent shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a
                  href={`mailto:${OWNER.email}`}
                  className={cn(
                    "font-body text-sm text-text-secondary",
                    "transition-colors duration-[--duration-fast]",
                    "hover:text-accent",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:rounded-sm"
                  )}
                >
                  {OWNER.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <svg
                  className="size-4 text-accent shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="font-body text-sm text-text-secondary">
                  Taguig City, Metro Manila
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-linear-to-r from-transparent via-border-subtle to-transparent" />

        {/* Bottom Section — Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-text-muted text-center sm:text-left">
            &copy; {currentYear} {OWNER.name}. All rights reserved.
          </p>
          <a
            href="#home"
            className={cn(
              "inline-flex items-center gap-2 font-body text-sm font-medium",
              "text-text-secondary px-4 py-2 rounded-full",
              "border border-border-subtle bg-white",
              "transition-all duration-[--duration-normal] ease-[--ease-out]",
              "hover:text-accent hover:border-accent hover:shadow-[0_4px_20px_rgba(233,30,140,0.4)]",
              "hover:scale-[1.05]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            )}
          >
            Back to top
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
