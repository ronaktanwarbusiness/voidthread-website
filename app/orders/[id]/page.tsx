"use client";

import { use } from "react";
import { useAuth } from "@/hooks/auth";
import { useOrder } from "@/hooks/orders";
import { PageHeader } from "@/common/components/header";
import { OrderStatusBadge } from "@/common/components/orders/OrderStatusBadge";
import { OrderDetailItems } from "@/common/components/orders/OrderDetailItems";
import { OrderPriceSummary } from "@/common/components/orders/OrderPriceSummary";
import { OrderAddressCard } from "@/common/components/orders/OrderAddressCard";

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { isLoggedIn, loading: authLoading } = useAuth();
  const { data: order, isLoading } = useOrder(id, isLoggedIn);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground text-sm font-medium">
          Loading...
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground text-sm font-medium">
          Order not found.
        </div>
      </div>
    );
  }

  const { snapshot } = order;
  const shortId = order.order_id.replace("order_", "").slice(0, 8).toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        badge="Orders"
        title={`#${shortId}`}
        description={`Placed on ${formatDate(order.createdAt)}`}
      />

      <div className="container mx-auto py-12 px-6 space-y-6">
        {/* Status row */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground font-medium">
            Status
          </span>
          <OrderStatusBadge status={order.status} />
        </div>

        {/* Items */}
        <OrderDetailItems items={snapshot.items} />

        {/* Price + Addresses */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <OrderPriceSummary breakup={snapshot.price_breakup} />
          <OrderAddressCard
            label="Shipping Address"
            address={snapshot.shipping_address}
          />
          <OrderAddressCard
            label="Billing Address"
            address={snapshot.billing_address}
          />
        </div>
      </div>
    </div>
  );
}
