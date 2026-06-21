"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED";

interface PaymentStatusResponse {
  is_success: boolean;
  data: {
    order_id: string;
    status: PaymentStatus;
  };
}

function usePaymentStatus(orderId: string) {
  return useQuery({
    queryKey: ["payment-status", orderId],
    queryFn: async () => {
      const res = await apiClient<PaymentStatusResponse>(
        `/api/v1/payment/status/${orderId}`,
      );
      return res.data;
    },
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === "PENDING" ? 3000 : false;
    },
    staleTime: 0,
  });
}

export default function PaymentStatusPage({
  params,
}: {
  params: Promise<{ order_id: string }>;
}) {
  const { order_id } = use(params);
  const router = useRouter();
  const { data, isLoading } = usePaymentStatus(order_id);

  useEffect(() => {
    if (data?.status === "SUCCESS") {
      const timer = setTimeout(() => {
        router.push("/orders");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [data?.status, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground text-sm font-medium">
          Checking payment status...
        </div>
      </div>
    );
  }

  const status = data?.status ?? "PENDING";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {status === "SUCCESS" && (
          <>
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Payment Successful</h1>
              <p className="text-muted-foreground text-sm">
                Your order has been placed. Redirecting to your orders...
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-2xl"
              onClick={() => router.push("/orders")}
            >
              View Orders
            </Button>
          </>
        )}

        {status === "FAILED" && (
          <>
            <XCircle className="mx-auto h-16 w-16 text-red-500" />
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Payment Failed</h1>
              <p className="text-muted-foreground text-sm">
                Something went wrong with your payment. Please try again.
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                className="rounded-2xl"
                onClick={() => router.push("/cart")}
              >
                Back to Cart
              </Button>
              <Button
                className="rounded-2xl"
                onClick={() => router.push("/checkout")}
              >
                Try Again
              </Button>
            </div>
          </>
        )}

        {status === "PENDING" && (
          <>
            <Clock className="mx-auto h-16 w-16 text-yellow-500 animate-pulse" />
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Processing Payment</h1>
              <p className="text-muted-foreground text-sm">
                Please wait while we confirm your payment...
              </p>
            </div>
          </>
        )}

        <p className="text-xs text-muted-foreground font-mono">
          Order ID: {order_id}
        </p>
      </div>
    </div>
  );
}
