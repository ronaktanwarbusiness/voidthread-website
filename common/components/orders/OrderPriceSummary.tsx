import type { OrderPriceBreakup } from "@/types/order";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function Row({
  label,
  value,
  bold,
  green,
}: {
  label: string;
  value: string;
  bold?: boolean;
  green?: boolean;
}) {
  return (
    <div className={`flex justify-between text-sm ${bold ? "font-bold" : ""}`}>
      <span className={green ? "text-green-600" : "text-muted-foreground"}>
        {label}
      </span>
      <span className={green ? "text-green-600 font-semibold" : ""}>{value}</span>
    </div>
  );
}

export function OrderPriceSummary({ breakup }: { breakup: OrderPriceBreakup }) {
  return (
    <div className="bg-muted/20 border border-border/50 rounded-[2rem] p-6 md:p-8">
      <h2 className="font-bold text-lg mb-6">Price Summary</h2>
      <div className="space-y-3">
        <Row
          label="Subtotal"
          value={formatCurrency(breakup.original_total)}
        />
        <Row
          label={`Discount`}
          value={`− ${formatCurrency(breakup.discount_total)}`}
          green
        />
        <Row
          label={`Tax (${breakup.tax_percentage}%)`}
          value={formatCurrency(breakup.tax_total)}
        />
        <div className="border-t border-border/40 pt-3 mt-1">
          <Row
            label="Grand Total"
            value={formatCurrency(breakup.grand_total)}
            bold
          />
        </div>
      </div>
    </div>
  );
}
