"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Star,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/common/components/page-header";

const tshirtImage =
  "https://res.cloudinary.com/dwx8nsy4v/image/upload/v1779468923/hope-oversized_goqyqq.png";

const products = [
  {
    id: 1,
    name: "Heavyweight Boxy Tee",
    price: "$45.00",
    category: "Oversized",
    image: tshirtImage,
    rating: 4.9,
    isNew: true,
  },
  {
    id: 2,
    name: "Minimalist Graphic Tee",
    price: "$38.00",
    category: "Graphic",
    image: tshirtImage,
    rating: 4.8,
    isNew: true,
  },
  {
    id: 3,
    name: "Vintage Wash Essential",
    price: "$42.00",
    category: "Essential",
    image: tshirtImage,
    rating: 5.0,
    isNew: true,
  },
  {
    id: 4,
    name: "Premium Pima Cotton Tee",
    price: "$55.00",
    category: "Luxury",
    image: tshirtImage,
    rating: 4.7,
    isNew: true,
  },
  {
    id: 5,
    name: "Distressed Street Tee",
    price: "$48.00",
    category: "Oversized",
    image: tshirtImage,
    rating: 4.6,
    isNew: true,
  },
  {
    id: 6,
    name: "Abstract Art Tee",
    price: "$40.00",
    category: "Graphic",
    image: tshirtImage,
    rating: 4.9,
    isNew: true,
  },
  {
    id: 7,
    name: "Carbon Black Basic",
    price: "$35.00",
    category: "Essential",
    image: tshirtImage,
    rating: 4.8,
    isNew: true,
  },
  {
    id: 8,
    name: "Desert Sand Oversize",
    price: "$50.00",
    category: "Oversized",
    image: tshirtImage,
    rating: 4.7,
    isNew: true,
  },
];

export default function NewDropsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Collection Header */}
      <PageHeader
        title="New Drops"
        description="Explore our latest avant-garde T-shirt collection. Each piece is crafted with heavyweight premium cotton and designed for a perfect boxy fit."
        badge="Latest Release"
      />

      {/* Toolbar */}
      <div className="sticky top-[65px] md:top-[76px] z-30 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            <div className="hidden md:flex items-center gap-4 text-xs font-medium text-muted-foreground">
              <span>{products.length} Products</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground hidden sm:inline">
              Sort by:
            </span>
            <button className="flex items-center gap-1 text-sm font-semibold hover:text-primary transition-colors">
              Newest <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <Link href={`/products/${product.id}`} className="block">
                  <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-muted mb-6">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold text-black shadow-sm">
                        NEW
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 z-10">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full h-11 w-11 bg-white/90 backdrop-blur-md border-none shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                        onClick={(e) => {
                          e.preventDefault();
                          // Wishlist logic
                        }}
                      >
                        <Heart className="h-5 w-5 text-foreground" />
                      </Button>
                    </div>

                    <div className="absolute inset-x-4 bottom-4 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <Button className="w-full h-14 rounded-2xl shadow-2xl shadow-primary/20 text-md font-bold">
                        <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
                      </Button>
                    </div>
                  </div>
                </Link>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1 block">
                        {product.category}
                      </span>
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-bold text-lg hover:text-primary transition-colors leading-tight">
                          {product.name}
                        </h3>
                      </Link>
                    </div>
                    <span className="font-bold text-xl">{product.price}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-3.5 w-3.5",
                            i < Math.floor(product.rating)
                              ? "fill-primary text-primary"
                              : "fill-muted text-muted",
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold">{product.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination Placeholder */}
      <div className="container mx-auto px-6 pb-24 flex justify-center">
        <Button
          variant="outline"
          className="h-14 px-12 rounded-2xl text-lg font-bold border-2"
        >
          Load More Products
        </Button>
      </div>
    </div>
  );
}
