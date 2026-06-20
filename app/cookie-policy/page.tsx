import { Metadata } from "next";
import { PageHeader } from "@/common/components/header";

export const metadata: Metadata = {
  title: "Cookie Policy | VoidThread",
  description:
    "Learn about how VoidThread uses cookies and similar technologies on our website.",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Cookie Policy"
        description="Learn about how VoidThread uses cookies and similar technologies on our website."
      />
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <p className="text-muted-foreground mb-12 italic text-sm">
          Last Updated: June 7, 2026
        </p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. What Are Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookies are small pieces of text sent by your web browser by a
              website you visit. A cookie file is stored in your web browser and
              allows the Site or a third-party to recognize you and make your
              next visit easier and the Site more useful to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              2. How VoidThread Uses Cookies
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you use and access the Site, we may place a number of cookies
              files in your web browser. We use cookies for the following
              purposes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>To enable certain functions of the Site.</li>
              <li>To provide analytics.</li>
              <li>To store your preferences.</li>
              <li>
                To enable advertisements delivery, including behavioral
                advertising.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              3. Types of Cookies We Use
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use both session and persistent cookies on the Site and we use
              different types of cookies to run the Site:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                <strong>Essential cookies:</strong> We may use essential cookies
                to authenticate users and prevent fraudulent use of user
                accounts.
              </li>
              <li>
                <strong>Preferences cookies:</strong> We may use preferences
                cookies to remember information that changes the way the Site
                behaves or looks, such as the "remember me" functionality.
              </li>
              <li>
                <strong>Analytics cookies:</strong> We may use analytics cookies
                to track information how the Site is used so that we can make
                improvements. We may also use analytics cookies to test new
                advertisements, pages, features or new functionality of the Site
                to see how our users react to them.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Third-party Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              In addition to our own cookies, we may also use various
              third-parties cookies to report usage statistics of the Site,
              deliver advertisements on and through the Site, and so on.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              5. What Are Your Choices Regarding Cookies
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you'd like to delete cookies or instruct your web browser to
              delete or refuse cookies, please visit the help pages of your web
              browser. Please note, however, that if you delete cookies or
              refuse to accept them, you might not be able to use all of the
              features we offer, you may not be able to store your preferences,
              and some of our pages might not display properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about our Cookie Policy, please contact
              us at:
              <br />
              <span className="font-semibold text-foreground">
                cookies@voidthread.com
              </span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
