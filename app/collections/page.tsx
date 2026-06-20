import { PageHeader } from "@/common/components/header";
import { CollectionCard } from "@/common/components/collection/CollectionCard";
import { BrandEthos } from "@/common/components/brand/BrandEthos";

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

      <BrandEthos />
    </div>
  );
}
