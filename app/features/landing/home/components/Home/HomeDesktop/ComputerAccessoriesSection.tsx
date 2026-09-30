import React, { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Star, Heart, ShoppingCart, Eye, Check, PackageX, ChevronLeft, ChevronRight } from "lucide-react";
import { cn, getProductDetailUrl } from "~/lib/utils";
import { useCart } from "~/context/CartContext";
import { useProducts } from "~/hooks/useProducts";

export function ComputerAccessoriesSection() {
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
    <section className="w-full my-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Side Section: Products Header & 4x3 Grid (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            {/* Header Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-gray-200 pb-2">
              <h2 className="text-xl font-bold text-gray-900">Computer Accessories</h2>

              {/* Filter Tabs */}
              <div className="flex items-center gap-6 overflow-x-auto text-sm">
                {tabs.map((tab: { id: string; label: string }) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={cn(
                      "pb-2 font-medium transition-all duration-200 whitespace-nowrap border-b-2 cursor-pointer",
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

            {/* Product Grid (12 Items Max Per Page) */}
            {loading ? (
              <div className="py-16 text-center text-gray-400 text-sm">Memuat produk...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-xl border border-gray-200 p-8 space-y-2">
                <PackageX className="w-10 h-10 text-gray-300 mx-auto" />
                <p className="font-bold text-gray-800">Belum Ada Produk</p>
                <p className="text-xs text-gray-400">Produk buatan admin akan tampil di sini.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {paginatedProducts.map((product) => {
                  const isAdded = addedIds[product.id];
                  const isWished = wishlistIds[product.id];

                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-md border border-gray-200/90 p-4 pt-3 flex flex-col justify-between relative group hover:border-[#FA8232]/60 hover:shadow-md transition-all duration-200"
                    >
                      {/* Badge */}
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
                          <button
                            onClick={(e) => toggleWishlist(e, product.id)}
                            className={cn(
                              "w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-[#FA8232] hover:text-white shadow transition-all duration-200 cursor-pointer",
                              isWished && "bg-rose-500 text-white"
                            )}
                            title="Add to Wishlist"
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </button>

                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            className={cn(
                              "w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-[#FA8232] hover:text-white shadow transition-all duration-200 cursor-pointer",
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

                          <Link
                            to={getProductDetailUrl(product)}
                            className="w-9 h-9 rounded-full bg-[#FA8232] text-white flex items-center justify-center hover:bg-[#e07228] shadow transition-all duration-200"
                            title="Quick View"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="space-y-1.5 mt-1">
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

                        <h4 className="text-xs text-gray-800 font-medium line-clamp-2 min-h-[32px] group-hover:text-[#FA8232] transition-colors">
                          {product.title}
                        </h4>

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
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-200 text-xs text-gray-600">
              <div>
                Menampilkan <span className="font-bold text-gray-900">{startIndex + 1}</span> - <span className="font-bold text-gray-900">{Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)}</span> dari <span className="font-bold text-gray-900">{filteredProducts.length}</span> produk
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    type="button"
                    onClick={() => setCurrentPage(i + 1)}
                    className={cn(
                      "px-3 py-1 rounded border text-xs font-bold transition-colors cursor-pointer",
                      currentPage === i + 1
                        ? "bg-[#FA8232] text-white border-[#FA8232]"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side Section: 2 Stacked Promo Banners (1 Column) */}
        <div className="lg:col-span-1 flex flex-col gap-6 justify-between">
          {/* Top Yellow Card: Xiaomi True Wireless Earbuds */}
          <div className="bg-[#F9E58A] rounded-lg p-6 flex flex-col items-center justify-between text-center border border-amber-200/60 shadow-sm flex-1 min-h-[340px]">
            <div className="w-28 h-28 my-2 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80"
                alt="Xiaomi True Wireless Earbuds"
                className="max-h-full max-w-full object-contain drop-shadow"
              />
            </div>

            <div className="space-y-2 mt-2">
              <h3 className="text-xl font-bold text-gray-900 leading-snug">
                Xiaomi True Wireless Earbuds
              </h3>

              <p className="text-xs text-gray-700 leading-relaxed max-w-[220px] mx-auto">
                Escape the noise, It's time to hear the magic with Xiaomi Earbuds.
              </p>

              <div className="pt-1">
                <span className="text-xs text-gray-700 font-medium mr-1.5">
                  Only for:
                </span>
                <span className="bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded shadow-sm inline-block">
                  $299 USD
                </span>
              </div>
            </div>

            <button
              onClick={(e) =>
                handleAddToCart(e, {
                  id: "promo-xiaomi-earbuds-bundle",
                  title: "Xiaomi True Wireless Earbuds",
                  price: "$299.00",
                  image:
                    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80",
                })
              }
              className="mt-4 w-full bg-[#FA8232] hover:bg-[#e07228] text-white font-bold py-3 px-4 rounded flex items-center justify-center gap-2 text-xs shadow transition-all duration-200 uppercase active:scale-95"
            >
              <span>{addedIds["promo-xiaomi-earbuds-bundle"] ? "ADDED" : "SHOP NOW"}</span>
              {addedIds["promo-xiaomi-earbuds-bundle"] ? (
                <Check className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Bottom Dark Navy Card: 37% Discount Summer Sales */}
          <div className="bg-[#123C56] text-white rounded-lg p-6 flex flex-col items-center justify-between text-center border border-slate-700/60 shadow-sm flex-1 min-h-[300px]">
            <div className="space-y-2 my-auto">
              <span className="bg-[#205477] text-gray-200 text-[10px] font-bold px-3 py-1 uppercase rounded-sm inline-block tracking-wider">
                SUMMER SALES
              </span>

              <h3 className="text-3xl font-black text-white tracking-wide mt-2">
                37% DISCOUNT
              </h3>

              <p className="text-xs text-gray-300 font-normal">
                only for <span className="text-[#EFD33D] font-bold">SmartPhone</span> product.
              </p>
            </div>

            <button
              onClick={(e) =>
                handleAddToCart(e, {
                  id: "promo-summer-smartphone-discount",
                  title: "Smartphone Summer Sales Discount Bundle",
                  price: "$399.00",
                  image:
                    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80",
                })
              }
              className="mt-6 w-full bg-[#2DA5F3] hover:bg-[#1a93e1] text-white font-bold py-3 px-4 rounded flex items-center justify-center gap-2 text-xs shadow transition-all duration-200 uppercase active:scale-95"
            >
              <span>{addedIds["promo-summer-smartphone-discount"] ? "ADDED" : "SHOP NOW"}</span>
              {addedIds["promo-summer-smartphone-discount"] ? (
                <Check className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
