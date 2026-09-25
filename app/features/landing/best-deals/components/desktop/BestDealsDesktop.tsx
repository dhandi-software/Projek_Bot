import * as React from "react";
import { Link } from "react-router";
import { Star, Home, ChevronRight, Heart, ShoppingCart, Eye, Clock, Tag, Search } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useBestDealsPage } from "../../hooks/useBestDealsPage";

export function BestDealsDesktop() {
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
    <div className="min-h-screen bg-[url('/images/Background_Eccomerce.png')] bg-cover bg-top bg-no-repeat bg-fixed py-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="bg-white py-3.5 px-5 rounded-2xl border border-slate-200 shadow-2xs">
          <BreadcrumbList className="text-xs font-medium text-slate-600 gap-2">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  to="/"
                  className="flex items-center gap-1.5 text-slate-600 hover:text-orange-600 transition-colors font-semibold"
                >
                  <Home className="size-3.5 text-slate-500 hover:text-orange-600" />
                  <span>Home</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="text-slate-400">
              <ChevronRight className="size-3.5" />
            </BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold text-orange-600">
                Best Deals
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Main Banner & Controls Card */}
        <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/80 shadow-lg shadow-sky-950/5 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-orange-100 text-[#FA8232]">
                  <Tag className="w-5 h-5" />
                </span>
                <h1 className="text-2xl font-black tracking-tight text-zinc-900">
                  Best Deals
                </h1>
              </div>
              <p className="text-xs text-zinc-500">
                Limited time promotional offers on selected products. Grab them before they expire!
              </p>
            </div>

            {hasActiveDeals && timeRemainingString && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-[#FA8232]/10 to-amber-500/10 border border-[#FA8232]/30 px-4 py-2.5 rounded-xl shrink-0">
                <Clock className="w-4 h-4 text-[#FA8232] animate-pulse" />
                <span className="text-xs font-medium text-zinc-700">Deals end in:</span>
                <span className="text-xs font-extrabold text-[#FA8232] tracking-wider font-mono">
                  {timeRemainingString}
                </span>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search active deals..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FA8232] focus:border-transparent transition-all"
              />
            </div>
            <div className="text-xs text-zinc-500 font-medium">
              Showing <span className="font-bold text-zinc-900">{bestDeals.length}</span> active deal{bestDeals.length !== 1 && "s"}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-12">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-64 rounded-xl bg-zinc-100 animate-pulse" />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && bestDeals.length === 0 && (
            <div className="py-16 text-center space-y-3 bg-zinc-50/50 rounded-xl border border-zinc-200/80">
              <div className="inline-flex p-4 rounded-full bg-zinc-100 text-zinc-400 mb-2">
                <Tag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-zinc-800">No Best Deals Available</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                There are currently no active promotional deals. Check back soon for our latest special offers!
              </p>
            </div>
          )}

          {/* Product Grid */}
          {!loading && bestDeals.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {bestDeals.map((product) => (
                <div
                  key={product.id}
                  className="group relative flex flex-col justify-between p-4 bg-white border border-zinc-200 rounded-xl hover:shadow-md hover:border-[#FA8232]/40 transition-all duration-200"
                >
                  {/* Discount / Status Badges */}
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

                  {/* Product Image & Overlay Actions */}
                  <div className="relative h-48 w-full overflow-hidden rounded-lg flex items-center justify-center p-2 mb-3 bg-zinc-50/60">
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
                      <Button
                        type="button"
                        variant="ghost"
                        size="lg"
                        aria-label="Wishlist"
                        onClick={(e) => toggleWishlist(e, product.id)}
                        className={cn(
                          "!w-9 !h-9 !p-0 rounded-full bg-white text-zinc-800 shadow-md hover:bg-[#FA8232] hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 cursor-pointer",
                          wishlist[product.id] && "bg-[#FA8232] text-white"
                        )}
                      >
                        <Heart className={cn("size-4", wishlist[product.id] && "fill-white")} />
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="lg"
                        aria-label="Add to cart"
                        onClick={(e) => handleAddToCart(e, product)}
                        className="!w-9 !h-9 !p-0 rounded-full bg-[#FA8232] text-white shadow-md hover:bg-orange-600 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 delay-75 cursor-pointer active:scale-90"
                      >
                        <ShoppingCart className="size-4" />
                      </Button>

                      <Link
                        to={`/product/${product.id}`}
                        title="View detail"
                        className="flex size-9 items-center justify-center rounded-full bg-white text-zinc-800 shadow-md hover:bg-[#FA8232] hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 delay-150 cursor-pointer"
                      >
                        <Eye className="size-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Product Metadata */}
                  <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "size-3",
                              star <= Math.floor(product.rating || 5)
                                ? "fill-amber-400 text-amber-400"
                                : "fill-zinc-200 text-zinc-200"
                            )}
                          />
                        ))}
                        <span className="text-[10px] text-zinc-400 font-medium ml-0.5">
                          ({product.rating || 5.0})
                        </span>
                      </div>

                      {/* Title */}
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-xs font-semibold text-zinc-800 line-clamp-2 leading-snug group-hover:text-[#FA8232] transition-colors">
                          {product.title}
                        </h3>
                      </Link>
                    </div>

                    {/* Price & Action */}
                    <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5">
                        {product.originalPrice && (
                          <span className="text-[11px] text-zinc-400 line-through">
                            {product.originalPrice}
                          </span>
                        )}
                        <span className="text-sm font-extrabold text-[#2DA5F3]">
                          {product.price}
                        </span>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="lg"
                        onClick={(e) => handleAddToCart(e, product)}
                        className="!h-8 !px-2.5 rounded-lg bg-[#FA8232]/10 text-[#FA8232] hover:bg-[#FA8232] hover:text-white text-[11px] font-bold transition-colors cursor-pointer"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
