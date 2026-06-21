"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ProductCardProps = {
  id: string;
  name: string;
  slug: string;
  selling_price: number;
  original_price?: number;
  images?: string[];
  rating?: number;
  badge?: string;
  variant?: "default" | "compact";
  category?: string;
};

export function ProductCard({
  id,
  name,
  slug,
  selling_price,
  original_price,
  images,
  badge,
  variant = "default",
  category = "OVERSIZED",
}: ProductCardProps) {
  const isCompact = variant === "compact";

  console.log({ images });

  return (
    <div key={id} className="group relative">
      <Link href={`/products/${slug}`} className="block">
        <div
          className={cn(
            "relative aspect-square overflow-hidden bg-muted mb-6",
            isCompact ? "rounded-3xl" : "rounded-[2rem]",
          )}
        >
          <Image
            src={images?.[0] || ""}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {badge ? (
            <div className="absolute top-4 left-4 z-10">
              <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold text-black shadow-sm">
                {badge}
              </div>
            </div>
          ) : null}

          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="secondary"
              size="icon"
              className={cn(
                "rounded-full bg-white/90 backdrop-blur-md border-none shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300",
                isCompact ? "h-10 w-10" : "h-11 w-11",
              )}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Heart className="h-5 w-5 text-foreground" />
            </Button>
          </div>

          <div className="absolute inset-x-4 bottom-4 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <Button
              className={cn(
                "w-full rounded-2xl shadow-primary/20",
                isCompact
                  ? "h-12 shadow-xl"
                  : "h-14 shadow-2xl text-md font-bold",
              )}
            >
              <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </div>
        </div>
      </Link>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center gap-2">
          <div>
            <span
              className={cn(
                "text-xs uppercase tracking-widest text-muted-foreground mb-1 block",
                isCompact ? "font-medium" : "font-bold",
              )}
            >
              {category}
            </span>
            <Link href={`/products/${slug}`}>
              <h3
                className={cn(
                  "hover:text-primary transition-colors leading-tight line-clamp-1",
                  isCompact ? "font-semibold text-lg" : "font-bold text-lg",
                )}
              >
                {name}
              </h3>
            </Link>
          </div>
          <div className="flex flex-col items-end">
            <span
              className={cn(
                isCompact ? "font-bold text-lg" : "font-bold text-xl",
              )}
            >
              ₹{selling_price}
            </span>
            {original_price ? (
              <span className="text-xs text-muted-foreground line-through">
                ₹{original_price}
              </span>
            ) : null}
          </div>
        </div>

        {/* {isCompact ? (
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{5}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < Math.floor(5)
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted",
                  )}
                />
              ))}
            </div>
            <span className="text-xs font-bold">{5}</span>
          </div>
        )} */}
      </div>
    </div>
  );
}
