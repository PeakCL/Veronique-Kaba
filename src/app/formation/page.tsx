import type { Metadata } from "next";
import Link from "next/link";
import {
  UserRound,
  Clock,
  MonitorSmartphone,
  PlayCircle,
  Check,
  ArrowRight,
  Phone,
} from "lucide-react";
import {
  formations,
  formationShared,
  formationFaqs,
  site,
  type Formation,
} from "@/lib/content";
import { images } from "@/lib/images";
import { ComicButton } from "@/components/ui/ComicButton";
import { VeroAvatar } from "@/components/ui/VeroAvatar";
import { PageBanner } from "@/components/sections/PageBanner";
import { PayPalPay } from "@/components/payment/PayPalPayLazy";
import { JsonLd } from "@/components/seo/JsonLd";
import { courseJsonLd, formationFaqPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Formations magnétisme à Longwy & à distance — Niveau 1 & 2",
  description:
    "Apprenez à ressentir votre magnétisme et à dérouler un soin énergétique. Formation Niveau 1 (format court de 2 h) et Niveau 2 à venir — en présentiel à Longwy ou à distance en visio.",
  alternates: { canonical: "/formation" },
};

const [niveau1, niveau2] = formations;

const keyFacts = [
  { icon: Clock, label: `${niveau1.duration} pour démarrer` },
  { icon: MonitorSmartphone, label: "En visio ou en présentiel" },
  { icon: PlayCircle, label: "Vidéos à revoir en ligne" },
];

/** Titre de section : même traitement partout, aligné à gauche. */
function SectionTitle({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="max-w-2xl">
      <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">{title}</h2>
      {intro && <p className="mt-3 leading-relaxed text-ink/70">{intro}</p>}
    </div>
  );
}

/** Carte d'un niveau : ce que c'est, pour combien, et une seule action. */
function LevelCard({ level, badge }: { level: Formation; badge: string }) {
  const open = level.price > 0;
  return (
    <div
      className={
        "relative flex h-full flex-col rounded-3xl p-7 comic-border-lg " +
        (open ? "bg-gold-100" : "bg-[#fffdf6]")
      }
    >
      <span className="absolute -top-4 left-7 rounded-full bg-ink px-3 py-1 text-sm font-bold text-cream">
        {badge}
      </span>

      <p className="text-3xl" aria-hidden>
        {level.emoji}
      </p>
      <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl">{level.title}</h3>
      <p className="font-[family-name:var(--font-hand)] text-xl text-aura-600">{level.tagline}</p>

      <p className="mt-5">
        {open ? (
          <>
            <span className="font-[family-name:var(--font-display)] text-5xl text-aura-600">
              {level.price} €
            </span>
            <span className="ml-2 text-ink/60">pour {level.duration}</span>
          </>
        ) : (
          <span className="inline-block rounded-full bg-aura-100 px-3 py-1 text-sm font-bold text-aura-700">
            Ouverture prochaine
          </span>
        )}
      </p>

      <ul className="mt-5 space-y-2 text-sm leading-relaxed">
        {level.details.map((d) => (
          <li key={d} className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-aura-600" aria-hidden />
            {d}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-ink/60">Prérequis : {level.prerequisites}</p>

      <div className="mt-auto pt-6">
        {open ? (
          <ComicButton href="#inscription" className="w-full">
            S&apos;inscrire au {level.shortTitle}
          </ComicButton>
        ) : (
          <ComicButton href="/contact" variant="outline" className="w-full">
            Être prévenu·e de l&apos;ouverture
          </ComicButton>
        )}
      </div>
    </div>
  );
}

export default function FormationPage() {
  return (
    <div className="pb-16 pt-4 md:pt-6">
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
        {/* ── 1. Intro : l'essentiel en un coup d'œil ── */}
        <section className="mx-auto max-w-3xl text-center">
          <p className="font-[family-name:var(--font-hand)] text-3xl leading-snug text-aura-600 md:text-4xl">
            « {formationShared.quote} »
          </p>
          <p className="mt-5 text-lg leading-relaxed text-ink/80">{niveau1.description}</p>

          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {keyFacts.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold comic-border"
              >
                <Icon className="h-4 w-4 text-aura-600" aria-hidden />
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <ComicButton href="#niveaux" size="lg">
              Découvrir les niveaux
            </ComicButton>
            <Link
              href="/formation/espace"
              className="inline-flex items-center gap-1.5 font-semibold text-aura-700 hover:underline"
            >
              <UserRound className="h-4 w-4" aria-hidden />
              Déjà inscrit·e ? Mon espace élève
            </Link>
          </div>
        </section>

        {/* ── 2. Les deux niveaux ── */}
        <section id="niveaux" className="mt-24 scroll-mt-24">
          <SectionTitle
            title="Deux niveaux pour progresser"
            intro="On commence toujours par le Niveau 1 pour poser les bases. Le Niveau 2 prolongera la pratique pour celles et ceux qui veulent aller plus loin."
          />
          <div className="relative mt-12 grid gap-10 md:grid-cols-2 md:gap-8">
            <LevelCard level={niveau1} badge="Pour commencer" />
            <LevelCard level={niveau2} badge="Pour aller plus loin" />
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white comic-border md:flex"
            >
              <ArrowRight className="h-5 w-5 text-aura-600" />
            </span>
          </div>
        </section>

        {/* ── 3. Le Niveau 1 en détail ── */}
        <section className="mt-24">
          <SectionTitle
            title={`Le ${niveau1.shortTitle} en détail`}
            intro={niveau1.promise}
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl">Pour qui&nbsp;?</h3>
              <ul className="mt-5 divide-y-2 divide-ink/10">
                {niveau1.forWhom.map((p) => (
                  <li key={p.title} className="flex gap-4 py-4 first:pt-0">
                    <span className="text-2xl" aria-hidden>
                      {p.emoji}
                    </span>
                    <div>
                      <p className="font-bold">{p.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink/70">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl">
                Ensuite, vous saurez
              </h3>
              <ul className="mt-5 space-y-4">
                {niveau1.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 leading-relaxed">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-aura-600 text-white">
                      <Check className="h-3 w-3" aria-hidden />
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Programme — présenté comme une planche de BD : une case par étape */}
          <div className="mt-16">
            <h3 className="font-[family-name:var(--font-display)] text-2xl">Au programme</h3>
            <p className="mt-1 text-ink/70">
              Chaque étape existe aussi en courte vidéo dans votre espace élève, à revoir quand
              vous voulez.
            </p>
            <ol className="mt-6 grid gap-2 rounded-2xl bg-outline p-2 shadow-[6px_6px_0_var(--color-outline)] sm:grid-cols-2 lg:grid-cols-5">
              {niveau1.lessons.map((lesson, i) => (
                <li
                  key={lesson.id}
                  className={
                    "relative rounded-lg p-4 pt-12 lg:min-h-44 " +
                    (i % 2 === 0 ? "bg-cream" : "bg-gold-100") +
                    (i === niveau1.lessons.length - 1 ? " sm:col-span-2 lg:col-span-1" : "")
                  }
                >
                  {/* Cartouche de case, comme en BD */}
                  <span className="absolute left-0 top-0 rounded-br-lg border-b-[2.5px] border-r-[2.5px] border-outline bg-white px-3 py-1 font-[family-name:var(--font-display)] text-lg">
                    {i + 1}
                  </span>
                  <p className="font-[family-name:var(--font-hand)] text-2xl leading-tight text-ink">
                    {lesson.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{lesson.summary}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── 4. Inscription : un seul endroit, trois étapes ── */}
        <section
          id="inscription"
          className="mt-24 scroll-mt-24 rounded-[2rem] bg-gold-100 px-5 py-12 comic-border-lg md:px-10"
        >
          <SectionTitle
            title="Comment s'inscrire ?"
            intro="Trois étapes, sans engagement tant que nous ne nous sommes pas parlé."
          />

          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {formationShared.flow.map((step, i) => (
              <li key={step.title} className="relative">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-aura-600 font-[family-name:var(--font-display)] text-lg text-white comic-border">
                  {i + 1}
                </span>
                <p className="mt-4 font-bold">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{step.text}</p>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-10 max-w-xl rounded-3xl bg-white p-7 text-center comic-border">
            <p className="font-bold">
              {niveau1.emoji} {niveau1.title}
            </p>
            <p className="mt-2">
              <span className="font-[family-name:var(--font-display)] text-5xl text-aura-600">
                {niveau1.price} €
              </span>
              <span className="ml-2 text-ink/60">pour {niveau1.duration}</span>
            </p>
            <p className="mt-1 text-sm text-ink/60">{niveau1.format}</p>

            <div className="mt-6 flex flex-col gap-3 text-left">
              <PayPalPay serviceId={niveau1.serviceId} amount={niveau1.price} />
              <ComicButton href="/rendez-vous" variant="outline" className="w-full">
                Choisir une date
              </ComicButton>
            </div>
            <p className="mt-4 text-xs text-ink/60">
              Une question avant de vous inscrire ?{" "}
              <a href={site.phoneHref} className="inline-flex items-center gap-1 font-semibold text-aura-700 hover:underline">
                <Phone className="h-3 w-3" aria-hidden /> {site.phone}
              </a>
            </p>
          </div>
        </section>

        {/* ── 5. Pourquoi se former avec moi ── */}
        <section className="mt-24 grid items-center gap-10 lg:grid-cols-[auto_1fr]">
          <VeroAvatar pose="confiante" size="md" className="mx-auto" />
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
              Pourquoi se former avec moi&nbsp;?
            </h2>
            <ul className="mt-6 space-y-3">
              {formationShared.why.map((w) => (
                <li key={w} className="flex items-start gap-2 leading-relaxed">
                  <span className="accent-star">★</span>
                  {w}
                </li>
              ))}
            </ul>
            <Link
              href="/apropos"
              className="mt-6 inline-flex items-center gap-1 font-semibold text-aura-600 hover:underline"
            >
              En savoir plus sur mon parcours
            </Link>
          </div>
        </section>

        {/* ── 6. FAQ ── */}
        <section className="mt-24 max-w-3xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
            Questions fréquentes
          </h2>
          <div className="mt-10 space-y-3">
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

        {/* ── 7. Accès élèves ── */}
        <div className="mt-16 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-3xl bg-aura-100 p-6 text-center comic-border sm:flex-row sm:text-left">
          <div>
            <p className="font-bold">Déjà inscrit·e&nbsp;?</p>
            <p className="text-sm text-ink/70">
              Retrouvez vos vidéos avec le mot de passe transmis par Véronique à l&apos;inscription.
            </p>
          </div>
          <ComicButton href="/formation/espace" className="shrink-0">
            <UserRound className="h-5 w-5" aria-hidden />
            Mon espace élève
          </ComicButton>
        </div>
      </div>
    </div>
  );
}
