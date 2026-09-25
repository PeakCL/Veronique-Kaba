"use client";

import { usePathname } from "next/navigation";

/** Pages autonomes affichées sans l'habillage du site (en-tête, pied de page…). */
const BARE_PAGES = ["/presentation-logo"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (BARE_PAGES.some((p) => pathname?.startsWith(p))) return null;
  return <>{children}</>;
}
