"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, CalendarHeart } from "lucide-react";
import { site } from "@/lib/content";

/**
 * Barre d'action fixe en bas d'écran — mobile/tablette uniquement (cachée en lg).
 * Deux gestes à un pouce : appeler tout de suite, ou aller réserver.
 * Masquée sur /rendez-vous où ces actions sont déjà l'objet de la page.
 */
export function MobileCTABar() {
  const pathname = usePathname();
  if (pathname === "/rendez-vous") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="mx-3 mb-3 flex gap-2 rounded-2xl bg-cream/95 p-2 shadow-lg backdrop-blur comic-border">
        <a
          href={site.phoneHref}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/90 py-3 font-semibold text-ink comic-border"
        >
          <Phone className="h-4 w-4 text-aura-600" />
          Appeler
        </a>
        <Link
          href="/rendez-vous"
          className="flex flex-[1.3] items-center justify-center gap-2 rounded-xl bg-aura-500 py-3 font-semibold text-white comic-border"
        >
          <CalendarHeart className="h-4 w-4" />
          Réserver
        </Link>
      </div>
    </div>
  );
}
