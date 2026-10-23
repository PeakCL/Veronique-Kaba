"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type BubbleProps = {
  children: React.ReactNode;
  className?: string;
  tail?: "bottom-left" | "bottom-right" | "top-left" | "top-right" | "none";
  variant?: "white" | "gold" | "aura" | "sky" | "warm";
  animate?: boolean;
  /** Au survol, la bulle se soulève et penche légèrement, comme une case qu'on attrape */
  lift?: boolean;
};

const tailClasses = {
  "bottom-left":
    "after:absolute after:-bottom-3 after:left-8 after:w-0 after:h-0 after:border-l-[12px] after:border-l-transparent after:border-r-[12px] after:border-r-transparent after:border-t-[16px] after:border-t-[var(--bubble-bg)]",
  "bottom-right":
    "after:absolute after:-bottom-3 after:right-8 after:w-0 after:h-0 after:border-l-[12px] after:border-l-transparent after:border-r-[12px] after:border-r-transparent after:border-t-[16px] after:border-t-[var(--bubble-bg)]",
  "top-left":
    "after:absolute after:-top-3 after:left-8 after:w-0 after:h-0 after:border-l-[12px] after:border-l-transparent after:border-r-[12px] after:border-r-transparent after:border-b-[16px] after:border-b-[var(--bubble-bg)]",
  "top-right":
    "after:absolute after:-top-3 after:right-8 after:w-0 after:h-0 after:border-l-[12px] after:border-l-transparent after:border-r-[12px] after:border-r-transparent after:border-b-[16px] after:border-b-[var(--bubble-bg)]",
  none: "",
};

const variants = {
  white: { "--bubble-bg": "#fffdf6", bg: "bg-[#fffdf6]" },
  gold: { "--bubble-bg": "#fef3d8", bg: "bg-gold-100" },
  aura: { "--bubble-bg": "#f0eaf8", bg: "bg-aura-100" },
  sky:  { "--bubble-bg": "#e8f1f9", bg: "bg-sky-100" },
  warm: { "--bubble-bg": "#fdf0ec", bg: "bg-rose-50" },
};

export function Bubble({
  children,
  className,
  tail = "bottom-left",
  variant = "white",
  animate = true,
  lift = false,
}: BubbleProps) {
  const v = variants[variant];
  const reduce = useReducedMotion();
  const hover = lift && !reduce;
  const Wrapper = animate || hover ? motion.div : "div";
  const motionProps = {
    ...(animate && {
      initial: { opacity: 0, scale: 0.96, y: 8 },
      whileInView: { opacity: 1, scale: 1, y: 0 },
      viewport: { once: true, margin: "-40px" },
      transition: { type: "spring" as const, stiffness: 200, damping: 24 },
    }),
    ...(hover && {
      whileHover: {
        y: -5,
        rotate: -0.8,
        boxShadow: "7px 8px 0 var(--color-outline)",
        transition: { type: "spring" as const, stiffness: 400, damping: 20 },
      },
    }),
  };

  return (
    <Wrapper
      className={cn(
        "relative rounded-[2rem] p-6 md:p-8 comic-border",
        v.bg,
        tail !== "none" && tailClasses[tail],
        className,
      )}
      style={{ "--bubble-bg": v["--bubble-bg"] } as React.CSSProperties}
      {...motionProps}
    >
      {children}
    </Wrapper>
  );
}
