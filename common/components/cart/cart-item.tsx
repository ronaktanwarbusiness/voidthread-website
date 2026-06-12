"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem as CartItemType } from "@/types/cart";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

interface CartItemProps {
  item: CartItemType;
  isRemoving: boolean;
  isUpdating: boolean;
  onRemove: (variantId: string) => void;
  onUpdateQuantity: (variantId: string, quantity: number) => void;
}

export function CartItem({
  item,
  isRemoving,
  isUpdating,
  onRemove,
  onUpdateQuantity,
}: CartItemProps) {
  const hasDiscount = item.original_price > item.selling_price;
  const isPending = isRemoving || isUpdating;

  return (
    <article className="flex gap-4 rounded-[2rem] border border-border/60 bg-background p-4 sm:gap-6 sm:p-6">
      <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-muted sm:h-32 sm:w-32">
        {item.images[0] ? (
          <Image
            src={item.images[0]}
            alt={item.name}
            fill
            sizes="(min-width: 640px) 128px, 96px"
            className="object-cover"
          />
        ) : (
          <ShoppingBag className="h-8 w-8 text-muted-foreground/60" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
        <div>
          <Link
            href={`/products/${item.slug}`}
            className="text-lg font-bold tracking-tight transition-colors hover:text-primary sm:text-xl"
          >
            {item.name}
          </Link>
          <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <span className="rounded-full bg-muted px-2.5 py-1">
              Size {item.variant.size}
            </span>
            <span className="rounded-full bg-muted px-2.5 py-1">
              {item.variant.color.replaceAll("_", " ")}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 items-center overflow-hidden rounded-xl border border-border/60">
              <Button
                variant="ghost"
                size="icon-sm"
                disabled={isPending || item.quantity <= 1}
                onClick={() =>
                  onUpdateQuantity(item.variant.id, item.quantity - 1)
                }
                aria-label={`Decrease quantity of ${item.name}`}
                className="h-full rounded-none"
              >
                <Minus />
              </Button>
              <span className="min-w-8 text-center text-sm font-bold">
                {item.quantity}
              </span>
              <Button
                variant="ghost"
                size="icon-sm"
                disabled={isPending}
                onClick={() =>
                  onUpdateQuantity(item.variant.id, item.quantity + 1)
                }
                aria-label={`Increase quantity of ${item.name}`}
                className="h-full rounded-none"
              >
                <Plus />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={isPending}
              onClick={() => onRemove(item.variant.id)}
              aria-label={`Remove ${item.name} from cart`}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 />
            </Button>
          </div>

          <div className="text-right">
            <span className="font-bold">
              {formatPrice(item.selling_price * item.quantity)}
            </span>
            {hasDiscount ? (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                {formatPrice(item.original_price * item.quantity)}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
