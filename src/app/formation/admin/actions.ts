"use server";

import { randomInt } from "node:crypto";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { formations } from "@/lib/content";

export type AdminState = { error?: string; success?: string; password?: string; email?: string };

const levelIds = new Set<string>(formations.map((f) => f.id));

/** Mot de passe provisoire lisible (sans caractères ambigus), à transmettre à l'élève. */
function tempPassword(): string {
  const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
  const pick = (n: number) =>
    Array.from({ length: n }, () => alphabet[randomInt(alphabet.length)]).join("");
  return `doree-${pick(4)}-${pick(4)}`;
}

function readLevels(formData: FormData): string[] {
  return formData
    .getAll("levels")
    .map(String)
    .filter((l) => levelIds.has(l));
}

export async function createStudent(_prev: AdminState, formData: FormData): Promise<AdminState> {
  await requireAdmin();

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const firstName = String(formData.get("firstName") ?? "").trim().slice(0, 80);
  const lastName = String(formData.get("lastName") ?? "").trim().slice(0, 80);
  const levels = readLevels(formData);
  if (!email || !firstName) return { error: "E-mail et prénom sont obligatoires." };

  const password = tempPassword();
  const { error } = await createAdminClient().auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { first_name: firstName, last_name: lastName },
    app_metadata: { levels, must_change_password: true },
  });
  if (error) {
    return {
      error:
        error.code === "email_exists"
          ? "Un compte existe déjà avec cet e-mail."
          : `Création impossible : ${error.message}`,
    };
  }

  revalidatePath("/formation/admin");
  return { success: `Compte créé pour ${firstName}.`, email, password };
}

export async function updateLevels(formData: FormData) {
  await requireAdmin();
  const userId = String(formData.get("userId") ?? "");
  await createAdminClient().auth.admin.updateUserById(userId, {
    app_metadata: { levels: readLevels(formData) },
  });
  revalidatePath("/formation/admin");
}

export async function resetPassword(_prev: AdminState, formData: FormData): Promise<AdminState> {
  await requireAdmin();
  const userId = String(formData.get("userId") ?? "");
  const password = tempPassword();
  const { data, error } = await createAdminClient().auth.admin.updateUserById(userId, {
    password,
    app_metadata: { must_change_password: true },
  });
  if (error) return { error: `Réinitialisation impossible : ${error.message}` };
  return { password, email: data.user.email };
}

export async function deleteStudent(formData: FormData) {
  const admin = await requireAdmin();
  const userId = String(formData.get("userId") ?? "");
  if (userId === admin.id) return; // on ne supprime pas son propre compte
  await createAdminClient().auth.admin.deleteUser(userId);
  revalidatePath("/formation/admin");
}
