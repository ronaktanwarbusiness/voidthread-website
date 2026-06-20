import Image from "next/image";

const tshirtImage =
  "https://res.cloudinary.com/dwx8nsy4v/image/upload/v1779468923/hope-oversized_goqyqq.png";

export function BrandEthos() {
  return (
    <section className="py-24 bg-primary text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">
              Crafted for the{" "}
              <span className="italic font-serif text-white/80">
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
  );
}
