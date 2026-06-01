import Image from "next/image";
import { cn } from "@/lib/utils";

type ComicImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  frameClassName?: string;
  aspect?: "square" | "video" | "portrait" | "auto";
};

const aspectClasses = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[4/5]",
  auto: "",
};

export function ComicImage({
  src,
  alt,
  priority = false,
  className,
  frameClassName,
  aspect = "auto",
}: ComicImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl comic-border-lg bg-white",
        aspectClasses[aspect],
        frameClassName,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill={aspect !== "auto"}
        width={aspect === "auto" ? 800 : undefined}
        height={aspect === "auto" ? 600 : undefined}
        priority={priority}
        className={cn(
          aspect !== "auto" ? "object-cover" : "h-auto w-full",
          className,
        )}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/20"
        aria-hidden
      />
    </div>
  );
}
