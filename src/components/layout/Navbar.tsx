"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, m } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { easing } from "@/lib/motion";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  // Track scroll position for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.querySelector(link.href)
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close mobile menu on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    },
    [mobileOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isContact = (href: string) => href === "#contact";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "transition-all duration-[--duration-normal] ease-[--ease-out]",
        "border-b",
        scrolled
          ? "bg-bg-primary/95 backdrop-blur-md shadow-md border-border-subtle"
          : "bg-transparent backdrop-blur-none border-transparent"
      )}
      aria-label="Main navigation"
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 md:px-[60px] py-6">
        <a
          href="#home"
          className="font-display text-[28px] text-accent tracking-tight leading-normal transition-colors duration-[--duration-fast] hover:text-accent-hover animate-barbie-float"
        >
          Julie Ann Tiron
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "relative font-body font-medium text-base transition-all duration-[--duration-fast]",
                  isContact(link.href)
                    ? "bg-accent text-text-dark px-5 py-2.5 rounded-full hover:bg-accent-hover hover:scale-[1.05] active:scale-[0.97]"
                    : cn(
                        "text-text-secondary hover:text-accent",
                        activeSection === link.href && "text-accent"
                      )
                )}
                onClick={() => setActiveSection(link.href)}
              >
                {link.label}
                {/* Active indicator underline (not for Contact button) */}
                {!isContact(link.href) && (
                  <span
                    className={cn(
                      "absolute bottom-[-4px] left-0 h-0.5 bg-accent rounded-full",
                      "transition-all duration-[--duration-fast] ease-[--ease-out]",
                      activeSection === link.href ? "w-full" : "w-0"
                    )}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="md:hidden text-text-secondary p-2 transition-colors duration-[--duration-fast] hover:text-accent"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="size-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            id="mobile-nav-menu"
            className="md:hidden overflow-hidden pb-6 bg-bg-primary/95 backdrop-blur-md border-b border-border-subtle"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: easing.out }}
          >
            <ul className="flex flex-col items-center gap-4 px-6" role="list">
              {NAV_LINKS.map((link, index) => (
                <m.li
                  key={link.href}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.05,
                    ease: easing.out,
                  }}
                >
                  <a
                    href={link.href}
                    className={cn(
                      "font-body font-medium text-lg transition-colors duration-[--duration-fast]",
                      isContact(link.href)
                        ? "bg-accent text-text-dark px-5 py-2 rounded-full hover:bg-accent-hover"
                        : cn(
                            "text-text-secondary hover:text-accent",
                            activeSection === link.href && "text-accent"
                          )
                    )}
                    onClick={() => {
                      setMobileOpen(false);
                      setActiveSection(link.href);
                    }}
                  >
                    {link.label}
                  </a>
                </m.li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
