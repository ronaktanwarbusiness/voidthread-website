"use client";

import * as React from "react";
import { CheckCircle2, MapPin, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAddresses, useCreateAddress } from "@/hooks/address";
import { AddressType, type Address, type CreateAddressInput } from "@/types/address";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

const emptyForm: CreateAddressInput = {
  full_name: "",
  phone: "",
  address_line1: "",
  address_line2: "",
  landmark: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",
  type: AddressType.SHIPPING,
  is_default: false,
};

function AddressForm({
  type,
  onSave,
  onCancel,
  isPending,
}: {
  type: AddressType;
  onSave: (data: CreateAddressInput) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const [form, setForm] = React.useState<CreateAddressInput>({
    ...emptyForm,
    type,
  });

  const set = (key: keyof CreateAddressInput, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 sm:col-span-1">
          <input
            required
            placeholder="Full name"
            value={form.full_name}
            onChange={(e) => set("full_name", e.target.value)}
            className="input-field"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <input
            required
            placeholder="Phone number"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      <input
        required
        placeholder="Address line 1"
        value={form.address_line1}
        onChange={(e) => set("address_line1", e.target.value)}
        className="input-field w-full"
      />

      <input
        placeholder="Address line 2 (optional)"
        value={form.address_line2 ?? ""}
        onChange={(e) => set("address_line2", e.target.value)}
        className="input-field w-full"
      />

      <input
        placeholder="Landmark (optional)"
        value={form.landmark ?? ""}
        onChange={(e) => set("landmark", e.target.value)}
        className="input-field w-full"
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          required
          placeholder="City"
          value={form.city}
          onChange={(e) => set("city", e.target.value)}
          className="input-field"
        />
        <select
          required
          value={form.state}
          onChange={(e) => set("state", e.target.value)}
          className="input-field appearance-none"
        >
          <option value="" disabled>
            State
          </option>
          {INDIAN_STATES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          required
          placeholder="Pincode"
          value={form.pincode}
          maxLength={6}
          onChange={(e) => set("pincode", e.target.value.replace(/\D/g, ""))}
          className="input-field"
        />
        <input
          placeholder="Country"
          value={form.country ?? "India"}
          onChange={(e) => set("country", e.target.value)}
          className="input-field"
        />
      </div>

      <div className="flex gap-3 pt-1">
        <Button type="submit" disabled={isPending} className="h-9 rounded-xl text-sm">
          {isPending ? "Saving..." : "Save address"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="h-9 rounded-xl text-sm"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

function SavedAddressCard({
  address,
  selected,
  onSelect,
}: {
  address: Address;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-2xl border p-4 text-left transition-colors ${
        selected
          ? "border-primary bg-primary/5"
          : "border-border/60 hover:border-primary/40"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-medium">{address.full_name}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{address.phone}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {address.address_line1}
            {address.address_line2 ? `, ${address.address_line2}` : ""}
          </p>
          <p className="text-sm text-muted-foreground">
            {address.city}, {address.state} — {address.pincode}
          </p>
        </div>
        {selected && (
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        )}
      </div>
    </button>
  );
}

function AddressBlock({
  type,
  label,
  addresses,
  selectedId,
  onSelect,
  enabled,
  isLoadingAddresses,
}: {
  type: AddressType;
  label: string;
  addresses: Address[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  enabled: boolean;
  isLoadingAddresses: boolean;
}) {
  const [showForm, setShowForm] = React.useState(false);
  const createAddress = useCreateAddress();

  const filtered = addresses.filter((a) => a.type === type);

  React.useEffect(() => {
    if (!isLoadingAddresses && filtered.length === 0 && enabled) setShowForm(true);
  }, [isLoadingAddresses, filtered.length, enabled]);

  const handleSave = (data: CreateAddressInput) => {
    createAddress.mutate(
      { ...data, type },
      {
        onSuccess: (res) => {
          toast.success("Address saved");
          setShowForm(false);
          onSelect(res.data._id);
        },
        onError: (err) => toast.error(err.message),
      },
    );
  };

  if (!enabled) return null;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <MapPin className="h-4 w-4 text-primary" />
          {label}
        </h3>
        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" />
            Add new
          </button>
        )}
      </div>

      {filtered.length > 0 && !showForm && (
        <div className="space-y-2">
          {filtered.map((addr) => (
            <SavedAddressCard
              key={addr._id}
              address={addr}
              selected={selectedId === addr._id}
              onSelect={() => onSelect(addr._id)}
            />
          ))}
        </div>
      )}

      {showForm && (
        <AddressForm
          type={type}
          onSave={handleSave}
          onCancel={() => filtered.length > 0 && setShowForm(false)}
          isPending={createAddress.isPending}
        />
      )}
    </div>
  );
}

interface AddressSectionProps {
  onAddressChange: (shippingId: string | null, billingId: string | null) => void;
  enabled: boolean;
  initialAddresses?: Address[];
}

export function AddressSection({ onAddressChange, enabled, initialAddresses }: AddressSectionProps) {
  const { data: addresses = [], isLoading } = useAddresses(enabled, initialAddresses);
  const [shippingId, setShippingId] = React.useState<string | null>(null);
  const [billingId, setBillingId] = React.useState<string | null>(null);
  const [sameBilling, setSameBilling] = React.useState(true);

  React.useEffect(() => {
    const defaultShipping =
      addresses.find((a) => a.type === AddressType.SHIPPING && a.is_default) ??
      addresses.find((a) => a.type === AddressType.SHIPPING) ??
      null;
    const defaultBilling =
      addresses.find((a) => a.type === AddressType.BILLING && a.is_default) ??
      addresses.find((a) => a.type === AddressType.BILLING) ??
      null;

    if (defaultShipping) setShippingId(defaultShipping._id);
    if (defaultBilling) setBillingId(defaultBilling._id);
  }, [addresses]);

  React.useEffect(() => {
    onAddressChange(shippingId, sameBilling ? shippingId : billingId);
  }, [shippingId, billingId, sameBilling, onAddressChange]);

  if (!enabled) return null;

  return (
    <section className="rounded-[2rem] border border-border/60 bg-muted/30 p-6">
      <h2 className="mb-6 text-xl font-bold tracking-tight">Delivery Details</h2>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <AddressBlock
            type={AddressType.SHIPPING}
            label="Shipping address"
            addresses={addresses}
            selectedId={shippingId}
            onSelect={setShippingId}
            enabled={enabled}
            isLoadingAddresses={isLoading}
          />

          <div>
            <button
              type="button"
              onClick={() => setSameBilling((v) => !v)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <div
                className={`flex h-4 w-4 items-center justify-center rounded border ${
                  sameBilling ? "border-primary bg-primary" : "border-border"
                }`}
              >
                {sameBilling && (
                  <svg
                    className="h-2.5 w-2.5 text-primary-foreground"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M1.5 5L4 7.5L8.5 2.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              Billing address same as shipping
            </button>
          </div>

          {!sameBilling && (
            <AddressBlock
              type={AddressType.BILLING}
              label="Billing address"
              addresses={addresses}
              selectedId={billingId}
              onSelect={setBillingId}
              enabled={!sameBilling}
              isLoadingAddresses={isLoading}
            />
          )}
        </div>
      )}
    </section>
  );
}
