import type { Metadata } from "next";
import Image from "next/image";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { CardBack, CardFront, FlipCard } from "@/components/presentation/BusinessCard";
import styles from "./presentation.module.css";

/**
 * Présentation de l'identité visuelle, destinée à Véronique.
 * Page autonome : sans l'en-tête ni le pied de page du site (voir SiteChrome),
 * non indexée et absente du sitemap.
 */

const serif = Cormorant_Garamond({
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-pres-serif",
});

const sans = Jost({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-pres-sans",
});

export const metadata: Metadata = {
  title: "Votre identité visuelle",
  robots: { index: false, follow: false },
};

const GOLD = "#C9A15B";

/** Pictogrammes dessinés pour chaque élément du logo. */
const glyphs = {
  letters: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <text x="4" y="34" fontFamily="var(--font-pres-serif), serif" fontSize="30" fill="currentColor">
        VK
      </text>
    </svg>
  ),
  line: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <line x1="6" y1="44" x2="44" y2="4" stroke={GOLD} strokeWidth="1.5" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <path d="M24 8 L26 22 L40 24 L26 26 L24 40 L22 26 L8 24 L22 22 Z" fill={GOLD} />
    </svg>
  ),
  arc: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <path d="M36 9 A 18 18 0 1 0 14 40" fill="none" stroke={GOLD} strokeWidth="1.5" />
    </svg>
  ),
  dots: (
    <svg viewBox="0 0 48 48" aria-hidden>
      {Array.from({ length: 9 }).map((_, i) => {
        const a = (Math.PI / 12) * (i + 1);
        return (
          <circle key={i} cx={24 + Math.cos(a) * 18} cy={20 + Math.sin(a) * 18} r={1.2 + (i % 3) * 0.4} fill={GOLD} />
        );
      })}
    </svg>
  ),
};

const meanings = [
  {
    glyph: glyphs.letters,
    title: "Vos initiales",
    text: "Un V et un K à fins empattements, classiques et lisibles, aussi bien en grand sur une plaque qu'en tout petit sur une carte.",
  },
  {
    glyph: glyphs.line,
    title: "Le trait de lumière",
    text: "La diagonale dorée traverse les lettres comme l'énergie traverse le corps pendant un soin : c'est le passage de la main.",
  },
  {
    glyph: glyphs.spark,
    title: "L'éclat",
    text: "Au croisement du trait et des lettres, un point s'illumine. C'est l'instant où le soin agit.",
  },
  {
    glyph: glyphs.arc,
    title: "Le cercle ouvert",
    text: "Il enveloppe sans enfermer : une présence qui protège tout en laissant l'énergie circuler.",
  },
  {
    glyph: glyphs.dots,
    title: "Les pointillés",
    text: "L'énergie qui circule par petites touches et revient vers vous, comme un souffle.",
  },
];

const palette = [
  { name: "Noir velours", hex: "#0F0D0B", use: "Fonds sombres, verso de carte, lettres du logo" },
  { name: "Or", hex: "#C9A15B", use: "Trait de lumière, cercle, filets et pictogrammes" },
  { name: "Crème", hex: "#F3ECE1", use: "Papier, fonds clairs, recto de carte" },
  { name: "Taupe", hex: "#A89F8A", use: "Déclinaison douce, supports discrets" },
];

const materials = [
  { src: "detail-dorure-creme.webp", w: 337, h: 326, caption: "Dorure à chaud sur papier crème texturé" },
  { src: "detail-dorure-noir.webp", w: 374, h: 326, caption: "Or sur papier noir, pour le verso" },
  { src: "detail-tranche-or.webp", w: 298, h: 182, caption: "Tranche dorée, en option" },
  { src: "support-papier.webp", w: 364, h: 256, caption: "Gaufrage sur papier kraft clair" },
  { src: "signaletique-verre.webp", w: 416, h: 256, caption: "Plaque en verre pour le cabinet" },
];

export default function PresentationLogoPage() {
  return (
    <div className={`${serif.variable} ${sans.variable} ${styles.page}`}>
      {/* ── Ouverture ── */}
      <header className={styles.hero}>
        <span className={styles.sweep} aria-hidden />
        <div>
          <Image
            src="/presentation-logo/logo-or-transparent.webp"
            alt="Logo VK de Véronique Kaba, or sur fond noir"
            width={1067}
            height={1066}
            priority
            className={`${styles.heroLogo} mx-auto h-auto w-[min(72vw,26rem)]`}
          />
          <div className={styles.heroText}>
            <h1 className={`${styles.serif} mt-8 text-4xl tracking-[0.18em] md:text-5xl`}>
              VÉRONIQUE KABA
            </h1>
            <p className="mt-3 text-sm tracking-[0.08em] text-[#e6c88a]/80">
              Votre identité visuelle
            </p>
          </div>
        </div>
        <span className={styles.scrollHint} aria-hidden />
      </header>

      {/* ── I. Le sens ── */}
      <section className={`${styles.chapter} ${styles.cream}`}>
        <div className={`${styles.inner} grid gap-14 lg:grid-cols-[1fr_1.1fr]`}>
          <Image
            src="/presentation-logo/logo-noir-transparent.webp"
            alt="Logo VK en noir et or sur fond clair"
            width={1067}
            height={1066}
            className="mx-auto h-auto w-full max-w-md lg:sticky lg:top-[20vh] lg:self-start"
          />
          <div>
            <p className={styles.chapterNum}>I.</p>
            <h2 className={styles.h2}>Ce que raconte votre logo</h2>
            <p className={styles.lead}>
              Chaque élément a été pensé pour parler de votre métier sans avoir besoin de mots.
            </p>
            <div className="mt-10">
              {meanings.map((m) => (
                <div key={m.title} className={styles.meaning}>
                  {m.glyph}
                  <div>
                    <p className={styles.meaningTitle}>{m.title}</p>
                    <p className="mt-1 opacity-75">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── II. Deux versions ── */}
      <section className={styles.chapter}>
        <div className={styles.inner}>
          <p className={styles.chapterNum}>II.</p>
          <h2 className={styles.h2}>Deux versions, un même geste</h2>
          <p className={styles.lead}>
            Le logo existe en version or sur fond sombre et en version noir et or sur fond clair.
            Vous choisissez selon le support : il reste reconnaissable dans les deux cas.
          </p>
        </div>
        <div className={`${styles.versions} mx-auto max-w-6xl`}>
          <figure className={`${styles.version} ${styles.versionDark}`}>
            <Image
              src="/presentation-logo/logo-or-transparent.webp"
              alt="Version or sur noir"
              width={1067}
              height={1066}
              className="h-auto w-full max-w-xs"
            />
            <figcaption className="mt-6 text-center">
              <span className={`${styles.serif} block text-2xl`}>Or sur noir</span>
              <span className="text-sm opacity-70">
                Verso de carte, réseaux sociaux, supports sombres
              </span>
            </figcaption>
          </figure>
          <figure className={`${styles.version} ${styles.versionLight}`}>
            <Image
              src="/presentation-logo/logo-noir-transparent.webp"
              alt="Version noir et or sur blanc"
              width={1067}
              height={1066}
              className="h-auto w-full max-w-xs"
            />
            <figcaption className="mt-6 text-center">
              <span className={`${styles.serif} block text-2xl`}>Noir et or sur clair</span>
              <span className="text-sm opacity-70">
                Recto de carte, site internet, factures, flyers
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── III. Couleurs et lettres ── */}
      <section className={`${styles.chapter} ${styles.cream}`}>
        <div className={styles.inner}>
          <p className={styles.chapterNum}>III.</p>
          <h2 className={styles.h2}>Couleurs et lettres</h2>

          <ul className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
            {palette.map((c) => (
              <li key={c.hex}>
                <div className={`${styles.swatch} w-full max-w-40`} style={{ background: c.hex }} />
                <p className={`${styles.serif} mt-4 text-2xl`}>{c.name}</p>
                <p className="text-sm tabular-nums opacity-60">{c.hex}</p>
                <p className="mt-2 text-sm opacity-75">{c.use}</p>
              </li>
            ))}
          </ul>

          <span className={styles.goldRule} aria-hidden />

          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className={`${styles.serif} text-6xl leading-none md:text-7xl`}>Aa</p>
              <p className={`${styles.serif} mt-4 text-2xl`}>Cormorant Garamond</p>
              <p className="mt-1 opacity-75">
                Pour votre nom et les titres. Un caractère à fort contraste, de la même famille
                d&apos;esprit que les lettres du logo.
              </p>
            </div>
            <div>
              <p className="text-6xl font-light leading-none md:text-7xl">Aa</p>
              <p className="mt-4 text-2xl font-normal">Jost</p>
              <p className="mt-1 opacity-75">
                Pour les coordonnées et les textes courants. Simple et net, il laisse la vedette au
                logo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── IV. La carte de visite ── */}
      <section className={styles.chapter}>
        <div className={styles.inner}>
          <p className={styles.chapterNum}>IV.</p>
          <h2 className={styles.h2}>Votre carte de visite</h2>
          <p className={styles.lead}>
            Format classique 85 × 55 mm. Au recto, vos coordonnées sur papier crème ; au verso, le
            logo doré sur fond noir. Touchez la carte pour la retourner.
          </p>

          <div className="mx-auto mt-14 max-w-2xl">
            <FlipCard />
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-2">
            <figure>
              <CardFront />
              <figcaption className={styles.caption}>Recto</figcaption>
            </figure>
            <figure>
              <CardBack />
              <figcaption className={styles.caption}>Verso</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── V. Les matières ── */}
      <section className={`${styles.chapter} ${styles.cream}`}>
        <div className={styles.inner}>
          <p className={styles.chapterNum}>V.</p>
          <h2 className={styles.h2}>À imprimer, à toucher</h2>
          <p className={styles.lead}>
            Le logo prend toute sa valeur sur un beau papier : l&apos;or en relief accroche la
            lumière, comme le trait du logo.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {materials.map((m, i) => (
              <figure key={m.src} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
                <div className={`${styles.material} aspect-[4/3]`}>
                  <Image
                    src={`/presentation-logo/${m.src}`}
                    alt={m.caption}
                    width={m.w}
                    height={m.h}
                  />
                </div>
                <figcaption className={styles.caption}>{m.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── VI. Déclinaisons ── */}
      <section className={styles.chapter}>
        <div className={styles.inner}>
          <p className={styles.chapterNum}>VI.</p>
          <h2 className={styles.h2}>Toutes les déclinaisons</h2>
          <p className={styles.lead}>
            Version or, version blanche, construction du tracé et six variantes du cercle, du plus
            plein au plus minimaliste. De quoi choisir ensemble celle qui vous ressemble le plus.
          </p>
          <Image
            src="/presentation-logo/declinaisons.webp"
            alt="Planche des déclinaisons du logo VK"
            width={1536}
            height={1024}
            className="mt-12 h-auto w-full"
            sizes="(min-width: 1152px) 1152px, 100vw"
          />
        </div>
      </section>

      {/* ── Clôture ── */}
      <footer className="px-5 pb-20 pt-10 text-center">
        <Image
          src="/presentation-logo/logo-or-transparent.webp"
          alt=""
          width={1067}
          height={1066}
          className="mx-auto h-auto w-24"
        />
        <p className={`${styles.serif} mt-6 text-2xl tracking-[0.18em]`}>VÉRONIQUE KABA</p>
        <p className="mt-2 text-sm uppercase tracking-[0.32em] text-[#c9a15b]">
          Équilibre · Énergie · Harmonie
        </p>
      </footer>
    </div>
  );
}
