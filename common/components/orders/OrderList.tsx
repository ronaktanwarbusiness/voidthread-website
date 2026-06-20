import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import type { Order } from "@/types/order";
import { OrderCard } from "./OrderCard";

function OrdersEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
        <ShoppingBag className="h-9 w-9 text-muted-foreground" />
      </div>
      <div>
        <p className="font-bold text-lg mb-1">No orders yet</p>
        <p className="text-muted-foreground text-sm">
          When you place an order it will show up here.
        </p>
      </div>
      <Link
        href="/collections"
        className="mt-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
      >
        Shop Now
      </Link>
    </div>
  );
}

export function OrderList({ orders }: { orders: Order[] }) {
  console.log({ orders });
  if (orders.length === 0) return <OrdersEmpty />;

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
}
