import type { ColorName } from "@/utils/product";

export interface IVariant {
  id: string;
  color: ColorName;
  size: "S" | "M" | "L" | "XL" | "XXL";
  sku: string;
  stock: number;
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  images: string[];
  product_id: string;
}
