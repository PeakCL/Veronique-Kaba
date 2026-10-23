"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ComicButton } from "@/components/ui/ComicButton";
import { Bubble } from "@/components/ui/Bubble";
import { FallingLeaves } from "@/components/decor/Nature";
import { images, veroAvatars } from "@/lib/images";

/**
 * Ouverture en planche de BD : la forêt et le texte en cases, Véronique à
 * côté. Chaque case se dessine à son tour au chargement, puis Véronique
 * arrive et prend la parole.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/** Une case qui se révèle de gauche à droite, comme un trait d'encre. */
const panel = (delay: number) => ({
  initial: { clipPath: "inset(0% 100% 0% 0%)" },
  // Valeurs négatives : l'ombre décalée de la case reste visible une fois révélée
  animate: { clipPath: "inset(0% -4% -4% 0%)" },
  transition: { duration: 0.6, delay, ease: EASE },
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // La forêt défile un peu moins vite que la page : effet de profondeur
  const forestY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section ref={ref} className="relative overflow-hidden px-4 pb-16 pt-6 md:px-6 md:pt-10">
      <FallingLeaves />

      <div className="relative mx-auto grid max-w-6xl gap-4 md:gap-5 lg:grid-cols-12">
        {/* ── Case 1 : la forêt ── */}
        <motion.div
          {...panel(0)}
          className="relative order-1 h-44 overflow-hidden rounded-md comic-border-lg md:h-56 lg:order-none lg:col-span-7"
        >
          <motion.div className="absolute inset-[-12%_0]" style={{ y: forestY }}>
            <Image
              src={images.energieNature}
              alt=""
              fill
              priority
              quality={70}
              sizes="(min-width: 1024px) 680px, 100vw"
              className="bd-photo object-cover object-[50%_60%]"
            />
          </motion.div>
          <div className="bd-trame absolute inset-0" aria-hidden />
          <p className="recitatif absolute left-3 top-3 -rotate-1 text-sm md:text-base">
            À Longwy, en séance ou à distance.
          </p>
        </motion.div>

        {/* ── Véronique (deux rangées de haut) ── */}
        <div className="relative order-3 lg:order-none lg:col-span-5 lg:row-span-2 lg:mt-0">
          <motion.div
            className="relative flex h-[460px] items-end justify-center md:h-[540px] lg:h-full lg:min-h-[560px]"
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 18, delay: 0.75 }}
          >
            <Image
              src={veroAvatars.salut}
              alt="Véronique Kaba, magnétiseuse et énergéticienne, salue de la main"
              width={465}
              height={537}
              priority
              className="relative h-[78%] w-auto object-contain object-bottom md:h-[88%]"
            />
          </motion.div>

          <motion.div
            className="absolute right-4 top-0 z-10 lg:top-[10%]"
            initial={{ opacity: 0, scale: 0.4, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            transition={{ type: "spring", stiffness: 260, damping: 14, delay: 1.1 }}
          >
            <Bubble variant="white" tail="bottom-left" animate={false} className="max-w-[11rem] !p-3 text-center">
              <p className="font-[family-name:var(--font-hand)] text-2xl leading-tight text-ink">
                Bienvenue, je suis Véronique !
              </p>
            </Bubble>
          </motion.div>
        </div>

        {/* ── Case 2 : le texte ── */}
        <motion.div
          {...panel(0.12)}
          className="relative order-2 overflow-hidden rounded-md bg-[#fffdf4] p-6 comic-border-lg md:p-9 lg:order-none lg:col-span-7"
        >
          <div className="halftone pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-60" aria-hidden />
          <h1 className="relative font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.05] text-ink md:text-6xl">
            Magnétiseuse &amp; énergéticienne à Longwy
          </h1>
          <p className="relative mt-2 font-[family-name:var(--font-hand)] text-3xl text-aura-600 md:text-4xl">
            pour apaiser le corps et l&apos;esprit
          </p>
          <p className="relative mt-5 max-w-xl text-lg leading-relaxed text-ink/80">
            Des soins personnalisés pour soulager les douleurs, relancer votre énergie et
            retrouver un équilibre durable, dans un espace d&apos;écoute et de bienveillance.
          </p>
          <div className="relative mt-7 flex flex-wrap gap-4">
            <ComicButton href="/rendez-vous" size="lg">
              <Sparkles className="h-5 w-5" />
              Réserver une séance
            </ComicButton>
            <ComicButton href="/soins" variant="outline" size="lg">
              Découvrir les soins
            </ComicButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
