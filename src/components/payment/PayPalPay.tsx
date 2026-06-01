"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import type { OnApproveData } from "@paypal/paypal-js";
import { CreditCard, Phone } from "lucide-react";
import { site } from "@/lib/content";
import { ComicButton } from "@/components/ui/ComicButton";

type PayPalPayProps = {
  serviceId: string;
  amount: number;
};

function isPayPalClientIdValid(clientId?: string): boolean {
  if (!clientId || clientId.length < 20) return false;
  return !/votre|xxx|placeholder|your_/i.test(clientId);
}

function PayPalFallback({ reason }: { reason?: string }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-aura-300 bg-aura-50 p-4 text-center">
      <p className="text-sm font-semibold text-ink/70">
        {reason ?? "Paiement en ligne bientôt disponible — en attendant :"}
      </p>
      <ComicButton href={site.phoneHref} size="sm" className="mt-3 w-full">
        <Phone className="h-4 w-4" />
        Appeler pour réserver
      </ComicButton>
    </div>
  );
}

function PayPalButtonsSafe({
  serviceId,
  amount,
}: {
  serviceId: string;
  amount: number;
}) {
  const router = useRouter();
  const [{ isResolved, isRejected }] = usePayPalScriptReducer();

  const createOrder = useCallback(async () => {
    try {
      const res = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId }),
      });
      const data = await res.json();
      if (!data.id) {
        throw new Error(
          typeof data.error === "string" ? data.error : "Erreur création commande",
        );
      }
      return data.id;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erreur réseau";
      throw new Error(msg);
    }
  }, [serviceId]);

  const onApprove = useCallback(
    async (data: OnApproveData) => {
      try {
        const res = await fetch("/api/paypal/capture-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderID: data.orderID }),
        });
        const result = await res.json();
        if (result.ok) {
          router.push(`/paiement/succes?service=${serviceId}&provider=paypal`);
        } else {
          alert(result.error ?? "Le paiement n'a pas pu être finalisé.");
        }
      } catch {
        alert("Erreur de connexion — contactez Véronique par téléphone.");
      }
    },
    [router, serviceId],
  );

  const onError = useCallback((err: unknown) => {
    const message =
      err instanceof Error
        ? err.message
        : err instanceof Event
          ? "Paiement interrompu"
          : "Erreur PayPal";
    console.warn("[PayPal]", message);
  }, []);

  if (isRejected) {
    return (
      <PayPalFallback reason="PayPal indisponible — vérifiez la configuration dans .env.local" />
    );
  }

  if (!isResolved) {
    return (
      <p className="py-4 text-center text-sm text-ink/50">Chargement du paiement…</p>
    );
  }

  return (
    <div className="space-y-2">
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "gold",
          shape: "pill",
          label: "pay",
          height: 45,
        }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        onCancel={() => undefined}
      />
      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-ink/50">
        <CreditCard className="h-3.5 w-3.5" />
        {amount} € · PayPal ou carte bancaire (CB, Visa, Mastercard)
      </p>
    </div>
  );
}

export function PayPalPay({ serviceId, amount }: PayPalPayProps) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!isPayPalClientIdValid(clientId)) {
    return <PayPalFallback />;
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: clientId!,
        currency: "EUR",
        intent: "capture",
        locale: "fr_FR",
        components: "buttons",
        enableFunding: "card",
        disableFunding: "paylater,venmo",
      }}
    >
      <PayPalButtonsSafe serviceId={serviceId} amount={amount} />
    </PayPalScriptProvider>
  );
}
