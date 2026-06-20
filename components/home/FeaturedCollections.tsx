"use client";

import { SectionHeader } from "@/common/components/header";
import { CollectionCard } from "@/common/components/collection/CollectionCard";

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection) => (
            <CollectionCard key={collection.title} {...collection} />
          ))}
        </div>
      </div>
    </section>
  );
}
