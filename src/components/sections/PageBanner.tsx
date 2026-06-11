import Image from "next/image";
import { cn } from "@/lib/utils";

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
  return (
    <div
      className={cn(
        "relative mx-4 mb-10 overflow-hidden rounded-3xl comic-border-lg md:mx-6",
        className,
      )}
    >
      <div className="relative aspect-[21/9] min-h-[200px] md:min-h-[260px]">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/65 via-aura-900/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-cream">
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold drop-shadow-sm md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 max-w-xl font-[family-name:var(--font-hand)] text-xl text-gold-200 md:text-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
