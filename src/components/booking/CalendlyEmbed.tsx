"use client";

import Script from "next/script";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";
import { site } from "@/lib/content";

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

export function CalendlyEmbed() {
  if (!calendlyUrl || calendlyUrl.includes("votre-compte")) {
    // Repli visiteur : aucune mention technique ne doit apparaître en production.
    return (
      <Bubble variant="white" tail="none">
        <div className="rounded-2xl border-4 border-dashed border-sky-300 bg-sky-50 p-12 text-center">
          <p className="text-6xl">📅</p>
          <p className="mt-4 font-[family-name:var(--font-display)] text-2xl">
            Réserver votre séance
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink/70">
            Le plus simple : un appel ou un message. Je vous réponds rapidement et nous
            convenons ensemble du créneau qui vous convient — en présentiel autour de Longwy
            ou à distance en visio.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ComicButton href={site.phoneHref}>Appeler maintenant</ComicButton>
            <ComicButton href="/contact" variant="outline">
              Envoyer un message
            </ComicButton>
          </div>
        </div>
      </Bubble>
    );
  }

  return (
    <Bubble variant="white" tail="none" animate={false}>
      <div
        className="calendly-inline-widget min-h-[700px] w-full overflow-hidden rounded-2xl"
        data-url={`${calendlyUrl}?hide_gdpr_banner=1&primary_color=f59e0b`}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </Bubble>
  );
}
