"use client";

import { useState, useMemo } from "react";
import { notFound, useParams } from "next/navigation";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/common/components/header";
import { ProductCard } from "@/common/components/product/ProductCard";
import type { ICollection } from "@/types/collection";

const tshirtImage =
  "https://res.cloudinary.com/dwx8nsy4v/image/upload/v1779468923/hope-oversized_goqyqq.png";

export default function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let collectionData: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let collectionMeta: any = null;

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    collectionData = require(`@/temp/${slug}.json`);
  } catch {
    notFound();
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const collections: ICollection[] = require("@/temp/collections.json");
    collectionMeta = collections.find((c) => c.slug === slug);
  } catch {
    // collections.json may not exist yet
  }

  const products = collectionData.map(
    (p: {
      id: string;
      name: string;
      slug: string;
      selling_price: number;
      original_price: number;
      images?: string[];
      createdAt: string;
      updatedAt: string;
    }) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      selling_price: p.selling_price,
      original_price: p.original_price,
      images: p.images || [tshirtImage],
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }),
  );

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [products, sortBy]);

  const title = collectionMeta?.name ?? slug
    .split("-")
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={title} description={collectionMeta?.description ?? ""} />

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
              {sortBy === "newest" ? "Newest" : "Oldest"}
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  isSortOpen && "rotate-180",
                )}
              />
            </button>

            {isSortOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsSortOpen(false)}
                />
                <div className="absolute top-full right-0 mt-2 w-40 bg-background border rounded-xl shadow-xl z-50 overflow-hidden">
                  {(["newest", "oldest"] as const).map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsSortOpen(false);
                      }}
                      className={cn(
                        "w-full px-4 py-3 text-sm text-left hover:bg-muted transition-colors font-medium relative z-50",
                        sortBy === option && "text-primary bg-primary/5",
                      )}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          {sortedProducts.length === 0 ? (
            <p className="text-center text-muted-foreground py-24">
              No products in this collection yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
