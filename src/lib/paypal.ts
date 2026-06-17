const PAYPAL_API =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

export function isPayPalConfigured(): boolean {
  return Boolean(
    process.env.PAYPAL_CLIENT_ID &&
      process.env.PAYPAL_CLIENT_SECRET &&
      process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  );
}

async function getAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("PayPal non configuré");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    throw new Error("Échec authentification PayPal");
  }

  const data = await res.json();
  return data.access_token as string;
}

export async function createPayPalOrder(params: {
  amountEur: number;
  title: string;
  description: string;
  serviceId: string;
}) {
  const token = await getAccessToken();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const value = params.amountEur.toFixed(2);

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: params.serviceId,
          description: params.description,
          amount: {
            currency_code: "EUR",
            value,
            breakdown: {
              item_total: { currency_code: "EUR", value },
            },
          },
          items: [
            {
              name: params.title,
              description: params.description,
              quantity: "1",
              unit_amount: { currency_code: "EUR", value },
            },
          ],
        },
      ],
      application_context: {
        brand_name: "Véronique Kaba",
        locale: "fr-FR",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${baseUrl}/paiement/succes?service=${params.serviceId}&provider=paypal`,
        cancel_url: `${baseUrl}/soins?cancelled=1`,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[PayPal create order]", err);
    throw new Error("Impossible de créer la commande PayPal");
  }

  return res.json() as Promise<{ id: string }>;
}

export async function capturePayPalOrder(orderId: string) {
  const token = await getAccessToken();

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[PayPal capture]", err);
    throw new Error("Échec de la capture du paiement");
  }

  return res.json();
}
