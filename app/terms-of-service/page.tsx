import { Metadata } from "next";
import { PageHeader } from "@/common/components/page-header";

export const metadata: Metadata = {
  title: "Terms of Service | VoidThread",
  description:
    "Read our terms and conditions for using the VoidThread website and services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Terms of Service"
        description="Read our terms and conditions for using the VoidThread website and services."
      />
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <p className="text-muted-foreground mb-12 italic text-sm">
          Last Updated: June 7, 2026
        </p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using the VoidThread website (the "Site") and our
              services, you agree to be bound by these Terms of Service and all
              applicable laws and regulations. If you do not agree with any part
              of these terms, you are prohibited from using the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the
              materials on VoidThread's website for personal, non-commercial
              transitory viewing only. This is the grant of a license, not a
              transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Modify or copy the materials.</li>
              <li>
                Use the materials for any commercial purpose, or for any public
                display (commercial or non-commercial).
              </li>
              <li>
                Attempt to decompile or reverse engineer any software contained
                on VoidThread's website.
              </li>
              <li>
                Remove any copyright or other proprietary notations from the
                materials.
              </li>
              <li>
                Transfer the materials to another person or "mirror" the
                materials on any other server.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              3. E-Commerce & Payments
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              By placing an order on VoidThread, you warrant that you are at
              least 18 years old or have parental permission. All orders are
              subject to availability and confirmation of the order price.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our payments are securely processed through{" "}
              <strong>Cashfree Payments</strong> and <strong>Razorpay</strong>.
              We do not store your full credit/debit card information on our
              servers. All transaction details are handled by these PCI-DSS
              compliant payment gateways to ensure the highest level of
              security.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to refuse any order you place with us. We
              may, in our sole discretion, limit or cancel quantities purchased
              per person, per household or per order.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              4. Intellectual Property
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on this Site, including but not limited to text,
              graphics, logos, images, and software, is the property of
              VoidThread and is protected by international copyright, trademark,
              and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              5. Limitation of Liability
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall VoidThread or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on VoidThread's website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms and conditions are governed by and construed in
              accordance with the laws of the jurisdiction in which VoidThread
              operates and you irrevocably submit to the exclusive jurisdiction
              of the courts in that State or location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              VoidThread may revise these Terms of Service for its website at
              any time without notice. By using this website you are agreeing to
              be bound by the then current version of these Terms of Service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
