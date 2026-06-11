import { about, sessionInfo, site } from "@/lib/content";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";
import { ComicImage } from "@/components/ui/ComicImage";
import { images } from "@/lib/images";

export function AboutSnippet() {
  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <Bubble variant="aura" tail="bottom-right">
          <h2 className="font-[family-name:var(--font-display)] text-4xl">Qui suis-je ?</h2>
          <p className="mt-4 leading-relaxed text-ink/80">{about.journey}</p>
          <p className="mt-4 leading-relaxed text-ink/80">{about.professionalTone}</p>
          <p className="mt-4 font-[family-name:var(--font-hand)] text-2xl text-aura-600">
            — Véronique ✍️
          </p>
          <ComicButton href="/apropos" className="mt-6" variant="outline">
            En savoir plus
          </ComicButton>
        </Bubble>

        <div className="space-y-4">
          <ComicImage
            src={images.about}
            alt="Méditation en pleine nature — symbole du magnétisme et de l'énergie transmise"
            aspect="portrait"
            className="object-center"
          />
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: String(site.trainedSince), label: "Formation" },
              { n: String(site.practiceSince), label: "En exercice" },
              { n: `${sessionInfo.price}€`, label: "Séance de soin" },
              { n: "15 km", label: "Présentiel + visio" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white p-5 text-center comic-border-lg transition-transform hover:-translate-y-1"
              >
                <p className="font-[family-name:var(--font-display)] text-3xl text-aura-600">
                  {stat.n}
                </p>
                <p className="mt-1 text-sm font-semibold text-ink/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
