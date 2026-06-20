import {
  Hero,
  NewArrivals,
  FeaturedCollections,
  NewsletterSection,
} from "@/components/home";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <NewArrivals />
      <FeaturedCollections />
      <NewsletterSection />
    </div>
  );
}
