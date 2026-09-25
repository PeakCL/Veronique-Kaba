import type { Metadata } from "next";
import Link from "next/link";
import {
  formations,
  formationShared,
  formationFaqs,
  site,
  type Formation,
} from "@/lib/content";
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
  title: "Formations magnétisme à Longwy & à distance — Niveau 1 & 2",
  description:
    "Apprenez à ressentir votre magnétisme et à dérouler un soin énergétique. Formation Niveau 1 (format court de 2 h) et Niveau 2 à venir — en présentiel à Longwy ou à distance en visio.",
  alternates: { canonical: "/formation" },
};

const niveau1 = formations[0];

/** Carte tarif + paiement pour un niveau. */
function OffreCard({ level, highlight = false }: { level: Formation; highlight?: boolean }) {
  const bookable = level.price > 0;
  return (
    <Bubble
      variant="gold"
      className={`flex h-full flex-col${highlight ? " ring-2 ring-gold-300/50" : ""}`}
      tail="bottom-left"
    >
      <p className="text-sm font-bold text-aura-700">
        {level.emoji} {level.title}
      </p>
      <p className="mt-1 font-[family-name:var(--font-hand)] text-lg text-ink/80">
        {level.tagline}
      </p>

      <div className="mt-4 flex flex-wrap items-baseline gap-3">
        {bookable ? (
          <>
            <span className="font-[family-name:var(--font-display)] text-5xl text-aura-600">
              {level.price} €
            </span>
            <span className="text-sm text-ink/70">· {level.duration}</span>
          </>
        ) : (
          <span className="font-[family-name:var(--font-display)] text-3xl text-aura-600">
            Bientôt disponible
          </span>
        )}
      </div>

      <ul className="mt-5 space-y-2 text-sm">
        {level.details.map((d) => (
          <li key={d} className="flex gap-2">
            <span>⚡</span> {d}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm text-ink/70">{level.format}</p>

      <div className="mt-auto flex flex-col gap-3 pt-6">
        {bookable ? (
          <>
            <PayPalPay serviceId={level.serviceId} amount={level.price} />
            <ComicButton href="/rendez-vous" variant="outline" className="w-full">
              <span className="whitespace-nowrap">Réserver une date</span>
            </ComicButton>
          </>
        ) : (
          <ComicButton href="/contact" className="w-full">
            Être informé·e de l&apos;ouverture
          </ComicButton>
        )}
      </div>

      {bookable && (
        <p className="mt-4 text-xs text-ink/60">
          Un échange préalable est prévu avant toute inscription — on vérifie ensemble que la
          formation vous correspond.
        </p>
      )}
    </Bubble>
  );
}

export default function FormationPage() {
  return (
    <div className="pb-12 pt-4 md:pt-6">
      <JsonLd
        data={[
          ...courseJsonLd(),
          formationFaqPageJsonLd(),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Formations magnétisme", path: "/formation" },
          ]),
        ]}
      />

      <PageBanner
        title="Formations magnétisme"
        subtitle="Deux niveaux pour apprendre à magnétiser — sans prérequis"
        imageSrc={images.energieNature}
        imageAlt="Énergie en pleine nature — formation magnétisme à Longwy"
      />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* ── Intro centrée ── */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-ink/80">{niveau1.promise}</p>
          <p className="mt-4 leading-relaxed text-ink/75">{niveau1.description}</p>

          <Bubble variant="aura" className="mt-6" tail="none">
            <p className="text-sm leading-relaxed text-ink/80">
              <strong>La formation existe en deux niveaux.</strong> Le{" "}
              <strong>Niveau 1</strong> est un format court de 2 h pour poser les bases ; le{" "}
              <strong>Niveau 2</strong>, plus complet, approfondit la pratique (ouverture à
              venir).
            </p>
          </Bubble>
        </div>

        {/* ── Les deux offres côte à côte ── */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <OffreCard level={formations[0]} highlight />
          <OffreCard level={formations[1]} />
        </div>

        {/* ── À qui ça s'adresse ── */}
        <section className="mt-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">
            À qui s&apos;adresse le Niveau 1&nbsp;?
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {niveau1.forWhom.map((p, i) => (
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
            Ce que vous saurez faire après le Niveau 1
          </h2>
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <Bubble variant="gold" tail="bottom-left">
              <ul className="space-y-3">
                {niveau1.outcomes.map((o) => (
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

        {/* ── Programme (vidéos de l'espace membre) ── */}
        <section className="mt-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">Le programme du Niveau 1</h2>
          <p className="mt-3 text-ink/70">
            De courtes vidéos qui s&apos;enchaînent, accessibles dans l&apos;espace membre après
            l&apos;inscription — à revoir autant de fois que vous le souhaitez.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {niveau1.lessons.map((lesson, i) => (
              <div
                key={lesson.id}
                className="flex items-start gap-4 rounded-2xl bg-white p-5 comic-border"
              >
                <span className="font-[family-name:var(--font-hand)] text-2xl text-aura-600">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold">{lesson.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/75">{lesson.summary}</p>
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
            {formationShared.flow.map((step, i) => (
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
              {formationShared.why.map((w) => (
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

        {/* ── Inscription + accès membre ── */}
        <section className="mt-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">
            S&apos;inscrire à la formation
          </h2>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div id="inscription" className="scroll-mt-24 space-y-6">
              <OffreCard level={formations[0]} highlight />
              <OffreCard level={formations[1]} />
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl">
                Déjà inscrit·e&nbsp;?
              </h3>
              <p className="mt-2 text-sm text-ink/70">
                Accédez à votre espace membre avec le mot de passe reçu par e-mail pour votre
                niveau.
              </p>
              <div className="mt-4">
                <FormationLogin />
              </div>
              <p className="mt-3 text-xs text-ink/55">
                <Link href="/formation/espace" className="text-aura-600 underline">
                  Déjà connecté·e ? Aller à mon espace →
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
