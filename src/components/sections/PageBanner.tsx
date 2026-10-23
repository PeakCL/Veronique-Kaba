import Image from "next/image";
import { cn } from "@/lib/utils";
import { getBlur } from "@/lib/blur";
import { TreeLine } from "@/components/decor/Nature";

type PageBannerProps = {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
};

export function PageBanner({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  className,
}: PageBannerProps) {
  const blurDataURL = getBlur(imageSrc);

  return (
    <div
      className={cn(
        "anim-reveal relative mx-4 mb-10 mt-4 overflow-hidden rounded-md comic-border-lg md:mx-6",
        className,
      )}
    >
      <div
        className="relative h-[220px] w-full md:h-[300px] lg:h-[340px]"
        style={{ background: "linear-gradient(135deg, #29461f 0%, #163c42 100%)" }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="bd-photo object-cover"
          sizes="(min-width: 1280px) 1216px, 100vw"
          quality={70}
          priority
          {...(blurDataURL ? { placeholder: "blur" as const, blurDataURL } : {})}
        />
        <div className="bd-trame absolute inset-0" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-aura-900/70 via-aura-900/25 to-transparent" />
        {/* Lisière de forêt au pied de la case */}
        <TreeLine className="absolute inset-x-0 bottom-0 h-[clamp(3rem,9vw,7rem)]" back="#437031" front="#1d3317" seed={5} />
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
