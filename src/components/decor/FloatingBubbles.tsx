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
          className={`absolute rounded-full border-2 border-dashed bg-white/10 ${
            i % 2 === 0 ? "border-aura-400/35" : "border-sky-400/35"
          }`}
          style={{ width: b.size, height: b.size, left: b.x, top: b.y }}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6 + i, repeat: Infinity, delay: b.delay }}
        />
      ))}
    </div>
  );
}
