export interface IProduct {
  id: string;
  name: string;
  slug: string;
  selling_price: string;
  original_price?: string;
  category: string;
  images: string[];
}
