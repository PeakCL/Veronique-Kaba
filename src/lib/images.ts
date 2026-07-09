/**
 * Illustrations BD de Véronique — 5 poses, fond transparent
 * Fichiers à placer dans public/images/ avec ces noms exacts :
 *   vero-salut.png        → plein corps, main levée, sourire
 *   vero-confiante.png    → buste, bras croisés, sourire
 *   vero-reflechit.png    → buste, menton dans la main, regard en l'air
 *   vero-meditation.png   → plein corps, posture lotus
 *   vero-debout.png       → plein corps, debout, pensif
 *   vero-meditation-energie.png → lotus, énergie dorée au cœur + halo géométrie sacrée
 *   vero-ouverture-nature.png   → bras ouverts, vallée au coucher de soleil, joie
 *   vero-pensive.png            → buste, regard levé, contemplation
 */
export const veroAvatars = {
  salut:             "/images/vero-salut.png",
  confiante:         "/images/vero-confiante.png",
  reflechit:         "/images/vero-reflechit.png",
  meditation:        "/images/vero-meditation.png",
  debout:            "/images/vero-debout.png",
  meditationEnergie: "/images/vero-meditation-energie.png",
  ouverture:         "/images/vero-ouverture-nature.png",
  pensive:           "/images/vero-pensive.png",
} as const;

export const images = {
  /** Fond hero — deux arbres anciens, lumière soleil entre eux */
  heroFond: "/images/arbres-soleil.jpg",
  /** Illustration principale hero — rayons soleil à travers bouleaux (portrait) */
  mainsEnergie: "/images/foret-rayons-bouleaux.jpg",
  /** Page soins — soin énergétique réel, mains posées sur genoux */
  mainsSoin: "/images/foret-chemin-soleil.jpg",
  /** À propos banner — deux arbres anciens, force et enracinement */
  about: "/images/arbres-soleil.jpg",
  /** AboutSnippet accueil — femme méditant, énergie en cœur dorée */
  aboutSnippet: "/images/meditation-coeur.jpg",
  /** Formation — allée de forêt brumeuse, chemin et lumière */
  energieNature: "/images/foret-brume-chemin.jpg",
  /** Recouvrement d'âme — silhouette homme dans forêt dorée au coucher */
  meditationFlamme: "/images/foret-lumiere-homme.jpg",
  /** Recouvrement d'âme (variante) */
  meditationBulle: "/images/meditation-bulle.jpg",
  /** Témoignages — méditation nature avec papillons */
  meditationPapillons: "/images/meditation-papillons.jpg",
  /** Soins — séance énergétique chakra spectaculaire */
  soinChakra: "/images/meditation-soin-chakra.webp",
  /** Soins — homme recevant soin énergétique couché */
  soinEnergie: "/images/soin-energie-seance.jpg",
  /** Soins authentique — mains posées magnétisme réel */
  soinMains: "/images/soin-magnetisme-mains.jpg",
  /** Section soins — femme méditant en forêt avec énergie de feu */
  meditationEnergieFort: "/images/meditation-energie-foret.jpg",
  /** À propos contenu — femme méditant près cascade, orbe dorée */
  meditationSoleilCascade: "/images/meditation-soleil-cascade.jpg",
  /** Nature — femme méditant avec papillons et boules de feu */
  meditationNatureEnergie: "/images/meditation-nature-energie.jpg",
  /** WarmCTA fond — silhouette homme dans forêt dorée */
  foretLumiere: "/images/foret-lumiere-homme.jpg",
  /** Nature — forêt automne lumière dorée tamisée */
  foretAutomne: "/images/foret-automne-brume.jpg",
  /** Nature — forêt hiver rayons soleil dorés */
  foretHiver: "/images/foret-hiver-soleil.jpg",
  /** À propos banner large — libellule méditation énergie colorée */
  meditationLibellule: "/images/meditation-libellule.jpg",
  /** Alias rétrocompatibles */
  energieFond: "/images/arbres-soleil.jpg",
  mainsAmpoule: "/images/foret-rayons-bouleaux.jpg",
} as const;
