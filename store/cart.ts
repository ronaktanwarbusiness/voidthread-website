import { create } from "zustand";
import type { Cart } from "@/types/cart";

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  setCart: (cart: Cart) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  isLoading: false,
  error: null,
  setCart: (cart) => set({ cart, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set({ cart: null, isLoading: false, error: null }),
}));
