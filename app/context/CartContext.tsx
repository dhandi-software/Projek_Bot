import React, { createContext, useContext, useState } from "react";

export interface CartItem {
  id: string;
  title: string;
  price: string;
  numericPrice: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: { id: string; title: string; price: string; image: string }) => void;
  removeFromCart: (id: string) => void;
  totalCount: number;
  totalPrice: number;
  lastAddedItem: string | null;
}

const initialCartItems: CartItem[] = [
  {
    id: "item-smartwatch",
    title: "Smart Watch Wireless Series 7",
    price: "Rp 450.000",
    numericPrice: 450000,
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=400&q=80",
    quantity: 1,
  },
  {
    id: "item-[#1B6392]",
    title: "Headphone Noise Cancelling",
    price: "Rp 850.000",
    numericPrice: 850000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    quantity: 1,
  },
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null);

  const parseNumericPrice = (priceStr: string): number => {
    // Check if price is in dollars (e.g. "$70", "$2,300")
    if (priceStr.includes("$")) {
      const cleaned = priceStr.replace(/[^0-9.]/g, "");
      const parsed = parseFloat(cleaned);
      // Convert to IDR approx or return numeric
      return isNaN(parsed) ? 100000 : Math.round(parsed * 15000);
    }
    const cleaned = priceStr.replace(/[^0-9]/g, "");
    const parsed = parseInt(cleaned, 10);
    return isNaN(parsed) ? 100000 : parsed;
  };

  const addToCart = (product: { id: string; title: string; price: string; image: string }) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      } else {
        const numPrice = parseNumericPrice(product.price);
        return [
          ...prevItems,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            numericPrice: numPrice,
            image: product.image,
            quantity: 1,
          },
        ];
      }
    });

    setLastAddedItem(product.title);
    setTimeout(() => setLastAddedItem(null), 3000);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.numericPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        totalCount,
        totalPrice,
        lastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    return {
      cartItems: initialCartItems,
      addToCart: () => {},
      removeFromCart: () => {},
      totalCount: 2,
      totalPrice: 1300000,
      lastAddedItem: null,
    };
  }
  return context;
}
