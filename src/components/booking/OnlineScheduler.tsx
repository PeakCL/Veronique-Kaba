"use client";

import { CalendarClock } from "lucide-react";
import { Bubble } from "@/components/ui/Bubble";

/**
 * Outil de prise de rendez-vous en ligne.
 *
 * Affiche un agenda de réservation (Calendly, Cal.com ou équivalent) embarqué
 * dès que `NEXT_PUBLIC_BOOKING_URL` est renseignée. Tant que la variable est
 * vide, le composant ne rend rien : la page /rendez-vous retombe alors sur le
 * formulaire de demande + téléphone/WhatsApp.
 *
 * L'iframe fonctionne aussi bien avec un lien Calendly
 * (https://calendly.com/veronique/…) qu'avec un lien Cal.com
 * (https://cal.com/veronique/…) : aucun script tiers à charger.
 */
export function OnlineScheduler() {
  const url = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
  if (!url) return null;

  return (
    <Bubble variant="white" tail="none" className="overflow-hidden p-3 md:p-4">
      <p className="mb-3 flex items-center gap-2 px-2 pt-2 text-sm font-bold">
        <CalendarClock className="h-4 w-4 text-aura-600" />
        Choisissez directement votre créneau
      </p>
      <iframe
        src={url}
        title="Prise de rendez-vous en ligne"
        loading="lazy"
        className="h-[720px] w-full rounded-2xl border-0 bg-cream"
      />
    </Bubble>
  );
}
