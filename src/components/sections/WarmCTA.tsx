"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { ComicButton } from "@/components/ui/ComicButton";
import { VeroAvatar } from "@/components/ui/VeroAvatar";
import { images } from "@/lib/images";

export function WarmCTA() {
  return (
    <section className="relative overflow-hidden px-4 py-20 md:px-6">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={images.foretLumiere}
          alt=""
          fill
          className="object-cover object-center opacity-[0.12]"
          // Décor à 12 % d'opacité — qualité basse, poids divisé.
          quality={35}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-gold-50 to-aura-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_55%_40%,rgba(240,190,90,0.18)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_20%_70%,rgba(181,154,212,0.15)_0%,transparent_65%)]" />
      </div>

      <motion.div
        className="relative mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        {/* Pose "ouverture" — bras ouverts, joie face à la nature */}
        <VeroAvatar pose="ouverture" size="md" className="mb-2" />

        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="mb-5 inline-block"
        >
          <Heart className="mx-auto h-10 w-10 text-rose-300" fill="currentColor" fillOpacity={0.3} />
        </motion.div>

        <h2 className="font-[family-name:var(--font-hand)] text-4xl leading-snug text-ink md:text-5xl">
          Vous méritez de vous sentir bien<br />dans votre corps.
        </h2>

        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-ink/70">
          Chaque séance commence par une écoute. Pas de jugement, pas de jargon — juste votre bien-être,
          au rythme qui vous convient.
        </p>

        <p className="mt-5 font-[family-name:var(--font-hand)] text-2xl text-aura-600">
          — Véronique ✨
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ComicButton href="/rendez-vous" size="lg">
            <Heart className="h-5 w-5" />
            Prendre soin de moi
          </ComicButton>
          <ComicButton href="/contact" variant="outline" size="lg">
            Poser une question d&apos;abord
          </ComicButton>
        </div>
      </motion.div>
    </section>
  );
}
