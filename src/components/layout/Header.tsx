"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { site } from "@/lib/content";
import { ComicButton } from "@/components/ui/ComicButton";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Accueil" },
  { href: "/soins", label: "Soins" },
  { href: "/recouvrement-ame", label: "Recouvrement d'âme" },
  { href: "/formation", label: "Formation", highlight: true },
  { href: "/apropos", label: "À propos" },
  { href: "/#temoignages", label: "Témoignages" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gold-200/50 bg-cream/92 backdrop-blur-md" style={{ boxShadow: "0 1px 20px rgba(240,190,90,0.08)" }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full brand-gradient comic-border transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5 text-white" />
          </span>
          <span className="hidden font-[family-name:var(--font-display)] text-lg font-medium text-ink sm:block">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition",
                item.highlight
                  ? "bg-aura-100 text-aura-700 hover:bg-aura-200"
                  : "text-ink/75 hover:bg-rose-50 hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ComicButton href="/rendez-vous" size="sm">
            Réserver
          </ComicButton>
        </div>

        <button
          type="button"
          className="rounded-full p-2 comic-border lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="menu-mobile"
        className={cn(
          "overflow-hidden bg-panel lg:hidden",
          open ? "max-h-[32rem] border-t border-ink/10" : "max-h-0",
        )}
      >
        <nav className="flex flex-col gap-1 p-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-xl px-4 py-3 font-medium hover:bg-rose-50",
                item.highlight && "bg-aura-50 text-aura-700",
              )}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <ComicButton href="/rendez-vous" className="mt-2 w-full">
            Réserver maintenant
          </ComicButton>
        </nav>
      </div>
    </header>
  );
}
