import * as React from "react";
import { Link } from "react-router";
import { Search, X, Star, Heart, ShoppingCart, Eye, ChevronDown } from "lucide-react";
import { cn, getProductDetailUrl } from "~/lib/utils";
import { useCart } from "~/context/CartContext";
import { useWishlist } from "~/hooks/useWishlist";

export interface ProductItem {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: {
    text: string;
    variant: "hot" | "best-deals" | "discount" | "sale";
  };
}

const SAMPLE_PRODUCTS: ProductItem[] = [
  {
    id: "1",
    title: "TOZO T6 True Wireless Earbuds Bluetooth Headphones...",
    price: "$70",
    rating: 5,
    reviewsCount: 738,
    badge: { text: "HOT", variant: "hot" },
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    title: "Samsung Electronics Samsung Galexy S21 5G",
    price: "$2,300",
    rating: 5,
    reviewsCount: 536,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    title: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6...",
    price: "$360",
    rating: 5,
    reviewsCount: 423,
    badge: { text: "BEST DEALS", variant: "best-deals" },
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "4",
    title: "Portable Wshing Machine, 11lbs capacity Model 18NMF...",
    price: "$80",
    rating: 4,
    reviewsCount: 816,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "5",
    title: "Wired Over-Ear Gaming Headphones with USB",
    price: "$1,500",
    rating: 5,
    reviewsCount: 647,
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "6",
    title: "Polaroid 57-Inch Photo/Video Tripod with Deluxe Tripod Ca...",
    price: "$1,200",
    originalPrice: "$1600",
    rating: 4,
    reviewsCount: 877,
    badge: { text: "25% OFF", variant: "discount" },
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "7",
    title: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
    price: "$250",
    rating: 4.5,
    reviewsCount: 426,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "8",
    title: "4K UHD LED Smart TV with Chromecast Built-in",
    price: "$220",
    rating: 4,
    reviewsCount: 583,
    badge: { text: "SALE", variant: "sale" },
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
  },
];

export function EcommerceProductGridSection() {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [activeFilters, setActiveFilters] = React.useState<string[]>([
    "Electronics Devices",
    "5 Star Rating",
  ]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState("Most Popular");

  const removeFilter = (filterToRemove: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filterToRemove));
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= Math.floor(rating);
      const isHalf = i === Math.ceil(rating) && rating % 1 !== 0;
      stars.push(
        <Star
          key={i}
          className={cn(
            "size-3.5",
            isFilled || isHalf
              ? "fill-[#FA8232] text-[#FA8232]"
              : "fill-slate-200 text-slate-200"
          )}
        />
      );
    }
    return stars;
  };

  return (
    <div className="w-full space-y-4 font-sans">
      {/* 1. TOP SEARCH & SORT BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input Box */}
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for anything..."
            className="w-full rounded-md border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-xs text-slate-800 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 shadow-2xs"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-700 cursor-pointer" />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-slate-600">
          <span>Sort by:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-md border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs font-semibold text-slate-800 focus:border-orange-500 focus:outline-none cursor-pointer"
            >
              <option value="Most Popular">Most Popular</option>
              <option value="Lowest Price">Lowest Price</option>
              <option value="Highest Price">Highest Price</option>
              <option value="Newest Arrival">Newest Arrival</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 2. ACTIVE FILTERS & RESULTS BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-md bg-[#F2F4F5] px-4 py-3 text-xs text-slate-600">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-500 font-medium">Active Filters:</span>
          {activeFilters.map((filter) => (
            <span
              key={filter}
              className="inline-flex items-center gap-1.5 rounded-sm bg-white px-2.5 py-1 font-semibold text-slate-800 shadow-2xs text-[11px]"
            >
              {filter}
              <X
                className="size-3 text-slate-400 hover:text-slate-800 cursor-pointer transition-colors"
                onClick={() => removeFilter(filter)}
              />
            </span>
          ))}
          {activeFilters.length === 0 && (
            <span className="text-slate-400 italic">None</span>
          )}
        </div>

        <div className="text-slate-700">
          <strong className="text-slate-900 font-extrabold">65,867</strong> Results found.
        </div>
      </div>

      {/* 3. PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
        {SAMPLE_PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="group relative flex flex-col justify-between rounded-md border border-slate-200 bg-white p-4 transition-all duration-300 hover:shadow-lg hover:border-orange-400/50"
          >
            {/* Badge Top Left */}
            {product.badge && (
              <span
                className={cn(
                  "absolute top-3 left-3 z-10 rounded-xs px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider",
                  product.badge.variant === "hot" && "bg-[#EE5858] text-white",
                  product.badge.variant === "best-deals" && "bg-[#2DA5F3] text-white",
                  product.badge.variant === "discount" && "bg-[#EFD33D] text-slate-900",
                  product.badge.variant === "sale" && "bg-[#2DB224] text-white"
                )}
              >
                {product.badge.text}
              </span>
            )}

            {/* Product Image & Hover Actions */}
            <div className="relative aspect-square w-full overflow-hidden rounded-md bg-slate-50 flex items-center justify-center p-2 mb-3">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Floating Action Buttons Overlay (Matching Product #7 in photo!) */}
              <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                <button
                  type="button"
                  title="Add to Wishlist"
                  onClick={() => {
                    const priceNum = parseFloat(product.price.replace(/[^0-9.]/g, "")) || 0;
                    addToWishlist({
                      id: product.id,
                      name: product.title,
                      price: priceNum,
                      image: product.image,
                    });
                  }}
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full shadow-md transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 cursor-pointer",
                    isInWishlist(product.id)
                      ? "bg-[#FA8232] text-white"
                      : "bg-white text-slate-800 hover:bg-orange-500 hover:text-white"
                  )}
                >
                  <Heart className={cn("size-4", isInWishlist(product.id) && "fill-current")} />
                </button>
                <button
                  type="button"
                  title="Add to Cart"
                  onClick={() => addToCart({ id: product.id, title: product.title, price: product.price, image: product.image })}
                  className="flex size-10 items-center justify-center rounded-full bg-white text-slate-800 shadow-md hover:bg-orange-500 hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 delay-75 cursor-pointer active:scale-90"
                >
                  <ShoppingCart className="size-4" />
                </button>
                <Link
                  to={getProductDetailUrl(product)}
                  title="Quick View"
                  className="flex size-10 items-center justify-center rounded-full bg-[#FA8232] text-white shadow-md hover:bg-orange-600 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 delay-150 cursor-pointer"
                >
                  <Eye className="size-4" />
                </Link>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-1.5">
              {/* Rating Stars & Count */}
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-0.5">
                  {renderStars(product.rating)}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  ({product.reviewsCount})
                </span>
              </div>

              {/* Product Title */}
              <h3 className="text-xs font-medium text-slate-800 line-clamp-2 leading-snug group-hover:text-orange-500 transition-colors">
                {product.title}
              </h3>

              {/* Price */}
              <div className="flex items-center gap-2 pt-1">
                {product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {product.originalPrice}
                  </span>
                )}
                <span className="text-sm font-bold text-[#2DA5F3]">
                  {product.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
