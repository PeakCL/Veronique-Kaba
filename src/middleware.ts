import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Rafraîchit la session Supabase (jetons expirés) sur les pages de l'espace
 * élève, avant que les Server Components ne la lisent.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  // Variables absentes (déploiement pas encore configuré) : on laisse passer.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Ne rien intercaler entre la création du client et cet appel.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: ["/formation/espace/:path*", "/formation/admin/:path*", "/connexion"],
};
