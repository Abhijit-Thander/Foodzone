import { useContext, createContext, PropsWithChildren } from "react";

const CartContext = createContext({});
const CartProvider = ({ children }: PropsWithChildren) => {
  return (
    <CartContext.Provider value={{ items: [], onAddItem: () => {} }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
