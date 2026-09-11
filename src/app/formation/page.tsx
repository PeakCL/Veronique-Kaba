import type { Metadata } from "next";
import { formation, formationFaqs, formationModules, services, site } from "@/lib/content";
import { images } from "@/lib/images";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";
import { VeroAvatar } from "@/components/ui/VeroAvatar";
import { PageBanner } from "@/components/sections/PageBanner";
import { FormationLogin } from "@/components/formation/FormationLogin";
import { PayPalPay } from "@/components/payment/PayPalPayLazy";
import { JsonLd } from "@/components/seo/JsonLd";
import { courseJsonLd, formationFaqPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Formation magnétisme à Longwy & à distance — Magnétisme 2.0",
  description:
    "Apprenez à ressentir votre magnétisme et à dérouler un soin énergétique complet. Formation d'une demi-journée à 70 €, sans prérequis, en présentiel à Longwy ou à distance en visio.",
  alternates: { canonical: "/formation" },
};

const bookableFormation = services.find((s) => s.id === "formation")!;

/** Encart tarif + paiement — repris en haut et en bas de page. */
function OffreCard() {
  return (
    <Bubble variant="gold" className="ring-2 ring-gold-300/50" tail="bottom-left">
      <p className="font-[family-name:var(--font-hand)] text-xl">
        «&nbsp;{formation.quote}&nbsp;»
      </p>

      <div className="mt-5 flex flex-wrap items-baseline gap-3">
        <span className="font-[family-name:var(--font-display)] text-5xl text-aura-600">
          {formation.price} €
        </span>
        <span className="text-sm text-ink/70">· {formation.duration}</span>
      </div>

      <ul className="mt-5 space-y-2 text-sm">
        {formation.details.map((d) => (
          <li key={d} className="flex gap-2">
            <span>⚡</span> {d}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm text-ink/70">{formation.mode}</p>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <PayPalPay serviceId="formation" amount={bookableFormation.price} />
        <ComicButton href="/rendez-vous" variant="outline">
          <span className="whitespace-nowrap">Réserver une date</span>
        </ComicButton>
      </div>

      <p className="mt-4 text-xs text-ink/60">
        Un échange préalable est prévu avant toute inscription — on vérifie ensemble que la
        formation vous correspond.
      </p>
    </Bubble>
  );
}

export default function FormationPage() {
  return (
    <div className="pb-12 pt-4 md:pt-6">
      <JsonLd
        data={[
          courseJsonLd(),
          formationFaqPageJsonLd(),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Formation Magnétisme 2.0", path: "/formation" },
          ]),
        ]}
      />

      <PageBanner
        title={formation.title}
        subtitle="Apprendre à magnétiser — en une demi-journée, sans prérequis"
        imageSrc={images.energieNature}
        imageAlt="Énergie en pleine nature — formation magnétisme à Longwy"
      />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* ── Promesse + offre ── */}
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-lg leading-relaxed text-ink/80">{formation.promise}</p>
            <p className="mt-4 leading-relaxed text-ink/75">{formation.description}</p>

            <Bubble variant="aura" className="mt-6" tail="bottom-left">
              <p className="text-sm leading-relaxed text-ink/80">
                <strong>{formation.prerequisites}</strong> Si vous vous demandez si « ça marchera
                pour vous », c&apos;est précisément la question à laquelle la première heure
                répond — en pratique, pas en théorie.
              </p>
            </Bubble>
          </div>

          <OffreCard />
        </div>

        {/* ── À qui ça s'adresse ── */}
        <section className="mt-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">
            À qui s&apos;adresse cette formation&nbsp;?
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {formation.forWhom.map((p, i) => (
              <Bubble
                key={p.title}
                variant={i % 2 === 0 ? "white" : "sky"}
                tail="none"
                className="h-full"
              >
                <span className="text-4xl">{p.emoji}</span>
                <h3 className="mt-3 font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{p.text}</p>
              </Bubble>
            ))}
          </div>
        </section>

        {/* ── Résultats ── */}
        <section className="mt-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">
            Ce que vous saurez faire à la fin
          </h2>
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <Bubble variant="gold" tail="bottom-left">
              <ul className="space-y-3">
                {formation.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm leading-relaxed">
                    <span className="accent-star">★</span>
                    {o}
                  </li>
                ))}
              </ul>
            </Bubble>
            <VeroAvatar pose="confiante" size="md" className="hidden lg:flex" />
          </div>
        </section>

        {/* ── Programme ── */}
        <section className="mt-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">Le programme</h2>
          <p className="mt-3 text-ink/70">
            Quatre chapitres, accessibles dans l&apos;espace membre après la formation.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {formationModules.map((m) => (
              <div
                key={m.id}
                className="flex items-start gap-4 rounded-2xl bg-white p-5 comic-border"
              >
                <span className="text-2xl">📖</span>
                <div>
                  <h3 className="font-bold">{m.title}</h3>
                  <p className="text-xs text-ink/60">{m.duration}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/75">{m.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Déroulé ── */}
        <section className="mt-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">
            Comment ça se passe&nbsp;?
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {formation.flow.map((step, i) => (
              <Bubble key={step.title} variant={i === 1 ? "aura" : "white"} tail="none">
                <p className="font-[family-name:var(--font-hand)] text-3xl text-aura-600">
                  {i + 1}
                </p>
                <h3 className="mt-2 font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{step.text}</p>
              </Bubble>
            ))}
          </div>
        </section>

        {/* ── E-E-A-T ── */}
        <section className="mt-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">
            Pourquoi se former avec moi&nbsp;?
          </h2>
          <Bubble variant="white" className="mt-6" tail="bottom-right">
            <ul className="space-y-3">
              {formation.why.map((w) => (
                <li key={w} className="flex items-start gap-2 text-sm leading-relaxed">
                  <span className="accent-star">★</span>
                  {w}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-ink/70">
              <a href="/apropos" className="font-bold text-aura-600 hover:underline">
                En savoir plus sur mon parcours
              </a>{" "}
              — magnétiseuse et énergéticienne à {site.geo.addressLocality} depuis{" "}
              {site.practiceSince}.
            </p>
          </Bubble>
        </section>

        {/* ── FAQ ── */}
        <section className="mt-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">Questions fréquentes</h2>
          <div className="mt-6 space-y-3">
            {formationFaqs.map((f) => (
              <details
                key={f.question}
                className="rounded-2xl bg-white p-5 comic-border [&_summary]:cursor-pointer"
              >
                <summary className="font-bold">{f.question}</summary>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Rappel offre ── */}
        <section className="mt-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">
            S&apos;inscrire à la formation
          </h2>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div id="inscription" className="scroll-mt-24">
              <OffreCard />
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl">
                Déjà inscrit·e&nbsp;?
              </h3>
              <p className="mt-2 text-sm text-ink/70">
                Accédez à votre espace membre avec le mot de passe reçu par e-mail.
              </p>
              <div className="mt-4">
                <FormationLogin />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
