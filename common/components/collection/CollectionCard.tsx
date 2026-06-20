import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollectionCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  count?: string;
  className?: string;
}

export function CollectionCard({
  title,
  description,
  image,
  href,
  count,
  className,
}: CollectionCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-muted aspect-auto h-80 md:h-125",
        className,
      )}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
        <div className="flex flex-col gap-2 mb-6">
          {count && (
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/60">
              {count}
            </span>
          )}
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            {title}
          </h2>
          <p className="text-lg text-white/70 max-w-md line-clamp-2">
            {description}
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
  );
}
