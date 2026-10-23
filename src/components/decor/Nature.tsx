/**
 * Décor nature dessiné à l'encre BD : feuilles au vent. Tout est en SVG
 * inline (aucune image à charger) et les animations sont en CSS, sur
 * `transform` uniquement (voir globals.css, section « Motion »). Elles s'arrêtent si l'utilisateur réduit les animations.
 */

import { cn } from "@/lib/utils";

const INK = "#18231d";

/* ── Feuilles au vent ─────────────────────────────────────────────────── */

const leaves = [
  { left: "6%", size: 22, color: "#7ba856", duration: "16s", delay: "0s", sway: "70px" },
  { left: "28%", size: 16, color: "#f2b53a", duration: "19s", delay: "-6s", sway: "-50px" },
  { left: "57%", size: 20, color: "#a1c47c", duration: "15s", delay: "-11s", sway: "60px" },
  { left: "78%", size: 18, color: "#cf8657", duration: "21s", delay: "-3s", sway: "-70px" },
  { left: "92%", size: 14, color: "#5b8c3d", duration: "17s", delay: "-9s", sway: "40px" },
];

export function Leaf({ color, size }: { color: string; size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <path d="M3 21C3 11 9 4 21 3c-1 12-8 18-18 18Z" fill={color} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      <path d="M4 20C9 14 13 10 18 6" fill="none" stroke={INK} strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

/** Quelques feuilles qui tombent en travers d'une section (parent en `relative overflow-hidden`). */
export function FallingLeaves({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {leaves.map((l, i) => (
        <span
          key={i}
          className="anim-leaf absolute top-0"
          style={
            {
              left: l.left,
              "--leaf-duration": l.duration,
              "--leaf-delay": l.delay,
              "--leaf-sway": l.sway,
            } as React.CSSProperties
          }
        >
          <Leaf color={l.color} size={l.size} />
        </span>
      ))}
    </div>
  );
}
