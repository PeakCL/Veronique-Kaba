/**
 * Bulles décoratives du hero — purement statiques.
 *
 * Auparavant : 7 `motion.div` en animation infinie (y/x/opacity/scale) + un
 * `backdrop-blur` chacun → 7 animations compositor permanentes, coûteuses et
 * jamais au repos. Rendu figé : même ambiance visuelle, zéro coût continu.
 */
const bubbles = [
  { size: 90,  x: "8%",  y: "12%", color: "rgba(240,190,90,0.18)",  border: "rgba(240,190,90,0.35)"  },
  { size: 130, x: "82%", y: "20%", color: "rgba(212,144,130,0.14)", border: "rgba(212,144,130,0.30)" },
  { size: 65,  x: "68%", y: "65%", color: "rgba(181,154,212,0.14)", border: "rgba(181,154,212,0.28)" },
  { size: 110, x: "18%", y: "72%", color: "rgba(240,190,90,0.12)",  border: "rgba(240,190,90,0.28)"  },
  { size: 55,  x: "48%", y: "38%", color: "rgba(212,144,130,0.10)", border: "rgba(212,144,130,0.22)" },
  { size: 75,  x: "35%", y: "85%", color: "rgba(181,154,212,0.12)", border: "rgba(181,154,212,0.24)" },
  { size: 45,  x: "92%", y: "55%", color: "rgba(240,190,90,0.15)",  border: "rgba(240,190,90,0.32)"  },
];

export function FloatingBubbles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            backgroundColor: b.color,
            border: `1.5px solid ${b.border}`,
            boxShadow: `inset 0 0 ${b.size * 0.4}px ${b.color}`,
          }}
        />
      ))}
    </div>
  );
}
