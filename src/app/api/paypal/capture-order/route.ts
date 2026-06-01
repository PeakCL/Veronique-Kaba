import { NextRequest, NextResponse } from "next/server";
import { capturePayPalOrder, isPayPalConfigured } from "@/lib/paypal";

export async function POST(req: NextRequest) {
  if (!isPayPalConfigured()) {
    return NextResponse.json({ error: "PayPal non configuré" }, { status: 503 });
  }

  const { orderID } = await req.json();

  if (!orderID) {
    return NextResponse.json({ error: "orderID requis" }, { status: 400 });
  }

  try {
    const result = await capturePayPalOrder(orderID);
    const status = result?.status;

    if (status === "COMPLETED") {
      const serviceId =
        result?.purchase_units?.[0]?.reference_id ??
        result?.purchase_units?.[0]?.items?.[0]?.name;

      return NextResponse.json({ ok: true, status, serviceId });
    }

    return NextResponse.json({ error: "Paiement non finalisé", status }, { status: 400 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur capture PayPal" }, { status: 500 });
  }
}
