import { Metadata } from "next";
import { PageHeader } from "@/common/components/page-header";

export const metadata: Metadata = {
  title: "Shipping Policy | VoidThread",
  description:
    "Information about shipping rates, delivery times, and international shipping at VoidThread.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Shipping Policy"
        description="Information about shipping rates, delivery times, and international shipping at VoidThread."
      />
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <p className="text-muted-foreground mb-12 italic text-sm">
          Last Updated: June 7, 2026
        </p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">
              1. Shipping Processing Times
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All orders are processed within 1-3 business days. Orders are not
              shipped or delivered on weekends or holidays. If we are
              experiencing a high volume of orders, shipments may be delayed by
              a few days. Please allow additional days in transit for delivery.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              2. Shipping Rates & Delivery Estimates
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-4 font-bold text-foreground">
                      Shipping Method
                    </th>
                    <th className="py-4 font-bold text-foreground">
                      Estimated Delivery
                    </th>
                    <th className="py-4 font-bold text-foreground">Cost</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-4">Standard Shipping</td>
                    <td className="py-4">5-7 business days</td>
                    <td className="py-4">$5.00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4">Express Shipping</td>
                    <td className="py-4">2-3 business days</td>
                    <td className="py-4">$15.00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4">Next Day Delivery</td>
                    <td className="py-4">1 business day</td>
                    <td className="py-4">$25.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-4 italic">
              *Delivery delays can occasionally occur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              3. International Shipping
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We currently ship to select countries worldwide. International
              shipping rates and delivery times vary by location and will be
              calculated at checkout. Please note that your order may be subject
              to import duties and taxes, which are incurred once a shipment
              reaches your destination country.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              4. Shipment Confirmation & Order Tracking
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              You will receive a Shipment Confirmation email once your order has
              shipped containing your tracking number(s). The tracking number
              will be active within 24 hours.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              5. Customs, Duties and Taxes
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              VoidThread is not responsible for any customs and taxes applied to
              your order. All fees imposed during or after shipping are the
              responsibility of the customer (tariffs, taxes, etc.).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
