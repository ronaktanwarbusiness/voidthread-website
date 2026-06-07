"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border/50 text-xs font-medium tracking-wider uppercase mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          The Ultimate Tee Drop is Live
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 max-w-5xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          Redefining the <span className="italic font-serif text-primary">Essentials</span> of Streetwear.
        </h1>

        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          VoidThread crafts premium, heavyweight t-shirts designed to be the core of your wardrobe. 
          Unmatched quality, timeless silhouettes.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
          <Link href="/collections/new-drops">
            <Button size="lg" className="h-12 px-8 rounded-full text-base shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all">
              Shop New Drops <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="h-12 px-8 rounded-full text-base border-2">
            View Collections
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <div className="w-px h-12 bg-foreground" />
      </div>
    </section>
  )
}
