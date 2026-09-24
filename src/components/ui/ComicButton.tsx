import Link from "next/link";
import { cn } from "@/lib/utils";

type ComicButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "aura" | "sky" | "gold" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

const variants = {
  aura: "bg-aura-600 hover:bg-aura-500 text-white",
  sky: "bg-sky-500 hover:bg-sky-400 text-white",
  gold: "bg-gold-400 hover:bg-gold-300 text-ink",
  outline: "bg-white hover:bg-gold-50 text-ink",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function ComicButton({
  href,
  onClick,
  children,
  variant = "aura",
  size = "md",
  className,
  type = "button",
  disabled,
}: ComicButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-bold comic-pop disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
