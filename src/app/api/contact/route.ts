import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  // En production : brancher Resend, Nodemailer, ou Webhook Make/Zapier
  console.log("[Contact]", { name, email, message: String(message).slice(0, 500) });

  return NextResponse.json({ ok: true });
}
