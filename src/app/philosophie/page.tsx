import { permanentRedirect } from "next/navigation";

// La page Philosophie a été fusionnée avec « À propos ».
// Redirection 308 permanente : transfère les signaux SEO vers /apropos.
export default function PhilosophieRedirect() {
  permanentRedirect("/apropos");
}
