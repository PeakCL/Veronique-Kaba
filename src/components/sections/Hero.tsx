"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";
import { site } from "@/lib/content";
import { ComicButton } from "@/components/ui/ComicButton";
import { Bubble } from "@/components/ui/Bubble";
import { FloatingBubbles } from "@/components/decor/FloatingBubbles";
import { images } from "@/lib/images";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-8 md:px-6 md:pt-12">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={images.energieFond}
          alt=""
          fill
          className="object-cover opacity-[0.18]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-cream/85 to-cream" />
      </div>

      <FloatingBubbles />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-aura-100/90 px-4 py-1 text-sm font-bold text-aura-600 comic-border backdrop-blur-sm">
            <Zap className="h-4 w-4" />
            Longwy · Présentiel & à distance
          </span>

          <h1 className="mt-6 font-[family-name:var(--font-display)] text-5xl leading-tight tracking-wide text-ink md:text-7xl">
            {site.tagline.split("·")[0].trim()}
            <span className="block bg-gradient-to-r from-aura-600 via-gold-400 to-sky-500 bg-clip-text text-transparent energy-glow">
              apaiser corps & esprit
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg text-ink/80">
            Magnétiseuse et énergéticienne depuis {site.practiceSince}. Des soins personnalisés pour
            soulager les douleurs, relancer votre énergie et retrouver un équilibre durable — avec
            des mots simples et un cadre professionnel.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <ComicButton href="/rendez-vous" size="lg">
              <Sparkles className="h-5 w-5" />
              Réserver une séance
            </ComicButton>
            <ComicButton href="/soins" variant="outline" size="lg">
              Découvrir les soins
            </ComicButton>
          </div>
        </motion.div>

        <div className="relative">
          <motion.div
            className="absolute -right-2 -top-4 z-20 rotate-6 md:-right-4"
            animate={{ rotate: [6, 10, 6] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Bubble variant="aura" tail="bottom-right" className="max-w-[220px] !p-4 text-center shadow-lg">
              <p className="font-[family-name:var(--font-hand)] text-2xl text-ink">
                Sportifs, enfants, seniors — chacun·e est accueilli·e ✨
              </p>
            </Bubble>
          </motion.div>

          <Bubble variant="white" tail="bottom-left" className="!p-3 halftone" animate={false}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl comic-border">
              <Image
                src={images.mainsEnergie}
                alt="Mains canalysant l'énergie dorée — illustration"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
            <p className="mt-3 text-center font-[family-name:var(--font-display)] text-2xl text-ink">
              Énergie dorée
            </p>
            <p className="text-center font-[family-name:var(--font-hand)] text-lg text-ink/70">
              Soins · Formation 2.0 · Recouvrement d&apos;âme
            </p>
          </Bubble>

          <motion.div
            className="absolute -bottom-6 -left-6 z-20 -rotate-3"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Bubble variant="aura" tail="top-left" className="!p-3 shadow-lg">
              <p className="text-sm font-bold">★ Depuis {site.practiceSince} ★</p>
            </Bubble>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
