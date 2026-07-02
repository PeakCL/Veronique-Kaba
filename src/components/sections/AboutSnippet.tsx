import Image from "next/image";
import { about, sessionInfo, site } from "@/lib/content";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";
import { veroAvatars } from "@/lib/images";

export function AboutSnippet() {
  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">

        {/* ── Colonne texte ── */}
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

        {/* ── Colonne avatar BD — pose confiante (bras croisés, sourire) ── */}
        <div className="space-y-4">
          <div className="relative flex justify-center">
            {/* Halo doré BD */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[260px] w-[260px] rounded-full
                         bg-[radial-gradient(ellipse,rgba(240,190,90,0.32)_0%,rgba(240,190,90,0.08)_60%,transparent_80%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[220px] w-[220px] rounded-full halftone opacity-50"
            />

            {/* Illustration sans cadre, fond transparent */}
            <Image
              src={veroAvatars.confiante}
              alt="Véronique Kaba — énergéticienne et magnétiseuse"
              width={360}
              height={420}
              className="relative z-10 max-h-[400px] w-auto object-contain
                         drop-shadow-[0_6px_30px_rgba(240,190,90,0.22)]"
            />
          </div>

          {/* Stats clés */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: String(site.trainedSince), label: "Formation" },
              { n: String(site.practiceSince), label: "En exercice" },
              { n: `${sessionInfo.price}€`, label: "Séance de soin" },
              { n: "15 km", label: "Présentiel + visio" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-rose-50/70 p-5 text-center comic-border-lg transition-all hover:-translate-y-1 hover:bg-gold-50"
              >
                <p className="font-[family-name:var(--font-display)] text-3xl text-gold-600">
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
