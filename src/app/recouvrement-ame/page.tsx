import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { sessionInfo, site, soulRetrieval } from "@/lib/content";
import { images } from "@/lib/images";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";
import { VeroAvatar } from "@/components/ui/VeroAvatar";
import { PageBanner } from "@/components/sections/PageBanner";

export const metadata: Metadata = {
  title: "Recouvrement d'âme au tambour — Longwy & à distance",
  description:
    "Soin de recouvrement d'âme accompagné au tambour : un accompagnement profond et apaisant après un choc, une fatigue intense ou une période de tension. Présentiel ou à distance.",
  alternates: { canonical: "/recouvrement-ame" },
};

export default function RecouvrementAmePage() {
  return (
    <div className="pb-12 pt-4 md:pt-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Recouvrement d'âme", path: "/recouvrement-ame" },
        ])}
      />
      <PageBanner
        title={soulRetrieval.title}
        subtitle={soulRetrieval.subtitle}
        imageSrc={images.meditationFlamme}
        imageAlt="Méditation et énergie intérieure — recouvrement d'âme"
      />

      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
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

          {/* Pose "pensive" — regard levé, contemplation */}
          <VeroAvatar pose="pensive" size="md" className="hidden lg:flex" />
        </div>

        {/* ── Déroulé ── */}
        <section className="mt-12">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">
            Comment se déroule une séance&nbsp;?
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {soulRetrieval.flow.map((step, i) => (
              <Bubble key={step} variant={i === 1 ? "gold" : "white"} tail="none">
                <p className="font-[family-name:var(--font-hand)] text-3xl text-aura-600">
                  {i + 1}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink/80">{step}</p>
              </Bubble>
            ))}
          </div>
        </section>

        {/* ── Pour qui ── */}
        <section className="mt-12">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">
            À qui ce soin s&apos;adresse-t-il&nbsp;?
          </h2>
          <Bubble variant="aura" className="mt-6" tail="bottom-left">
            <ul className="space-y-3">
              {soulRetrieval.forWhom.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-relaxed">
                  <span className="accent-star">★</span>
                  {item}
                </li>
              ))}
            </ul>
          </Bubble>
        </section>

        {/* ── Modalités ── */}
        <section className="mt-12">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">
            En présentiel ou à distance
          </h2>
          <Bubble variant="sky" className="mt-6" tail="bottom-right">
            <p className="text-sm leading-relaxed text-ink/80">
              {site.locationDetail} Le recouvrement d&apos;âme se pratique aussi bien à distance
              qu&apos;en présentiel&nbsp;: l&apos;énergie n&apos;est pas limitée par la distance, et le
              tambour vous accompagne de la même manière en visio.
            </p>
          </Bubble>
        </section>

        {/* ── Tarif ── */}
        <section className="mt-12">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">Tarif et durée</h2>
          <Bubble variant="white" className="mt-6" tail="bottom-left">
            <p className="text-sm leading-relaxed text-ink/80">{soulRetrieval.note}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              À titre de repère, une séance de soin classique est à {sessionInfo.price}&nbsp;€ pour{" "}
              {sessionInfo.duration}. Le recouvrement d&apos;âme demandant un temps d&apos;échange
              préalable plus long, nous en convenons ensemble lors du premier contact.
            </p>
          </Bubble>
        </section>

        {/* ── Cadre ── */}
        <section className="mt-12">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">Dans quel cadre&nbsp;?</h2>
          <Bubble variant="white" className="mt-6" tail="bottom-right">
            <p className="text-sm leading-relaxed text-ink/75">
              Cette pratique s&apos;inscrit dans mon parcours de « chercheuse »&nbsp;: je me forme
              régulièrement à de nouvelles techniques bénéfiques, que je propose ensuite
              lorsqu&apos;elles peuvent vous accompagner — toujours avec des mots simples et
              rassurants, loin de la voyance ou du tirage de cartes.
            </p>
            <p className="mt-4 text-sm italic leading-relaxed text-ink/60">
              {sessionInfo.disclaimer}
            </p>
          </Bubble>
        </section>

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
