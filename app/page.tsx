import { Hero, NewArrivals, FeaturedCollections } from "@/components/home";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <NewArrivals />
      <FeaturedCollections />
      
      {/* Newsletter Section */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Join the Void</h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
            Subscribe to receive updates on new drops, exclusive collections, and avant-garde inspiration.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 h-14 rounded-full bg-zinc-900 border-zinc-800 px-6 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            <button className="h-14 px-8 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-all">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
