"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Sparkles, ChevronDown } from "lucide-react";
import { site } from "@/lib/content";
import { ComicButton } from "@/components/ui/ComicButton";
import { Bubble } from "@/components/ui/Bubble";
import { FloatingBubbles } from "@/components/decor/FloatingBubbles";
import { images } from "@/lib/images";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

const imageContainer = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-6 md:px-6 md:pt-10">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={images.heroFond}
          alt=""
          fill
          className="object-cover opacity-[0.28]"
          priority
          sizes="100vw"
        />
        {/* Lueur ambre chaude — lumière de mains qui soignent */}
        <div className="absolute inset-0 bg-gradient-to-b from-gold-50/60 via-cream/70 to-cream" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_30%,rgba(240,190,90,0.18)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_20%,rgba(212,144,130,0.14)_0%,transparent_65%)]" />
      </div>

      <FloatingBubbles />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        {/* Colonne texte — stagger orchestré */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full bg-rose-50/90 px-4 py-1.5 text-sm font-medium text-aura-700 comic-border backdrop-blur-sm"
          >
            <Heart className="h-4 w-4 text-rose-400" fill="currentColor" fillOpacity={0.4} />
            Longwy · Présentiel & à distance
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-[family-name:var(--font-display)] text-4xl font-semibold leading-snug text-ink md:text-6xl"
          >
            {site.tagline.split("·")[0].trim()}
            <span className="mt-1 block font-[family-name:var(--font-hand)] text-4xl font-normal text-aura-600 md:text-5xl">
              apaiser corps & esprit
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-lg leading-relaxed text-ink/75"
          >
            Magnétiseuse et énergéticienne depuis {site.practiceSince}. Des soins personnalisés pour
            soulager les douleurs, relancer votre énergie et retrouver un équilibre durable — dans
            un espace de bienveillance et d&apos;écoute.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
            <ComicButton href="/rendez-vous" size="lg">
              <Sparkles className="h-5 w-5" />
              Réserver une séance
            </ComicButton>
            <ComicButton href="/soins" variant="outline" size="lg">
              Découvrir les soins
            </ComicButton>
          </motion.div>

          {/* Indicateur de scroll — mobile uniquement */}
          <motion.div
            className="mt-12 flex flex-col items-center gap-1 text-ink/35 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <span className="text-xs font-medium tracking-widest uppercase">Découvrir</span>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Colonne image */}
        <motion.div className="relative" variants={imageContainer} initial="hidden" animate="show">
          <motion.div
            className="absolute -right-2 -top-4 z-20 rotate-3 md:-right-4"
            animate={{ rotate: [3, 6, 3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Bubble variant="warm" tail="bottom-right" className="max-w-[220px] !p-4 text-center">
              <p className="font-[family-name:var(--font-hand)] text-2xl text-ink/85">
                Sportifs, enfants, seniors — chacun·e est accueilli·e ✨
              </p>
            </Bubble>
          </motion.div>

          <Bubble variant="white" tail="bottom-left" className="!p-3" animate={false}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl comic-border">
              <Image
                src={images.mainsEnergie}
                alt="Mains enveloppant une sphère d'énergie dorée — illustration de soin énergétique"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
            <p className="mt-3 text-center font-[family-name:var(--font-display)] text-2xl font-medium text-ink">
              Énergie dorée
            </p>
            <p className="text-center font-[family-name:var(--font-hand)] text-xl text-ink/65">
              Soins · Formation 2.0 · Recouvrement d&apos;âme
            </p>
          </Bubble>

          <motion.div
            className="absolute -bottom-6 -left-6 z-20 -rotate-2"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Bubble variant="gold" tail="top-left" className="!p-3">
              <p className="text-sm font-medium text-ink/80">
                Depuis {site.practiceSince} avec bienveillance
              </p>
            </Bubble>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator — desktop */}
      <motion.div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-ink/30 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">Découvrir</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
