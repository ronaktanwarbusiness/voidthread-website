export interface ICollection {
  id: string;
  name: string;
  slug: string;
  product_ids: string[];
  banner_img: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  __v: number;
}
