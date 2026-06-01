import { NextRequest, NextResponse } from "next/server";
import { services } from "@/lib/content";
import { createPayPalOrder, isPayPalConfigured } from "@/lib/paypal";

export async function POST(req: NextRequest) {
  if (!isPayPalConfigured()) {
    return NextResponse.json(
      {
        error:
          "PayPal non configuré. Ajoutez PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET et NEXT_PUBLIC_PAYPAL_CLIENT_ID dans .env.local",
      },
      { status: 503 },
    );
  }

  const { serviceId } = await req.json();
  const service = services.find((s) => s.id === serviceId);

  if (!service) {
    return NextResponse.json({ error: "Service inconnu" }, { status: 400 });
  }

  try {
    const order = await createPayPalOrder({
      amountEur: service.price,
      title: service.title,
      description: `${service.duration} — ${service.mode}`,
      serviceId: service.id,
    });

    return NextResponse.json({ id: order.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur PayPal" }, { status: 500 });
  }
}
