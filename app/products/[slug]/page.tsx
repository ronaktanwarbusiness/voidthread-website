"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Star,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { COLOR_CODES, getProduct, type ColorName } from "@/utils/product";
import { useVariant } from "@/hooks/variant";
import { useAddToCart } from "@/hooks/cart";
import type { IVariant } from "@/types/variant";
import { toast } from "sonner";

const tshirtImage =
  "https://res.cloudinary.com/dwx8nsy4v/image/upload/v1779468923/hope-oversized_goqyqq.png";

const defaultSizes: IVariant["size"][] = ["S", "M", "L", "XL", "XXL"];
const productDetails = [
  "240-300 GSM premium cotton feel",
  "Relaxed oversized streetwear fit",
  "Soft breathable fabric for daily wear",
  "Durable stitching with premium finishing",
  "Designed for a clean modern silhouette",
];

function formatPrice(price?: number) {
  if (typeof price !== "number") {
    return "";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductDetailPage() {
  const params = useParams();

  const { slug } = params || {};

  const product = getProduct(slug as string);

  const { data: variants = [], isLoading: variantsLoading } = useVariant(
    product?.slug,
  );

  const [selectedSize, setSelectedSize] = React.useState<IVariant["size"] | "">(
    "",
  );

  const [selectedColorName, setSelectedColorName] = React.useState<
    ColorName | ""
  >("");

  const [selectedImage, setSelectedImage] = React.useState("");

  const [quantity, setQuantity] = React.useState(1);

  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const addToCart = useAddToCart();

  const purchasableVariants = variants.filter(
    (variant) => variant.status === "ACTIVE" && variant.stock > 0,
  );

  const availableColors = Array.from(
    new Set(purchasableVariants.map((variant) => variant.color)),
  );

  const firstAvailableVariant = defaultSizes
    .map((size) => purchasableVariants.find((variant) => variant.size === size))
    .find((variant) => variant !== undefined);

  const effectiveColorName =
    selectedColorName || firstAvailableVariant?.color || "";

  const effectiveSize =
    selectedSize ||
    defaultSizes.find((size) =>
      purchasableVariants.some(
        (variant) =>
          variant.color === effectiveColorName && variant.size === size,
      ),
    ) ||
    "";

  const availableSizes = new Set(
    purchasableVariants
      .filter((variant) => variant.color === effectiveColorName)
      .map((variant) => variant.size),
  );

  const selectedVariant = purchasableVariants.find(
    (variant) =>
      variant.color === effectiveColorName && variant.size === effectiveSize,
  );

  console.log({ selectedVariant });

  const galleryImages = selectedVariant?.images.length
    ? selectedVariant.images
    : purchasableVariants.find(
        (variant) =>
          variant.color === effectiveColorName && variant.images.length,
      )?.images || [];

  const displayedImage = selectedImage || galleryImages[0] || tshirtImage;

  const selectColor = (color: ColorName) => {
    setSelectedColorName(color);

    const matchingVariants = purchasableVariants.filter(
      (variant) => variant.color === color,
    );

    if (
      selectedSize &&
      !matchingVariants.some((variant) => variant.size === selectedSize)
    ) {
      setSelectedSize("");
    }

    setSelectedImage(
      matchingVariants.find((variant) => variant.images.length)?.images[0] ||
        tshirtImage,
    );
  };

  const selectSize = (size: IVariant["size"]) => {
    setSelectedSize(size);

    const matchingVariant = purchasableVariants.find(
      (variant) =>
        variant.size === size && variant.color === effectiveColorName,
    );

    if (!selectedColorName && matchingVariant) {
      setSelectedColorName(matchingVariant.color);
    }

    if (matchingVariant?.images[0]) {
      setSelectedImage(matchingVariant.images[0]);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant) {
      return;
    }

    addToCart.mutate(
      {
        product_id: selectedVariant.product_id,
        variant_id: selectedVariant.id,
        quantity,
      },
      {
        onSuccess: () => toast.success("Added to cart"),
        onError: (error) => toast.error(error.message),
      },
    );
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background pt-12 pb-8 md:pt-24 md:pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-xl rounded-[2rem] border border-border/50 bg-muted/30 p-8 md:p-10">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
              Product Not Found
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tighter">
              This product is not available right now.
            </h1>
            <p className="mt-4 text-muted-foreground">
              The product data was not found in the prebuilt catalog. Please go
              back to collections and try another item.
            </p>
            <Button asChild className="mt-8 rounded-2xl px-6">
              <Link href="/collections/new-drops">Back to New Drops</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-12 pb-8 md:pt-24 md:pb-16">
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            href="/collections/new-drops"
            className="hover:text-primary transition-colors"
          >
            Collections
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-muted border border-border/50 shadow-2xl shadow-primary/5">
              <Image
                src={displayedImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-6 right-6 h-12 w-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md border-none shadow-sm hover:scale-105 transition-all group"
              >
                <Heart
                  className={cn(
                    "h-6 w-6 transition-colors",
                    isWishlisted
                      ? "fill-red-500 text-red-500"
                      : "text-foreground group-hover:text-red-500",
                  )}
                />
              </button>
            </div>

            {galleryImages.length > 1 ? (
              <div className="grid grid-cols-4 gap-4">
                {galleryImages.map((image, index) => (
                  <button
                    type="button"
                    key={`${image}-${index}`}
                    onClick={() => setSelectedImage(image)}
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-2xl bg-muted border-2 cursor-pointer hover:opacity-80 transition-all",
                      displayedImage === image
                        ? "border-primary"
                        : "border-border/50",
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
                    Premium Streetwear
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                    {product.name}
                  </h1>
                </div>
                <button className="h-10 w-10 flex items-center justify-center rounded-full bg-muted/50 hover:bg-muted transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold">5.0</span>
                </div>
                <span className="text-muted-foreground text-sm font-medium">
                  Premium quality
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">
                  {formatPrice(product.selling_price)}
                </span>
                {product.original_price > product.selling_price ? (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.original_price)}
                  </span>
                ) : null}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg max-w-xl">
              {product.description}
            </p>

            {/* Selection Options */}
            <div className="flex flex-col gap-6 pt-4">
              {/* Colors */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Color:{" "}
                    {effectiveColorName
                      ? effectiveColorName.replaceAll("_", " ")
                      : "Select a color"}
                  </span>
                  {variantsLoading ? (
                    <span className="text-xs text-muted-foreground">
                      Loading variants...
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {availableColors.map((color) => (
                    <button
                      type="button"
                      key={color}
                      title={color.replaceAll("_", " ")}
                      aria-label={`Select ${color.replaceAll("_", " ")}`}
                      aria-pressed={effectiveColorName === color}
                      onClick={() => selectColor(color)}
                      className={cn(
                        "h-9 w-9 rounded-full border-2 ring-offset-2 ring-offset-background transition-all",
                        effectiveColorName === color
                          ? "border-background ring-2 ring-primary scale-110"
                          : "border-border hover:scale-105",
                      )}
                      style={{ backgroundColor: COLOR_CODES[color] }}
                    />
                  ))}
                  {!variantsLoading && availableColors.length === 0 ? (
                    <span className="text-sm text-muted-foreground">
                      No colors currently available
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Sizes */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Select Size
                  </span>
                  <Link
                    href="/size-guide"
                    className="text-xs font-bold underline underline-offset-4 hover:text-primary transition-colors"
                  >
                    Size Guide
                  </Link>
                </div>
                <div className="flex flex-wrap gap-3">
                  {defaultSizes.map((size) => {
                    const isAvailable = availableSizes.has(size);

                    return (
                      <button
                        type="button"
                        key={size}
                        disabled={!isAvailable}
                        aria-pressed={effectiveSize === size}
                        onClick={() => selectSize(size)}
                        className={cn(
                          "h-12 w-16 rounded-xl border-2 font-bold transition-all",
                          effectiveSize === size
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border/50 hover:border-primary/50",
                          !isAvailable &&
                            "cursor-not-allowed opacity-35 hover:border-border/50",
                        )}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex flex-col gap-3">
                <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Quantity
                </span>
                <div className="flex items-center w-32 h-12 rounded-xl border border-border/50 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex-1 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex-1 flex items-center justify-center font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex-1 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                disabled={!selectedVariant || addToCart.isPending}
                onClick={handleAddToCart}
                className="flex-1 h-14 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] p-3"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {addToCart.isPending ? "Adding..." : "Add to Cart"}
              </Button>
              <Button
                variant="outline"
                disabled={!selectedVariant}
                className="flex-1 h-14 rounded-2xl text-lg font-bold border-2 transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary p-3"
              >
                Buy Now
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t mt-4">
              <div className="flex flex-col gap-2 items-center text-center">
                <Truck className="h-6 w-6 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Free Shipping
                </span>
                <span className="text-[10px] text-muted-foreground">
                  On all orders over $100
                </span>
              </div>
              <div className="flex flex-col gap-2 items-center text-center">
                <RotateCcw className="h-6 w-6 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  30-Day Returns
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Easy returns & exchanges
                </span>
              </div>
              <div className="flex flex-col gap-2 items-center text-center">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Secure Payment
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Cashfree & Razorpay
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs (Simplified for now) */}
        <div className="mt-24 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">Technical Details</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
            {productDetails.map((detail, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-muted-foreground"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
