"use client";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import { ArrowRight } from "lucide-react";
import React, { FC } from "react";
import { load } from "@cashfreepayments/cashfree-js";

const PaymentButton: FC<IPaymentButtonProps> = ({ title = "Place Order" }) => {
  const handlePayment = async () => {
    // Implement payment logic here
    console.log("Payment initiated");

    const paymentCreateResponse: any = await apiClient(
      "/api/v1/payment/create",
      {
        method: "POST",
      },
    );

    const cashfree = await load({
      mode: "sandbox",
    });

    cashfree.checkout({
      paymentSessionId: paymentCreateResponse.payment_session_id,
      redirectTarget: "_self",
    });
  };
  return (
    <Button
      className="h-12 w-full rounded-2xl text-base font-bold"
      onClick={handlePayment}
    >
      {title}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
};

export default PaymentButton;

interface IPaymentButtonProps {
  title: string;
}
