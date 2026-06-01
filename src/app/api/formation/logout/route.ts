import { NextResponse } from "next/server";
import { FORMATION_COOKIE } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(FORMATION_COOKIE);
  return res;
}
