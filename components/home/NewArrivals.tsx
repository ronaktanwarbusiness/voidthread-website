"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  },
  {
    id: 2,
    name: "Minimalist Graphic Tee",
    price: "$38.00",
    category: "Graphic",
    image: tshirtImage,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Vintage Wash Essential",
    price: "$42.00",
    category: "Essential",
    image: tshirtImage,
    rating: 5.0,
  },
  {
    id: 4,
    name: "Premium Pima Cotton Tee",
    price: "$55.00",
    category: "Luxury",
    image: tshirtImage,
    rating: 4.7,
  },
];

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
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted mb-6">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 z-10">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full h-10 w-10 bg-white/80 backdrop-blur-md border-none shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Heart className="h-5 w-5 text-foreground" />
                  </Button>
                </div>
                <div className="absolute inset-x-4 bottom-4 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Button className="w-full h-12 rounded-2xl shadow-xl shadow-primary/20">
                    <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1 block">
                      {product.category}
                    </span>
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                  </div>
                  <span className="font-bold text-lg">{product.price}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
