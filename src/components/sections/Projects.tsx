import { PROJECTS } from "@/lib/constants";
import { ProjectCard } from "../cards/ProjectCard";
import { ScrollReveal } from "../motion/ScrollReveal";
import { TextReveal } from "../motion/TextReveal";
import { Sparkle } from "../motion/Sparkle";

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="px-section-x md:px-section-x-md py-20 max-w-[1440px] mx-auto"
    >
      <div className="flex flex-col gap-16">
        <ScrollReveal>
          <div className="flex flex-col gap-4 max-w-[640px]">
            <h2
              id="projects-heading"
              className="font-display text-4xl md:text-5xl xl:text-[64px] text-text-primary leading-none"
            >
              <Sparkle count={4} color="#FF4DA6">
                <TextReveal>Featured Projects</TextReveal>
              </Sparkle>
            </h2>
            <p className="font-body text-lg text-text-secondary leading-[1.6]">
              Here are some of the selected projects that showcase my passion for
              software development.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-10">
          {PROJECTS.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.1}>
              <ProjectCard project={project} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
