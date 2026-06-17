import { site, faqs, testimonials, careTypes, sessionInfo, formation } from "@/lib/content";

/** URL canonique de production */
export const siteUrl = site.url;

/** Construit une URL absolue à partir d'un chemin relatif */
export const abs = (path = "/") => new URL(path, siteUrl).toString();

const ORG_ID = `${siteUrl}/#business`;
const PERSON_ID = `${siteUrl}/#veronique`;

/** Image de partage / représentation de l'activité */
const primaryImage = abs("/images/mains-energie-doree.webp");

/**
 * Établissement local — cœur du référencement local (Google Business Profile,
 * Knowledge Panel, pack local). Type HealthAndBeautyBusiness.
 */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
    "@id": ORG_ID,
    name: site.name,
    alternateName: "Véronique Kaba — Magnétiseuse",
    description:
      "Magnétiseuse et énergéticienne à Longwy depuis 2015. Soins personnalisés, coupe de feu, recouvrement d'âme et formation — en présentiel (15 km autour de Longwy) ou à distance en visio.",
    url: siteUrl,
    image: primaryImage,
    logo: primaryImage,
    telephone: site.phoneInternational,
    email: site.email,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    knowsLanguage: "fr-FR",
    sameAs: [site.social.facebook, site.social.instagram],
    founder: { "@id": PERSON_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.geo.streetAddress,
      addressLocality: site.geo.addressLocality,
      postalCode: site.geo.postalCode,
      addressRegion: site.geo.addressRegion,
      addressCountry: site.geo.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: [
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: site.geo.latitude,
          longitude: site.geo.longitude,
        },
        geoRadius: site.geo.serviceRadiusMeters,
      },
      { "@type": "Country", name: "France" },
    ],
    availableService: careTypes.map((c) => ({
      "@type": "Service",
      name: c.title,
      description: c.description,
    })),
    identifier: { "@type": "PropertyValue", name: "SIRET", value: site.siret },
  };
}

/** La praticienne — signal E-E-A-T (expertise, autorité, confiance). */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Véronique",
    jobTitle: site.profession,
    description: `${site.profession}, en exercice depuis ${site.practiceSince} (formée en ${site.trainedSince}).`,
    url: abs("/apropos"),
    image: abs("/images/meditation-soleil.jpg"),
    worksFor: { "@id": ORG_ID },
    knowsAbout: [
      "magnétisme",
      "soin énergétique",
      "coupe de feu",
      "recouvrement d'âme",
      "reiki",
    ],
    sameAs: [site.social.facebook, site.social.instagram],
  };
}

/** Site web + recherche — aide Google à comprendre la structure du site. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: site.name,
    inLanguage: "fr-FR",
    publisher: { "@id": ORG_ID },
  };
}

/** Service réservable (page Soins). */
export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Séance de magnétisme et soin énergétique",
    serviceType: "Magnétisme · Soin énergétique · Coupe de feu",
    description:
      "Séance personnalisée de magnétisme, soin énergétique ou coupe de feu pour soulager douleurs, stress et fatigue. Environ 40 minutes.",
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "City", name: "Longwy" },
      { "@type": "Country", name: "France" },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: abs("/rendez-vous"),
      availableLanguage: "fr",
    },
    offers: {
      "@type": "Offer",
      price: sessionInfo.price,
      priceCurrency: "EUR",
      url: abs("/soins"),
      availability: "https://schema.org/InStock",
    },
  };
}

/** Formation Magnétisme 2.0 — type Course. */
export function courseJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: formation.title,
    description: formation.description,
    provider: { "@id": ORG_ID, "@type": "Organization", name: site.name },
    offers: {
      "@type": "Offer",
      price: formation.price,
      priceCurrency: "EUR",
      url: abs("/formation"),
      availability: "https://schema.org/InStock",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["online", "onsite"],
      courseWorkload: "PT4H",
    },
  };
}

/** FAQ — éligible aux extraits enrichis (questions dépliables dans Google). */
export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/**
 * Avis clients (page Témoignages). À n'utiliser qu'avec des avis réels.
 */
export function reviewsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": ORG_ID,
    name: site.name,
    image: primaryImage,
    review: testimonials.map((t) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.stars,
        bestRating: 5,
      },
      author: { "@type": "Person", name: t.name },
      reviewBody: t.text,
    })),
  };
}

/** Fil d'Ariane. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}
