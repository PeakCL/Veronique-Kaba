import { Facebook, Instagram } from "lucide-react";
import { site } from "@/lib/content";

export function SocialStrip() {
  return (
    <section className="mx-4 mb-16 md:mx-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-3xl bg-gradient-to-r from-aura-100 via-sky-100 to-aura-50 p-8 comic-border-lg md:flex-row">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl">Suivez l&apos;aventure</p>
          <p className="text-sm text-ink/70">Conseils, témoignages et coulisses de l&apos;énergie dorée</p>
        </div>
        <div className="flex gap-4">
          <a
            href={site.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-white px-5 py-3 font-bold comic-border hover:bg-sky-50"
          >
            <Facebook className="h-5 w-5" />
            Facebook
          </a>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full brand-gradient px-5 py-3 font-bold text-white comic-border hover:opacity-90"
          >
            <Instagram className="h-5 w-5" />
            @vero.kaba
          </a>
        </div>
      </div>
    </section>
  );
}
