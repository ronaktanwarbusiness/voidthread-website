import { SectionHeader } from "@/common/components/header";
import { CollectionCard } from "@/common/components/collection/CollectionCard";
import collectionsData from "@/temp/collections.json";

export function FeaturedCollections() {
  const collections = collectionsData.slice(0, 4).map((c) => ({
    title: c.name,
    description: "",
    image: c.banner_img,
    href: `/collections/${c.slug}`,
    count: `${c.product_ids.length} ${c.product_ids.length === 1 ? "Product" : "Products"}`,
  }));

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
            <CollectionCard key={collection.href} {...collection} />
          ))}
        </div>
      </div>
    </section>
  );
}
