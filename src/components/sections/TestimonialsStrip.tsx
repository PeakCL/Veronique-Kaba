"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { testimonials, site } from "@/lib/content";
import { Bubble } from "@/components/ui/Bubble";

const bubbleVariants = ["white", "gold", "white"] as const;
const tails = ["bottom-left", "bottom-right", "bottom-left"] as const;

export function TestimonialsStrip() {
  return (
    <section
      id="temoignages"
      className="scroll-mt-24 border-b-4 border-outline bg-sky-500 px-4 pb-20 pt-10 md:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-[family-name:var(--font-display)] text-4xl font-bold text-white [text-shadow:3px_3px_0_#18231d] md:text-5xl">
          Ce qu&apos;ils vivent après une séance
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 260, damping: 15, delay: i * 0.15 }}
              className="flex"
            >
              <Bubble
                variant={bubbleVariants[i % 3]}
                tail={tails[i % 3]}
                animate={false}
                className="flex flex-1 flex-col"
              >
                <Quote className="mb-3 h-6 w-6 text-sky-400" aria-hidden />
                <p className="flex-1 font-[family-name:var(--font-hand)] text-xl leading-relaxed text-ink/80">
                  {t.text}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-gold-400" aria-label={`${t.stars} étoiles sur 5`}>
                    {"★".repeat(t.stars)}
                  </span>
                  <span className="text-sm font-semibold text-aura-600">
                    — {t.name}
                    {"context" in t && t.context ? (
                      <span className="font-normal text-ink/55"> · {t.context}</span>
                    ) : null}
                  </span>
                </div>
              </Bubble>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={site.googleProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink comic-pop hover:bg-gold-50"
          >
            <Star className="h-4 w-4 text-gold-500" aria-hidden />
            Voir tous nos avis Google
          </a>
        </div>
      </div>
    </section>
  );
}
