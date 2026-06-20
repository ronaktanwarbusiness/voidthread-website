import { MapPin } from "lucide-react";
import type { OrderAddress } from "@/types/order";

export function OrderAddressCard({
  address,
  label,
}: {
  address: OrderAddress;
  label: string;
}) {
  return (
    <div className="bg-muted/20 border border-border/50 rounded-[2rem] p-6 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-4 w-4 text-primary" />
        <h2 className="font-bold text-lg">{label}</h2>
      </div>
      <div className="space-y-1 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">{address.full_name}</p>
        <p>{address.phone}</p>
        <p>{address.address_line1}</p>
        {address.address_line2 && <p>{address.address_line2}</p>}
        {address.landmark && <p>Near {address.landmark}</p>}
        <p>
          {address.city}, {address.state} — {address.pincode}
        </p>
        <p>{address.country}</p>
      </div>
    </div>
  );
}
