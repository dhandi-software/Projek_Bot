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
  const [dbProducts, setDbProducts] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

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

  React.useEffect(() => {
    const fetchCategoryProducts = async () => {
      setIsLoading(true);
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
        let res = await fetch(`${baseUrl}/api/products`);
        if (!res.ok) {
          res = await fetch("/api/products");
        }
        if (res.ok) {
          const json = await res.json();
          const itemsArr = json.data || json;
          if (Array.isArray(itemsArr) && itemsArr.length > 0) {
            setDbProducts(itemsArr);
          }
        }
      } catch (e) {
        console.error("Gagal mengambil produk kategori dari database:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategoryProducts();
  }, []);

  const activeCategoryTitle = paramSearch
    ? `Pencarian: "${paramSearch}"`
    : CATEGORY_NAMES[selectedCatId] || (paramCat ? paramCat : "All Categories");

  // Filter DB products by active category or search query
  const filteredProducts = React.useMemo(() => {
    if (dbProducts.length === 0) return SAMPLE_PRODUCTS;

    const formatRp = (num: number) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(num);

    let list = dbProducts;

    if (paramSearch) {
      const q = paramSearch.toLowerCase();
      list = list.filter(
        (p) =>
          String(p.title || "").toLowerCase().includes(q) ||
          String(p.description || "").toLowerCase().includes(q) ||
          String(p.brand || "").toLowerCase().includes(q) ||
          String(p.category || "").toLowerCase().includes(q)
      );
    } else {
      const targetCatName = CATEGORY_NAMES[selectedCatId] || selectedCatId;
      const c2 = targetCatName.toLowerCase().replace(/[^a-z0-9]/g, "");
      list = list.filter((p) => {
        const c1 = String(p.category || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        return c1.includes(c2) || c2.includes(c1);
      });

      // If category filter returned no exact matches, fallback to all DB products so user always sees DB products
      if (list.length === 0) {
        list = dbProducts;
      }
    }

    return list.map((p) => {
      const hasDiscount = p.discount_price > 0 && p.discount_price < p.price;
      return {
        id: String(p.id),
        title: p.title || p.name || "Produk Database",
        price: formatRp(hasDiscount ? p.discount_price : p.price),
        originalPrice: hasDiscount ? formatRp(p.price) : "",
        rating: (4.5 + ((Number(p.id) || 1) % 5) * 0.1).toFixed(1),
        badge: hasDiscount ? "PROMO" : (p.is_featured ? "FEATURED" : "BEST SELLER"),
        brand: p.brand || "Official",
        image: p.image || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
        specs: p.short_description || p.category || "Produk Original",
      };
    });
  }, [dbProducts, selectedCatId, paramSearch]);

  return {
    selectedCatId,
    setSelectedCatId,
    activeCategoryTitle,
    showMobileFilter,
    setShowMobileFilter,
    products: filteredProducts,
    isLoading,
  };
}
