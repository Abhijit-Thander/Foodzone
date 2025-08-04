import { Database } from "./database.types";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

export type Product = {
  id: number;
  image: string | null;
  name: string;
  price: number;
  description: string;
  rating: number;
  isVeg: boolean;
  restaurantName: string;
  deliveryTime: number;
  discount?: number;
};

export type PizzaSize = "S" | "M" | "L" | "XL";

export type CartItem = {
  id: string;
  product: Tables<"products">;
  product_id: number;
  size: PizzaSize;
  quantity: number;
};

export const OrderStatusList: OrderStatus[] = [
  "new",
  "cooking",
  "delivering",
  "delivered",
];

export type OrderStatus = "new" | "cooking" | "delivering" | "delivered";

export type Order = {
  id: number;
  created_at: string;
  total: number;
  user_id: string;
  status: OrderStatus;
  order_items?: OrderItem[];
};

export type OrderItem = {
  id: number;
  product_id: number;
  products: Product;
  order_id: number;
  size: PizzaSize;
  quantity: number;
};

export type Profile = {
  id: string;
  group: string;
};
