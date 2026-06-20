"use client";

import { useAuth } from "@/hooks/auth";
import { useOrders } from "@/hooks/orders";
import { PageHeader } from "@/common/components/header";
import { OrderList } from "@/common/components/orders/OrderList";

export default function OrdersPage() {
  const { user, loading: authLoading, isLoggedIn } = useAuth();
  const { data: orders, isLoading: ordersLoading } = useOrders(isLoggedIn);

  console.log({ orders });

  const loading = authLoading || ordersLoading;

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground text-sm font-medium">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        badge="Account"
        title="My Orders"
        description="Track and manage your orders."
      />
      <div className="container mx-auto py-12 px-6">
        <OrderList orders={orders ?? []} />
      </div>
    </div>
  );
}
