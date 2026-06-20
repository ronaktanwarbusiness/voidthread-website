"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/common/components/header";

const tshirtImage =
  "https://res.cloudinary.com/dwx8nsy4v/image/upload/v1779468923/hope-oversized_goqyqq.png";

const collections = [
  {
    title: "New Drops",
    description: "The latest avant-garde releases and limited editions.",
    image: tshirtImage,
    href: "/collections/new-drops",
    count: "8 Products",
    color: "bg-zinc-900",
  },
  {
    title: "Oversized Essentials",
    description: "Relaxed silhouettes for the modern urban explorer.",
    image: tshirtImage,
    href: "/collections/oversized",
    count: "12 Products",
    color: "bg-zinc-100",
  },
  {
    title: "Graphic Series",
    description: "Artistic expressions on premium heavyweight cotton.",
    image: tshirtImage,
    href: "/collections/graphic",
    count: "6 Products",
    color: "bg-zinc-200",
  },
  {
    title: "Premium Basics",
    description: "The ultimate foundation for your daily rotation.",
    image: tshirtImage,
    href: "/collections/basics",
    count: "15 Products",
    color: "bg-zinc-50",
  },
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <PageHeader
        title="Our Collections"
        description="Discover the VoidThread aesthetic through our curated collections. From oversized silhouettes to artistic graphics, find the core of your wardrobe."
      />

      {/* Collections Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection, index) => (
              <Link
                key={collection.title}
                href={collection.href}
                className="group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-muted aspect-[16/10] md:aspect-auto md:h-[500px]"
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                  <div className="flex flex-col gap-2 mb-6">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/60">
                      {collection.count}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                      {collection.title}
                    </h2>
                    <p className="text-lg text-white/70 max-w-md line-clamp-2">
                      {collection.description}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 font-bold text-sm md:text-base group/btn">
                    Explore Collection
                    <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transition-all group-hover/btn:bg-white group-hover/btn:text-black">
                      <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Ethos Section */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">
                Crafted for the{" "}
                <span className="italic font-serif text-primary">
                  Unconventional
                </span>
                .
              </h2>
              <div className="space-y-6 text-zinc-400 text-lg">
                <p>
                  At VoidThread, we don't just make T-shirts. We engineer
                  garments that define an era. Every collection is a result of
                  meticulous design and a commitment to quality that lasts.
                </p>
                <p>
                  Our heavyweight cotton is sourced sustainably, and our
                  silhouettes are perfected over months of sampling to ensure
                  the ideal boxy, modern fit.
                </p>
              </div>
            </div>
            <div className="relative aspect-square rounded-[3rem] overflow-hidden">
              <Image
                src={tshirtImage}
                alt="Brand Ethos"
                fill
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
