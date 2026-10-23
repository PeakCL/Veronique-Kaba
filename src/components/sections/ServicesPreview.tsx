"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { formation, sessionInfo, soulRetrieval } from "@/lib/content";
import { ComicButton } from "@/components/ui/ComicButton";
import { images } from "@/lib/images";

/** Chaque accompagnement est une case de BD, avec sa scène de nature. */
const highlights = [
  {
    href: "/soins",
    image: images.soinMains,
    title: "Soins personnalisés",
    description:
      "Magnétisme, soin énergétique et coupe de feu : une seule séance adaptée à vos besoins du jour.",
    badge: `${sessionInfo.price} €, ${sessionInfo.duration}`,
    tilt: -1.6,
  },
  {
    href: "/recouvrement-ame",
    image: images.meditationFlamme,
    title: soulRetrieval.title,
    description: soulRetrieval.description.slice(0, 120) + "…",
    badge: "Nouveau",
    tilt: 1.2,
  },
  {
    href: "/formation",
    image: images.energieNature,
    title: formation.title,
    description: formation.description.slice(0, 120) + "…",
    badge: `${formation.price} €, ${formation.duration}`,
    tilt: -0.8,
  },
];

export function ServicesPreview() {
  return (
    <section className="relative mt-6">
      <div className="section-amber border-t-4 border-outline px-4 pb-20 pt-12 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold text-ink md:text-5xl">
              Mes accompagnements
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-ink/75">
              Des soins sur mesure, une formation pour apprendre à magnétiser, et le recouvrement
              d&apos;âme au tambour.
            </p>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-7">
            {highlights.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, scale: 0.85, rotate: item.tilt * 4 }}
                whileInView={{ opacity: 1, scale: 1, rotate: item.tilt }}
                whileHover={{ rotate: 0, y: -6 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 220, damping: 16, delay: i * 0.12 }}
                className="flex"
              >
                <Link
                  href={item.href}
                  className="group flex flex-1 flex-col overflow-hidden rounded-md bg-[#fffdf4] comic-border-lg"
                >
                  <div className="relative h-40 overflow-hidden border-b-4 border-outline">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 360px, 100vw"
                      className="bd-photo object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="bd-trame absolute inset-0" aria-hidden />
                    <span className="recitatif absolute left-3 top-3 -rotate-2 text-sm">{item.badge}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1 text-ink/75">{item.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-bold text-aura-700">
                      En savoir plus
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <ComicButton href="/rendez-vous" size="lg">
              Prendre rendez-vous
            </ComicButton>
          </div>
        </div>
      </div>
    </section>
  );
}
