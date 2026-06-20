export interface OrderAddress {
  _id: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  landmark?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface OrderItem {
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

export interface OrderPriceBreakup {
  original_total: number;
  selling_total: number;
  discount_total: number;
  total_quantity: number;
  item_count: number;
  tax_percentage: number;
  tax_total: number;
  grand_total: number;
}

export interface OrderSnapshot {
  items: OrderItem[];
  price_breakup: OrderPriceBreakup;
  amount: number;
  tax_amount: number;
  billing_address: OrderAddress;
  shipping_address: OrderAddress;
}

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface Order {
  _id: string;
  user_id: string;
  transaction_id: string;
  order_id: string;
  status: OrderStatus;
  snapshot: OrderSnapshot;
  createdAt: string;
  updatedAt: string;
}

export interface OrderListApiResponse {
  isSuccess: boolean;
  data: Order[];
}

export interface OrderDetailApiResponse {
  isSuccess: boolean;
  data: Order;
}
