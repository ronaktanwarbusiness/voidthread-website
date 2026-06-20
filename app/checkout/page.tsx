import { CheckoutContent } from "@/common/components/checkout/checkout-content";
import { PageHeader } from "@/common/components/header";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        badge="Final Step"
        title="Checkout"
        description="Enter your delivery details and place your order."
      />
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <CheckoutContent />
      </div>
    </div>
  );
}
