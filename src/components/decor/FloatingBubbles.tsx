"use client";

import { motion } from "framer-motion";

const bubbles = [
  { size: 80, x: "10%", y: "15%", delay: 0 },
  { size: 120, x: "85%", y: "25%", delay: 0.5 },
  { size: 60, x: "70%", y: "70%", delay: 1 },
  { size: 100, x: "20%", y: "75%", delay: 1.5 },
  { size: 50, x: "50%", y: "40%", delay: 0.8 },
];

export function FloatingBubbles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full border border-white/40 bg-white/20 backdrop-blur-[2px] ${
            i % 3 === 0
              ? "border-aura-300/30"
              : i % 3 === 1
                ? "border-rose-300/30"
                : "border-gold-300/30"
          }`}
          style={{ width: b.size, height: b.size, left: b.x, top: b.y }}
          animate={{ y: [0, -14, 0], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 7 + i, repeat: Infinity, delay: b.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
