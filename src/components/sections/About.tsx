import Image from "next/image";
import { Button } from "../ui/Button";
import { SocialIcon } from "../ui/SocialIcon";
import { OWNER } from "@/lib/constants";
import { ScrollReveal } from "../motion/ScrollReveal";
import { TextReveal } from "../motion/TextReveal";
import { ParallaxLayer } from "../motion/ParallaxLayer";
import { Sparkle } from "../motion/Sparkle";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="px-section-x md:px-section-x-md py-20 max-w-[1440px] mx-auto"
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Heading */}
        <ScrollReveal>
          <h2
            id="about-heading"
            className="font-display text-4xl md:text-6xl xl:text-[72px] text-text-primary leading-[0.9] shrink-0"
          >
            <Sparkle count={5}>
              <TextReveal>About Me</TextReveal>
            </Sparkle>
          </h2>
        </ScrollReveal>

        {/* Content */}
        <ScrollReveal delay={0.1} className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <p className="font-body font-medium text-2xl md:text-[32px] text-text-primary leading-[1.4]">
              {OWNER.bio}
            </p>
            <p className="font-body text-lg text-text-secondary leading-[1.6]">
              {OWNER.bioExtended}
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-4">
            <Button href="/Tiron_JulieAnn_Resume.pdf">Download Resume</Button>
            <SocialIcon
              icon="linkedin"
              href="https://linkedin.com"
              label="LinkedIn profile"
            />
            <SocialIcon
              icon="github"
              href="https://github.com"
              label="GitHub profile"
            />
          </div>
        </ScrollReveal>
      </div>

      {/* About Image with Parallax */}
      <ScrollReveal delay={0.15}>
        <ParallaxLayer speed={0.05} className="relative w-full h-[300px] md:h-[500px] lg:h-[645px] mt-16 rounded-2xl overflow-hidden">
          <Image
            src="/images/code-fest.JPG"
            alt={`${OWNER.name} working`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1155px"
          />
        </ParallaxLayer>
      </ScrollReveal>
    </section>
  );
}
