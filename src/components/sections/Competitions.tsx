import { COMPETITIONS } from "@/lib/constants";
import { CompetitionCard } from "../cards/CompetitionCard";
import { ScrollReveal } from "../motion/ScrollReveal";
import { TextReveal } from "../motion/TextReveal";
import { BounceIn } from "../motion/BounceIn";
import { Sparkle } from "../motion/Sparkle";

export function Competitions() {
  return (
    <section
      id="competitions"
      aria-labelledby="competitions-heading"
      className="px-section-x md:px-section-x-md py-20 max-w-[1440px] mx-auto"
    >
      <div className="flex flex-col gap-12">
        {/* Heading */}
        <ScrollReveal>
          <h2
            id="competitions-heading"
            className="font-display text-4xl md:text-5xl xl:text-[64px] text-text-primary leading-none"
          >
            <Sparkle count={5} color="#FF4DA6">
              <TextReveal>Competitions</TextReveal>
            </Sparkle>
          </h2>
          <p className="font-body text-base md:text-lg text-text-secondary leading-relaxed mt-4">
            Hackathons and coding competitions that challenged me to grow as a developer.
          </p>
        </ScrollReveal>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPETITIONS.map((competition, index) => (
            <BounceIn key={competition.title} delay={index * 0.12}>
              <CompetitionCard competition={competition} />
            </BounceIn>
          ))}
        </div>
      </div>
    </section>
  );
}
