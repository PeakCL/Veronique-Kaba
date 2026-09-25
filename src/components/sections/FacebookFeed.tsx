"use client";

import Script from "next/script";
import { motion } from "framer-motion";
import { Facebook } from "lucide-react";

/**
 * Feed Facebook — affiche les dernières publications de Véronique via le
 * widget Elfsight « Facebook Feed » (configuré depuis le tableau de bord
 * Elfsight, fonctionne aussi avec un profil personnel).
 */
export function FacebookFeed() {
  return (
    <motion.section
      className="mx-4 mb-16 md:mx-6"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-6xl rounded-3xl bg-[#fffdf6] p-8 comic-border-lg">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 comic-border">
            <Facebook className="h-5 w-5 text-sky-600" />
          </span>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-ink">
              Sur Facebook
            </h2>
            <p className="text-sm text-ink/65">
              Les dernières publications de Véronique
            </p>
          </div>
        </div>

        {/* Elfsight Facebook Feed */}
        <div
          className="elfsight-app-331ca975-e045-45f6-9d20-9d12d403703f"
          data-elfsight-app-lazy
        />
      </div>

      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
    </motion.section>
  );
}
