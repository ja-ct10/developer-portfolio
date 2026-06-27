import { SKILL_CATEGORIES } from "@/lib/constants";
import {
  SKILL_ICON_URLS,
  KIRO_ICON_SVG,
  CATEGORY_ICON_SVGS,
} from "@/lib/skill-icons";
import { ScrollReveal } from "../motion/ScrollReveal";
import { TextReveal } from "../motion/TextReveal";
import { BounceIn } from "../motion/BounceIn";
import { Sparkle } from "../motion/Sparkle";

function CategoryIcon({ category }: { category: string }) {
  const iconData = CATEGORY_ICON_SVGS[category];
  if (!iconData) return null;

  return (
    <svg
      className="size-5 text-accent"
      viewBox={iconData.viewBox}
      fill={iconData.fill || "none"}
      stroke={iconData.stroke || "none"}
      strokeWidth={iconData.strokeWidth || 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconData.paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

function SkillIcon({ label }: { label: string }) {
  // Special case for Kiro (no Devicon available)
  if (label === "Kiro") {
    return (
      <svg
        className="size-8"
        viewBox={KIRO_ICON_SVG.viewBox}
        fill={KIRO_ICON_SVG.fill}
        aria-hidden="true"
      >
        {KIRO_ICON_SVG.paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>
    );
  }

  const url = SKILL_ICON_URLS[label];
  if (!url) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt=""
      className="size-8"
      loading="lazy"
      aria-hidden="true"
    />
  );
}

export function Skills() {
  return (
    <section
      aria-labelledby="skills-heading"
      id="skills"
      className="px-section-x md:px-section-x-md py-20 max-w-[1440px] mx-auto"
    >
      <div className="flex flex-col gap-12">
        {/* Heading */}
        <ScrollReveal>
          <h2
            id="skills-heading"
            className="font-display text-4xl md:text-5xl xl:text-[64px] text-text-primary leading-none"
          >
            <Sparkle count={5} color="#FF4DA6">
              <TextReveal>My Skills</TextReveal>
            </Sparkle>
          </h2>
          <p className="font-body text-base md:text-lg text-text-secondary leading-relaxed mt-4">
            Technologies and tools I&apos;ve worked with throughout my academic journey and personal projects.
          </p>
        </ScrollReveal>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((category, catIndex) => (
            <BounceIn key={category.title} delay={catIndex * 0.1}>
              <article
                className="rounded-[--radius-lg] border-2 border-border-subtle bg-bg-card p-6 transition-all duration-[--duration-normal] ease-[--ease-out] hover:border-accent/30 hover:shadow-lg"
                aria-label={`${category.title} skills`}
              >
                {/* Category Header */}
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-body font-bold text-sm uppercase tracking-wider text-text-primary">
                    {category.title}
                  </h3>
                  <CategoryIcon category={category.title} />
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.label}
                      className="flex flex-col items-center gap-2 rounded-[--radius-md] border border-border-subtle bg-bg-primary/50 p-3 transition-all duration-[--duration-normal] ease-[--ease-out] hover:border-accent/50 hover:bg-bg-elevated hover:scale-105"
                    >
                      <SkillIcon label={skill.label} />
                      <span className="font-body text-xs text-text-secondary font-medium text-center leading-tight">
                        {skill.label}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            </BounceIn>
          ))}
        </div>
      </div>
    </section>
  );
}
