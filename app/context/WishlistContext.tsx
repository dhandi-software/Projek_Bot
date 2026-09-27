import React, { createContext, useContext, useState } from "react";
import type { WishlistItem } from "~/types/wishlist";

interface WishlistContextType {
    items: WishlistItem[];
    addToWishlist: (product: {
        id: string;
        name: string;
        price: number;
        image: string;
        originalPrice?: number;
        stockStatus?: "IN STOCK" | "OUT OF STOCK";
    }) => void;
    removeItem: (id: string) => void;
    clearAll: () => void;
    resetToDefault: () => void;
    isInWishlist: (id: string) => boolean;
    wishlistCount: number;
}

const INITIAL_WISHLIST_ITEMS: WishlistItem[] = [];

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<WishlistItem[]>(INITIAL_WISHLIST_ITEMS);

    const addToWishlist = (product: {
        id: string;
        name: string;
        price: number;
        image: string;
        originalPrice?: number;
        stockStatus?: "IN STOCK" | "OUT OF STOCK";
    }) => {
        setItems((prev) => {
            const exists = prev.some((item) => item.id === product.id);
            if (exists) {
                // If exists, toggle remove
                return prev.filter((item) => item.id !== product.id);
            }
            return [
                ...prev,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    originalPrice: product.originalPrice,
                    stockStatus: product.stockStatus || "IN STOCK",
                },
            ];
        });
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearAll = () => {
        setItems([]);
    };

    const resetToDefault = () => {
        setItems(INITIAL_WISHLIST_ITEMS);
    };

    const isInWishlist = (id: string) => {
        return items.some((item) => item.id === id);
    };

    return (
        <WishlistContext.Provider
            value={{
                items,
                addToWishlist,
                removeItem,
                clearAll,
                resetToDefault,
                isInWishlist,
                wishlistCount: items.length,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlistContext() {
    const context = useContext(WishlistContext);
    if (!context) {
        return {
            items: INITIAL_WISHLIST_ITEMS,
            addToWishlist: () => {},
            removeItem: () => {},
            clearAll: () => {},
            resetToDefault: () => {},
            isInWishlist: () => false,
            wishlistCount: INITIAL_WISHLIST_ITEMS.length,
        };
    }
    return context;
}
