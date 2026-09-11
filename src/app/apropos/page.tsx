import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { about, site } from "@/lib/content";
import { images } from "@/lib/images";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";
import { PageBanner } from "@/components/sections/PageBanner";
import { AboutCards } from "@/components/sections/AboutCards";
import { VeroAvatar } from "@/components/ui/VeroAvatar";

export const metadata: Metadata = {
  title: "À propos de Véronique — Magnétiseuse à Longwy",
  description: `Parcours de Véronique, ${site.profession.toLowerCase()} à Longwy depuis ${site.practiceSince}. Une approche bienveillante, professionnelle, en dialogue avec la médecine conventionnelle.`,
  alternates: { canonical: "/apropos" },
};

const cards = [
  {
    title: about.values[0].title,
    text: about.values[0].text,
    emoji: "👂",
    variant: "aura" as const,
  },
  {
    title: about.values[1].title,
    text: about.values[1].text,
    emoji: "💚",
    variant: "white" as const,
  },
  {
    title: about.values[2].title,
    text: about.values[2].text,
    emoji: "⚡",
    variant: "gold" as const,
  },
  {
    title: "Un cadre professionnel",
    text: about.professionalTone,
    emoji: "🤝",
    variant: "white" as const,
  },
  {
    title: "Éducatrice de cœur",
    text: about.formerEducator,
    emoji: "🌱",
    variant: "sky" as const,
  },
  {
    title: "Toujours en évolution",
    text: about.searcher,
    emoji: "🔍",
    variant: "aura" as const,
  },
];

export default function AproposPage() {
  return (
    <div className="pb-12 pt-4 md:pt-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "À propos", path: "/apropos" },
        ])}
      />
      <PageBanner
        title="À propos de Véronique"
        subtitle={`${site.profession} — depuis ${site.practiceSince}`}
        imageSrc={images.about}
        imageAlt="Deux arbres anciens sous le soleil — force et enracinement"
      />

      <div className="mx-auto max-w-4xl px-4 md:px-6">

        {/* ── Avatar BD + texte parcours ── */}
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <Bubble variant="aura" tail="bottom-left">
            <h2 className="font-[family-name:var(--font-display)] text-2xl">Mon parcours</h2>
            <p className="mt-4 leading-relaxed text-ink/80">{about.journey}</p>
            <p className="mt-4 leading-relaxed text-ink/80">{about.approach}</p>
          </Bubble>

          {/* Pose "réfléchit" — buste, regard en l'air */}
          <VeroAvatar pose="reflechit" size="md" className="hidden lg:flex" />
        </div>

        <AboutCards cards={cards} />

        <p className="mt-6 text-center text-xs italic text-ink/50">{about.notMedium}</p>

        {/* Citation — philosophie d'accompagnement */}
        <blockquote className="mt-10 rounded-3xl bg-gradient-to-br from-aura-50 to-gold-50/60 px-8 py-8 comic-border-lg text-center">
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-aura-700">
            Mon accompagnement
          </p>
          <p className="mt-4 font-[family-name:var(--font-hand)] text-xl leading-relaxed text-ink/80">
            J&apos;accompagne des espaces où le corps, les émotions et le système nerveux peuvent
            relâcher ce qui est retenu.
          </p>
          <p className="mt-3 font-[family-name:var(--font-hand)] text-xl leading-relaxed text-ink/70">
            Dans l&apos;écoute fine de ce qui est déjà là.
            <br />Ce qui demande à circuler.
            <br />Ce qui a été figé.
          </p>
          <footer className="mt-5 font-[family-name:var(--font-hand)] text-lg text-aura-600">
            — Véronique ✨
          </footer>
        </blockquote>

        <div className="mt-10 text-center">
          <ComicButton href="/rendez-vous" size="lg">
            Prendre rendez-vous
          </ComicButton>
        </div>
      </div>
    </div>
  );
}
