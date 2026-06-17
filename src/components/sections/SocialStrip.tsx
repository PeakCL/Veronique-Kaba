"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram } from "lucide-react";
import { site } from "@/lib/content";

export function SocialStrip() {
  return (
    <motion.section
      className="mx-4 mb-16 md:mx-6"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-3xl p-8 comic-border-lg md:flex-row"
        style={{
          background:
            "linear-gradient(130deg, #fef3dc 0%, #fdf0ec 45%, #f0eaf8 100%)",
        }}
      >
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl text-ink">
            Suivez l&apos;aventure
          </p>
          <p className="mt-1 text-sm text-ink/65">
            Conseils, témoignages et coulisses de l&apos;énergie dorée
          </p>
        </div>
        <div className="flex gap-4">
          <motion.a
            href={site.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-white/80 px-5 py-3 font-bold comic-border"
            whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(240,190,90,0.15)" }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
          >
            <Facebook className="h-5 w-5 text-sky-600" />
            Facebook
          </motion.a>
          <motion.a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full px-5 py-3 font-bold text-white comic-border"
            style={{
              background: "linear-gradient(135deg, #b59ad4 0%, #d49082 60%, #f0be5a 100%)",
            }}
            whileHover={{ scale: 1.05, y: -2, opacity: 0.92 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
          >
            <Instagram className="h-5 w-5" />
            @vero.kaba
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
}
