import { OWNER, SOCIAL_LINKS } from "@/lib/constants";
import { SocialIcon } from "../ui/SocialIcon";
import { ContactForm } from "./ContactForm";
import { ScrollReveal } from "../motion/ScrollReveal";
import { TextReveal } from "../motion/TextReveal";
import { Wiggle } from "../motion/Wiggle";
import { Sparkle } from "../motion/Sparkle";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="px-section-x md:px-section-x-md py-20 max-w-[1440px] mx-auto"
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-6">
        {/* Left Column - Info */}
        <ScrollReveal className="flex flex-col justify-between lg:flex-1">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h2
                id="contact-heading"
                className="font-display text-4xl md:text-5xl xl:text-[64px] text-text-primary leading-none"
              >
                <Sparkle count={5}>
                  <TextReveal>Let&apos;s Connect</TextReveal>
                </Sparkle>
              </h2>
              <p className="font-body text-lg text-text-secondary leading-[1.6]">
                Say hello at{" "}
                <a
                  href={`mailto:${OWNER.email}`}
                  className="text-text-primary underline underline-offset-4 decoration-accent/50 transition-all duration-[--duration-fast] hover:text-accent hover:decoration-accent"
                >
                  {OWNER.email}
                </a>
              </p>
            </div>

            <nav aria-label="Social media links">
              <ul className="flex items-center gap-6" role="list">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.icon}>
                    <Wiggle>
                      <SocialIcon
                        icon={social.icon}
                        href={social.href}
                        label={social.label}
                        size="sm"
                      />
                    </Wiggle>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <p className="font-body font-medium text-base text-text-muted mt-12 lg:mt-0 hidden">
            &copy; {new Date().getFullYear()} {OWNER.name}
          </p>
        </ScrollReveal>

        {/* Right Column - Form */}
        <ScrollReveal delay={0.1} className="lg:flex-1">
          <ContactForm />
        </ScrollReveal>
      </div>
    </section>
  );
}
