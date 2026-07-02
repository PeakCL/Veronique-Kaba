/**
 * VeroAvatar — Illustration BD de Véronique, flottante sans cadre
 *
 * Utilisation :
 *   <VeroAvatar pose="salut" size="lg" />
 *   <VeroAvatar pose="meditation" size="md" glow />
 *
 * Poses disponibles :
 *   salut      → plein corps, main levée, sourire (hero)
 *   confiante  → buste, bras croisés, sourire (about)
 *   reflechit  → buste, menton dans la main (services, FAQ)
 *   meditation → plein corps, lotus (soins, recouvrement d'âme)
 *   debout     → plein corps, debout pensif (formation, contact)
 */

import Image from "next/image";
import { cn } from "@/lib/utils";
import { veroAvatars } from "@/lib/images";

type Pose = keyof typeof veroAvatars;

const poseMeta: Record<Pose, { alt: string; width: number; height: number; aspect: string }> = {
  salut:      { alt: "Véronique accueille chaleureusement",          width: 480, height: 620, aspect: "aspect-[480/620]" },
  confiante:  { alt: "Véronique confiante, bras croisés",            width: 380, height: 440, aspect: "aspect-[380/440]" },
  reflechit:  { alt: "Véronique en réflexion, menton dans la main",  width: 360, height: 400, aspect: "aspect-[360/400]" },
  meditation: { alt: "Véronique en méditation, posture lotus",        width: 440, height: 500, aspect: "aspect-[440/500]" },
  debout:     { alt: "Véronique debout, pensif",                      width: 340, height: 560, aspect: "aspect-[340/560]" },
};

const sizes = {
  sm:  { maxH: "max-h-[240px]", halo: "h-[160px] w-[160px]" },
  md:  { maxH: "max-h-[360px]", halo: "h-[240px] w-[240px]" },
  lg:  { maxH: "max-h-[520px]", halo: "h-[340px] w-[340px]" },
  xl:  { maxH: "max-h-[680px]", halo: "h-[440px] w-[440px]" },
};

type VeroAvatarProps = {
  pose?: Pose;
  size?: keyof typeof sizes;
  glow?: boolean;
  halo?: boolean;
  className?: string;
  priority?: boolean;
};

export function VeroAvatar({
  pose = "salut",
  size = "lg",
  glow = true,
  halo = true,
  className,
  priority = false,
}: VeroAvatarProps) {
  const meta = poseMeta[pose];
  const sz   = sizes[size];

  return (
    <div className={cn("relative flex justify-center", className)}>
      {/* Halo doré — dégradé radial au sol */}
      {halo && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full vero-halo",
            sz.halo,
          )}
        />
      )}

      {/* Points halftone BD */}
      {halo && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full halftone-gold",
            sz.halo,
          )}
        />
      )}

      {/* L'illustration — fond transparent, aucun cadre */}
      <Image
        src={veroAvatars[pose]}
        alt={meta.alt}
        width={meta.width}
        height={meta.height}
        priority={priority}
        className={cn(
          "relative z-10 w-auto object-contain",
          sz.maxH,
          glow && "vero-bd",
        )}
      />
    </div>
  );
}
