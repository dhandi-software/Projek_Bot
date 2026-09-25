import * as React from "react";
import { Link } from "react-router";
import { Star, Heart, ShoppingCart, Clock, Tag, Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useBestDealsPage } from "../../hooks/useBestDealsPage";

export function BestDealsMobile() {
  const {
    bestDeals,
    loading,
    timeRemainingString,
    hasActiveDeals,
    wishlist,
    searchQuery,
    setSearchQuery,
    toggleWishlist,
    handleAddToCart,
  } = useBestDealsPage();

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-4 px-3 space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 text-white p-4 rounded-2xl shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#FA8232] text-white">
              <Tag className="w-4 h-4" />
            </span>
            <h1 className="text-lg font-bold">Best Deals</h1>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-orange-300 border border-white/10">
            {bestDeals.length} Active
          </span>
        </div>

        {hasActiveDeals && timeRemainingString && (
          <div className="flex items-center gap-2 bg-white/10 border border-white/15 px-3 py-2 rounded-xl text-xs">
            <Clock className="w-3.5 h-3.5 text-orange-400 animate-pulse shrink-0" />
            <span className="text-zinc-300">Ends in:</span>
            <span className="font-extrabold text-orange-400 tracking-wider font-mono truncate">
              {timeRemainingString}
            </span>
          </div>
        )}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search deals..."
          className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FA8232] focus:border-transparent"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-2 gap-3 py-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-56 rounded-xl bg-zinc-200/60 animate-pulse" />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && bestDeals.length === 0 && (
        <div className="py-12 text-center space-y-2 bg-white rounded-2xl border border-zinc-200 p-6">
          <Tag className="w-8 h-8 text-zinc-300 mx-auto" />
          <h3 className="text-sm font-bold text-zinc-800">No Best Deals</h3>
          <p className="text-xs text-zinc-500">
            Check back soon for latest promotional offers.
          </p>
        </div>
      )}

      {/* Product List Grid */}
      {!loading && bestDeals.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {bestDeals.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-zinc-200 rounded-xl p-3 flex flex-col justify-between relative shadow-2xs"
            >
              {/* Badge Top Left */}
              {product.badge && (
                <span className="absolute top-2 left-2 z-10 rounded-xs px-1.5 py-0.5 text-[9px] font-extrabold bg-[#EFD33D] text-zinc-950 uppercase">
                  {product.badge.text}
                </span>
              )}

              {/* Wishlist Button */}
              <Button
                type="button"
                variant="ghost"
                size="lg"
                aria-label="Wishlist"
                onClick={(e) => toggleWishlist(e, product.id)}
                className={cn(
                  "absolute top-2 right-2 z-10 !w-7 !h-7 !p-0 rounded-full bg-white/80 backdrop-blur-xs text-zinc-600 shadow-2xs hover:bg-[#FA8232] hover:text-white",
                  wishlist[product.id] && "bg-[#FA8232] text-white"
                )}
              >
                <Heart className={cn("size-3.5", wishlist[product.id] && "fill-white")} />
              </Button>

              {/* Product Image */}
              <Link to={`/product/${product.id}`} className="block h-36 w-full relative mb-2 bg-zinc-50 rounded-lg p-1">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain mx-auto"
                  loading="lazy"
                />
              </Link>

              {/* Info */}
              <div className="space-y-1.5">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-xs font-semibold text-zinc-800 line-clamp-2 leading-tight">
                    {product.title}
                  </h3>
                </Link>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "size-2.5",
                        star <= Math.floor(product.rating || 5)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-zinc-200 text-zinc-200"
                      )}
                    />
                  ))}
                  <span className="text-[9px] text-zinc-400">
                    ({product.rating || 5.0})
                  </span>
                </div>

                <div className="pt-1 flex flex-col gap-0.5">
                  {product.originalPrice && (
                    <span className="text-[10px] text-zinc-400 line-through leading-none">
                      {product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs font-extrabold text-[#2DA5F3]">
                    {product.price}
                  </span>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="lg"
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full !h-8 mt-2 rounded-lg bg-[#FA8232] text-white font-bold text-xs uppercase flex items-center justify-center gap-1 hover:bg-orange-600 active:scale-95 transition-all"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Cart</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
