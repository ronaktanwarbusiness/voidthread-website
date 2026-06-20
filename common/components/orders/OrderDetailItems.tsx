import Image from "next/image";
import Link from "next/link";
import type { OrderItem } from "@/types/order";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function OrderDetailItems({ items }: { items: OrderItem[] }) {
  return (
    <div className="bg-muted/20 border border-border/50 rounded-[2rem] p-6 md:p-8">
      <h2 className="font-bold text-lg mb-6">Items Ordered</h2>
      <div className="space-y-5">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-muted shrink-0">
              <Image
                src={item.images[0]}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <Link
                href={`/products/${item.slug}`}
                className="font-semibold text-sm hover:text-primary transition-colors line-clamp-1"
              >
                {item.name}
              </Link>
              <p className="text-xs text-muted-foreground mt-1">
                {item.variant.color} · {item.variant.size} · Qty {item.quantity}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-sm">
                  {formatCurrency(item.selling_price)}
                </span>
                {item.original_price > item.selling_price && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatCurrency(item.original_price)}
                  </span>
                )}
              </div>
            </div>
            <p className="font-bold text-sm shrink-0">
              {formatCurrency(item.selling_price * item.quantity)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
