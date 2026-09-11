"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Sparkles, ChevronDown } from "lucide-react";
import { site } from "@/lib/content";
import { ComicButton } from "@/components/ui/ComicButton";
import { Bubble } from "@/components/ui/Bubble";
import { FloatingBubbles } from "@/components/decor/FloatingBubbles";
import { images, veroAvatars } from "@/lib/images";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

const avatarAnim = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-6 md:px-6 md:pt-10">

      {/* ── Fond atmosphérique ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={images.heroFond}
          alt=""
          fill
          className="object-cover opacity-[0.14]"
          // Décor rendu à 14 % d'opacité : jamais l'élément LCP.
          // Pas de `priority` (il concurrençait le préchargement de l'illustration),
          // et une qualité basse suffit — la différence est invisible sous le dégradé.
          quality={35}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gold-50/70 via-cream/80 to-cream" />
        {/* Lueur dorée gauche — énergie chaude */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_18%_35%,rgba(240,190,90,0.22)_0%,transparent_65%)]" />
        {/* Lueur dorée derrière l'avatar */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_70%_at_78%_45%,rgba(240,190,90,0.28)_0%,transparent_60%)]" />
        {/* Halftone dots BD */}
        <div className="absolute inset-0 halftone opacity-40" />
      </div>

      <FloatingBubbles />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">

        {/* ── Colonne texte ── */}
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
            Magnétiseuse &amp; énergéticienne à Longwy
            <span className="mt-1 block font-[family-name:var(--font-hand)] text-4xl font-normal text-aura-600 md:text-5xl">
              apaiser corps &amp; esprit
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

          {/* Scroll indicator mobile */}
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

        {/* ── Colonne avatar BD — illustration flottante ── */}
        <motion.div
          className="relative flex justify-center lg:justify-end"
          variants={avatarAnim}
          initial="hidden"
          animate="show"
        >
          {/* Halo doré derrière l'illustration — énergie rayonnante */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            {/* Cercle d'aura principal */}
            <div className="h-[420px] w-[420px] rounded-full bg-[radial-gradient(ellipse,rgba(240,190,90,0.35)_0%,rgba(240,190,90,0.12)_50%,transparent_75%)]" />
          </div>

          {/* Points halftone BD dans le halo */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="h-[380px] w-[380px] rounded-full halftone opacity-60" />
          </div>

          {/* Rayons dorés SVG — effet énergie */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
            viewBox="0 0 500 600"
            fill="none"
          >
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 360) / 16;
              const rad = (angle * Math.PI) / 180;
              const cx = 250, cy = 280;
              return (
                <line
                  key={i}
                  x1={cx + Math.cos(rad) * 110}
                  y1={cy + Math.sin(rad) * 110}
                  x2={cx + Math.cos(rad) * 360}
                  y2={cy + Math.sin(rad) * 360}
                  stroke="rgba(240,190,60,0.6)"
                  strokeWidth="1.5"
                />
              );
            })}
            {/* Cercles concentriques */}
            {[130, 190, 250, 310].map((r) => (
              <circle
                key={r}
                cx={250}
                cy={280}
                r={r}
                stroke="rgba(240,190,60,0.15)"
                strokeWidth="1"
                fill="none"
              />
            ))}
          </svg>

          {/* ── L'illustration BD de Véronique — pose salut (main levée) ── */}
          <div className="relative z-10">
            {/* Bulle dialogue — flottante au-dessus */}
            <motion.div
              className="absolute -right-4 -top-8 z-20 rotate-2 md:-right-8"
              animate={{ rotate: [2, 5, 2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Bubble variant="warm" tail="bottom-right" className="max-w-[200px] !p-3 text-center">
                <p className="font-[family-name:var(--font-hand)] text-xl text-ink/85">
                  Bienvenue, je suis Véronique ✨
                </p>
              </Bubble>
            </motion.div>

            {/* L'illustration principale — sans cadre, fond transparent */}
            <Image
              src={veroAvatars.salut}
              alt="Véronique Kaba — magnétiseuse et énergéticienne"
              width={480}
              height={620}
              priority
              className="relative z-10 max-h-[580px] w-auto object-contain drop-shadow-[0_8px_40px_rgba(240,190,90,0.25)]"
            />

            {/* Bulle gold bas-gauche */}
            <motion.div
              className="absolute -bottom-4 -left-6 z-20 -rotate-2"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Bubble variant="gold" tail="top-left" className="!p-3">
                <p className="text-sm font-medium text-ink/80">
                  Depuis {site.practiceSince} avec bienveillance
                </p>
              </Bubble>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator desktop */}
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
