import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CollectionCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  className?: string;
}

export function CollectionCard({
  title,
  description,
  image,
  href,
  className,
}: CollectionCardProps) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-[2.5rem] bg-muted h-75 lg:h-full ${className ?? ""}`}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-8 left-8 right-8 text-white">
        <h3 className="text-2xl font-bold mb-1">{title}</h3>
        <p className="text-white/70 mb-4 text-sm max-w-xs">{description}</p>
        <div className="inline-flex items-center gap-2 font-semibold text-sm group/btn">
          Explore Collection
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
