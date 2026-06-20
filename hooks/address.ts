"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type {
  Address,
  AddressApiResponse,
  AddressListApiResponse,
  CreateAddressInput,
  UpdateAddressInput,
} from "@/types/address";

const ADDRESS_API = "/api/v1/address";
const addressQueryKey = ["addresses"] as const;

async function getAddresses(): Promise<Address[]> {
  const response = await apiClient<AddressListApiResponse>(`${ADDRESS_API}/list`);
  return response.data ?? [];
}

export function useAddresses(enabled = true, initialData?: Address[]) {
  return useQuery({
    queryKey: addressQueryKey,
    queryFn: getAddresses,
    enabled,
    staleTime: 60_000,
    initialData,
  });
}

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateAddressInput) =>
      apiClient<AddressApiResponse>(`${ADDRESS_API}/create`, {
        method: "POST",
        body: input,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: addressQueryKey }),
  });
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...input }: UpdateAddressInput & { id: string }) =>
      apiClient<AddressApiResponse>(`${ADDRESS_API}/update/${id}`, {
        method: "PATCH",
        body: input,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: addressQueryKey }),
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiClient(`${ADDRESS_API}/delete/${id}`, { method: "DELETE" }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: addressQueryKey }),
  });
}
