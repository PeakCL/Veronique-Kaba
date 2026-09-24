"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { formation, sessionInfo, soulRetrieval } from "@/lib/content";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";

const highlights = [
  {
    href: "/soins",
    emoji: "✨",
    title: "Soins personnalisés",
    description:
      "Magnétisme, soin énergétique et coupe de feu — une seule séance adaptée à vos besoins du jour.",
    badge: `${sessionInfo.price} € · ${sessionInfo.duration}`,
    variant: "aura" as const,
    tail: "bottom-left" as const,
    glow: "rgba(181,154,212,0.18)",
  },
  {
    href: "/recouvrement-ame",
    emoji: soulRetrieval.emoji,
    title: soulRetrieval.title,
    description: soulRetrieval.description.slice(0, 120) + "…",
    badge: "Nouveau",
    variant: "sky" as const,
    tail: "none" as const,
    glow: "rgba(122,175,214,0.18)",
  },
  {
    href: "/formation",
    emoji: formation.emoji,
    title: formation.title,
    description: formation.description.slice(0, 120) + "…",
    badge: `${formation.price} € · ${formation.duration}`,
    variant: "gold" as const,
    tail: "bottom-right" as const,
    glow: "rgba(240,190,90,0.22)",
  },
];

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function ServicesPreview() {
  return (
    <section className="section-amber mx-2 rounded-3xl px-4 py-16 md:mx-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-ink md:text-5xl">
            Mes accompagnements
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink/70">
            Des soins sur mesure, une formation pour apprendre à magnétiser, et le recouvrement
            d&apos;âme au tambour.
          </p>
          <p className="mx-auto mt-4 max-w-lg font-[family-name:var(--font-hand)] text-2xl text-aura-600">
            Chaque accompagnement part de ce que vous vivez, aujourd&apos;hui.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-8 md:grid-cols-3"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {highlights.map((item) => (
            <motion.div
              key={item.href}
              variants={cardVariants}
              whileHover={{
                y: -6,
                x: -2,
                boxShadow: "10px 12px 0 #2a2028",
              }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="flex"
              style={{ borderRadius: "2rem" }}
            >
              <Bubble
                variant={item.variant}
                tail={item.tail}
                animate={false}
                className="flex flex-1 flex-col"
              >
                <motion.span
                  className="text-4xl"
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {item.emoji}
                </motion.span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm text-ink/75">{item.description}</p>
                <span
                  className={`mt-4 inline-block w-fit rounded-full px-3 py-1 text-xs font-bold comic-outline ${
                    item.variant === "gold" ? "bg-gold-100 text-gold-700" : "bg-white/80"
                  }`}
                >
                  {item.badge}
                </span>
                <ComicButton href={item.href} variant="outline" size="sm" className="mt-4 w-fit">
                  En savoir plus
                </ComicButton>
              </Bubble>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 flex justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ComicButton href="/rendez-vous">
            Prendre rendez-vous <ArrowRight className="h-4 w-4" />
          </ComicButton>
        </motion.div>
      </div>
    </section>
  );
}
