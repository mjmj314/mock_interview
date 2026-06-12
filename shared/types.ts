export type ItemCategory =
  | "electronics"
  | "books"
  | "clothing"
  | "home"
  | "toys"
  | "sports";

export type ItemStatus = "active" | "inactive" | "discontinued";

export interface Item {
  id: number;
  name: string;
  value: number;
  description: string;
  category: ItemCategory;
  status: ItemStatus;
}
