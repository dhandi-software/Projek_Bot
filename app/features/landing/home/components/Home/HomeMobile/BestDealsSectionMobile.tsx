import React from "react";
import { Link } from "react-router";
import { ArrowRight, Star, Heart, ShoppingCart, Eye, RefreshCw } from "lucide-react";
import { cn } from "~/lib/utils";
import { useCart } from "~/context/CartContext";
import { useBestDeals } from "~/hooks/useBestDeals";

export function BestDealsSectionMobile() {
  const { addToCart } = useCart();
  const { featuredDeal, gridDeals, bestDeals, timeRemainingString, loading } = useBestDeals();

  const renderStars = (rating: number = 5) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className="size-3.5 fill-[#FA8232] text-[#FA8232]"
        />
      );
    }
    return stars;
  };

  return (
    <section className="w-full font-sans space-y-4 pt-2">
      {/* 1. Header with Title & Timer */}
      <div className="space-y-2.5 border-b border-zinc-200 pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-zinc-900 tracking-tight">
            Best Deals
          </h2>
          <Link
            to="/best-deals"
            className="text-xs font-bold text-[#2DA5F3] hover:text-[#1982c7] transition-colors flex items-center gap-1 group cursor-pointer"
          >
            <span>Browse All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 bg-zinc-100 px-3 py-1.5 rounded-md w-fit">
          <span>Deals ends in</span>
          <span className="bg-[#EFD33D] text-zinc-950 font-extrabold px-2 py-0.5 rounded-xs text-[11px] font-mono">
            {timeRemainingString}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center text-zinc-500 bg-white rounded-xl border border-zinc-200">
          <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#2DA5F3]" />
          <p className="text-xs">Memuat Best Deals...</p>
        </div>
      ) : bestDeals.length === 0 ? (
        <div className="p-8 text-center text-zinc-500 bg-white rounded-xl border border-zinc-200">
          <h3 className="font-bold text-sm text-zinc-900 mb-1">No Best Deals Available</h3>
          <p className="text-xs">Check back soon for our latest promo deals.</p>
        </div>
      ) : (
        <>
          {/* 2. Featured Mobile Card */}
          {featuredDeal && (
            <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-2xs relative space-y-3">
              {/* Badges Top Left */}
              <div className="flex items-center gap-1.5 absolute top-4 left-4 z-10">
                {featuredDeal.badge && (
                  <span className="bg-[#EFD33D] text-zinc-950 px-2 py-0.5 text-[10px] font-extrabold rounded-xs uppercase shadow-2xs">
                    {featuredDeal.badge.text}
                  </span>
                )}
                <span className="bg-[#EE5858] text-white px-2 py-0.5 text-[10px] font-extrabold rounded-xs uppercase shadow-2xs">
                  HOT
                </span>
              </div>

              {/* Product Image */}
              <div className="relative h-48 w-full flex items-center justify-center pt-4">
                <Link to={`/product/${featuredDeal.id}`} className="h-full w-full flex items-center justify-center">
                  <img
                    src={featuredDeal.image}
                    alt={featuredDeal.title}
                    className="h-full w-full object-contain drop-shadow-md"
                  />
                </Link>
              </div>

              {/* Rating Stars */}
              <div className="flex items-center gap-1 pt-1">
                <div className="flex items-center gap-0.5">
                  {renderStars(featuredDeal.rating)}
                </div>
                <span className="text-[11px] text-zinc-500 font-semibold ml-1">
                  ({featuredDeal.reviewsCount.toLocaleString()})
                </span>
              </div>

              {/* Title & Description */}
              <Link to={`/product/${featuredDeal.id}`}>
                <h3 className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug line-clamp-2">
                  {featuredDeal.title}
                </h3>
              </Link>

              {/* Price */}
              <div className="flex items-center gap-2">
                {featuredDeal.originalPrice && (
                  <span className="text-xs text-zinc-400 line-through">
                    {featuredDeal.originalPrice}
                  </span>
                )}
                <span className="text-base font-extrabold text-[#2DA5F3]">
                  {featuredDeal.price}
                </span>
              </div>

              {/* Description */}
              {featuredDeal.description && (
                <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-2">
                  {featuredDeal.description}
                </p>
              )}

              {/* Action Buttons Row */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  title="Wishlist"
                  className="w-10 h-10 rounded-xs bg-[#FFE7D6] hover:bg-[#ffd2b3] text-[#FA8232] flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-[#FA8232]" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    addToCart({
                      id: featuredDeal.id,
                      title: featuredDeal.title,
                      price: featuredDeal.price,
                      image: featuredDeal.image,
                    })
                  }
                  className="flex-1 h-10 px-3 bg-[#FA8232] hover:bg-[#e06d20] text-white font-extrabold text-xs uppercase tracking-tight rounded-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer whitespace-nowrap min-w-0"
                >
                  <ShoppingCart className="w-4 h-4 shrink-0" />
                  <span>ADD TO CART</span>
                </button>

                <Link
                  to={`/product/${featuredDeal.id}`}
                  title="Quick View"
                  className="w-10 h-10 rounded-xs bg-[#FFE7D6] hover:bg-[#ffd2b3] text-[#FA8232] flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {/* 3. Mobile Product Grid (2 Columns) */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {gridDeals.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-white border border-zinc-200 rounded-xl p-3 shadow-2xs flex flex-col justify-between relative space-y-2 group"
              >
                {/* Badge */}
                {product.badge && (
                  <span
                    className={cn(
                      "absolute top-2 left-2 z-10 rounded-xs px-1.5 py-0.5 text-[9px] font-extrabold uppercase shadow-2xs",
                      product.badge.variant === "discount" && "bg-[#EFD33D] text-zinc-950",
                      product.badge.variant === "hot" && "bg-[#EE5858] text-white",
                      product.badge.variant === "sold-out" && "bg-zinc-400 text-white",
                      product.badge.variant === "sale" && "bg-[#2DB224] text-white"
                    )}
                  >
                    {product.badge.text}
                  </span>
                )}

                {/* Product Image */}
                <div className="h-32 w-full flex items-center justify-center p-1 bg-zinc-50/50 rounded-lg relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Title & Price */}
                <div className="space-y-1">
                  <h4 className="text-[11px] font-semibold text-zinc-800 line-clamp-2 leading-snug">
                    {product.title}
                  </h4>
                  <div className="flex items-center gap-1.5">
                    {product.originalPrice && (
                      <span className="text-[10px] text-zinc-400 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                    <span className="text-xs font-extrabold text-[#2DA5F3]">
                      {product.price}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.image,
                    });
                  }}
                  className="w-full h-8 bg-zinc-100 hover:bg-[#FA8232] hover:text-white text-zinc-800 font-bold text-[11px] rounded-md flex items-center justify-center gap-1 transition-colors active:scale-95 cursor-pointer mt-1"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Beli</span>
                </button>
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
