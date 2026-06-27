"use client";

import Image from "next/image";
import { Button } from "../ui/Button";
import { SocialIcon } from "../ui/SocialIcon";
import { TypeWriter } from "../ui/TypeWriter";
import { OWNER } from "@/lib/constants";
import { StaggerContainer } from "../motion/StaggerContainer";
import { StaggerItem } from "../motion/StaggerItem";
import { FadeIn } from "../motion/FadeIn";
import { DepthHero, DepthLayer } from "../motion/DepthHero";
import { MagneticButton } from "../motion/MagneticButton";
import { FloatingHearts } from "../motion/FloatingHearts";
import { Sparkle } from "../motion/Sparkle";
import { PulseGlow } from "../motion/PulseGlow";

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative min-h-screen flex items-center pt-24 px-section-x md:px-section-x-md max-w-[1440px] mx-auto overflow-hidden"
    >
      {/* Floating hearts background */}
      <FloatingHearts />

      <DepthHero className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 w-full py-12 lg:py-20 relative z-10">
        {/* Text Content */}
        <DepthLayer depth={0.3} className="order-2 lg:order-1">
          <StaggerContainer className="flex flex-col gap-10 lg:max-w-[544px] text-center lg:text-left">
            <StaggerItem>
              <div className="flex flex-col gap-3">
                <h1 className="font-display text-5xl md:text-7xl xl:text-[80px] text-text-primary leading-[1.1]">
                  Hi, I&apos;m{" "}
                  <Sparkle count={8} color="#FF4DA6">
                    <span className="block text-accent">Julie Ann Tiron.</span>
                  </Sparkle>
                </h1>
                <p className="font-body text-lg md:text-xl text-text-secondary">
                  <TypeWriter
                    words={[
                      "BS Information Technology",
                      "Aspiring Back-end Developer",
                      "Aspiring Database Administrator",
                    ]}
                  />
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <MagneticButton>
                  <PulseGlow className="rounded-full">
                    <Button href="#contact">Contact Me</Button>
                  </PulseGlow>
                </MagneticButton>
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
            </StaggerItem>
          </StaggerContainer>
        </DepthLayer>

        {/* Portrait Image */}
        <DepthLayer depth={0.6} className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <FadeIn
            delay={0.3}
            className="relative w-[280px] h-[330px] sm:w-[320px] sm:h-[380px] md:w-[420px] md:h-[490px] lg:w-[520px] lg:h-[620px] xl:w-[600px] xl:h-[700px]"
          >
            <PulseGlow color="rgba(233, 30, 140, 0.2)" className="rounded-xl h-full">
              <Image
                src="/images/main%20profile.jpg"
                alt={`${OWNER.name} portrait`}
                fill
                className="object-cover rounded-xl"
                priority
                sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 420px, (max-width: 1280px) 520px, 600px"
              />
            </PulseGlow>
          </FadeIn>
        </DepthLayer>
      </DepthHero>
    </section>
  );
}
