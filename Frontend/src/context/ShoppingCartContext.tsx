import { createContext } from "react";

export interface ShoppingCartItem {
  id: number;
  name: string;
  amount: number;
  type: string;
}

export interface ShoppingCartContextType {
  cart: ShoppingCartItem[];
  setCart: (item: ShoppingCartItem[]) => void;
}

const defaultShoppingCartContext: ShoppingCartContextType = {
  cart: [],
  setCart: () => {},
};

const ShoppingCartContext = createContext<ShoppingCartContextType>(
  defaultShoppingCartContext
);

export default ShoppingCartContext;
