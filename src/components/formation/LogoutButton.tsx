import { LogOut } from "lucide-react";
import { signOut } from "@/app/connexion/actions";

export function LogoutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full border-3 border-ink bg-white px-4 py-2 text-sm font-bold hover:bg-aura-50"
      >
        <LogOut className="h-4 w-4" />
        Déconnexion
      </button>
    </form>
  );
}
