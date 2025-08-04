// import { Tables } from "@/database.types";
import { useInsertOrders } from "@/api/orders";
import { useInsertOrdersItems } from "@/api/orders-items";
import { CartItem, Tables } from "@/types";
import * as Crypto from "expo-crypto";
import { router } from "expo-router";
import { useContext, createContext, PropsWithChildren, useState } from "react";

type Product = Tables<"products">;

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (Itemid: string, quantity: -1 | 1) => void;
  total: number;
  checkout: () => void;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});
const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const { mutate: insertOrder } = useInsertOrders();
  const { mutate: insertOrderItems } = useInsertOrdersItems();

  const addItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product_id === product.id && item.size === size
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
    (sum, item) => (sum += (item.product.price ?? 0) * item.quantity),
    0
  );

  const clearCart = () => {
    setItems([]);
  };

  const checkout = () => {
    insertOrder(
      { total },
      {
        onSuccess: saveOrdersItems,
      }
    );
  };

  const saveOrdersItems = (order: Tables<"orders">) => {
    const orderItems = items.map((cartitem) => ({
      order_id: order.id,
      product_id: cartitem.product_id,
      quantity: cartitem.quantity,
      size: cartitem.size,
    }));
    insertOrderItems(orderItems, {
      onSuccess() {
        clearCart();
        router.push(`/(user)/orders/${order.id}`);
      },
    });
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
