import * as React from "react";
import { useBestDeals, type FormattedDealProduct } from "~/hooks/useBestDeals";
import { useCart } from "~/context/CartContext";

export function useBestDealsPage() {
  const { bestDeals, featuredDeal, gridDeals, timeRemainingString, loading, refetch } = useBestDeals();
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = React.useState<Record<string, boolean>>({});
  const [addedCart, setAddedCart] = React.useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = React.useState("");

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (e: React.MouseEvent, item: FormattedDealProduct) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
    });
    setAddedCart((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedCart((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const filteredDeals = React.useMemo(() => {
    if (!searchQuery.trim()) return bestDeals;
    const query = searchQuery.toLowerCase();
    return bestDeals.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query))
    );
  }, [bestDeals, searchQuery]);

  return {
    bestDeals: filteredDeals,
    allDeals: bestDeals,
    featuredDeal,
    gridDeals,
    timeRemainingString,
    loading,
    refetch,
    hasActiveDeals: bestDeals.length > 0,
    wishlist,
    addedCart,
    searchQuery,
    setSearchQuery,
    toggleWishlist,
    handleAddToCart,
  };
}
