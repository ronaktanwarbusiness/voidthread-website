"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Star,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tshirtImage =
  "https://res.cloudinary.com/dwx8nsy4v/image/upload/v1779468923/hope-oversized_goqyqq.png";

const productData = {
  name: "Heavyweight Boxy Tee",
  price: 45.0,
  description:
    "The foundation of a modern wardrobe. Our signature heavyweight tee is engineered for the perfect boxy silhouette, crafted from 300GSM premium organic cotton that holds its shape wash after wash.",
  rating: 4.9,
  reviews: 128,
  category: "Oversized Essentials",
  colors: [
    { name: "Void Black", hex: "#000000" },
    { name: "Desert Sand", hex: "#d2b48c" },
    { name: "Slate Grey", hex: "#708090" },
  ],
  sizes: ["S", "M", "L", "XL", "XXL"],
  details: [
    "300 GSM Heavyweight Jersey",
    "100% Organic Cotton",
    "Pre-shrunk for minimal shrinkage",
    "Drop shoulder boxy fit",
    'Thick 1.2" ribbing on neck',
  ],
};

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [selectedSize, setSelectedSize] = React.useState("M");
  const [selectedColor, setSelectedColor] = React.useState(
    productData.colors[0],
  );
  const [quantity, setQuantity] = React.useState(1);
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  return (
    <div className="min-h-screen bg-background pt-12 pb-8 md:pt-24 md:pb-16">
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-8">
          <a href="/" className="hover:text-primary transition-colors">
            Home
          </a>
          <ChevronRight className="h-3 w-3" />
          <a
            href="/collections/new-drops"
            className="hover:text-primary transition-colors"
          >
            Collections
          </a>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{productData.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-muted border border-border/50 shadow-2xl shadow-primary/5">
              <Image
                src={tshirtImage}
                alt={productData.name}
                fill
                className="object-cover"
                priority
              />
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-6 right-6 h-12 w-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md border-none shadow-sm hover:scale-105 transition-all group"
              >
                <Heart
                  className={cn(
                    "h-6 w-6 transition-colors",
                    isWishlisted
                      ? "fill-red-500 text-red-500"
                      : "text-foreground group-hover:text-red-500",
                  )}
                />
              </button>
            </div>

            {/* Thumbnail Placeholders */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-2xl bg-muted border border-border/50 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={tshirtImage}
                    alt="Thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
                    {productData.category}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                    {productData.name}
                  </h1>
                </div>
                <button className="h-10 w-10 flex items-center justify-center rounded-full bg-muted/50 hover:bg-muted transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold">
                    {productData.rating}
                  </span>
                </div>
                <span className="text-muted-foreground text-sm font-medium">
                  ({productData.reviews} reviews)
                </span>
              </div>

              <span className="text-3xl font-bold">
                ${productData.price.toFixed(2)}
              </span>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg max-w-xl">
              {productData.description}
            </p>

            {/* Selection Options */}
            <div className="flex flex-col gap-6 pt-4">
              {/* Colors */}
              <div className="flex flex-col gap-3">
                <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Color: {selectedColor.name}
                </span>
                <div className="flex items-center gap-3">
                  {productData.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "h-8 w-8 rounded-full border-2 transition-all",
                        selectedColor.name === color.name
                          ? "border-primary scale-110"
                          : "border-transparent",
                      )}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Select Size
                  </span>
                  <Link
                    href="/size-guide"
                    className="text-xs font-bold underline underline-offset-4 hover:text-primary transition-colors"
                  >
                    Size Guide
                  </Link>
                </div>
                <div className="flex flex-wrap gap-3">
                  {productData.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "h-12 w-16 rounded-xl border-2 font-bold transition-all",
                        selectedSize === size
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border/50 hover:border-primary/50",
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex flex-col gap-3">
                <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Quantity
                </span>
                <div className="flex items-center w-32 h-12 rounded-xl border border-border/50 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex-1 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex-1 flex items-center justify-center font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex-1 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button className="flex-1 h-14 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] p-3">
                <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-14 rounded-2xl text-lg font-bold border-2 transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary p-3"
              >
                Buy Now
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t mt-4">
              <div className="flex flex-col gap-2 items-center text-center">
                <Truck className="h-6 w-6 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Free Shipping
                </span>
                <span className="text-[10px] text-muted-foreground">
                  On all orders over $100
                </span>
              </div>
              <div className="flex flex-col gap-2 items-center text-center">
                <RotateCcw className="h-6 w-6 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  30-Day Returns
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Easy returns & exchanges
                </span>
              </div>
              <div className="flex flex-col gap-2 items-center text-center">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Secure Payment
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Cashfree & Razorpay
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs (Simplified for now) */}
        <div className="mt-24 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">Technical Details</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
            {productData.details.map((detail, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-muted-foreground"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
