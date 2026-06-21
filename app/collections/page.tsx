import { PageHeader } from "@/common/components/header";
import { CollectionCard } from "@/common/components/collection/CollectionCard";
import { BrandEthos } from "@/common/components/brand/BrandEthos";
import collectionsData from "@/temp/collections.json";
import type { ICollection } from "@/types/collection";

export default function CollectionsPage() {
  const collections = (collectionsData as ICollection[]).map((c) => ({
    title: c.name,
    description: "",
    image: c.banner_img,
    href: `/collections/${c.slug}`,
    count: `${c.product_ids.length} ${c.product_ids.length === 1 ? "Product" : "Products"}`,
  }));

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Our Collections"
        description="Discover the VoidThread aesthetic through our curated collections. From oversized silhouettes to artistic graphics, find the core of your wardrobe."
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection) => (
              <CollectionCard key={collection.href} {...collection} />
            ))}
          </div>
        </div>
      </section>

      <BrandEthos />
    </div>
  );
}
