/**
 * Décor nature dessiné à l'encre BD : lisière de forêt, rivière, feuilles au
 * vent et cascade. Tout est en SVG inline (aucune image à charger) et les
 * animations sont en CSS, sur `transform` uniquement (voir globals.css,
 * section « Motion »). Elles s'arrêtent si l'utilisateur réduit les animations.
 */

import { cn } from "@/lib/utils";

const INK = "#18231d";

/** Arrondi : mêmes chaînes de coordonnées côté serveur et côté navigateur. */
const r1 = (v: number) => Math.round(v * 10) / 10;

/* ── Lisière de forêt ─────────────────────────────────────────────────── */

/** Générateur pseudo-aléatoire déterministe : même rendu serveur et client. */
function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Sapin en trois étages, pointe en (x, base - h). */
function pinePath(x: number, base: number, h: number) {
  const w = h * 0.42;
  const tiers = [0, 0.32, 0.6];
  return tiers
    .map((t, i) => {
      const top = base - h + h * t * 0.85;
      const bottom = base - h * (0.62 - t * 0.9) + (i === 2 ? h * 0.1 : 0);
      const half = w * (0.55 + t * 0.75) * 0.5;
      return `M${r1(x)} ${r1(top)} L${r1(x + half)} ${r1(bottom)} L${r1(x - half)} ${r1(bottom)} Z`;
    })
    .join(" ");
}

type TreeLineProps = {
  className?: string;
  /** Couleur du rang du fond et du rang de devant */
  back?: string;
  front?: string;
  /** Couleur du sol sous les arbres (raccord avec la section suivante) */
  ground?: string;
  seed?: number;
  flip?: boolean;
};

/**
 * Silhouette de forêt, à poser en bord de section. Les arbres gardent leurs
 * proportions : le dessin est recadré sur les côtés quand l'écran est étroit.
 * Hauteur conseillée proportionnelle à la largeur (ex. `h-[clamp(4rem,10vw,9rem)]`).
 */
export function TreeLine({
  className,
  back = "#7ba856",
  front = "#355a28",
  ground,
  seed = 7,
  flip = false,
}: TreeLineProps) {
  const r = rand(seed);
  const rows = [
    { color: back, base: 112, min: 46, max: 86, step: [26, 44] },
    { color: front, base: 120, min: 34, max: 74, step: [30, 58] },
  ];

  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
      className={cn("block w-full", flip && "rotate-180", className)}
    >
      {rows.map((row, ri) => {
        const trees: React.ReactNode[] = [];
        let x = -20 + ri * 14;
        let k = 0;
        while (x < 1230) {
          const h = row.min + r() * (row.max - row.min);
          // Un arbre rond de temps en temps, pour casser la rangée de sapins
          if (r() < 0.22) {
            const rr = h * 0.3;
            trees.push(
              <g key={`${ri}-${k}`}>
                <rect x={x - 3} y={row.base - h * 0.45} width={6} height={h * 0.45} fill={INK} />
                <circle cx={x} cy={row.base - h * 0.62} r={rr} fill={row.color} stroke={INK} strokeWidth={3} />
                <circle cx={x - rr * 0.6} cy={row.base - h * 0.48} r={rr * 0.7} fill={row.color} stroke={INK} strokeWidth={3} />
                <circle cx={x + rr * 0.6} cy={row.base - h * 0.5} r={rr * 0.72} fill={row.color} stroke={INK} strokeWidth={3} />
              </g>,
            );
          } else {
            trees.push(
              <path
                key={`${ri}-${k}`}
                d={pinePath(x, row.base, h)}
                fill={row.color}
                stroke={INK}
                strokeWidth={3}
                strokeLinejoin="round"
              />,
            );
          }
          x += row.step[0] + r() * (row.step[1] - row.step[0]);
          k++;
        }
        return <g key={ri}>{trees}</g>;
      })}
      {ground && <rect x={0} y={112} width={1200} height={10} fill={ground} />}
    </svg>
  );
}

/* ── Rivière ──────────────────────────────────────────────────────────── */

/** Une période de vague (400 px), répétée sur deux largeurs pour boucler. */
const WAVE = "c50 -18 100 -18 150 0 s100 18 150 0 s75 -12 100 0";

type RiverProps = {
  className?: string;
  /** Couleur de l'eau ; le bas du SVG doit raccorder avec la section suivante */
  water?: string;
  deep?: string;
};

/** Bande de rivière dont les vagues glissent en continu. */
export function River({ className, water = "#75c6c8", deep = "#46a9b0" }: RiverProps) {
  const crest = (y: number) => `M0 ${y} ${Array.from({ length: 6 }).map(() => WAVE).join(" ")}`;
  return (
    <div aria-hidden className={cn("relative h-16 overflow-hidden md:h-20", className)}>
      <svg
        viewBox="0 0 2400 80"
        preserveAspectRatio="none"
        className="anim-wave absolute left-0 top-0 h-full w-[200%]"
        style={{ "--wave-duration": "22s" } as React.CSSProperties}
      >
        <path d={`${crest(22)} V80 H0 Z`} fill={water} stroke={INK} strokeWidth={3} />
      </svg>
      <svg
        viewBox="0 0 2400 80"
        preserveAspectRatio="none"
        className="anim-wave absolute left-0 top-0 h-full w-[200%]"
        style={{ "--wave-duration": "14s" } as React.CSSProperties}
      >
        <path d={`${crest(44)} V80 H0 Z`} fill={deep} />
        {/* Reflets d'écume */}
        <path d={crest(56)} fill="none" stroke="#fff" strokeWidth={3} strokeDasharray="40 90" strokeLinecap="round" opacity={0.75} />
      </svg>
    </div>
  );
}

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

/* ── La cascade ───────────────────────────────────────────────────────── */

/**
 * Paysage de la case principale : soleil, collines, falaises moussues et chute
 * d'eau animée qui se jette dans un bassin. La chute est placée à gauche pour
 * laisser la droite au personnage. Remplit sa case (`xMidYMid slice`).
 */
export function WaterfallScene({ className }: { className?: string }) {
  // Bandes d'écume de la chute : x, largeur, décalage vertical
  const streaks = [
    [96, 4, 0], [108, 3, 22], [119, 5, 8], [131, 3, 34], [142, 4, 14], [152, 3, 40],
  ] as const;
  const fall = "M88 196 Q120 186 162 196 L168 470 L82 470 Z";

  return (
    <svg
      viewBox="0 0 400 560"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className={cn("h-full w-full", className)}
    >
      <defs>
        <linearGradient id="wf-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe08f" />
          <stop offset="0.55" stopColor="#fff0c7" />
          <stop offset="1" stopColor="#d4efee" />
        </linearGradient>
        <linearGradient id="wf-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#aadfde" />
          <stop offset="1" stopColor="#46a9b0" />
        </linearGradient>
        <clipPath id="wf-fall">
          <path d={fall} />
        </clipPath>
      </defs>

      {/* Ciel et soleil */}
      <rect width="400" height="560" fill="url(#wf-sky)" />
      <g className="anim-spin">
        {Array.from({ length: 14 }).map((_, i) => {
          const a = (i / 14) * Math.PI * 2;
          const pt = (rad: number, d: number) => `${r1(300 + Math.cos(rad) * d)} ${r1(92 + Math.sin(rad) * d)}`;
          return <path key={i} d={`M${pt(a, 52)} L${pt(a + 0.12, 120)} L${pt(a - 0.12, 120)} Z`} fill="#fcc95a" opacity={0.45} />;
        })}
      </g>
      <circle cx="300" cy="92" r="40" fill="#f2b53a" stroke={INK} strokeWidth="3" />

      {/* Collines lointaines */}
      <path d="M0 250 Q70 190 140 230 T280 215 T400 225 V330 H0 Z" fill="#c6dcaa" stroke={INK} strokeWidth="3" />
      <path d="M0 290 Q90 245 180 280 T400 265 V360 H0 Z" fill="#a1c47c" stroke={INK} strokeWidth="3" />

      {/* Falaises */}
      <path d="M0 200 L40 184 L90 192 L82 470 L0 480 Z" fill="#9b8a72" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M162 194 L230 184 L300 204 L360 192 L400 200 V480 L168 470 Z" fill="#8a7a64" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      {/* Fissures de la roche */}
      <path d="M20 260 l30 20 m-20 60 l40 -10 m-50 80 l35 15 M200 270 l40 25 m40 30 l50 -15 m-150 80 l35 10 m60 -40 l40 20" stroke={INK} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Mousse sur le haut des falaises */}
      <path d="M0 200 L40 184 L90 192 L88 210 Q60 214 40 206 Q20 216 0 214 Z" fill="#7ba856" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M162 194 L230 184 L300 204 L360 192 L400 200 V214 Q350 222 310 212 Q260 222 220 208 Q190 214 164 210 Z" fill="#7ba856" stroke={INK} strokeWidth="3" strokeLinejoin="round" />

      {/* Sapins sur les falaises */}
      {[
        [22, 196, 80], [60, 190, 62], [200, 196, 74], [246, 192, 96], [290, 204, 64], [338, 198, 90], [384, 202, 70],
      ].map(([x, base, h], i) => (
        <path key={i} d={pinePath(x, base, h)} fill={i % 2 ? "#355a28" : "#437031"} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      ))}

      {/* La chute d'eau */}
      <path d={fall} fill="url(#wf-water)" stroke={INK} strokeWidth="3" />
      <g clipPath="url(#wf-fall)">
        <g className="anim-flow" style={{ "--flow-distance": "64px" } as React.CSSProperties}>
          {streaks.map(([x, w, off], i) =>
            Array.from({ length: 6 }).map((_, j) => (
              <rect key={`${i}-${j}`} x={x} y={130 + off + j * 64} width={w} height={30} rx={w / 2} fill="#fff" opacity={0.85} />
            )),
          )}
        </g>
      </g>

      {/* Bassin, écume et ronds dans l'eau */}
      <path d="M0 470 Q200 440 400 470 V560 H0 Z" fill="#46a9b0" stroke={INK} strokeWidth="3" />
      <path d="M0 500 Q200 480 400 500 V560 H0 Z" fill="#2e8e98" />
      {[0, 0.8, 1.6].map((d) => (
        <ellipse key={d} className="anim-ripple" style={{ animationDelay: `${d}s` }} cx="125" cy="482" rx="70" ry="12" fill="none" stroke="#fff" strokeWidth="2.5" />
      ))}
      {[[92, 466, 13], [112, 460, 16], [134, 462, 15], [156, 467, 12]].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="#fff" stroke={INK} strokeWidth="2.5" />
      ))}
      {/* Rochers au bord du bassin */}
      <path d="M8 524 q20 -30 55 -12 q12 14 -6 26 H12 Z" fill="#9b8a72" stroke={INK} strokeWidth="3" />
      <path d="M330 530 q18 -34 52 -16 q14 16 -4 30 h-46 Z" fill="#8a7a64" stroke={INK} strokeWidth="3" />
    </svg>
  );
}
