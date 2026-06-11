import { ArrowRight } from "lucide-react";
import { formation, sessionInfo, soulRetrieval } from "@/lib/content";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";

const highlights = [
  {
    href: "/soins",
    emoji: "✨",
    title: "Soins personnalisés",
    description:
      "Magnétisme, soin énergétique et coupe de feu — une seule séance adaptée à vos besoins du jour.",
    badge: `${sessionInfo.price} € · ${sessionInfo.duration}`,
    variant: "aura" as const,
    tail: "bottom-left" as const,
  },
  {
    href: "/recouvrement-ame",
    emoji: soulRetrieval.emoji,
    title: soulRetrieval.title,
    description: soulRetrieval.description.slice(0, 120) + "…",
    badge: "Nouveau",
    variant: "sky" as const,
    tail: "none" as const,
  },
  {
    href: "/formation",
    emoji: formation.emoji,
    title: formation.title,
    description: formation.description.slice(0, 120) + "…",
    badge: `${formation.price} € · ${formation.duration}`,
    variant: "gold" as const,
    tail: "bottom-right" as const,
  },
];

export function ServicesPreview() {
  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-ink md:text-5xl">
            Mes accompagnements
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink/70">
            Des soins sur mesure, une formation pour apprendre à magnétiser, et le recouvrement
            d&apos;âme au tambour.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {highlights.map((item) => (
            <Bubble
              key={item.href}
              variant={item.variant}
              tail={item.tail}
              className="flex flex-col"
            >
              <span className="text-4xl">{item.emoji}</span>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm text-ink/75">{item.description}</p>
              <span
                className={`mt-4 inline-block w-fit rounded-full px-3 py-1 text-xs font-bold comic-border ${
                  item.variant === "gold"
                    ? "bg-gold-100 text-gold-700"
                    : "bg-white/80"
                }`}
              >
                {item.badge}
              </span>
              <ComicButton href={item.href} variant="outline" size="sm" className="mt-4 w-fit">
                En savoir plus
              </ComicButton>
            </Bubble>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <ComicButton href="/rendez-vous">
            Prendre rendez-vous <ArrowRight className="h-4 w-4" />
          </ComicButton>
        </div>
      </div>
    </section>
  );
}
