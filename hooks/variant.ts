import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { IVariant } from "@/types/variant";

interface VariantResponse {
  data?: IVariant[];
}

export function useVariant(slug?: string) {
  return useQuery<IVariant[]>({
    queryKey: ["variants", slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      const response = await apiClient<VariantResponse>(
        "/api/v1/core/variants",
        {
          method: "POST",
          body: { slug },
        },
      );

      return response?.data || [];
    },
  });
}
