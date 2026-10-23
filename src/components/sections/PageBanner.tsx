import { preload } from "react-dom";
import { cn } from "@/lib/utils";
import { getBlur } from "@/lib/blur";

type PageBannerProps = {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
};

/** Largeurs pré-générées par scripts/banners.mjs dans /images/banners. */
const BANNER_WIDTHS = [800, 1200, 1600];
const SIZES = "(min-width: 1280px) 1216px, 100vw";

const bannerSrcSet = (src: string) => {
  const name = src.split("/").pop()!.replace(/\.\w+$/, "");
  return BANNER_WIDTHS.map((w) => `/images/banners/${name}-${w}.webp ${w}w`).join(", ");
};

export function PageBanner({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  className,
}: PageBannerProps) {
  const blurDataURL = getBlur(imageSrc);
  const srcSet = bannerSrcSet(imageSrc);
  // Fichiers statiques servis directement par le CDN (pas d'optimiseur à la
  // volée) et préchargés en priorité : la photo arrive avec la page.
  preload(srcSet.split(" ")[0], {
    as: "image",
    imageSrcSet: srcSet,
    imageSizes: SIZES,
    fetchPriority: "high",
  });

  return (
    <div
      className={cn(
        "anim-reveal relative mx-4 mb-10 mt-4 overflow-hidden rounded-md comic-border-lg md:mx-6",
        className,
      )}
    >
      <div
        className="relative h-[320px] w-full bg-cover bg-center md:h-[440px] lg:h-[520px]"
        style={{
          backgroundColor: "#29461f",
          ...(blurDataURL && { backgroundImage: `url(${blurDataURL})` }),
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- variantes statiques pré-générées */}
        <img
          src={srcSet.split(" ")[0]}
          srcSet={srcSet}
          sizes={SIZES}
          alt={imageAlt}
          fetchPriority="high"
          decoding="async"
          className="bd-photo absolute inset-0 h-full w-full object-cover"
        />
        <div className="bd-trame absolute inset-0" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-aura-900/70 via-aura-900/25 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-8 text-center text-white">
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold [text-shadow:3px_3px_0_#18231d] md:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="recitatif mt-4 max-w-xl -rotate-1 text-base md:text-lg">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
