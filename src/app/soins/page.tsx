import type { Metadata } from "next";
import {
  careMetaphors,
  careTypes,
  clientele,
  sessionInfo,
  services,
  site,
} from "@/lib/content";
import { images } from "@/lib/images";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";
import { PageBanner } from "@/components/sections/PageBanner";
import { PayPalPay } from "@/components/payment/PayPalPayLazy";

export const metadata: Metadata = {
  title: "Soins — Magnétisme, énergie & coupe de feu",
  description:
    "Séances personnalisées en magnétisme, soin énergétique et coupe de feu. 40 min, 60 €. Présentiel (15 km Longwy) ou à distance.",
};

const bookableSoin = services.find((s) => s.id === "soin")!;

export default function SoinsPage() {
  return (
    <div className="pb-12 pt-4 md:pt-6">
      <PageBanner
        title="Mes soins"
        subtitle={`Magnétisme · Soin énergétique · Coupe de feu — ${sessionInfo.duration}`}
        imageSrc={images.mainsAmpoule}
        imageAlt="Mains et lumière dorée — soins énergétiques"
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

        <div className="space-y-10">
          {careTypes.map((care, i) => (
            <Bubble
              key={care.id}
              variant={i % 2 === 0 ? "white" : "aura"}
              tail={i % 2 === 0 ? "bottom-left" : "bottom-right"}
            >
              <span className="text-5xl">{care.emoji}</span>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl">{care.title}</h2>
              <p className="mt-3 text-ink/80">{care.description}</p>
              <p className="mt-4 text-sm font-bold text-ink/70">Souvent consulté pour :</p>
              <ul className="mt-2 space-y-2">
                {care.forWho.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="text-aura-500">◆</span>
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

        <p className="mt-8 text-center text-sm text-ink/60">
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
