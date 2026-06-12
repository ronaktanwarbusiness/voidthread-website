import Link from "next/link";
import { AlertCircle, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CartLoading() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-4">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="h-40 animate-pulse rounded-[2rem] bg-muted"
          />
        ))}
      </div>
      <div className="h-80 animate-pulse rounded-[2rem] bg-muted" />
    </div>
  );
}

export function EmptyCart() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center rounded-[2.5rem] border border-border/60 bg-muted/30 px-6 py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background shadow-sm">
        <ShoppingBag className="h-8 w-8 text-primary" />
      </div>
      <h2 className="mt-6 text-3xl font-bold tracking-tight">
        Your cart is empty
      </h2>
      <p className="mt-3 max-w-md text-muted-foreground">
        Explore the latest VoidThread drops and add something worth wearing on
        repeat.
      </p>
      <Button asChild className="mt-8 h-11 rounded-2xl px-6 font-bold">
        <Link href="/collections/new-drops">
          Shop New Drops
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

export function CartError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center rounded-[2.5rem] border border-destructive/20 bg-destructive/5 px-6 py-14 text-center">
      <AlertCircle className="h-10 w-10 text-destructive" />
      <h2 className="mt-5 text-2xl font-bold">Could not load your cart</h2>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      <Button onClick={onRetry} className="mt-6 h-10 rounded-xl px-5">
        Try Again
      </Button>
    </div>
  );
}
