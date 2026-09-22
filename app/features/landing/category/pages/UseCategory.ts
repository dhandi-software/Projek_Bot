import * as React from "react";
import { useSearchParams } from "react-router";

export const CATEGORY_NAMES: Record<string, string> = {
  electronics: "Electronics Devices",
  "computer-laptop": "Computer & Laptop",
  "computer-acc": "Computer Accessories",
  smartphone: "SmartPhone",
  headphone: "Headphone",
  "mobile-acc": "Mobile Accessories",
  "gaming-console": "Gaming Console",
  "camera-photo": "Camera & Photo",
  "tv-appliances": "TV & Homes Appliances",
  "watches-acc": "Watchs & Accessories",
  "gps-navigation": "GPS & Navigation",
  "wearable-tech": "Wearable Technology",
};

export const SAMPLE_PRODUCTS = [
  {
    id: "1",
    title: "MacBook Pro M3 Max 16-inch (36GB RAM, 1TB SSD) - Space Black",
    price: "$2,499",
    originalPrice: "$2,899",
    rating: "4.9",
    badge: "14% OFF",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    specs: "M3 Max / 36GB RAM / 1TB SSD",
  },
  {
    id: "2",
    title: "MacBook Pro M3 Pro 14-inch (18GB RAM, 512GB SSD) - Silver",
    price: "$1,999",
    originalPrice: "$2,199",
    rating: "4.8",
    badge: "Best Seller",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
    specs: "M3 Pro / 18GB RAM / 512GB SSD",
  },
  {
    id: "3",
    title: "MacBook Air 15-inch M3 Chip (16GB RAM, 512GB SSD) - Midnight",
    price: "$1,499",
    originalPrice: "$1,699",
    rating: "4.9",
    badge: "12% OFF",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80",
    specs: "M3 / 16GB RAM / 512GB SSD",
  },
  {
    id: "4",
    title: "MacBook Air 13-inch M3 Chip (8GB RAM, 256GB SSD) - Starlight",
    price: "$1,099",
    originalPrice: "$1,199",
    rating: "4.7",
    badge: "Popular",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1515343480029-43cdfe6b6aae?auto=format&fit=crop&w=800&q=80",
    specs: "M3 / 8GB RAM / 256GB SSD",
  },
  {
    id: "5",
    title: "MacBook Pro 16-inch M3 Max (64GB Unified Memory, 2TB SSD)",
    price: "$3,499",
    originalPrice: "$3,899",
    rating: "5.0",
    badge: "Ultimate Pro",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    specs: "M3 Max / 64GB RAM / 2TB SSD",
  },
  {
    id: "6",
    title: "MacBook Pro 14-inch M3 Standard (8GB RAM, 512GB SSD) - Space Gray",
    price: "$1,599",
    originalPrice: "$1,799",
    rating: "4.8",
    badge: "HOT",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?auto=format&fit=crop&w=800&q=80",
    specs: "M3 / 8GB RAM / 512GB SSD",
  },
  {
    id: "7",
    title: "MacBook Air 13-inch M2 Chip (8GB RAM, 256GB SSD) - Space Gray",
    price: "$999",
    originalPrice: "$1,099",
    rating: "4.8",
    badge: "Best Value",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1537498425277-c283d32ef9db?auto=format&fit=crop&w=800&q=80",
    specs: "M2 / 8GB RAM / 256GB SSD",
  },
  {
    id: "8",
    title: "MacBook Pro 16-inch M2 Max (32GB RAM, 1TB SSD) - Space Gray",
    price: "$2,299",
    originalPrice: "$2,699",
    rating: "4.9",
    badge: "Special Deal",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    specs: "M2 Max / 32GB RAM / 1TB SSD",
  },
];

export function useCategory() {
  const [searchParams] = useSearchParams();
  const paramCat = searchParams.get("category");
  const paramSearch = searchParams.get("search");

  const [showMobileFilter, setShowMobileFilter] = React.useState(false);

  const [selectedCatId, setSelectedCatId] = React.useState(() => {
    if (paramCat) {
      const lower = paramCat.toLowerCase();
      const foundKey = Object.keys(CATEGORY_NAMES).find(
        (key) => key === lower || CATEGORY_NAMES[key].toLowerCase() === lower
      );
      return foundKey || "electronics";
    }
    return "electronics";
  });

  React.useEffect(() => {
    if (paramCat) {
      const lower = paramCat.toLowerCase();
      const foundKey = Object.keys(CATEGORY_NAMES).find(
        (key) => key === lower || CATEGORY_NAMES[key].toLowerCase() === lower
      );
      if (foundKey) {
        setSelectedCatId(foundKey);
      }
    }
  }, [paramCat]);

  const activeCategoryTitle = paramSearch
    ? `Pencarian: "${paramSearch}"`
    : CATEGORY_NAMES[selectedCatId] || (paramCat ? paramCat : "All Categories");

  return {
    selectedCatId,
    setSelectedCatId,
    activeCategoryTitle,
    showMobileFilter,
    setShowMobileFilter,
    products: SAMPLE_PRODUCTS,
  };
}
