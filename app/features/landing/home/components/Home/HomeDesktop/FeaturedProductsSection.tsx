import React, { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Star, Heart, ShoppingCart, Eye, Check } from "lucide-react";
import { cn } from "~/lib/utils";
import { useCart } from "~/context/CartContext";

export interface FeaturedProduct {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  category: "phone" | "laptop" | "headphone" | "tv" | "accessories";
  badge?: {
    text: string;
    variant: "hot" | "best-deals" | "discount" | "sale";
  };
}

const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: "fp-tozo-t6",
    title: "TOZO T6 True Wireless Earbuds Bluetooth Headphones Touch Control...",
    price: "$70",
    rating: 5,
    reviewsCount: 738,
    category: "headphone",
    badge: { text: "HOT", variant: "hot" },
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "fp-samsung-s21",
    title: "Samsung Electronics Samsung Galaxy S21 5G",
    price: "$2,300",
    rating: 5,
    reviewsCount: 536,
    category: "phone",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "fp-amazon-hdmi",
    title: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/60Hz)...",
    price: "$360",
    rating: 5,
    reviewsCount: 423,
    category: "accessories",
    badge: { text: "BEST DEALS", variant: "best-deals" },
    image: "https://images.unsplash.com/photo-1631541909061-71e349d1f203?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "fp-washing-machine",
    title: "Portable Washing Machine, 11lbs capacity Model 18NMF...",
    price: "$80",
    rating: 4,
    reviewsCount: 816,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "fp-gaming-headphones",
    title: "Wired Over-Ear Gaming Headphones with USB",
    price: "$1,500",
    rating: 5,
    reviewsCount: 647,
    category: "headphone",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "fp-polaroid-tripod",
    title: "Polaroid 57-Inch Photo/Video Tripod with Deluxe Tripod Case...",
    price: "$1,200",
    originalPrice: "$1600",
    rating: 4,
    reviewsCount: 877,
    category: "accessories",
    badge: { text: "25% OFF", variant: "discount" },
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "fp-dell-optiplex",
    title: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
    price: "$250",
    rating: 5,
    reviewsCount: 426,
    category: "laptop",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "fp-4k-uhd-tv",
    title: "4K UHD LED Smart TV with Chromecast Built-in",
    price: "$220",
    rating: 5,
    reviewsCount: 583,
    category: "tv",
    badge: { text: "SALE", variant: "sale" },
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
  },
];

const TABS = [
  { id: "all", label: "All Product" },
  { id: "phone", label: "Smart Phone" },
  { id: "laptop", label: "Laptop" },
  { id: "headphone", label: "Headphone" },
  { id: "tv", label: "TV" },
];

export function FeaturedProductsSection() {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState("all");
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [wishlistIds, setWishlistIds] = useState<Record<string, boolean>>({});

  const handleAddToCart = (e: React.MouseEvent, product: FeaturedProduct) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });

    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlistIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts = activeTab === "all"
    ? FEATURED_PRODUCTS
    : FEATURED_PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <section className="w-full py-[72px]">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        {/* Left Side Banner */}
        <div className="w-full lg:w-80 h-full min-h-[640px] bg-gradient-to-b from-[#F7E070] via-[#F5D547] to-[#E5B82C] rounded-lg p-6 flex flex-col justify-between relative overflow-hidden shadow-sm border border-amber-200/80 shrink-0">
          {/* Top Text Content */}
          <div className="z-10 text-center flex flex-col items-center">
            <span className="text-[#BE4624] font-bold text-xs uppercase tracking-wider block">
              COMPUTER & ACCESSORIES
            </span>
            <h3 className="text-3xl font-extrabold text-gray-900 leading-tight mt-1">
              32% Discount
            </h3>
            <p className="text-xs text-gray-800 font-medium mt-1">
              For all electronics products
            </p>

            <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
              <span className="text-xs text-gray-700 font-medium">
                Offers ends in:
              </span>
              <div className="bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded shadow-sm uppercase">
                ENDS OF CHRISTMAS
              </div>
            </div>

            <button
              onClick={(e) =>
                handleAddToCart(e, {
                  id: "featured-banner-pc-accessories",
                  title: "Computer & Accessories Discount Bundle",
                  price: "$299.00",
                  rating: 5,
                  reviewsCount: 120,
                  category: "accessories",
                  image: "https://png.pngtree.com/png-vector/20250106/ourmid/pngtree-vibrant-rgb-gaming-pc-setup-png-image_15074212.png",
                })
              }
              className="mt-4 w-full max-w-[240px] bg-[#FA8232] hover:bg-[#e07228] text-white font-bold py-3 px-6 rounded flex items-center justify-center gap-3 text-sm shadow transition-all duration-200 group active:scale-95 uppercase tracking-wide"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Bottom Image - Fit completely without cropping */}
          <div className="relative mt-4 z-0 flex-1 w-full flex items-center justify-center p-2 overflow-hidden">
            <img
              src="https://png.pngtree.com/png-vector/20250106/ourmid/pngtree-vibrant-rgb-gaming-pc-setup-png-image_15074212.png"
              alt="Computer Accessories"
              className="w-full h-full max-h-[380px] object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Right Side Section */}
        <div className="flex flex-col justify-start">
          {/* Header Row: Title, Tabs & Browse Link */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-gray-200 pb-2">
            <h2 className="text-xl font-bold text-gray-900">Featured Products</h2>

            {/* Filter Tabs */}
            <div className="flex items-center gap-6 overflow-x-auto text-sm">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "pb-2 font-medium transition-all duration-200 whitespace-nowrap border-b-2",
                    activeTab === tab.id
                      ? "text-gray-900 font-bold border-[#FA8232]"
                      : "text-gray-500 border-transparent hover:text-gray-900"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Browse All Products Link */}
            <Link
              to="/products"
              className="text-sm font-semibold text-[#FA8232] hover:text-[#e07228] flex items-center gap-1.5 transition-colors"
            >
              <span>Browse All Product</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Product Grid (4 Columns x 2 Rows = 8 Products) */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => {
              const isAdded = addedIds[product.id];
              const isWished = wishlistIds[product.id];

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-md border border-gray-200/90 p-4 pt-3 flex flex-col justify-between relative group hover:border-[#FA8232]/60 hover:shadow-md transition-all duration-200"
                >
                  {/* Badge Absolute Positioned to avoid empty top gap */}
                  {product.badge && (
                    <span
                      className={cn(
                        "absolute top-3 left-3 z-10 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm",
                        product.badge.variant === "hot" && "bg-[#EE5858] text-white",
                        product.badge.variant === "best-deals" && "bg-[#2DA5F3] text-white",
                        product.badge.variant === "discount" && "bg-[#EFD33D] text-gray-900",
                        product.badge.variant === "sale" && "bg-[#2DB224] text-white"
                      )}
                    >
                      {product.badge.text}
                    </span>
                  )}

                  {/* Product Image & Hover Action Overlay */}
                  <div className="relative w-full h-40 my-1 flex items-center justify-center overflow-hidden p-2">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Hover Action Buttons Overlay */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 rounded">
                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => toggleWishlist(e, product.id)}
                        className={cn(
                          "w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-[#FA8232] hover:text-white shadow transition-all duration-200",
                          isWished && "bg-rose-500 text-white"
                        )}
                        title="Add to Wishlist"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>

                      {/* Add to Cart Button */}
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className={cn(
                          "w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-[#FA8232] hover:text-white shadow transition-all duration-200",
                          isAdded && "bg-emerald-500 text-white"
                        )}
                        title="Add to Cart"
                      >
                        {isAdded ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <ShoppingCart className="w-4 h-4" />
                        )}
                      </button>

                      {/* View Detail Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className="w-9 h-9 rounded-full bg-[#FA8232] text-white flex items-center justify-center hover:bg-[#e07228] shadow transition-all duration-200"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="space-y-1.5 mt-1">
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-3.5 h-3.5",
                              i < product.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-300 fill-gray-200"
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-gray-400 font-medium">
                        ({product.reviewsCount})
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-xs text-gray-800 font-medium line-clamp-2 min-h-[32px] group-hover:text-[#FA8232] transition-colors">
                      {product.title}
                    </h4>

                    {/* Price */}
                    <div className="flex items-center gap-2 pt-1">
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                      <span className="text-sm font-semibold text-[#2DA5F3]">
                        {product.price}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
