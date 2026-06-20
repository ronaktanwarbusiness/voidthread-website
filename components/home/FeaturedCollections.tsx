"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/common/components/header";

const tshirtImage =
  "https://res.cloudinary.com/dwx8nsy4v/image/upload/v1779468923/hope-oversized_goqyqq.png";

const collections = [
  {
    title: "Oversized Essentials",
    description: "Relaxed silhouettes for the modern urban explorer.",
    image: tshirtImage,
    href: "/collections/oversized",
    size: "large",
  },
  {
    title: "Graphic Series",
    description: "Artistic expressions on premium cotton.",
    image: tshirtImage,
    href: "/collections/graphic",
    size: "small",
  },
  {
    title: "Premium Basics",
    description: "The ultimate foundation for your daily rotation.",
    image: tshirtImage,
    href: "/collections/basics",
    size: "small",
  },
];

export function FeaturedCollections() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <SectionHeader
            title="Featured Collections"
            description="Each piece is part of a larger story. Explore our curated selections for every occasion."
          />
        </div>

        <div className="grid grid-cols-1 gap-8 h-auto lg:h-175">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            {collections.map((collection) => (
              <Link
                key={collection.title}
                href={collection.href}
                className="group relative overflow-hidden rounded-[2.5rem] bg-muted h-[300px] lg:h-full"
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-2xl font-bold mb-1">
                    {collection.title}
                  </h3>
                  <p className="text-white/70 mb-4 text-sm max-w-xs">
                    {collection.description}
                  </p>
                  <div className="inline-flex items-center gap-2 font-semibold text-sm group/btn">
                    Explore Collection
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
