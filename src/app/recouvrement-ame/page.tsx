import type { Metadata } from "next";
import { soulRetrieval } from "@/lib/content";
import { images } from "@/lib/images";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";
import { PageBanner } from "@/components/sections/PageBanner";

export const metadata: Metadata = {
  title: "Recouvrement d'âme",
  description:
    "Soin de recouvrement d'âme au tambour — accompagnement profond et apaisant, en présentiel ou à distance.",
};

export default function RecouvrementAmePage() {
  return (
    <div className="pb-12 pt-4 md:pt-6">
      <PageBanner
        title={soulRetrieval.title}
        subtitle={soulRetrieval.subtitle}
        imageSrc={images.energieFond}
        imageAlt="Énergie et lumière — recouvrement d'âme"
      />

      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <Bubble variant="aura" tail="bottom-left">
          <span className="text-5xl">{soulRetrieval.emoji}</span>
          <p className="mt-4 text-lg leading-relaxed text-ink/80">{soulRetrieval.description}</p>
          <ul className="mt-6 space-y-3">
            {soulRetrieval.points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm">
                <span className="accent-star">★</span>
                {point}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm italic text-ink/60">{soulRetrieval.note}</p>
        </Bubble>

        <Bubble variant="white" className="mt-8" tail="bottom-right">
          <p className="text-sm text-ink/75">
            Cette pratique s&apos;inscrit dans mon parcours de « chercheuse » : je me forme
            régulièrement à de nouvelles techniques bénéfiques, que je propose ensuite lorsqu&apos;elles
            peuvent vous accompagner — toujours avec des mots simples et rassurants, loin de la
            voyance ou du tirage de cartes.
          </p>
        </Bubble>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <ComicButton href="/rendez-vous" size="lg">
            Échanger sur un rendez-vous
          </ComicButton>
          <ComicButton href="/contact" variant="outline" size="lg">
            Me contacter
          </ComicButton>
        </div>
      </div>
    </div>
  );
}
