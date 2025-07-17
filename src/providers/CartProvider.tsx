import { CartItem, Product } from "@/types";
import * as Crypto from "expo-crypto";
import { useContext, createContext, PropsWithChildren, useState } from "react";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (id: string, quantity: number) => void;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
});
const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    const newCartItem: CartItem = {
      id: Crypto.randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    setItems([...items, newCartItem]);
  };

  const updateQuantity = (id: string, quantity: number) => {
    
  };

  console.log(items);
  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
