"use client";

import { motion } from "framer-motion";
import { Bubble } from "@/components/ui/Bubble";

type Card = {
  title: string;
  text: string;
  emoji: string;
  variant: "aura" | "white" | "gold" | "sky" | "warm";
};

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function AboutCards({ cards }: { cards: Card[] }) {
  return (
    <motion.div
      className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      variants={gridVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      {cards.map((card) => (
        <motion.div
          key={card.title}
          variants={cardVariants}
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="flex"
        >
          <Bubble variant={card.variant} tail="none" animate={false} className="flex w-full flex-col">
            <span className="text-4xl">{card.emoji}</span>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold">
              {card.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/80">{card.text}</p>
          </Bubble>
        </motion.div>
      ))}
    </motion.div>
  );
}
