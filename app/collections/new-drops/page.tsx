"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/common/components/header";
import { ProductCard } from "@/common/components/product/ProductCard";
import newDropsData from "@/temp/new-drops.json";

const tshirtImage =
  "https://res.cloudinary.com/dwx8nsy4v/image/upload/v1779468923/hope-oversized_goqyqq.png";

const baseProducts = newDropsData.map((p) => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  selling_price: p.selling_price,
  original_price: p.original_price,
  category: "Oversized",
  images: p.images || [tshirtImage],
  createdAt: p.createdAt,
  updatedAt: p.updatedAt,
}));

export default function NewDropsPage() {
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortedProducts = useMemo(() => {
    return [...baseProducts].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Collection Header */}
      <PageHeader
        title="New Drops"
        description="Explore our latest avant-garde T-shirt collection. Each piece is crafted with heavyweight premium cotton and designed for a perfect boxy fit."
        badge="Latest Release"
      />

      {/* Toolbar */}
      <div className="sticky top-16.25 md:top-19 z-30 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            <div className="hidden md:flex items-center gap-4 text-xs font-medium text-muted-foreground">
              <span>{sortedProducts.length} Products</span>
            </div>
          </div>

          <div className="flex items-center gap-2 relative">
            <span className="text-xs font-medium text-muted-foreground hidden sm:inline">
              Sort by:
            </span>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-1 text-sm font-semibold hover:text-primary transition-colors min-w-20 justify-end"
            >
              {sortBy === "newest" ? "Newest" : "Oldest"}{" "}
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  isSortOpen && "rotate-180",
                )}
              />
            </button>

            {/* Simple Sort Dropdown */}
            {isSortOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsSortOpen(false)}
                />
                <div className="absolute top-full right-0 mt-2 w-40 bg-background border rounded-xl shadow-xl z-50 overflow-hidden">
                  <button
                    onClick={() => {
                      setSortBy("newest");
                      setIsSortOpen(false);
                    }}
                    className={cn(
                      "w-full px-4 py-3 text-sm text-left hover:bg-muted transition-colors font-medium relative z-50",
                      sortBy === "newest" && "text-primary bg-primary/5",
                    )}
                  >
                    Newest
                  </button>
                  <button
                    onClick={() => {
                      setSortBy("oldest");
                      setIsSortOpen(false);
                    }}
                    className={cn(
                      "w-full px-4 py-3 text-sm text-left hover:bg-muted transition-colors font-medium relative z-50",
                      sortBy === "oldest" && "text-primary bg-primary/5",
                    )}
                  >
                    Oldest
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} {...product} badge="NEW" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
