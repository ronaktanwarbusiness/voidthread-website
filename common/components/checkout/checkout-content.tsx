"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, ShoppingBag, Tag } from "lucide-react";
import { load } from "@cashfreepayments/cashfree-js";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  useCheckoutSummary,
  usePlaceOrder,
  type CheckoutSummary,
} from "@/hooks/checkout";
import { AddressSection } from "@/common/components/cart/address-section";
import type { CartItem, CartPriceBreakup } from "@/types/cart";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

function CheckoutItemRow({ item }: { item: CartItem }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted">
        {item.images[0] ? (
          <Image
            src={item.images[0]}
            alt={item.name}
            fill
            sizes="56px"
            className="object-cover"
          />
        ) : (
          <ShoppingBag className="m-auto h-5 w-5 text-muted-foreground/60" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{item.name}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Size {item.variant.size} · {item.variant.color.replaceAll("_", " ")} · Qty{" "}
          {item.quantity}
        </p>
      </div>
      <span className="shrink-0 text-sm font-bold">
        {formatPrice(item.selling_price * item.quantity)}
      </span>
    </div>
  );
}

function PriceBreakup({ priceBreakup }: { priceBreakup: CartPriceBreakup }) {
  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between gap-4 text-muted-foreground">
        <span>Original total</span>
        <span>{formatPrice(priceBreakup.original_total)}</span>
      </div>
      <div className="flex justify-between gap-4 text-muted-foreground">
        <span>Items ({priceBreakup.total_quantity})</span>
        <span>{formatPrice(priceBreakup.selling_total)}</span>
      </div>
      {priceBreakup.discount_total > 0 && (
        <div className="flex justify-between gap-4 font-bold text-emerald-600">
          <span className="flex items-center gap-1.5">
            <Tag className="h-4 w-4" />
            You save
          </span>
          <span>-{formatPrice(priceBreakup.discount_total)}</span>
        </div>
      )}
      <div className="flex justify-between gap-4 text-muted-foreground">
        <span>Tax ({priceBreakup.tax_percentage}%)</span>
        <span>{formatPrice(priceBreakup.tax_total)}</span>
      </div>
    </div>
  );
}

function OrderSummaryPanel({
  summary,
  shippingAddressId,
  billingAddressId,
  onPlaceOrder,
  isPending,
}: {
  summary: CheckoutSummary;
  shippingAddressId: string | null;
  billingAddressId: string | null;
  onPlaceOrder: () => void;
  isPending: boolean;
}) {
  return (
    <aside className="rounded-[2rem] border border-border/60 bg-muted/30 p-6 lg:sticky lg:top-28">
      <h2 className="text-xl font-bold tracking-tight">Order Summary</h2>

      <div className="mt-5 space-y-3 border-b border-border/60 pb-5">
        {summary.cart.items.map((item) => (
          <CheckoutItemRow key={item.variant.id} item={item} />
        ))}
      </div>

      <div className="mt-5 border-b border-border/60 pb-5">
        <PriceBreakup priceBreakup={summary.cart.price_breakup} />
      </div>

      <div className="flex items-center justify-between gap-4 py-5">
        <span className="font-bold">Total</span>
        <span className="text-2xl font-bold">
          {formatPrice(summary.cart.price_breakup.grand_total)}
        </span>
      </div>

      <Button
        className="h-12 w-full rounded-2xl text-base font-bold"
        disabled={!shippingAddressId || !billingAddressId || isPending}
        onClick={onPlaceOrder}
      >
        {isPending ? "Processing..." : "Place Order"}
        {!isPending && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>

      {!shippingAddressId && (
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Select a shipping address to continue
        </p>
      )}

      <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-primary" />
        Secure checkout and protected payments
      </p>
    </aside>
  );
}

export function CheckoutContent() {
  const { data: summary, isLoading, isError } = useCheckoutSummary();
  const placeOrder = usePlaceOrder();
  const router = useRouter();
  const [shippingAddressId, setShippingAddressId] = React.useState<string | null>(null);
  const [billingAddressId, setBillingAddressId] = React.useState<string | null>(null);

  const handleAddressChange = React.useCallback(
    (shippingId: string | null, billingId: string | null) => {
      setShippingAddressId(shippingId);
      setBillingAddressId(billingId);
    },
    [],
  );

  React.useEffect(() => {
    if (!isLoading && !isError && summary && summary.cart.items.length === 0) {
      router.replace("/cart");
    }
  }, [isLoading, isError, summary, router]);

  const handlePlaceOrder = async () => {
    if (!shippingAddressId || !billingAddressId) return;

    placeOrder.mutate(
      { shipping_address_id: shippingAddressId, billing_address_id: billingAddressId },
      {
        onSuccess: async (res) => {
          const cashfree = await load({ mode: "sandbox" });
          cashfree.checkout({
            paymentSessionId: res.payment_session_id,
            redirectTarget: "_self",
          });
        },
        onError: (err) => toast.error(err.message),
      },
    );
  };

  if (isLoading) {
    return (
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-[2rem] bg-muted" />
          ))}
        </div>
        <div className="h-96 animate-pulse rounded-[2rem] bg-muted" />
      </div>
    );
  }

  if (isError || !summary) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="text-muted-foreground">Something went wrong loading your order.</p>
        <Link href="/cart" className="text-sm font-medium underline underline-offset-4">
          Back to cart
        </Link>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
      <AddressSection
        onAddressChange={handleAddressChange}
        enabled
        initialAddresses={[
          ...summary.addresses.billing,
          ...summary.addresses.shipping,
        ]}
      />

      <OrderSummaryPanel
        summary={summary}
        shippingAddressId={shippingAddressId}
        billingAddressId={billingAddressId}
        onPlaceOrder={handlePlaceOrder}
        isPending={placeOrder.isPending}
      />
    </div>
  );
}
