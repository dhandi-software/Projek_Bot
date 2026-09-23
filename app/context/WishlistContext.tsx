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

const INITIAL_WISHLIST_ITEMS: WishlistItem[] = [
    {
        id: "wish-1",
        name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear Headphones for Workouts and Running, Triple Black",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80",
        price: 999.0,
        originalPrice: 1299.0,
        stockStatus: "IN STOCK",
    },
    {
        id: "wish-2",
        name: "Simple Mobile 5G LTE Galexy 12 Mini 512GB Gaming Phone",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80",
        price: 2300.0,
        stockStatus: "IN STOCK",
    },
    {
        id: "wish-3",
        name: "Portable Wshing Machine, 11lbs capacity Model 18NMFIAM",
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&auto=format&fit=crop&q=80",
        price: 70.0,
        stockStatus: "IN STOCK",
    },
    {
        id: "wish-4",
        name: "TOZO T6 True Wireless Earbuds Bluetooth Headphones Touch Control with Wireless Charging Case IPX8 Waterproof Stereo Earphones in-Ear",
        image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500&auto=format&fit=crop&q=80",
        price: 220.0,
        originalPrice: 250.0,
        stockStatus: "OUT OF STOCK",
    },
    {
        id: "wish-5",
        name: "Wyze Cam Pan v2 1080p Pan/Tilt/Zoom Wi-Fi Indoor Smart Home Camera with Color Night Vision, 2-Way Audio",
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format&fit=crop&q=80",
        price: 1499.99,
        stockStatus: "IN STOCK",
    },
];

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
