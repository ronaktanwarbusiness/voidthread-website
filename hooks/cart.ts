"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { useCartStore } from "@/store/cart";
import type {
  AddToCartInput,
  CartApiResponse,
  RemoveFromCartInput,
  UpdateQuantityInput,
} from "@/types/cart";

const CART_API = "/api/v1/cart";
const cartQueryKey = ["cart"] as const;

async function getCart() {
  const response = await apiClient<CartApiResponse>(
    `${CART_API}/get-cart`,
    { method: "POST" },
  );

  return response.data;
}

export function useCart(enabled = true) {
  const setCart = useCartStore((state) => state.setCart);
  const setLoading = useCartStore((state) => state.setLoading);
  const setError = useCartStore((state) => state.setError);
  const cart = useCartStore((state) => state.cart);

  const query = useQuery({
    queryKey: cartQueryKey,
    queryFn: getCart,
    enabled,
  });

  React.useEffect(() => {
    setLoading(query.isFetching);
  }, [query.isFetching, setLoading]);

  React.useEffect(() => {
    if (query.data) {
      setCart(query.data);
    }
  }, [query.data, setCart]);

  React.useEffect(() => {
    setError(query.error?.message ?? null);
  }, [query.error, setError]);

  const items = cart?.items ?? [];
  const priceBreakup = cart?.price_breakup ?? null;
  const totalItems = enabled ? (priceBreakup?.total_quantity ?? 0) : 0;

  return {
    ...query,
    cart,
    items,
    priceBreakup,
    totalItems,
    storeIsLoading: useCartStore((state) => state.isLoading),
    storeError: useCartStore((state) => state.error),
  };
}

function useCartMutation<TInput>(endpoint: string) {
  const queryClient = useQueryClient();
  const setLoading = useCartStore((state) => state.setLoading);
  const setError = useCartStore((state) => state.setError);

  return useMutation({
    mutationFn: (input: TInput) =>
      apiClient<CartApiResponse>(`${CART_API}/${endpoint}`, {
        method: "POST",
        body: input,
      }),
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cartQueryKey }),
    onError: (error) => setError(error.message),
    onSettled: () => setLoading(false),
  });
}

export function useAddToCart() {
  return useCartMutation<AddToCartInput>("add-to-cart");
}

export function useUpdateCartQuantity() {
  return useCartMutation<UpdateQuantityInput>("update-quantity");
}

export function useRemoveFromCart() {
  return useCartMutation<RemoveFromCartInput>("remove-from-cart");
}

export function useClearCart() {
  return useCartMutation<void>("clear-cart");
}
