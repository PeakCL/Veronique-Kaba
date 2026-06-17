import { permanentRedirect } from "next/navigation";

// La page Témoignages dédiée a été remplacée par une section sur la page d'accueil.
// On redirige (308 permanent) vers l'ancre #temoignages pour conserver les liens entrants.
export default function TemoignagesRedirect() {
  permanentRedirect("/#temoignages");
}
