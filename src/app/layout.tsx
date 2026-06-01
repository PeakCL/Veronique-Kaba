import type { Metadata } from "next";
import { Bangers, Caveat, Nunito } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const bangers = Bangers({
  weight: "400",
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Véronique et l'énergie dorée | Magnétisme & Soins énergétiques",
    template: "%s | Véronique et l'énergie dorée",
  },
  description:
    "Magnétiseuse et énergéticienne à Longwy. Soins personnalisés (40 min, 60 €), formation Magnétisme 2.0, recouvrement d'âme au tambour. Présentiel (15 km) ou visio.",
  keywords: ["Magnétiseuse", "magnétisme", "soin énergétique", "Longwy", "coupeuse de feu"],
  openGraph: {
    title: "Véronique et l'énergie dorée — Magnétiseuse",
    description: "Magnétisme, soins énergétiques & formation — Longwy et à distance",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/mains-energie.png",
        width: 1200,
        height: 1200,
        alt: "Véronique et l'énergie dorée",
      },
    ],
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
        className={`${bangers.variable} ${nunito.variable} ${caveat.variable} min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
