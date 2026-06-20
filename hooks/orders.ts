import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type {
  Order,
  OrderListApiResponse,
  OrderDetailApiResponse,
} from "@/types/order";

async function getOrders() {
  const response = await apiClient<OrderListApiResponse>("/api/v1/order/list");

  return response?.data ?? [];
}

export function useOrders(enabled = true) {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    enabled,
    staleTime: 60_000,
  });
}

async function getOrder(id: string): Promise<Order> {
  const response = await apiClient<OrderDetailApiResponse>(
    `/api/v1/order/${id}`,
  );
  return response?.data;
}

export function useOrder(id: string, enabled = true) {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => getOrder(id),
    enabled: enabled && !!id,
    staleTime: 60_000,
  });
}
