import type { Metadata } from "next";
import { testimonials } from "@/lib/content";
import { images } from "@/lib/images";
import { Bubble } from "@/components/ui/Bubble";
import { PageBanner } from "@/components/sections/PageBanner";

export const metadata: Metadata = {
  title: "Témoignages",
};

function Stars({ count }: { count: number }) {
  return (
    <span className="accent-star" aria-label={`${count} étoiles`}>
      {"★".repeat(count)}
    </span>
  );
}

export default function TemoignagesPage() {
  return (
    <div className="pb-12 pt-4 md:pt-6">
      <PageBanner
        title="Témoignages"
        subtitle="Des voix qui ont retrouvé leur éclat ✨"
        imageSrc={images.meditationPapillons}
        imageAlt="Nature et sérénité — témoignages"
      />

      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Bubble
              key={t.name}
              variant={i % 2 === 0 ? "white" : "gold"}
              tail="bottom-left"
            >
              <Stars count={t.stars} />
              <p className="mt-4 font-[family-name:var(--font-hand)] text-xl leading-relaxed">
                « {t.text} »
              </p>
              <p className="mt-4 font-bold text-aura-600">— {t.name}</p>
            </Bubble>
          ))}
        </div>

        <Bubble variant="aura" className="mt-12 text-center" tail="none">
          <p className="font-[family-name:var(--font-hand)] text-2xl">
            Et vous, quelle sera votre bulle de témoignage ? 💫
          </p>
        </Bubble>
      </div>
    </div>
  );
}
