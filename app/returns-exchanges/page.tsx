import { Metadata } from "next";
import { PageHeader } from "@/common/components/page-header";

export const metadata: Metadata = {
  title: "Returns & Exchanges | VoidThread",
  description: "Our policy on returns, exchanges, and refunds at VoidThread.",
};

export default function ReturnsExchangesPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Returns & Exchanges"
        description="Our policy on returns, exchanges, and refunds at VoidThread."
      />
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <p className="text-muted-foreground mb-12 italic text-sm">
          Last Updated: June 7, 2026
        </p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Return Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We want you to be completely satisfied with your purchase. If you
              are not happy with your order, you can return your items within 30
              days of delivery for a full refund or exchange. To be eligible for
              a return, your item must be unused and in the same condition that
              you received it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Exchanges</h2>
            <p className="text-muted-foreground leading-relaxed">
              We only replace items if they are defective or damaged. If you
              need to exchange it for the same item, send us an email at{" "}
              <span className="font-semibold text-foreground">
                support@voidthread.com
              </span>{" "}
              and we will guide you through the process. For size exchanges, the
              same 30-day window applies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Non-Returnable Items</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Several types of goods are exempt from being returned:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Gift cards</li>
              <li>Downloadable software products</li>
              <li>Some health and personal care items</li>
              <li>Sale items (only regular priced items may be refunded)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Refunds</h2>
            <p className="text-muted-foreground leading-relaxed">
              Once your return is received and inspected, we will send you an
              email to notify you that we have received your returned item. We
              will also notify you of the approval or rejection of your refund.
              If approved, then your refund will be processed, and a credit will
              automatically be applied to your original method of payment within
              5-10 business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Shipping Returns</h2>
            <p className="text-muted-foreground leading-relaxed">
              To return your product, you should mail your product to our return
              center. You will be responsible for paying for your own shipping
              costs for returning your item. Shipping costs are non-refundable.
              If you receive a refund, the cost of return shipping will be
              deducted from your refund.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
