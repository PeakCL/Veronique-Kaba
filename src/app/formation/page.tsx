import type { Metadata } from "next";
import { formation, formationModules, services } from "@/lib/content";
import { images } from "@/lib/images";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";
import { PageBanner } from "@/components/sections/PageBanner";
import { FormationLogin } from "@/components/formation/FormationLogin";
import { PayPalPay } from "@/components/payment/PayPalPayLazy";

export const metadata: Metadata = {
  title: "Formation Magnétisme 2.0",
  description:
    "Apprenez à ressentir votre magnétisme et à pratiquer des soins énergétiques. Formation accessible, en présentiel ou à distance.",
};

const bookableFormation = services.find((s) => s.id === "formation")!;

export default function FormationPage() {
  return (
    <div className="pb-12 pt-4 md:pt-6">
      <PageBanner
        title={formation.title}
        subtitle="Une formation mise en avant — accessible et concrète"
        imageSrc={images.mainsEnergie}
        imageAlt="Illustration mains et énergie dorée — formation"
      />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-lg text-ink/80">{formation.description}</p>

            <Bubble variant="gold" className="mt-8 ring-2 ring-gold-300/50" tail="bottom-left">
              <p className="font-[family-name:var(--font-hand)] text-xl">« {formation.quote} »</p>
              <ul className="mt-4 space-y-2 text-sm">
                {formation.details.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span>⚡</span> {d}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ink/70">{formation.mode}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="font-[family-name:var(--font-display)] text-4xl text-aura-600">
                  {formation.price} €
                </span>
                <span className="text-sm">· {formation.duration}</span>
              </div>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <PayPalPay serviceId="formation" amount={bookableFormation.price} />
                <ComicButton href="/rendez-vous" variant="outline">
                  Réserver une date
                </ComicButton>
              </div>
            </Bubble>
          </div>

          <div>
            <h2 className="mb-4 font-[family-name:var(--font-display)] text-2xl">
              Programme (aperçu)
            </h2>
            <div className="space-y-4">
              {formationModules.map((m) => (
                <div
                  key={m.id}
                  className="flex items-start gap-4 rounded-2xl bg-white p-4 comic-border opacity-90"
                >
                  <span className="text-2xl">{m.locked ? "🔒" : "📖"}</span>
                  <div>
                    <p className="font-bold">{m.title}</p>
                    <p className="text-xs text-ink/60">{m.duration}</p>
                    <p className="mt-1 text-sm text-ink/70">{m.summary}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <FormationLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
