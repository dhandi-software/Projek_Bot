import React, { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Star, Heart, ShoppingCart, Check, PackageX } from "lucide-react";
import { cn } from "~/lib/utils";
import { useCart } from "~/context/CartContext";
import { useProducts } from "~/hooks/useProducts";

export function FeaturedProductsSectionMobile() {
  const { addToCart } = useCart();
  const { products, loading } = useProducts();
  const [activeTab, setActiveTab] = useState("all");
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [wishlistIds, setWishlistIds] = useState<Record<string, boolean>>({});

  const realFeaturedProducts = products.map((p) => {
    const isDiscount = Boolean(p.discount_price && p.discount_price > 0 && p.discount_price < p.price);
    const formattedPrice = isDiscount && p.discount_price
      ? `Rp ${p.discount_price.toLocaleString("id-ID")}`
      : `Rp ${p.price.toLocaleString("id-ID")}`;
    const originalPrice = isDiscount
      ? `Rp ${p.price.toLocaleString("id-ID")}`
      : undefined;

    let badgeVariant: "hot" | "best-deals" | "discount" | "sale" = "hot";
    let badgeText = "";
    if (p.is_best_deal) {
      badgeVariant = "best-deals";
      badgeText = "BEST DEALS";
    } else if (isDiscount && p.discount_price) {
      badgeVariant = "discount";
      const percent = Math.round(((p.price - p.discount_price) / p.price) * 100);
      badgeText = `${percent}% OFF`;
    }

    return {
      id: String(p.id),
      title: p.title,
      price: formattedPrice,
      originalPrice,
      rating: 5,
      reviewsCount: 15,
      image: p.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
      categorySlug: (p.category || "").toLowerCase(),
      badge: badgeText ? ({ text: badgeText, variant: badgeVariant } as { text: string; variant: "hot" | "best-deals" | "discount" | "sale" }) : undefined,
    };
  });

  const categoriesSet = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
  const tabs = [
    { id: "all", label: "Semua Produk" },
    ...categoriesSet.map((cat) => ({ id: cat.toLowerCase(), label: cat })),
  ];

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
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
    ? realFeaturedProducts
    : realFeaturedProducts.filter((p) => p.categorySlug.includes(activeTab.toLowerCase()));

  return (
    <section className="w-full py-[72px] space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Featured Products</h2>
        <Link
          to="/products"
          className="text-xs font-semibold text-[#FA8232] hover:text-[#e07228] flex items-center gap-1"
        >
          <span>Browse All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Filter Tabs Scrollable */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab: { id: string; label: string }) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border cursor-pointer",
              activeTab === tab.id
                ? "bg-[#FA8232] text-white border-[#FA8232] shadow-sm font-semibold"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mobile Special Promo Banner Card */}
      <div className="bg-gradient-to-r from-[#F7E070] to-[#E5B82C] rounded-lg p-4 flex items-center justify-between shadow-sm border border-amber-200">
        <div className="space-y-1 max-w-[65%]">
          <span className="text-[#BE4624] font-bold text-[10px] uppercase tracking-wider block">
            COMPUTER & ACCESSORIES
          </span>
          <h3 className="text-lg font-extrabold text-gray-900 leading-tight">
            32% Discount
          </h3>
          <p className="text-[11px] text-gray-800 font-medium">
            For all electronics products
          </p>
          <button
            onClick={(e) =>
              handleAddToCart(e, {
                id: "featured-banner-pc-accessories-mob",
                title: "Computer & Accessories Discount Bundle",
                price: "$299.00",
                rating: 5,
                reviewsCount: 120,
                category: "accessories",
                image: "https://png.pngtree.com/png-vector/20250106/ourmid/pngtree-vibrant-rgb-gaming-pc-setup-png-image_15074212.png",
              })
            }
            className="mt-2 bg-[#FA8232] hover:bg-[#e07228] text-white font-bold py-1.5 px-3 rounded flex items-center gap-1 text-xs shadow active:scale-95"
          >
            <span>SHOP NOW</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="w-24 h-24 flex items-center justify-center overflow-hidden rounded">
          <img
            src="https://png.pngtree.com/png-vector/20250106/ourmid/pngtree-vibrant-rgb-gaming-pc-setup-png-image_15074212.png"
            alt="Computer Accessories Promo"
            className="w-full h-full object-contain rounded shadow-inner"
          />
        </div>
      </div>

      {/* 2-Column Mobile Product Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredProducts.map((product) => {
          const isAdded = addedIds[product.id];
          const isWished = wishlistIds[product.id];

          return (
            <div
              key={product.id}
              className="bg-white rounded-lg border border-gray-200 p-3 flex flex-col justify-between relative group hover:border-[#FA8232]/50 shadow-sm"
            >
              {/* Top Badge & Wishlist Button */}
              <div className="flex items-center justify-between min-h-[20px] mb-1">
                {product.badge ? (
                  <span
                    className={cn(
                      "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider",
                      product.badge.variant === "hot" && "bg-[#EE5858] text-white",
                      product.badge.variant === "best-deals" && "bg-[#2DA5F3] text-white",
                      product.badge.variant === "discount" && "bg-[#EFD33D] text-gray-900",
                      product.badge.variant === "sale" && "bg-[#2DB224] text-white"
                    )}
                  >
                    {product.badge.text}
                  </span>
                ) : (
                  <div />
                )}

                <button
                  onClick={(e) => toggleWishlist(e, product.id)}
                  className={cn(
                    "p-1 rounded-full text-gray-400 hover:text-rose-500 transition-colors",
                    isWished && "text-rose-500"
                  )}
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>

              {/* Product Image */}
              <div className="w-full h-36 my-2 flex items-center justify-center p-1 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain max-h-32"
                />
              </div>

              {/* Content Details */}
              <div className="space-y-1 mt-1">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-3 h-3",
                          i < product.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300 fill-gray-200"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">
                    ({product.reviewsCount})
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-xs text-gray-800 font-medium line-clamp-2 min-h-[32px]">
                  {product.title}
                </h4>

                {/* Price & Add to Cart Button */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex flex-col">
                    {product.originalPrice && (
                      <span className="text-[10px] text-gray-400 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                    <span className="text-xs font-bold text-[#2DA5F3]">
                      {product.price}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className={cn(
                      "p-2 rounded bg-[#FA8232] text-white hover:bg-[#e07228] transition-colors shadow-sm active:scale-95",
                      isAdded && "bg-emerald-500 hover:bg-emerald-600"
                    )}
                    title="Add to Cart"
                  >
                    {isAdded ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <ShoppingCart className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
