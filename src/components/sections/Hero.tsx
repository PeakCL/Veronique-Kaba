"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { site } from "@/lib/content";
import { ComicButton } from "@/components/ui/ComicButton";
import { Bubble } from "@/components/ui/Bubble";
import { FallingLeaves, WaterfallScene } from "@/components/decor/Nature";
import { images, veroAvatars } from "@/lib/images";

/**
 * Ouverture en planche de BD : trois cases lues dans l'ordre (la forêt, le
 * texte, Véronique devant sa cascade). Chaque case se dessine à son tour au
 * chargement, puis Véronique sort de son cadre et prend la parole.
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
          <motion.span
            aria-hidden
            className="sfx anim-shake absolute bottom-3 right-4 text-3xl md:text-4xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 12, delay: 1.3 }}
          >
            Cui-cui !
          </motion.span>
        </motion.div>

        {/* ── Case 3 : Véronique devant sa cascade (deux rangées de haut) ── */}
        <div className="relative order-3 lg:order-none lg:col-span-5 lg:row-span-2 lg:mt-0">
          <motion.div
            {...panel(0.24)}
            className="absolute inset-0 overflow-hidden rounded-md comic-border-lg"
          >
            <WaterfallScene />
            <motion.span
              aria-hidden
              className="sfx anim-shake absolute left-3 top-[44%] text-4xl md:text-5xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 12, delay: 1.5 }}
            >
              Fshhh…
            </motion.span>
            <p className="recitatif absolute left-3 top-3 rotate-1 text-sm">
              Depuis {site.practiceSince}, avec bienveillance.
            </p>
          </motion.div>

          {/* Véronique au premier plan, à droite : la cascade reste visible à gauche */}
          <motion.div
            className="relative flex h-[460px] items-end justify-end overflow-hidden rounded-md md:h-[540px] lg:h-full lg:min-h-[560px]"
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
              className="relative -mr-[20%] h-[82%] w-auto object-contain object-bottom drop-shadow-[5px_5px_0_rgba(24,35,29,0.9)]"
            />
          </motion.div>

          <motion.div
            className="absolute right-4 top-[10%] z-10"
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
