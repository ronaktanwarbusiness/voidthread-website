"use client";

import Link from "next/link";
import { ProductCard } from "@/common/components/product/ProductCard";
import newDropsData from "@/temp/new-drops.json";

const tshirtImage =
  "https://res.cloudinary.com/dwx8nsy4v/image/upload/v1779468923/hope-oversized_goqyqq.png";

export function NewArrivals() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              New Arrivals
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Freshly dropped pieces from our latest drop. Explore the new
              aesthetic of the season.
            </p>
          </div>
          <Link
            href="/collections/new-drops"
            className="text-primary font-semibold hover:underline underline-offset-8 transition-all"
          >
            View all products →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newDropsData.slice(0, 4).map((product) => (
            <ProductCard key={product.id} {...product} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
