"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/content";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";

const bubbleVariants = ["warm", "gold", "aura"] as const;

export function TestimonialsStrip() {
  return (
    <section className="section-blush mx-2 rounded-3xl px-4 py-14 md:mx-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-[family-name:var(--font-hand)] text-3xl text-aura-600 md:text-4xl">
          Ce qu&apos;ils vivent après une séance…
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.13, duration: 0.5, ease: "easeOut" }}
              className="flex"
            >
              <Bubble
                variant={bubbleVariants[i % 3]}
                tail="none"
                animate={false}
                className="flex flex-1 flex-col"
              >
                <Quote className="mb-3 h-6 w-6 text-aura-300" aria-hidden />
                <p className="flex-1 font-[family-name:var(--font-hand)] text-xl leading-relaxed text-ink/80">
                  {t.text}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-gold-400" aria-label={`${t.stars} étoiles`}>
                    {"★".repeat(t.stars)}
                  </span>
                  <span className="text-sm font-semibold text-aura-600">— {t.name}</span>
                </div>
              </Bubble>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <ComicButton href="/temoignages" variant="outline" size="sm">
            Voir tous les témoignages
          </ComicButton>
        </div>
      </div>
    </section>
  );
}
