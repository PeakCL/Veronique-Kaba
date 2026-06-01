"use client";

import { LogOut } from "lucide-react";

export function LogoutButton() {
  async function logout() {
    await fetch("/api/formation/logout", { method: "POST" });
    window.location.href = "/formation";
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="inline-flex items-center gap-2 rounded-full border-3 border-ink bg-white px-4 py-2 text-sm font-bold hover:bg-aura-50"
    >
      <LogOut className="h-4 w-4" />
      Déconnexion
    </button>
  );
}
