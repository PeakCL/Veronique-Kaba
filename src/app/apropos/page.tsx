import type { Metadata } from "next";
import { about, site } from "@/lib/content";
import { images } from "@/lib/images";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";
import { PageBanner } from "@/components/sections/PageBanner";

export const metadata: Metadata = {
  title: "À propos",
  description: `Parcours de Véronique — ${site.profession}. Depuis ${site.practiceSince}, à Longwy et à distance.`,
};

export default function AproposPage() {
  return (
    <div className="pb-12 pt-4 md:pt-6">
      <PageBanner
        title="À propos de Véronique"
        subtitle={`${site.profession} — depuis ${site.practiceSince}`}
        imageSrc={images.about}
        imageAlt="Méditation en pleine nature — à propos de Véronique"
      />

      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <Bubble variant="aura" tail="bottom-left">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Mon parcours</h2>
          <p className="mt-4 leading-relaxed text-ink/80">{about.journey}</p>
          <p className="mt-4 leading-relaxed text-ink/80">{about.approach}</p>
        </Bubble>

        <div className="mt-8 space-y-6">
          {about.values.map((v, i) => (
            <Bubble
              key={v.title}
              variant={i % 2 === 0 ? "white" : "aura"}
              tail={i % 2 === 0 ? "bottom-right" : "bottom-left"}
            >
              <h2 className="font-[family-name:var(--font-display)] text-2xl">{v.title}</h2>
              <p className="mt-3 leading-relaxed text-ink/80">{v.text}</p>
            </Bubble>
          ))}
        </div>

        <Bubble variant="white" className="mt-8" tail="bottom-left">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Un cadre professionnel</h2>
          <p className="mt-3 leading-relaxed text-ink/80">{about.professionalTone}</p>
          <p className="mt-4 leading-relaxed text-ink/80">{about.formerEducator}</p>
        </Bubble>

        <Bubble variant="sky" className="mt-8" tail="bottom-right">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Toujours en évolution</h2>
          <p className="mt-3 leading-relaxed text-ink/80">{about.searcher}</p>
          <p className="mt-4 text-sm text-ink/70">{about.notMedium}</p>
        </Bubble>

        <div className="mt-12 text-center">
          <ComicButton href="/rendez-vous" size="lg">
            Prendre rendez-vous
          </ComicButton>
        </div>
      </div>
    </div>
  );
}
