"use client";

import dynamic from "next/dynamic";

export const PayPalPay = dynamic(
  () => import("./PayPalPay").then((m) => m.PayPalPay),
  {
    ssr: false,
    loading: () => (
      <p className="py-4 text-center text-sm text-ink/50">Chargement du paiement…</p>
    ),
  },
);
