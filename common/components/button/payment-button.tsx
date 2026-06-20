"use client";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import { ArrowRight } from "lucide-react";
import { FC, useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";

const PaymentButton: FC<IPaymentButtonProps> = ({
  title = "Place Order",
  shippingAddressId,
  billingAddressId,
}) => {
  const [isPending, setIsPending] = useState(false);

  const handlePayment = async () => {
    setIsPending(true);
    try {
      const paymentCreateResponse: any = await apiClient(
        "/api/v1/payment/create",
        {
          method: "POST",
          body: {
            shipping_address_id: shippingAddressId,
            billing_address_id: billingAddressId,
          },
        },
      );

      const cashfree = await load({ mode: "sandbox" });

      cashfree.checkout({
        paymentSessionId: paymentCreateResponse.payment_session_id,
        redirectTarget: "_self",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      className="h-12 w-full rounded-2xl text-base font-bold"
      disabled={!shippingAddressId || isPending}
      onClick={handlePayment}
    >
      {isPending ? "Processing..." : title}
      {!isPending && <ArrowRight className="ml-2 h-4 w-4" />}
    </Button>
  );
};

export default PaymentButton;

interface IPaymentButtonProps {
  title?: string;
  shippingAddressId: string | null;
  billingAddressId: string | null;
}
