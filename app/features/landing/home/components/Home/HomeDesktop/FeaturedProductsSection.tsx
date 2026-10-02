import React, { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Star, Heart, ShoppingCart, Eye, Check, PackageX } from "lucide-react";
import { cn, getProductDetailUrl } from "~/lib/utils";
import { useCart } from "~/context/CartContext";
import { useProducts } from "~/hooks/useProducts";

export function FeaturedProductsSection() {
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
    } else if (p.is_featured) {
      badgeVariant = "hot";
      badgeText = "HOT";
    }

    return {
      id: String(p.id),
      title: p.title,
      price: formattedPrice,
      originalPrice,
      rating: 5,
      reviewsCount: 15,
      image: p.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
      categoryName: p.category || "Lainnya",
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

  const bannerProduct = realFeaturedProducts[0];

  return (
    <section className="w-full py-[72px]">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        {/* Left Side Banner */}
        <div className="w-full lg:w-80 h-full min-h-[640px] bg-gradient-to-b from-[#F7E070] via-[#F5D547] to-[#E5B82C] rounded-lg p-6 flex flex-col justify-between relative overflow-hidden shadow-sm border border-amber-200/80 shrink-0">
          {/* Top Text Content */}
          <div className="z-10 text-center flex flex-col items-center">
            <span className="text-[#BE4624] font-bold text-xs uppercase tracking-wider block">
              SPESIAL PILIHAN ADMIN
            </span>
            <h3 className="text-3xl font-extrabold text-gray-900 leading-tight mt-1 line-clamp-2">
              {bannerProduct ? bannerProduct.title : "Produk Unggulan"}
            </h3>
            <p className="text-xs text-gray-800 font-medium mt-1">
              Harga Terbaik & Stok Resmi Database
            </p>

            <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
              <span className="text-xs text-gray-700 font-medium">
                Penawaran:
              </span>
              <div className="bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded shadow-sm uppercase">
                {bannerProduct ? bannerProduct.price : "Diskon Terbatas"}
              </div>
            </div>

            {bannerProduct && (
              <button
                onClick={(e) => handleAddToCart(e, bannerProduct)}
                className="mt-4 w-full max-w-[240px] bg-[#FA8232] hover:bg-[#e07228] text-white font-bold py-3 px-6 rounded flex items-center justify-center gap-3 text-sm shadow transition-all duration-200 group active:scale-95 uppercase tracking-wide cursor-pointer"
              >
                <span>BELI SEKARANG</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>

          {/* Bottom Image */}
          <div className="relative mt-4 z-0 flex-1 w-full flex items-center justify-center p-2 overflow-hidden">
            <img
              src={bannerProduct?.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80"}
              alt={bannerProduct?.title || "Produk Unggulan"}
              className="w-full h-full max-h-[380px] object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Right Side Section */}
        <div className="flex flex-col justify-start min-w-0">
          {/* Header Row: Title, Tabs & Browse Link */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 border-b border-gray-200 pb-2 min-w-0">
            <div className="flex items-center gap-6 min-w-0 flex-1 overflow-hidden">
              <h2 className="text-xl font-bold text-gray-900 shrink-0">Featured Products</h2>

              {/* Filter Tabs - Scroll horizontal if overflow */}
              <div
                className="flex items-center gap-6 overflow-x-auto text-sm min-w-0 flex-1 py-1 scrollbar-none"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "pb-2 font-medium transition-all duration-200 whitespace-nowrap border-b-2 cursor-pointer shrink-0",
                      activeTab === tab.id
                        ? "text-gray-900 font-bold border-[#FA8232]"
                        : "text-gray-500 border-transparent hover:text-gray-900"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Browse All Products Link */}
            <Link
              to="/products"
              className="text-sm font-semibold text-[#FA8232] hover:text-[#e07228] flex items-center gap-1.5 transition-colors shrink-0"
            >
              <span>Browse All Product</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="py-16 text-center text-gray-400 text-sm">Memuat produk terbaru...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-xl border border-gray-200 p-8 space-y-2">
              <PackageX className="w-10 h-10 text-gray-300 mx-auto" />
              <p className="font-bold text-gray-800">Belum Ada Produk Ditambahkan</p>
              <p className="text-xs text-gray-400">Produk yang dibuat oleh admin akan tampil di sini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.slice(0, 8).map((product) => {
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
      </div>
    </section>
  );
}
