import type { Metadata } from "next";
import {
  careMetaphors,
  careTypes,
  clientele,
  faqs,
  sessionInfo,
  services,
  site,
} from "@/lib/content";
import { images } from "@/lib/images";
import Image from "next/image";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";
import { PageBanner } from "@/components/sections/PageBanner";
import { PayPalPay } from "@/components/payment/PayPalPayLazy";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceJsonLd, faqPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Soins de magnétisme à Longwy & à distance",
  description:
    "Séances personnalisées de magnétisme, soin énergétique et coupe de feu à Longwy ou en visio. Soulager douleurs, stress et fatigue — 40 min, 60 €.",
  alternates: { canonical: "/soins" },
};

const bookableSoin = services.find((s) => s.id === "soin")!;

export default function SoinsPage() {
  return (
    <div className="pb-12 pt-4 md:pt-6">
      <JsonLd
        data={[
          serviceJsonLd(),
          faqPageJsonLd(),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Soins", path: "/soins" },
          ]),
        ]}
      />
      <PageBanner
        title="Mes soins"
        subtitle={`Magnétisme · Soin énergétique · Coupe de feu — ${sessionInfo.duration}`}
        imageSrc={images.mainsSoin}
        imageAlt="Soin énergétique — mains posées avec bienveillance"
      />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Bubble variant="sky" tail="bottom-left" className="mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Comment se déroule une séance ?</h2>
          <ul className="mt-4 space-y-2 text-ink/80">
            {sessionInfo.flow.map((step) => (
              <li key={step} className="flex items-start gap-2">
                <span className="accent-star">★</span>
                {step}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink/70">{site.locationDetail}</p>
          <p className="mt-4 text-xs italic text-ink/60">{sessionInfo.disclaimer}</p>
        </Bubble>

        {/* Image séance énergétique */}
        <div className="relative mb-10 overflow-hidden rounded-3xl comic-border-lg aspect-[21/9] min-h-[180px]">
          <Image
            src={images.soinEnergie}
            alt="Séance de soin énergétique — personne allongée recevant un soin avec chakras activés"
            fill
            className="object-cover object-center"
            sizes="(min-width: 1280px) 1216px, 100vw"
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-aura-900/20 to-transparent" />
          <p className="absolute bottom-4 left-6 font-[family-name:var(--font-hand)] text-xl text-cream/90">
            Lâcher prise. Se laisser traverser. Retrouver la fluidité.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {careTypes.map((care, i) => (
            <Bubble
              key={care.id}
              variant={i === 1 ? "aura" : "white"}
              tail="none"
              animate={false}
              className="group flex h-full flex-col text-center transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl focus-within:-translate-y-2 focus-within:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span className="mx-auto inline-block text-5xl transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none">
                {care.emoji}
              </span>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl">{care.title}</h2>
              <p className="mt-3 text-sm text-ink/80">{care.description}</p>
              <p className="mt-4 text-sm font-bold text-ink/70">Souvent consulté pour :</p>
              <ul className="mt-2 space-y-2 text-left">
                {care.forWho.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 text-aura-500" aria-hidden>◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Bubble>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {careMetaphors.map((m) => (
            <Bubble key={m.title} variant="white" tail="bottom-right">
              <h3 className="font-[family-name:var(--font-display)] text-xl">{m.title}</h3>
              <p className="mt-2 text-sm text-ink/75">{m.text}</p>
            </Bubble>
          ))}
        </div>

        <Bubble variant="aura" className="mt-10" tail="none">
          <h3 className="font-[family-name:var(--font-display)] text-2xl">Pour qui ?</h3>
          <p className="mt-3 text-ink/80">{clientele.summary}</p>
          <p className="mt-3 text-sm text-ink/75">{clientele.sportifs}</p>
          <p className="mt-3 text-xs text-ink/60">{clientele.repartition}</p>
        </Bubble>

        <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl bg-white/60 p-8 comic-border-lg">
          <p className="font-[family-name:var(--font-display)] text-5xl text-aura-600">
            {sessionInfo.price} €
          </p>
          <p className="text-sm font-semibold">{sessionInfo.duration} · {sessionInfo.modes}</p>
          <div className="flex w-full max-w-xs flex-col gap-2">
            <ComicButton href="/rendez-vous" className="w-full">
              Prendre RDV
            </ComicButton>
            <PayPalPay serviceId={bookableSoin.id} amount={bookableSoin.price} />
          </div>
        </div>

        <section className="mt-16" aria-labelledby="faq-titre">
          <h2
            id="faq-titre"
            className="text-center font-[family-name:var(--font-display)] text-3xl"
          >
            Questions fréquentes
          </h2>
          <div className="mt-8 space-y-4">
            {faqs.map((f) => (
              <details
                key={f.question}
                className="group rounded-2xl bg-white/60 p-5 comic-border"
              >
                <summary className="cursor-pointer list-none font-[family-name:var(--font-display)] text-lg font-medium text-ink marker:content-none">
                  {f.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <p className="mt-12 text-center text-sm text-ink/60">
          Vous cherchez le{" "}
          <a href="/recouvrement-ame" className="font-semibold text-aura-600 underline">
            recouvrement d&apos;âme au tambour
          </a>{" "}
          ? C&apos;est une page dédiée.
        </p>
      </div>
    </div>
  );
}
