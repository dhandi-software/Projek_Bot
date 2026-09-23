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
  updateQuantity: (id: string, delta: number) => void;
  totalCount: number;
  totalPrice: number;
  lastAddedItem: string | null;
}

const initialCartItems: CartItem[] = [
  {
    id: "chk-1",
    title: "4K UHD LED Smart TV with Chromecast Built-in",
    price: "Rp 1.050.000",
    numericPrice: 1050000,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&auto=format&fit=crop&q=80",
    quantity: 1,
  },
  {
    id: "chk-2",
    title: "Wired Over-Ear Gaming Headphones with USB",
    price: "Rp 3.750.000",
    numericPrice: 3750000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80",
    quantity: 3,
  },
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null);

  const parseNumericPrice = (priceStr: string): number => {
    if (priceStr.includes("$")) {
      const cleaned = priceStr.replace(/[^0-9.]/g, "");
      const parsed = parseFloat(cleaned);
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

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.numericPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
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
      updateQuantity: () => {},
      totalCount: 4,
      totalPrice: 12300000,
      lastAddedItem: null,
    };
  }
  return context;
}
