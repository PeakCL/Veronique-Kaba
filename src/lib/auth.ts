import { cookies } from "next/headers";

export const FORMATION_COOKIE = "formation_access";

export async function hasFormationAccess(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(FORMATION_COOKIE)?.value === "granted";
}
