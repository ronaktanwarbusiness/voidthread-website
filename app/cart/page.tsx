import { CartContent } from "@/common/components/cart";
import { PageHeader } from "@/common/components/header";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        badge="Your Selection"
        title="Shopping Cart"
        description="Review your pieces and order total before checkout."
      />

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <CartContent />
      </div>
    </div>
  );
}
