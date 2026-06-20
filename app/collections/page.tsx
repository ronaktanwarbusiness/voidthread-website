import Image from "next/image";
import { PageHeader } from "@/common/components/header";
import { CollectionCard } from "@/common/components/collection/CollectionCard";

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
            {collections.map((collection) => (
              <CollectionCard key={collection.title} {...collection} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Ethos Section */}
      <section className="py-24 bg-primary text-white">
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
