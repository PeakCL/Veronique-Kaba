export const site = {
  name: "Véronique Kaba",
  tagline: "Magnétiseuse & énergéticienne · Coupeuse de feu",
  profession: "Thérapeute magnétiseuse & énergéticienne",
  /** URL canonique de production (sert de base aux métadonnées et au sitemap) */
  url: "https://veronique-kaba.fr",
  location: "Longwy et alentours (15 km)",
  locationDetail:
    "Séances en présentiel dans un rayon de 15 km autour de Longwy, et partout à distance (visio).",
  phone: "07 71 17 67 27",
  phoneHref: "tel:+33771176727",
  phoneInternational: "+33771176727",
  /** Lien WhatsApp « click-to-chat » (même numéro) */
  whatsapp: "https://wa.me/33771176727",
  siret: "98027438500015",
  email: "contact@veronique-et-lenergie-doree.fr",
  practiceSince: 2015,
  trainedSince: 2012,
  /** Données de localisation pour le référencement local (Schema.org / GBP) */
  geo: {
    streetAddress: "41 rue du Général Pershing",
    addressLocality: "Longwy",
    postalCode: "54400",
    addressRegion: "Grand Est",
    addressCountry: "FR",
    latitude: 49.5217,
    longitude: 5.7608,
    /** Rayon de la zone desservie en présentiel (mètres) */
    serviceRadiusMeters: 15000,
  },
  social: {
    facebook: "https://www.facebook.com/vero.kaba",
    instagram: "https://www.instagram.com/vero.kaba",
  },
  /** Fiche Google (avis publics — toujours à jour) */
  googleProfile: "https://share.google/uVvgboCH6BQU7t7du",
  seoKeywords: [
    "magnétiseuse Longwy",
    "magnétiseur Longwy",
    "soin énergétique Longwy",
    "coupeuse de feu Longwy",
    "magnétiseur à distance",
    "énergéticien Longwy",
  ],
} as const;

/** Questions fréquentes — alimente la section FAQ et le balisage FAQPage */
export const faqs = [
  {
    question: "Le magnétisme, comment ça fonctionne ?",
    answer:
      "Le magnétisme consiste à transmettre de l'énergie pour relancer la circulation énergétique du corps et l'aider à retrouver son équilibre. Il soulage de nombreuses douleurs physiques et tensions émotionnelles. C'est une approche complémentaire qui ne remplace jamais un suivi médical.",
  },
  {
    question: "Un soin énergétique à distance est-il aussi efficace qu'en présentiel ?",
    answer:
      "Oui. Le soin à distance (en visio) repose sur les mêmes principes que le présentiel : l'énergie n'est pas limitée par la distance. De nombreuses personnes ressentent les mêmes bienfaits, où qu'elles se trouvent.",
  },
  {
    question: "Combien de séances faut-il prévoir ?",
    answer:
      "Cela dépend de votre situation. Certaines personnes ressentent un mieux-être dès la première séance, d'autres ont besoin de plusieurs rendez-vous. Nous en parlons ensemble lors de l'échange préalable.",
  },
  {
    question: "Où se déroulent les séances en présentiel ?",
    answer:
      "Les séances en présentiel ont lieu dans un rayon de 15 km autour de Longwy (54400). Pour les personnes plus éloignées, le soin à distance en visio est proposé partout.",
  },
  {
    question: "Combien coûte une séance et combien de temps dure-t-elle ?",
    answer:
      "Une séance de soin coûte 60 € et dure environ 40 minutes, en présentiel ou en visio. La formation Magnétisme 2.0 est à 70 € pour une demi-journée.",
  },
  {
    question: "Le magnétisme remplace-t-il un traitement médical ?",
    answer:
      "Non. Les soins énergétiques complètent un suivi médical mais ne remplacent jamais un avis ou un traitement professionnel de santé. La démarche dialogue avec la médecine conventionnelle.",
  },
] as const;

/** Infos communes à toutes les séances de soin */
export const sessionInfo = {
  price: 60,
  duration: "environ 40 min",
  modes: "En visio ou en présentiel",
  flow: [
    "Un rendez-vous pour échanger autour de votre problématique",
    "Le soin en position assise ou allongée, dans un moment de détente",
  ],
  disclaimer:
    "Les soins énergétiques complètent un suivi médical — ils ne remplacent jamais un avis professionnel de santé.",
} as const;

export const about = {
  journey: `Après des ennuis de santé que la médecine classique n'avait pas réussi à soulager, un magnétiseur m'a aidée à me défaire durablement de douleurs névralgiques. Au fil des années, j'ai rencontré d'autres soignants (soins énergétiques, reiki…) et je me suis formée en 2012. J'exerce en tant que magnétiseuse et énergéticienne depuis 2015.`,
  approach:
    "Mon approche vise à libérer les tensions et à apaiser le corps. En favorisant une détente profonde, je soulage les douleurs physiques liées au stress pour retrouver un meilleur équilibre au quotidien.",
  values: [
    {
      title: "Écoute attentive",
      text: "Comprendre vos besoins avant d'agir — chaque séance est personnalisée selon mon ressenti et ce dont vous avez besoin.",
    },
    {
      title: "Bienveillance",
      text: "Un espace de confiance où vous pouvez vous confier sur votre santé en toute sérénité.",
    },
    {
      title: "Vitalité retrouvée",
      text: "Rétablir autant que possible un équilibre physique pour retrouver durablement votre énergie au quotidien.",
    },
  ],
  professionalTone:
    "Dans une démarche holistique, je veille à ce que vous ressentiez du professionnalisme et une approche qui dialogue avec la médecine conventionnelle — pour que vous vous sentiez à l'aise en parlant de votre santé.",
  searcher:
    "Je suis d'une nature « chercheuse » : j'écoute des conférences de guérisseurs et chamans, je me forme à de nouvelles techniques qui m'apportent du bien-être, puis je les propose lorsqu'elles peuvent vous servir.",
  formerEducator:
    "Éducatrice de métier, j'accompagne aussi les enfants — pour des ennuis physiques ou un soutien émotionnel léger (accompagnement bienveillant, pas de psychiatrie).",
  notMedium:
    "Je ne tire pas les cartes et ne suis pas médium : ce sont d'autres métiers. Mon accompagnement repose sur le magnétisme, les soins énergétiques et des pratiques que je maîtrise et forme.",
} as const;

/** Les trois soins regroupés sur une page */
export const careTypes = [
  {
    id: "magnetisme",
    title: "Magnétisme",
    emoji: "✨",
    description:
      "Le magnétisme soulage les douleurs physiques et émotionnelles en insufflant une nouvelle énergie. Je relance la circulation énergétique du corps pour l'aider à retrouver son fonctionnement optimal.",
    forWho: [
      "Douleurs articulaires (sportifs)",
      "Inflammations : migraine, entorse, troubles digestifs…",
      "Stress, burn-out, tensions émotionnelles",
    ],
  },
  {
    id: "energetique",
    title: "Soin énergétique",
    emoji: "🌟",
    description:
      "Harmoniser les systèmes nerveux et émotionnels pour rétablir l'équilibre. Chaque séance est unique : j'adapte le soin à ce que votre corps exprime ce jour-là.",
    forWho: [
      "Fatigue, manque de vitalité",
      "Blocages émotionnels",
      "Besoin de recentrage et de lâcher-prise",
    ],
  },
  {
    id: "coupe-feu",
    title: "Coupeuse de feu",
    emoji: "🔥",
    description:
      "Intervention sur les brûlures et sensations de chaleur localisées. Une pratique complémentaire, en lien avec le magnétisme, pour apaiser rapidement l'inconfort.",
    forWho: ["Brûlures légères", "Sensation de chaleur ou d'inflammation localisée"],
  },
] as const;

export const careMetaphors = [
  {
    title: "La batterie déchargée",
    text: "Comme un téléphone à plat, votre corps peut manquer d'énergie : le soin aide à « recharger » ce qui s'est épuisé.",
  },
  {
    title: "L'évier qui peine à s'évacuer",
    text: "Quand l'énergie circule mal, tout s'accumule. L'objectif est de relancer un flux plus fluide, plus naturel.",
  },
] as const;

export const clientele = {
  summary: "Enfants, adultes, seniors — sportifs, personnes en surcharge émotionnelle, familles.",
  sportifs:
    "Beaucoup de sportifs me consultent : j'ai développé un accompagnement type coaching énergétique (blessures, appréhension de reprendre le sport, blocages liés à l'échec ou à la performance).",
  repartition: "Environ 60 % de demandes pour des douleurs physiques, 40 % pour l'émotionnel.",
} as const;

export const soulRetrieval = {
  title: "Recouvrement d'âme",
  emoji: "🥁",
  subtitle: "Soin au tambour — une pratique récemment intégrée à mon accompagnement",
  description:
    "Le recouvrement d'âme est un soin profond, accompagné au tambour, qui vise à retrouver des parts de vous-même laissées en chemin après des chocs, fatigue intense ou périodes de grande tension. C'est une démarche douce, respectueuse, loin de toute voyance.",
  points: [
    "Séance personnalisée, en présentiel ou à distance selon votre situation",
    "Accompagnement au tambour pour favoriser un ancrage et un apaisement profonds",
    "Idéal si vous vous sentez « incomplet·e », épuisé·e ou déconnecté·e de vous-même",
  ],
  note: "Tarif et durée selon votre besoin — échangeons lors d'un premier contact.",
} as const;

export const formation = {
  title: "Formation Magnétisme 2.0",
  emoji: "📚",
  price: 70,
  duration: "½ journée",
  mode: "À distance ou en présentiel — parfois en duo avec un·e collègue pour les groupes",
  description:
    "Découvrez votre capacité à magnétiser et à pratiquer un soin énergétique. Apprenez à ressentir votre magnétisme et vos centres bio-énergétiques, avec des explications claires et accessibles — pas de jargon mystérieux.",
  details: [
    "Techniques énergétiques & magnétisme moderne, ancré dans le quotidien",
    "Confiance pour démarrer un soin en solo",
    "Accès à l'espace membre après inscription",
    "Possibilité de pratiquer en groupe avec un·e collègue formateur·rice",
  ],
  quote: "Tout le monde peut magnétiser — il suffit d'apprendre à ressentir !",
} as const;

/** Services réservables en ligne (PayPal) */
export const services = [
  {
    id: "soin",
    title: "Séance de soin",
    emoji: "✨",
    price: sessionInfo.price,
    duration: sessionInfo.duration,
    mode: sessionInfo.modes,
    description:
      "Magnétisme, soin énergétique ou coupe de feu — séance personnalisée selon vos besoins du moment.",
    details: [
      "Échange préalable sur votre problématique",
      "Soin assis ou allongé, en détente",
      "Présentiel (15 km autour de Longwy) ou visio",
    ],
    stripePriceEnv: "STRIPE_PRICE_SOIN",
  },
  {
    id: "formation",
    title: formation.title,
    emoji: formation.emoji,
    price: formation.price,
    duration: formation.duration,
    mode: formation.mode,
    description: formation.description,
    details: formation.details,
    stripePriceEnv: "STRIPE_PRICE_FORMATION",
  },
] as const;

/**
 * Témoignages réels uniquement.
 * - Les 2 premiers : retours authentiques transmis par les clientes (par SMS).
 * - Avis Google : reliés via `googleReviewsUrl` plutôt que recopiés (voir page Témoignages/Accueil).
 */
export const testimonials = [
  {
    name: "Jessica",
    context: "Recouvrement d'âme",
    text: "Merci à Véronique pour ce soin. J'ai été transporté au son du tambour et de sa voix puis un allègement physique et émotionnel qui m'a fait le plus grand bien. Je la recommande pour toutes les âmes qui ont besoin d'apaisement (entre autres).",
    stars: 5,
  },
  {
    name: "Kadya",
    context: "Soin à distance (Sénégal)",
    text: "Je fais appel à Véronique pour des soins à distance car je vis au Sénégal. J'avais mal à l'épaule et j'ai été agréablement surprise par l'efficacité du traitement et la qualité d'écoute de Véro. Grâce à son suivi j'ai pu observer de réels changements malgré la distance. Je recommande vivement.",
    stars: 5,
  },
] as const;

export const formationModules = [
  {
    id: "module-1",
    title: "Chapitre 1 — Réveiller son magnétisme",
    duration: "25 min",
    locked: false,
    summary: "Percevoir la chaleur dans les paumes, premiers exercices de ressenti.",
  },
  {
    id: "module-2",
    title: "Chapitre 2 — Les centres bio-énergétiques",
    duration: "30 min",
    locked: true,
    summary: "Cartographie des centres, protocole de scan avant soin.",
  },
  {
    id: "module-3",
    title: "Chapitre 3 — Protocole de soin 2.0",
    duration: "35 min",
    locked: true,
    summary: "Structure d'une séance complète, fermeture énergétique, hygiène de pratique.",
  },
  {
    id: "module-4",
    title: "Bonus — Alignement & confiance",
    duration: "20 min",
    locked: true,
    summary: "Rituels quotidiens, erreurs fréquentes, trucs & astuces de Véronique.",
  },
] as const;
