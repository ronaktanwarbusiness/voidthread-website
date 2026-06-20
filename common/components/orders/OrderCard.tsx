import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react";
import type { Order } from "@/types/order";
import { OrderStatusBadge } from "./OrderStatusBadge";

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function OrderCard({ order }: { order: Order }) {
  const { items, price_breakup } = order.snapshot;
  const previewItems = items.slice(0, 3);
  const remaining = items.length - previewItems.length;
  const shortId = order.order_id.replace("order_", "").slice(0, 8).toUpperCase();

  return (
    <div className="bg-muted/20 border border-border/50 rounded-[2rem] p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-bold text-sm">#{shortId}</p>
            <p className="text-xs text-muted-foreground">
              {formatDate(order.createdAt)}
            </p>
          </div>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Items preview */}
      <div className="flex items-center gap-3">
        {previewItems.map((item, i) => (
          <div
            key={i}
            className="relative h-16 w-16 rounded-xl overflow-hidden bg-muted shrink-0"
          >
            <Image
              src={item.images[0]}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
        ))}
        {remaining > 0 && (
          <div className="h-16 w-16 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-muted-foreground">
              +{remaining}
            </span>
          </div>
        )}
        <div className="ml-auto text-right">
          <p className="text-xs text-muted-foreground">
            {price_breakup.total_quantity} item
            {price_breakup.total_quantity !== 1 ? "s" : ""}
          </p>
          <p className="font-bold text-lg">
            {formatCurrency(price_breakup.grand_total)}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-border/40">
        <Link
          href={`/orders/${order._id}`}
          className="text-sm font-semibold text-primary hover:underline"
        >
          View details →
        </Link>
      </div>
    </div>
  );
}
