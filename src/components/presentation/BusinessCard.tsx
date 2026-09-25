"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Mail, Globe, MapPin } from "lucide-react";
import { site } from "@/lib/content";
import styles from "@/app/presentation-logo/presentation.module.css";

/**
 * Carte de visite recréée en HTML (format 85 × 55 mm), avec les vraies
 * coordonnées du site. Les tailles de texte sont en `cqw` : la carte garde ses
 * proportions quelle que soit sa largeur à l'écran.
 */

export function CardFront() {
  const lines = [
    { icon: Phone, text: site.phone },
    { icon: Mail, text: site.email.toLowerCase() },
    { icon: Globe, text: site.url.replace("https://", "") },
    { icon: MapPin, text: "Longwy et alentours" },
  ];
  return (
    <div className={`${styles.card} ${styles.cardCream}`}>
      <div className="flex h-full items-center" style={{ padding: "7cqw 6cqw" }}>
        <Image
          src="/presentation-logo/logo-noir-transparent.webp"
          alt=""
          width={1067}
          height={1066}
          className="h-auto"
          style={{ width: "28cqw" }}
        />
        <span className={styles.cardRule} aria-hidden />
        <div className="min-w-0">
          <p className={styles.cardName}>Véronique Kaba</p>
          <p className={styles.cardRole}>Magnétiseuse énergéticienne</p>
          <span className={styles.cardDash} aria-hidden />
          <ul className={styles.cardLines}>
            {lines.map(({ icon: Icon, text }) => (
              <li key={text}>
                <Icon aria-hidden />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function CardBack() {
  return (
    <div className={`${styles.card} ${styles.cardBlack}`}>
      {/* Ondes dorées — le flux d'énergie qui traverse la carte */}
      <svg className={styles.cardWaves} viewBox="0 0 850 550" preserveAspectRatio="none" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M0 ${250 + i * 9} C 180 ${150 + i * 14}, 260 ${360 - i * 10}, 425 ${265 + i * 4} S 680 ${150 + i * 12}, 850 ${240 + i * 8}`}
            fill="none"
            stroke="#C9A15B"
            strokeWidth={0.8}
            opacity={0.18 + i * 0.05}
          />
        ))}
      </svg>
      <div className="relative flex h-full flex-col items-center justify-center">
        <Image
          src="/presentation-logo/logo-or-transparent.webp"
          alt=""
          width={1067}
          height={1066}
          className="h-auto"
          style={{ width: "30cqw" }}
        />
        <p className={styles.cardMotto}>Équilibre · Énergie · Harmonie</p>
        <span className={styles.cardDash} style={{ marginInline: "auto" }} aria-hidden />
      </div>
    </div>
  );
}

/** Carte qui se retourne au clic (ou au clavier) pour montrer recto et verso. */
export function FlipCard() {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={flipped ? "Voir le recto de la carte" : "Voir le verso de la carte"}
      className={styles.flip}
    >
      <span className={`${styles.flipInner} ${flipped ? styles.isFlipped : ""}`}>
        <span className={styles.flipFace}>
          <CardFront />
        </span>
        <span className={`${styles.flipFace} ${styles.flipBack}`}>
          <CardBack />
        </span>
      </span>
    </button>
  );
}
