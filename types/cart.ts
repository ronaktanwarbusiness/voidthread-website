export interface AddToCartInput {
  product_id: string;
  variant_id: string;
  quantity: number;
}

export interface UpdateQuantityInput {
  variant_id: string;
  quantity: number;
}

export interface RemoveFromCartInput {
  variant_id: string;
}

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  original_price: number;
  selling_price: number;
  images: string[];
  quantity: number;
  variant: {
    id: string;
    size: string;
    color: string;
  };
}

export interface CartPriceBreakup {
  original_total: number;
  selling_total: number;
  discount_total: number;
  total_quantity: number;
  item_count: number;
  tax_percentage: number;
  tax_total: number;
  grand_total: number;
}

export interface Cart {
  items: CartItem[];
  price_breakup: CartPriceBreakup;
  user_id: string;
}

export interface CartApiResponse {
  isSuccess: boolean;
  data: Cart;
}
