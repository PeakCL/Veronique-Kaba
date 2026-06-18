"use client";

import { motion } from "framer-motion";

export function CitationStrip() {
  return (
    <section className="relative overflow-hidden px-4 py-16 md:px-6">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-aura-50/80 via-cream to-gold-50/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(181,154,212,0.14)_0%,transparent_70%)]" />
      </div>

      <motion.blockquote
        className="relative mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.span
          className="block font-[family-name:var(--font-display)] text-8xl leading-none text-aura-300/50 select-none"
          aria-hidden
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          «
        </motion.span>

        <p className="mt-1 font-[family-name:var(--font-hand)] text-2xl leading-relaxed text-ink/80 md:text-3xl">
          Chaque séance est un espace d&apos;accueil où le corps peut progressivement retrouver
          davantage de sécurité, de détente, de guérison.
        </p>

        <motion.span
          className="block font-[family-name:var(--font-display)] text-8xl leading-none text-aura-300/50 select-none"
          aria-hidden
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          »
        </motion.span>

        <footer className="mt-2 font-[family-name:var(--font-hand)] text-xl text-aura-600">
          — Véronique Kaba
        </footer>
      </motion.blockquote>
    </section>
  );
}
