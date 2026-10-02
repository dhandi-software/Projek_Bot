import React, { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Star, Heart, ShoppingCart, Check, PackageX, ChevronLeft, ChevronRight } from "lucide-react";
import { cn, getProductDetailUrl } from "~/lib/utils";
import { useCart } from "~/context/CartContext";
import { useProducts } from "~/hooks/useProducts";

export function ComputerAccessoriesSectionMobile() {
  const { addToCart } = useCart();
  const { products, loading } = useProducts();
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [wishlistIds, setWishlistIds] = useState<Record<string, boolean>>({});

  const realAccessoryProducts = products.map((p) => {
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
      reviewsCount: 12,
      image: p.image || "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80",
      categorySlug: (p.category || "").toLowerCase(),
      badge: badgeText ? ({ text: badgeText, variant: badgeVariant } as { text: string; variant: "hot" | "best-deals" | "discount" | "sale" }) : undefined,
    };
  });

  const categoriesSet = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
  const tabs = [
    { id: "all", label: "Semua Produk" },
    ...categoriesSet.map((cat) => ({ id: cat.toLowerCase(), label: cat })),
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  const handleAddToCart = (e: React.MouseEvent, product: { id: string; title: string; price: string; image: string }) => {
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
    ? realAccessoryProducts
    : realAccessoryProducts.filter((p) => p.categorySlug.includes(activeTab.toLowerCase()));

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section className="w-full my-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Computer Accessories</h2>
        <Link
          to="/products"
          className="text-xs font-semibold text-[#FA8232] hover:text-[#e07228] flex items-center gap-1"
        >
          <span>Browse All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab: { id: string; label: string }) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
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

      {/* 2-Column Mobile Product Grid */}
      {loading ? (
        <div className="py-8 text-center text-gray-400 text-xs">Memuat produk...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-8 text-center bg-white rounded-lg border border-gray-200 p-4 space-y-1">
          <PackageX className="w-6 h-6 text-gray-300 mx-auto" />
          <p className="font-bold text-xs text-gray-800">Belum Ada Produk</p>
          <p className="text-[10px] text-gray-400">Produk buatan admin akan tampil di sini.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3">
            {paginatedProducts.map((product) => {
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
                        "p-1 rounded-full text-gray-400 hover:text-rose-500 transition-colors cursor-pointer",
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
                          "p-2 rounded bg-[#FA8232] text-white hover:bg-[#e07228] transition-colors shadow-sm active:scale-95 cursor-pointer",
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

          {/* Pagination Controls */}
          {totalPages > 1 && (() => {
            const currentGroupIndex = Math.floor((currentPage - 1) / 5);
            const startPage = currentGroupIndex * 5 + 1;
            const endPage = Math.min(startPage + 4, totalPages);
            const groupPages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
            const hasPrevGroup = startPage > 1;
            const hasNextGroup = endPage < totalPages;

            return (
              <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-xs text-gray-500">
                <span>
                  Hal <span className="font-bold text-gray-900">{currentPage}</span> / {totalPages}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1 rounded border border-gray-200 disabled:opacity-40 hover:bg-gray-50 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>

                  {hasPrevGroup && (
                    <button
                      type="button"
                      onClick={() => setCurrentPage(startPage - 1)}
                      className="px-2 py-0.5 rounded border text-xs font-bold bg-white text-gray-700 border-gray-200 hover:bg-gray-50 cursor-pointer"
                    >
                      ...
                    </button>
                  )}

                  {groupPages.map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={cn(
                        "px-2 py-0.5 rounded border text-xs font-bold transition-colors cursor-pointer",
                        currentPage === pageNum
                          ? "bg-[#FA8232] text-white border-[#FA8232]"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      {pageNum}
                    </button>
                  ))}

                  {hasNextGroup && (
                    <button
                      type="button"
                      onClick={() => setCurrentPage(endPage + 1)}
                      className="px-2 py-0.5 rounded border text-xs font-bold bg-white text-gray-700 border-gray-200 hover:bg-gray-50 cursor-pointer"
                    >
                      ...
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1 rounded border border-gray-200 disabled:opacity-40 hover:bg-gray-50 cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })()}
        </>
      )}

      {/* Mobile Stacked Promo Banners */}
      <div className="space-y-3 pt-2">
        {/* Card 1: Xiaomi Earbuds */}
        <div className="bg-[#F9E58A] rounded-lg p-4 flex items-center justify-between border border-amber-200/60 shadow-sm">
          <div className="space-y-1 max-w-[65%]">
            <h3 className="text-sm font-bold text-gray-900 leading-tight">
              Xiaomi True Wireless Earbuds
            </h3>
            <p className="text-[11px] text-gray-700">
              Escape the noise, hear the magic.
            </p>
            <div className="pt-0.5">
              <span className="bg-white text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm inline-block">
                Only: $299 USD
              </span>
            </div>
            <button
              onClick={(e) =>
                handleAddToCart(e, {
                  id: "promo-xiaomi-earbuds-bundle-mob",
                  title: "Xiaomi True Wireless Earbuds",
                  price: "$299.00",
                  image:
                    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80",
                })
              }
              className="mt-1.5 bg-[#FA8232] hover:bg-[#e07228] text-white font-bold py-1.5 px-3 rounded flex items-center gap-1 text-[11px] uppercase active:scale-95"
            >
              <span>{addedIds["promo-xiaomi-earbuds-bundle-mob"] ? "ADDED" : "SHOP NOW"}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="w-20 h-20 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80"
              alt="Xiaomi Earbuds Promo"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        {/* Card 2: Summer Sales 37% Discount */}
        <div className="bg-[#123C56] text-white rounded-lg p-4 flex items-center justify-between border border-slate-700/60 shadow-sm">
          <div className="space-y-1">
            <span className="bg-[#205477] text-gray-200 text-[9px] font-bold px-2 py-0.5 uppercase rounded-sm inline-block">
              SUMMER SALES
            </span>
            <h3 className="text-xl font-black text-white">
              37% DISCOUNT
            </h3>
            <p className="text-[10px] text-gray-300">
              only for <span className="text-[#EFD33D] font-bold">SmartPhone</span> product.
            </p>
          </div>

          <button
            onClick={(e) =>
              handleAddToCart(e, {
                id: "promo-summer-smartphone-discount-mob",
                title: "Smartphone Summer Sales Discount Bundle",
                price: "$399.00",
                image:
                  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80",
              })
            }
            className="bg-[#2DA5F3] hover:bg-[#1a93e1] text-white font-bold py-2 px-3 rounded flex items-center gap-1 text-[11px] uppercase active:scale-95 whitespace-nowrap"
          >
            <span>{addedIds["promo-summer-smartphone-discount-mob"] ? "ADDED" : "SHOP NOW"}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </section>
  );
}
