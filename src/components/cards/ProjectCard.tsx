"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/types";
import { GitHubIcon } from "../ui/Icons";

interface ProjectCardProps {
  project: Project;
  className?: string;
  index?: number;
}

export function ProjectCard({ project, className, index = 0 }: ProjectCardProps) {
  const isReversed = index % 2 !== 0;

  return (
    <article
      className={cn(
        "group relative",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-col lg:flex-row gap-0 rounded-[--radius-lg] overflow-hidden",
          "bg-bg-card border-2 border-border-subtle",
          "transition-all duration-[--duration-normal] ease-[--ease-out]",
          "hover:border-accent/40 hover:shadow-[0_20px_60px_-12px_rgba(233,30,140,0.2)]",
          "motion-reduce:hover:shadow-none!",
          isReversed && "lg:flex-row-reverse"
        )}
      >
        {/* Project Image - Full bleed, no crop */}
        <div className="relative w-full lg:w-[55%] shrink-0 bg-bg-elevated overflow-hidden">
          <div className="relative aspect-16/10 lg:aspect-auto lg:h-full lg:min-h-[400px]">
            <Image
              src={project.image}
              alt={`${project.title} project screenshot`}
              fill
              className="object-contain p-6 md:p-10 transition-transform duration-[--duration-slow] ease-[--ease-out] group-hover:scale-[1.04]"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>

          {/* Tag badge */}
          {project.tag && (
            <span className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm text-white font-body font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
              {project.tag}
            </span>
          )}

          {/* Decorative gradient accent line */}
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-accent via-accent-hover to-accent opacity-0 transition-opacity duration-[--duration-normal]",
              "group-hover:opacity-100",
              "lg:hidden"
            )}
          />
          {/* Vertical accent line for desktop */}
          <div
            className={cn(
              "hidden lg:block absolute top-0 bottom-0 w-1 bg-linear-to-b from-accent via-accent-hover to-accent opacity-0 transition-opacity duration-[--duration-normal]",
              "group-hover:opacity-100",
              isReversed ? "left-0" : "right-0"
            )}
          />
        </div>

        {/* Project Content */}
        <div className="flex flex-col justify-between p-6 md:p-8 lg:p-10 flex-1 min-w-0 gap-6">
          {/* Top Content */}
          <div className="flex flex-col gap-5">
            {/* Year */}
            <span className="font-body font-bold text-xs text-accent uppercase tracking-widest">
              {project.year}
            </span>

            {/* Title */}
            <h3 className="font-body font-bold text-2xl md:text-3xl lg:text-[32px] text-text-primary leading-tight">
              {project.title}
            </h3>

            {/* Description */}
            <p className="font-body text-base text-text-secondary leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Bottom Content */}
          <div className="flex flex-col gap-5">
            {/* Project Meta */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-elevated border border-border-subtle font-body text-xs font-medium text-text-secondary">
                <svg className="size-3 text-accent" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                {project.role}
              </span>
              {project.client && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-elevated border border-border-subtle font-body text-xs font-medium text-text-secondary">
                  <svg className="size-3 text-accent" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                  </svg>
                  {project.client}
                </span>
              )}
            </div>

            {/* GitHub Link */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2.5 w-fit",
                  "px-6 py-3 rounded-full",
                  "bg-text-primary text-white font-body font-bold text-sm",
                  "transition-all duration-[--duration-fast] ease-[--ease-out]",
                  "hover:bg-accent hover:shadow-[0_4px_20px_rgba(233,30,140,0.4)] hover:scale-[1.03]",
                  "active:scale-[0.97]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                )}
              >
                <GitHubIcon className="size-4" />
                View on GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
