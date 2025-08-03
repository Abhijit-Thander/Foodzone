// import { Tables } from "@/database.types";
import { CartItem, Tables } from "@/types";
import * as Crypto from "expo-crypto";
import { useContext, createContext, PropsWithChildren, useState } from "react";

type Product = Tables<"products">;

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (Itemid: string, quantity: -1 | 1) => void;
  total: number;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
});
const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: Crypto.randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    setItems([...items, newCartItem]);
  };

  //update quantity
  const updateQuantity = (Itemid: string, quantity: -1 | 1) => {
    const updatedItems = items
      .map((item) =>
        item.id !== Itemid
          ? item
          : { ...item, quantity: item.quantity + quantity }
      )
      .filter((item) => item.quantity > 0);
    setItems(updatedItems);
  };

  // Total Price
  const total = items.reduce(
    (sum, item) => (sum += item.product.price  * item.quantity),
    0
  );
  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
