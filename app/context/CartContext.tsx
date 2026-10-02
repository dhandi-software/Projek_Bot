import React, { createContext, useContext, useState } from "react";
import { Toast } from "~/components/ui/toast";

export interface CartItem {
  id: string;
  title: string;
  price: string;
  numericPrice: number;
  image: string;
  quantity: number;
  selected?: boolean;
}

export interface ToastNotice {
  id: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  selectedItems: CartItem[];
  addToCart: (product: { id: string; title: string; price: string; image: string }, quantityToAdd?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  setQuantity: (id: string, qty: number) => void;
  toggleSelectItem: (id: string) => void;
  toggleSelectAll: (forceState?: boolean) => void;
  removePurchasedItems: (purchasedItems?: { id?: string | number; product_id?: string | number }[]) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
  selectedTotalCount: number;
  selectedTotalPrice: number;
  isAllSelected: boolean;
  lastAddedItem: string | null;
  toastNotice: ToastNotice | null;
  dismissToast: () => void;
}

const initialCartItems: CartItem[] = [];

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("shopping_cart");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            return parsed.map((item) => ({
              ...item,
              selected: item.selected !== false,
            }));
          }
        }
      } catch (e) {
        console.error("Gagal membaca keranjang dari localStorage:", e);
      }
    }
    return initialCartItems;
  });
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null);
  const [toastNotice, setToastNotice] = useState<ToastNotice | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("shopping_cart", JSON.stringify(cartItems));
      } catch (e) {
        console.error("Gagal menyimpan keranjang ke localStorage:", e);
      }
    }
  }, [cartItems]);

  const parseNumericPrice = (priceStr: string): number => {
    if (!priceStr) return 0;
    if (priceStr.includes("$")) {
      const cleaned = priceStr.replace(/[^0-9.]/g, "");
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 100000 : Math.round(parsed * 15000);
    }
    const cleaned = priceStr.replace(/[^0-9]/g, "");
    const parsed = parseInt(cleaned, 10);
    return isNaN(parsed) ? 0 : parsed;
  };

  const addToCart = (
    product: { id: string; title: string; price: string; image: string },
    quantityToAdd: number = 1
  ) => {
    const qty = Math.max(1, quantityToAdd);
    let finalQty = qty;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        finalQty = updated[existingIndex].quantity + qty;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: finalQty,
          selected: true,
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
            quantity: qty,
            selected: true,
          },
        ];
      }
    });

    setLastAddedItem(product.title);
    setToastNotice({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: finalQty,
    });

    setTimeout(() => {
      setLastAddedItem(null);
    }, 3500);
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

  const setQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: qty };
        }
        return item;
      })
    );
  };

  const toggleSelectItem = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: item.selected === false ? true : false } : item
      )
    );
  };

  const toggleSelectAll = (forceState?: boolean) => {
    setCartItems((prevItems) => {
      const allSelected = prevItems.length > 0 && prevItems.every((item) => item.selected !== false);
      const nextState = forceState !== undefined ? forceState : !allSelected;
      return prevItems.map((item) => ({ ...item, selected: nextState }));
    });
  };

  const removePurchasedItems = (purchasedItems?: { id?: string | number; product_id?: string | number; title?: string }[]) => {
    setCartItems((prevItems) => {
      if (purchasedItems && purchasedItems.length > 0) {
        const purchasedIds = new Set(
          purchasedItems.map((it) => String(it.id !== undefined ? it.id : it.product_id))
        );
        const purchasedTitles = new Set(
          purchasedItems.map((it) => it.title).filter(Boolean)
        );
        return prevItems.filter(
          (item) => !purchasedIds.has(String(item.id)) && !purchasedTitles.has(item.title) && item.selected === false
        );
      }
      return prevItems.filter((item) => item.selected === false);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("shopping_cart");
      } catch (e) {
        console.error("Gagal menghapus keranjang dari localStorage:", e);
      }
    }
  };

  const dismissToast = () => {
    setToastNotice(null);
  };

  const selectedItems = cartItems.filter((item) => item.selected !== false);
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.numericPrice * item.quantity, 0);
  const selectedTotalCount = selectedItems.reduce((acc, item) => acc + item.quantity, 0);
  const selectedTotalPrice = selectedItems.reduce((acc, item) => acc + item.numericPrice * item.quantity, 0);
  const isAllSelected = cartItems.length > 0 && cartItems.every((item) => item.selected !== false);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        selectedItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        setQuantity,
        toggleSelectItem,
        toggleSelectAll,
        removePurchasedItems,
        clearCart,
        totalCount,
        totalPrice,
        selectedTotalCount,
        selectedTotalPrice,
        isAllSelected,
        lastAddedItem,
        toastNotice,
        dismissToast,
      }}
    >
      {children}

      {/* Global Toast Notification using User's Toast Component (Positioned Below Header) */}
      {toastNotice && (
        <div className="fixed top-32 md:top-36 right-6 z-[9999] animate-in fade-in slide-in-from-top-5 duration-300">
          <Toast
            title={`Berhasil ditambahkan ke keranjang! ${toastNotice.title} (${toastNotice.quantity}x)`}
            variant="success"
            duration={3500}
            onClose={dismissToast}
          />
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    return {
      cartItems: initialCartItems,
      selectedItems: initialCartItems,
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      setQuantity: () => {},
      toggleSelectItem: () => {},
      toggleSelectAll: () => {},
      removePurchasedItems: () => {},
      clearCart: () => {},
      totalCount: 0,
      totalPrice: 0,
      selectedTotalCount: 0,
      selectedTotalPrice: 0,
      isAllSelected: false,
      lastAddedItem: null,
      toastNotice: null,
      dismissToast: () => {},
    };
  }
  return context;
}
