import { useState } from "react";
import type { CompareItem } from "~/types/compare";

const INITIAL_COMPARE_ITEMS: CompareItem[] = [
    {
        id: "cmp-1",
        name: "Gamdias ARES M2 Gaming Keyboard, Mouse and Mouse Mat Combo",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80",
        price: 899.0,
        rating: 5,
        ratingCount: 51746385,
        soldBy: "Clicon",
        brand: "StarTech",
        model: "ARES M2 and ZEUS E2",
        stockStatus: "IN STOCK",
        size: "6.71 inches, 110.5 cm",
        weight: "650 g (7.41 oz)",
    },
    {
        id: "cmp-2",
        name: "Apple iMac 24\" 4K Retina Display M1 8 Core CPU, 8 Core GPU, 256GB SSD, Blue (MGPK3ZP/A) 2021",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80",
        price: 1699.0,
        rating: 5,
        ratingCount: 673971743,
        soldBy: "Apple",
        brand: "Apple",
        model: "Apple iMac 24\" M1 Blue 2021",
        stockStatus: "IN STOCK",
        size: "6.7 inches, 109.8 cm",
        weight: "240 g (8.47 oz)",
    },
    {
        id: "cmp-3",
        name: "Samsung Galaxy S21 FE 5G Cell Phone, Factory Unlocked Android Smartphone, 128GB, 120Hz Display.",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=80",
        price: 699.99,
        rating: 5,
        ratingCount: 96459761,
        soldBy: "Clicon",
        brand: "Samsung",
        model: "S21 FE",
        stockStatus: "OUT OF STOCK",
        size: "6.4 inches, 98.9 cm",
        weight: "177 g (6.24 oz)",
    },
];

export function useCompare() {
    const [items, setItems] = useState<CompareItem[]>(INITIAL_COMPARE_ITEMS);

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearAll = () => {
        setItems([]);
    };

    const resetToDefault = () => {
        setItems(INITIAL_COMPARE_ITEMS);
    };

    return {
        items,
        removeItem,
        clearAll,
        resetToDefault,
    };
}
