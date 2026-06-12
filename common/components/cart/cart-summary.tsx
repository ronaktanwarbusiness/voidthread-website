import { ArrowRight, ShieldCheck, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartPriceBreakup } from "@/types/cart";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function CartSummary({
  priceBreakup,
}: {
  priceBreakup: CartPriceBreakup;
}) {
  return (
    <aside className="rounded-[2rem] border border-border/60 bg-muted/30 p-6 lg:sticky lg:top-28">
      <h2 className="text-xl font-bold tracking-tight">Order Summary</h2>

      <div className="mt-6 space-y-4 border-b border-border/60 pb-6 text-sm">
        <div className="flex justify-between gap-4 text-muted-foreground">
          <span>Original total</span>
          <span>{formatPrice(priceBreakup.original_total)}</span>
        </div>
        <div className="flex justify-between gap-4 text-muted-foreground">
          <span>Items ({priceBreakup.total_quantity})</span>
          <span>{formatPrice(priceBreakup.selling_total)}</span>
        </div>
        <div className="flex justify-between gap-4 font-bold text-emerald-600">
          <span className="flex items-center gap-1.5">
            <Tag className="h-4 w-4" />
            You save
          </span>
          <span>-{formatPrice(priceBreakup.discount_total)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 py-6">
        <span className="font-bold">Total</span>
        <span className="text-2xl font-bold">
          {formatPrice(priceBreakup.selling_total)}
        </span>
      </div>

      <Button className="h-12 w-full rounded-2xl text-base font-bold">
        Proceed to Checkout
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-primary" />
        Secure checkout and protected payments
      </p>
    </aside>
  );
}
