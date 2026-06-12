"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  useCart,
  useClearCart,
  useRemoveFromCart,
  useUpdateCartQuantity,
} from "@/hooks/cart";
import { CartItem } from "./cart-item";
import { CartSummary } from "./cart-summary";
import { CartError, CartLoading, EmptyCart } from "./cart-states";

export function CartContent() {
  const {
    items,
    priceBreakup,
    isLoading,
    isError,
    error,
    refetch,
  } = useCart();
  const clearCart = useClearCart();
  const updateQuantity = useUpdateCartQuantity();
  const removeFromCart = useRemoveFromCart();

  const handleClearCart = () => {
    clearCart.mutate(undefined, {
      onSuccess: () => toast.success("Cart cleared"),
      onError: (mutationError) => toast.error(mutationError.message),
    });
  };

  const handleUpdateQuantity = (variantId: string, quantity: number) => {
    updateQuantity.mutate(
      { variant_id: variantId, quantity },
      {
        onError: (mutationError) => toast.error(mutationError.message),
      },
    );
  };

  const handleRemove = (variantId: string) => {
    removeFromCart.mutate(
      { variant_id: variantId },
      {
        onSuccess: () => toast.success("Item removed"),
        onError: (mutationError) => toast.error(mutationError.message),
      },
    );
  };

  if (isLoading) {
    return <CartLoading />;
  }

  if (isError) {
    return (
      <CartError
        message={error?.message ?? "Something went wrong"}
        onRetry={() => refetch()}
      />
    );
  }

  if (!items.length || !priceBreakup) {
    return <EmptyCart />;
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section>
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-muted-foreground">
            {priceBreakup.item_count}{" "}
            {priceBreakup.item_count === 1 ? "item" : "items"}
          </p>
          <Button
            variant="ghost"
            disabled={clearCart.isPending}
            onClick={handleClearCart}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="mr-1 h-4 w-4" />
            {clearCart.isPending ? "Clearing..." : "Clear Cart"}
          </Button>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <CartItem
              key={item.variant.id}
              item={item}
              isRemoving={
                removeFromCart.isPending &&
                removeFromCart.variables.variant_id === item.variant.id
              }
              isUpdating={
                updateQuantity.isPending &&
                updateQuantity.variables.variant_id === item.variant.id
              }
              onRemove={handleRemove}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))}
        </div>
      </section>

      <CartSummary priceBreakup={priceBreakup} />
    </div>
  );
}
