"use client";

import { motion } from "framer-motion";
import { River } from "@/components/decor/Nature";

/** La citation de Véronique, au bord de la rivière. */
export function CitationStrip() {
  return (
    <section className="relative mt-10 overflow-hidden">
      <div className="bg-gradient-to-b from-transparent via-sky-50 to-sky-100 px-4 pb-10 pt-6 md:px-6">
        <motion.blockquote
          className="relative mx-auto max-w-3xl"
          initial={{ opacity: 0, scale: 0.6, rotate: -4 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
        >
          <div className="relative rounded-[2.5rem] bg-white px-8 py-10 text-center comic-border-lg md:px-14">
            <p className="font-[family-name:var(--font-hand)] text-3xl leading-snug text-ink md:text-4xl">
              Chaque séance est un espace d&apos;accueil où le corps peut progressivement
              retrouver davantage de sécurité, de détente, de guérison.
            </p>
            <footer className="mt-4 font-bold text-aura-700">Véronique Kaba</footer>
            {/* Queue de la bulle, dessinée pour garder le contour d'encre */}
            <svg
              aria-hidden
              viewBox="0 0 60 50"
              className="absolute -bottom-[42px] left-[18%] h-[46px] w-[56px]"
            >
              <path d="M4 0 L56 0 L10 46 Z" fill="#fff" stroke="#18231d" strokeWidth="4" strokeLinejoin="round" />
              <rect x="0" y="-6" width="60" height="8" fill="#fff" />
            </svg>
          </div>
        </motion.blockquote>
      </div>
      <River className="-mt-1" deep="#2e8e98" />
    </section>
  );
}
