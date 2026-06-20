"use client";

export function NewsletterSection() {
  return (
    <section className="py-16 lg:py-24 bg-primary text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Join the Void</h2>
        <p className="text-zinc-300 text-lg mb-10 max-w-2xl mx-auto">
          Subscribe to receive updates on new drops, exclusive collections, and
          avant-garde inspiration.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-md text-white border focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white text-primary font-semibold rounded-md hover:bg-zinc-100 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
