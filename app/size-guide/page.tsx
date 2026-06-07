import { Metadata } from "next";
import { PageHeader } from "@/common/components/page-header";

export const metadata: Metadata = {
  title: "Size Guide | VoidThread",
  description:
    "Find the perfect fit with our comprehensive T-shirt size guide.",
};

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Size Guide"
        description="Find the perfect fit with our comprehensive T-shirt size guide."
      />
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <p className="text-muted-foreground mb-12 italic text-sm">
          Our T-shirts are designed with a modern, slightly oversized fit.
        </p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">Heavyweight Boxy Tee</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-4 font-bold text-foreground">Size</th>
                    <th className="py-4 font-bold text-foreground">
                      Chest (inches)
                    </th>
                    <th className="py-4 font-bold text-foreground">
                      Length (inches)
                    </th>
                    <th className="py-4 font-bold text-foreground">
                      Sleeve (inches)
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b text-sm">
                    <td className="py-4 font-medium text-foreground">Small</td>
                    <td className="py-4">42"</td>
                    <td className="py-4">27"</td>
                    <td className="py-4">8.5"</td>
                  </tr>
                  <tr className="border-b text-sm">
                    <td className="py-4 font-medium text-foreground">Medium</td>
                    <td className="py-4">44"</td>
                    <td className="py-4">28"</td>
                    <td className="py-4">9"</td>
                  </tr>
                  <tr className="border-b text-sm">
                    <td className="py-4 font-medium text-foreground">Large</td>
                    <td className="py-4">46"</td>
                    <td className="py-4">29"</td>
                    <td className="py-4">9.5"</td>
                  </tr>
                  <tr className="border-b text-sm">
                    <td className="py-4 font-medium text-foreground">
                      X-Large
                    </td>
                    <td className="py-4">48"</td>
                    <td className="py-4">30"</td>
                    <td className="py-4">10"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How to Measure</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-foreground uppercase tracking-wider">
                  1. Chest
                </h3>
                <p className="text-muted-foreground">
                  Measure around the fullest part of your chest, keeping the
                  tape horizontal.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-foreground uppercase tracking-wider">
                  2. Length
                </h3>
                <p className="text-muted-foreground">
                  Measure from the highest point of the shoulder down to the
                  bottom hem.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-foreground uppercase tracking-wider">
                  3. Sleeve
                </h3>
                <p className="text-muted-foreground">
                  Measure from the shoulder seam to the end of the sleeve.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-muted/50 p-8 rounded-3xl border">
            <h2 className="text-xl font-bold mb-4">Fit Recommendation</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our T-shirts are designed for a relaxed, boxy fit. If you prefer a
              more tailored look, we recommend sizing down. If you want a truly
              oversized look, stick to your regular size or size up.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
