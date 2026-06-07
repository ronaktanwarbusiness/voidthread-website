import { Metadata } from "next";
import { PageHeader } from "@/common/components/page-header";

export const metadata: Metadata = {
  title: "Privacy Policy | VoidThread",
  description:
    "Learn how VoidThread collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Privacy Policy"
        description="Learn how VoidThread collects, uses, and protects your personal information."
      />
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <p className="text-muted-foreground mb-12 italic text-sm">
          Last Updated: June 7, 2026
        </p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              At VoidThread, we respect your privacy and are committed to
              protecting your personal data. This Privacy Policy will inform you
              as to how we look after your personal data when you visit our
              website and tell you about your privacy rights and how the law
              protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. The Data We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may collect, use, store and transfer different kinds of
              personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                <strong>Identity Data:</strong> includes first name, last name,
                username or similar identifier.
              </li>
              <li>
                <strong>Contact Data:</strong> includes billing address,
                delivery address, email address and telephone numbers.
              </li>
              <li>
                <strong>Financial Data:</strong> includes payment card details.
              </li>
              <li>
                <strong>Transaction Data:</strong> includes details about
                payments to and from you and other details of products you have
                purchased from us.
              </li>
              <li>
                <strong>Technical Data:</strong> includes internet protocol (IP)
                address, your login data, browser type and version, time zone
                setting and location, browser plug-in types and versions,
                operating system and platform, and other technology on the
                devices you use to access this website.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              3. How We Use & Share Your Data
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We will only use your personal data when the law allows us to.
              Most commonly, we will use your personal data in the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>To register you as a new customer.</li>
              <li>
                To process and deliver your order including managing payments,
                fees and charges.
              </li>
              <li>
                To manage our relationship with you which will include notifying
                you about changes to our terms or privacy policy.
              </li>
              <li>
                To use data analytics to improve our website, products/services,
                marketing, customer relationships and experiences.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              For payment processing, your data is shared with our trusted
              payment partners, <strong>Cashfree</strong> and{" "}
              <strong>Razorpay</strong>. They process your payment information
              according to their own privacy policies and industry standards
              (PCI-DSS).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We have put in place appropriate security measures to prevent your
              personal data from being accidentally lost, used or accessed in an
              unauthorized way, altered or disclosed. In addition, we limit
              access to your personal data to those employees, agents,
              contractors and other third parties who have a business need to
              know.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Your Legal Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              Under certain circumstances, you have rights under data protection
              laws in relation to your personal data, including the right to
              request access, correction, erasure, restriction, transfer, to
              object to processing, to portability of data and (where the lawful
              ground of processing is consent) to withdraw consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this privacy policy or our privacy
              practices, please contact us at:
              <br />
              <span className="font-semibold text-foreground">
                privacy@voidthread.com
              </span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
