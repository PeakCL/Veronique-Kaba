import type { Metadata } from "next";
import { MessageCircle, Phone, Clock, MapPin, Video } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { sessionInfo, site } from "@/lib/content";
import { Bubble } from "@/components/ui/Bubble";
import { BookingForm } from "@/components/booking/BookingForm";
import { OnlineScheduler } from "@/components/booking/OnlineScheduler";

export const metadata: Metadata = {
  title: "Prendre rendez-vous — Soin de magnétisme à Longwy ou en visio",
  description:
    "Réservez votre séance de magnétisme ou de soin énergétique avec Véronique : par téléphone, WhatsApp ou formulaire. En présentiel autour de Longwy ou à distance en visio. 40 min, 60 €.",
  alternates: { canonical: "/rendez-vous" },
};

const JOURS_FR: Record<string, string> = {
  Monday: "lundi",
  Tuesday: "mardi",
  Wednesday: "mercredi",
  Thursday: "jeudi",
  Friday: "vendredi",
  Saturday: "samedi",
  Sunday: "dimanche",
};

const plageJours = (days: readonly string[]) =>
  days.length > 1
    ? `${JOURS_FR[days[0]]} – ${JOURS_FR[days[days.length - 1]]}`
    : JOURS_FR[days[0]];

export default function RendezVousPage() {
  return (
    <div className="px-4 py-12 md:px-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Prendre rendez-vous", path: "/rendez-vous" },
        ])}
      />

      <div className="mx-auto max-w-5xl">
        <Bubble variant="aura" className="mb-10 text-center" tail="none">
          <h1 className="font-[family-name:var(--font-display)] text-5xl">
            Prendre rendez-vous
          </h1>
          <p className="mt-3 text-ink/70">
            Séance de soin · {sessionInfo.duration} · {sessionInfo.price} € — présentiel
            (15 km autour de Longwy) ou visio
          </p>
          <p className="mt-2 text-sm text-ink/60">
            Pour la formation ou le recouvrement d&apos;âme, un échange préalable est prévu.
          </p>
        </Bubble>

        {/* ── Contact direct ── */}
        <div className="grid gap-6 md:grid-cols-2">
          <Bubble variant="gold" tail="bottom-left">
            <p className="flex items-center gap-2 text-sm font-bold">
              <Phone className="h-4 w-4 text-aura-600" />
              Le plus rapide
            </p>
            <a
              href={site.phoneHref}
              className="mt-2 block font-[family-name:var(--font-display)] text-4xl text-aura-600 hover:underline"
            >
              {site.phone}
            </a>
            <p className="mt-3 text-sm text-ink/70">
              Si je ne réponds pas, je suis en séance — laissez un message, je vous rappelle.
            </p>
          </Bubble>

          <Bubble variant="white" tail="bottom-right">
            <p className="flex items-center gap-2 text-sm font-bold">
              <MessageCircle className="h-4 w-4 text-green-600" />
              Par écrit, tout de suite
            </p>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block font-[family-name:var(--font-display)] text-2xl text-aura-600 hover:underline"
            >
              Écrire sur WhatsApp
            </a>
            <p className="mt-3 text-sm text-ink/70">
              Pratique pour poser une question avant de vous décider.
            </p>
          </Bubble>
        </div>

        {/* ── Agenda en ligne (si configuré) ── */}
        <div className="mt-10">
          <OnlineScheduler />
        </div>

        {/* ── Demande de rendez-vous ── */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <BookingForm />

          <div className="space-y-6">
            <Bubble variant="sky" tail="bottom-right">
              <p className="flex items-center gap-2 text-sm font-bold">
                <Clock className="h-4 w-4 text-aura-600" />
                Horaires
              </p>
              <dl className="mt-3 space-y-1 text-sm">
                {site.openingHours.map((h) => (
                  <div key={h.days.join()} className="flex justify-between gap-4">
                    <dt className="text-ink/70">{plageJours(h.days)}</dt>
                    <dd className="tabular-nums">
                      {h.opens} – {h.closes}
                    </dd>
                  </div>
                ))}
                <div className="flex justify-between gap-4">
                  <dt className="text-ink/70">dimanche</dt>
                  <dd className="text-ink/60">fermé</dd>
                </div>
              </dl>
            </Bubble>

            <Bubble variant="white" tail="bottom-left">
              <p className="flex items-start gap-2 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-aura-600" />
                <span className="text-ink/75">{site.locationDetail}</span>
              </p>
              <p className="mt-3 flex items-start gap-2 text-sm">
                <Video className="mt-0.5 h-4 w-4 shrink-0 text-aura-600" />
                <span className="text-ink/75">
                  Le soin à distance repose sur les mêmes principes qu&apos;en présentiel —
                  l&apos;énergie n&apos;est pas limitée par la distance.
                </span>
              </p>
            </Bubble>
          </div>
        </div>
      </div>
    </div>
  );
}
