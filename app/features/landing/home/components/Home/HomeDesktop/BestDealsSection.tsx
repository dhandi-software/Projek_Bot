import React from "react";
import { Link } from "react-router";
import { ArrowRight, Star, Heart, ShoppingCart, Eye, RefreshCw } from "lucide-react";
import { cn } from "~/lib/utils";
import { useCart } from "~/context/CartContext";
import { useBestDeals } from "~/hooks/useBestDeals";

export function BestDealsSection() {
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
    <section className="w-full font-sans space-y-6 pt-4">
      {/* 1. Header with Title, Dynamic Timer, and Browse All Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
        <div className="flex items-center gap-4 flex-wrap">
          <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
            Best Deals
          </h2>
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 bg-zinc-100 px-3 py-1.5 rounded-sm">
            <span>Deals ends in</span>
            <span className="bg-[#EFD33D] text-zinc-950 font-extrabold px-2 py-0.5 rounded-xs font-mono">
              {timeRemainingString}
            </span>
          </div>
        </div>

        <Link
          to="/best-deals"
          className="text-xs font-bold text-[#2DA5F3] hover:text-[#1982c7] transition-colors flex items-center gap-1 group cursor-pointer"
        >
          <span>Browse All Product</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* 2. Main Grid Layout */}
      {loading ? (
        <div className="p-12 text-center text-zinc-500 bg-white rounded-2xl border border-zinc-200">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#2DA5F3]" />
          <p className="text-xs">Memuat Best Deals...</p>
        </div>
      ) : bestDeals.length === 0 ? (
        <div className="p-12 text-center text-zinc-500 bg-white/80 backdrop-blur-md rounded-2xl border border-zinc-200 shadow-xs">
          <h3 className="font-bold text-base text-zinc-900 mb-1">No Best Deals Available</h3>
          <p className="text-xs text-zinc-500">Check back soon for our latest promo deals.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-white/80 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg shadow-sky-950/5 overflow-hidden">
          
          {/* LEFT COLUMN: Featured Large Product Card */}
          {featuredDeal && (
            <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-zinc-200 p-5 md:p-6 flex flex-col justify-between relative bg-white group">
              {/* Top Badges */}
              <div className="space-y-1.5 absolute top-4 left-4 z-10">
                {featuredDeal.badge && (
                  <span className="block bg-[#EFD33D] text-zinc-950 px-2.5 py-1 text-[11px] font-extrabold rounded-xs shadow-2xs uppercase">
                    {featuredDeal.badge.text}
                  </span>
                )}
                <span className="block bg-[#EE5858] text-white px-2.5 py-1 text-[11px] font-extrabold rounded-xs shadow-2xs uppercase w-fit">
                  HOT
                </span>
              </div>

              {/* Product Image */}
              <div className="relative h-56 sm:h-72 w-full my-4 flex items-center justify-center p-1">
                <Link to={`/product/${featuredDeal.id}`} className="h-full w-full flex items-center justify-center">
                  <img
                    src={featuredDeal.image}
                    alt={featuredDeal.title}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
                  />
                </Link>
              </div>

              {/* Content & Details */}
              <div className="space-y-2.5 pt-2">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-0.5">
                    {renderStars(featuredDeal.rating)}
                  </div>
                  <span className="text-xs text-zinc-500 font-semibold ml-1">
                    ({featuredDeal.reviewsCount.toLocaleString()})
                  </span>
                </div>

                {/* Title */}
                <Link to={`/product/${featuredDeal.id}`}>
                  <h3 className="text-sm font-bold text-zinc-900 leading-snug line-clamp-2 hover:text-[#2DA5F3] transition-colors">
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
                  <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 pt-0.5">
                    {featuredDeal.description}
                  </p>
                )}

                {/* Action Buttons Row */}
                <div className="flex items-center gap-2 pt-3">
                  <button
                    type="button"
                    title="Add to Wishlist"
                    className="w-10 h-10 rounded-xs bg-[#FFE7D6] hover:bg-[#ffd2b3] text-[#FA8232] flex items-center justify-center transition-colors cursor-pointer shrink-0"
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
                    className="flex-1 h-10 px-3 bg-[#FA8232] hover:bg-[#e06d20] text-white font-extrabold text-xs uppercase tracking-tight rounded-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-98 whitespace-nowrap overflow-hidden text-ellipsis min-w-0"
                  >
                    <ShoppingCart className="w-4 h-4 shrink-0" />
                    <span className="truncate">ADD TO CART</span>
                  </button>

                  <Link
                    to={`/product/${featuredDeal.id}`}
                    title="Quick View"
                    className="w-10 h-10 rounded-xs bg-[#FFE7D6] hover:bg-[#ffd2b3] text-[#FA8232] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* RIGHT COLUMN: Product Grid */}
          <div className={cn(
            "grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 divide-x divide-y divide-zinc-200",
            featuredDeal ? "lg:col-span-9" : "lg:col-span-12"
          )}>
            {gridDeals.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between p-4 bg-white hover:bg-zinc-50/50 transition-colors duration-200"
              >
                {/* Badge Top Left */}
                {product.badge && (
                  <span
                    className={cn(
                      "absolute top-3 left-3 z-10 rounded-xs px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider shadow-2xs",
                      product.badge.variant === "discount" && "bg-[#EFD33D] text-zinc-950",
                      product.badge.variant === "hot" && "bg-[#EE5858] text-white",
                      product.badge.variant === "sold-out" && "bg-zinc-400 text-white",
                      product.badge.variant === "sale" && "bg-[#2DB224] text-white"
                    )}
                  >
                    {product.badge.text}
                  </span>
                )}

                {/* Product Image & Hover Action Buttons */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-md flex items-center justify-center p-1 mb-2 bg-zinc-50/40">
                  <Link to={`/product/${product.id}`} className="h-full w-full flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>

                  {/* Hover Action Overlay Icons */}
                  <div className="absolute inset-0 bg-zinc-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <button
                      type="button"
                      title="Add to Wishlist"
                      className="flex size-9 items-center justify-center rounded-full bg-white text-zinc-800 shadow-md hover:bg-[#FA8232] hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 cursor-pointer"
                    >
                      <Heart className="size-4" />
                    </button>
                    <button
                      type="button"
                      title="Add to Cart"
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          image: product.image,
                        })
                      }
                      className="flex size-9 items-center justify-center rounded-full bg-[#FA8232] text-white shadow-md hover:bg-orange-600 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 delay-75 cursor-pointer active:scale-90"
                    >
                      <ShoppingCart className="size-4" />
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      title="Quick View"
                      className="flex size-9 items-center justify-center rounded-full bg-white text-zinc-800 shadow-md hover:bg-[#FA8232] hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 delay-150 cursor-pointer"
                    >
                      <Eye className="size-4" />
                    </Link>
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-1">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-xs font-semibold text-zinc-800 line-clamp-2 leading-snug group-hover:text-orange-500 transition-colors">
                      {product.title}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 pt-1">
                    {product.originalPrice && (
                      <span className="text-xs text-zinc-400 line-through">
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
      )}
    </section>
  );
}
