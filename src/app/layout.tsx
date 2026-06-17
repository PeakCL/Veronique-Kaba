import type { Metadata } from "next";
import { Baloo_2, Caveat, Nunito } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessJsonLd, personJsonLd, websiteJsonLd } from "@/lib/seo";
import { site } from "@/lib/content";
import "./globals.css";

const baloo = Baloo_2({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
});

// URL canonique de production. La variable d'env reste prioritaire (preview, staging),
// mais le repli pointe désormais vers le domaine réel — plus de fuite « localhost »
// dans les balises Open Graph / canonical en production.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Magnétiseuse à Longwy — Magnétisme & soins énergétiques | Véronique Kaba",
    template: "%s | Véronique Kaba",
  },
  description:
    "Magnétiseuse et énergéticienne à Longwy depuis 2015. Soins personnalisés (40 min, 60 €) pour soulager douleurs, stress et fatigue, coupe de feu, recouvrement d'âme et formation. Présentiel (15 km autour de Longwy) ou à distance en visio.",
  keywords: [...site.seoKeywords],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Magnétiseuse à Longwy — Magnétisme & soins énergétiques",
    description:
      "Soins énergétiques, magnétisme, coupe de feu et recouvrement d'âme à Longwy et à distance. Depuis 2015, avec bienveillance et écoute.",
    url: siteUrl,
    siteName: "Véronique Kaba",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/mains-energie-doree.webp",
        width: 1200,
        height: 1200,
        alt: "Véronique Kaba — magnétiseuse à Longwy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Magnétiseuse à Longwy — Magnétisme & soins énergétiques",
    description:
      "Soins énergétiques, magnétisme, coupe de feu et recouvrement d'âme à Longwy et à distance.",
    images: ["/images/mains-energie-doree.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${baloo.variable} ${nunito.variable} ${caveat.variable} min-h-screen flex flex-col`}
      >
        <JsonLd data={[localBusinessJsonLd(), personJsonLd(), websiteJsonLd()]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
