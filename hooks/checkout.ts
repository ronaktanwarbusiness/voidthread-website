"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { CartItem, CartPriceBreakup } from "@/types/cart";
import type { Address } from "@/types/address";

const CHECKOUT_API = "/api/v1/checkout";

export interface CheckoutSummary {
  cart: {
    items: CartItem[];
    price_breakup: CartPriceBreakup;
    user_id: string;
  };
  addresses: {
    billing: Address[];
    shipping: Address[];
  };
}

export interface PlaceOrderInput {
  shipping_address_id: string;
  billing_address_id: string;
}

export interface PlaceOrderApiResponse {
  isSuccess: boolean;
  payment_session_id: string;
}

export function useCheckoutSummary(enabled = true) {
  return useQuery({
    queryKey: ["checkout-summary"],
    queryFn: async () => {
      const response = await apiClient<CheckoutSummary>(`${CHECKOUT_API}/summary`);
      return response ?? null;
    },
    enabled,
    staleTime: 30_000,
  });
}

export function usePlaceOrder() {
  return useMutation({
    mutationFn: (input: PlaceOrderInput) =>
      apiClient<PlaceOrderApiResponse>(`${CHECKOUT_API}/place-order`, {
        method: "POST",
        body: input,
      }),
  });
}
