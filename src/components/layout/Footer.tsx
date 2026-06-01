import Link from "next/link";
import { Facebook, Instagram, Phone, MapPin } from "lucide-react";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="mt-20 border-t-4 border-ink bg-gradient-to-br from-ink via-aura-900 to-sky-900 text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl text-aura-300">
            {site.name}
          </p>
          <p className="mt-2 text-sm text-cream/80">{site.tagline}</p>
          <p className="mt-4 flex items-start gap-2 text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
            <span>{site.locationDetail}</span>
          </p>
          <p className="mt-1 text-xs text-cream/60">SIRET {site.siret}</p>
        </div>

        <div>
          <p className="font-bold text-sky-300">Navigation</p>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              ["/soins", "Soins & tarifs"],
              ["/recouvrement-ame", "Recouvrement d'âme"],
              ["/formation", "Formation Magnétisme 2.0"],
              ["/apropos", "À propos"],
              ["/rendez-vous", "Prendre rendez-vous"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-sky-200">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-bold text-sky-300">Réseaux & contact</p>
          <a
            href={site.phoneHref}
            className="mt-3 flex items-center gap-2 text-sm hover:text-sky-200"
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
          <div className="mt-4 flex gap-3">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white comic-border hover:bg-sky-400"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-aura-400 text-white comic-border hover:bg-aura-300"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/20 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} {site.name} — Magnétiseuse & énergéticienne · Longwy
      </div>
    </footer>
  );
}
