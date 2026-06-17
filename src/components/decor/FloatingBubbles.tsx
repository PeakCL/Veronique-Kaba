"use client";

import { motion } from "framer-motion";

const bubbles = [
  { size: 90,  x: "8%",  y: "12%", delay: 0,    color: "rgba(240,190,90,0.18)",  border: "rgba(240,190,90,0.35)"  },
  { size: 130, x: "82%", y: "20%", delay: 0.6,  color: "rgba(212,144,130,0.14)", border: "rgba(212,144,130,0.30)" },
  { size: 65,  x: "68%", y: "65%", delay: 1.1,  color: "rgba(181,154,212,0.14)", border: "rgba(181,154,212,0.28)" },
  { size: 110, x: "18%", y: "72%", delay: 1.7,  color: "rgba(240,190,90,0.12)",  border: "rgba(240,190,90,0.28)"  },
  { size: 55,  x: "48%", y: "38%", delay: 0.9,  color: "rgba(212,144,130,0.10)", border: "rgba(212,144,130,0.22)" },
  { size: 75,  x: "35%", y: "85%", delay: 2.2,  color: "rgba(181,154,212,0.12)", border: "rgba(181,154,212,0.24)" },
  { size: 45,  x: "92%", y: "55%", delay: 1.4,  color: "rgba(240,190,90,0.15)",  border: "rgba(240,190,90,0.32)"  },
];

export function FloatingBubbles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full backdrop-blur-[3px]"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            backgroundColor: b.color,
            border: `1.5px solid ${b.border}`,
            boxShadow: `inset 0 0 ${b.size * 0.4}px ${b.color}`,
          }}
          animate={{
            y: [0, -(12 + (i % 3) * 5), 0],
            x: [0, (i % 2 === 0 ? 6 : -6), 0],
            opacity: [0.5, 0.85, 0.5],
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 7 + i * 1.2,
            repeat: Infinity,
            delay: b.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
