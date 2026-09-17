"use client";

import { motion } from "framer-motion";
import { Facebook } from "lucide-react";
import { site } from "@/lib/content";

/**
 * Feed Facebook — affiche les dernières publications de la page via le
 * « Page Plugin » officiel de Facebook (iframe, aucun script tiers). C'est
 * l'équivalent gratuit d'un widget type Elfsight.
 *
 * ⚠️ Le Page Plugin ne fonctionne qu'avec une **Page** Facebook, pas un profil
 * personnel. La page est lue depuis `NEXT_PUBLIC_FACEBOOK_PAGE_URL` si définie,
 * sinon depuis `site.social.facebook`.
 */
export function FacebookFeed() {
  const pageUrl =
    process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL?.trim() || site.social.facebook;

  const src =
    "https://www.facebook.com/plugins/page.php?" +
    new URLSearchParams({
      href: pageUrl,
      tabs: "timeline",
      width: "500",
      height: "600",
      small_header: "false",
      adapt_container_width: "true",
      hide_cover: "false",
      show_facepile: "true",
    }).toString();

  return (
    <motion.section
      className="mx-4 mb-16 md:mx-6"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-6xl rounded-3xl bg-[#fffdf6] p-8 comic-border-lg">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 comic-border">
            <Facebook className="h-5 w-5 text-sky-600" />
          </span>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-ink">
              Sur Facebook
            </h2>
            <p className="text-sm text-ink/65">
              Les dernières publications de Véronique
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <iframe
            src={src}
            title="Publications Facebook de Véronique Kaba"
            loading="lazy"
            scrolling="no"
            className="w-full max-w-[500px] rounded-2xl border-0"
            style={{ height: 600 }}
            allow="encrypted-media"
          />
        </div>
      </div>
    </motion.section>
  );
}
