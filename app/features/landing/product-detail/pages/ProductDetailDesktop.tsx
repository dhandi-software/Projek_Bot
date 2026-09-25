import * as React from "react";
import { Link } from "react-router";
import {
  ShoppingBag,
  ShoppingCart,
  Star,
  Home,
  ChevronRight,
  Heart,
  Share2,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  Eye,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import { useProductDetail, PRODUCTS_DATABASE } from "./UseProductDetail";
import { ProductDetailInfoTabs } from "../components/ProductDetailInfoTabs";
import { ProductRelatedWidgetSection } from "../components/ProductRelatedWidgetSection";

export function ProductDetailDesktop() {
  const {
    product,
    selectedImage,
    setSelectedImage,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    quantity,
    handleIncrement,
    handleDecrement,
    activeTab,
    setActiveTab,
  } = useProductDetail();

  const relatedProducts = Object.values(PRODUCTS_DATABASE).filter(
    (p) => p.id !== product.id
  );

  return (
    <div className="min-h-screen bg-[url('/images/Background_Eccomerce.png')] bg-cover bg-top bg-no-repeat bg-fixed py-6 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* BREADCRUMB NAVIGATION */}
        <Breadcrumb className="bg-white py-3.5 px-5 rounded-2xl border border-slate-200 shadow-2xs">
          <BreadcrumbList className="text-xs font-medium text-slate-600 gap-2">
            <BreadcrumbItem className="shrink-0">
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

            <BreadcrumbSeparator className="text-slate-400 shrink-0">
              <ChevronRight className="size-3.5" />
            </BreadcrumbSeparator>

            <BreadcrumbItem className="shrink-0">
              <BreadcrumbLink asChild>
                <Link
                  to="/category-demo"
                  className="text-slate-600 hover:text-orange-600 transition-colors font-semibold"
                >
                  Category
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="text-slate-400 shrink-0">
              <ChevronRight className="size-3.5" />
            </BreadcrumbSeparator>

            <BreadcrumbItem className="shrink-0">
              <BreadcrumbLink asChild>
                <Link
                  to={`/category-demo?category=${product.categoryId}`}
                  className="text-slate-600 hover:text-orange-600 transition-colors font-semibold"
                >
                  {product.category}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="text-slate-400 shrink-0">
              <ChevronRight className="size-3.5" />
            </BreadcrumbSeparator>

            <BreadcrumbItem className="shrink-0">
              <BreadcrumbPage className="font-bold text-orange-600">
                {product.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* MAIN PRODUCT DETAIL CARD (GLASSMORPHISM) */}
        <div className="bg-white/85 backdrop-blur-md p-6 lg:p-8 rounded-2xl border border-white/80 shadow-lg shadow-sky-950/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* LEFT COLUMN: PRODUCT GALLERY */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image Container */}
              <div className="aspect-4/3 w-full rounded-2xl border border-slate-200 bg-slate-50 relative overflow-hidden flex items-center justify-center p-6 group">
                {product.discountBadge && (
                  <span className="absolute top-4 left-4 z-10 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-xs">
                    {product.discountBadge}
                  </span>
                )}
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>

              {/* Thumbnails List */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {product.images.map((imgUrl, idx) => {
                    const isSelected = selectedImage === imgUrl;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(imgUrl)}
                        className={`size-20 rounded-xl border-2 overflow-hidden flex items-center justify-center p-1 bg-slate-50 transition-all cursor-pointer shrink-0 ${
                          isSelected
                            ? "border-orange-500 ring-2 ring-orange-500/20"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`${product.title} thumb ${idx + 1}`}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: PRODUCT INFO & VARIANTS */}
            <div className="lg:col-span-6 space-y-5">
              {/* Meta Top Info */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {product.rating} Star Rating
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500">
                    ({product.reviewsCount} User Feedback)
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                  <Check className="size-3" />
                  {product.availability}
                </span>
              </div>

              {/* Product Title (No Truncation) */}
              <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">
                {product.title}
              </h1>

              {/* SKU & Brand */}
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span>
                  SKU: <strong className="text-slate-800">{product.sku}</strong>
                </span>
                <span>•</span>
                <span>
                  Brand: <strong className="text-orange-600">{product.brand}</strong>
                </span>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pb-2 border-b border-slate-100">
                <span className="text-3xl font-black text-orange-600">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg font-semibold text-slate-400 line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>

              {/* Description Snippet */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Color Options */}
              {product.colors.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Color: <span className="text-orange-600 capitalize">{product.colors.find(c => c.id === selectedColor)?.name}</span>
                  </label>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color) => {
                      const isSelected = selectedColor === color.id;
                      return (
                        <button
                          key={color.id}
                          onClick={() => setSelectedColor(color.id)}
                          title={color.name}
                          className={`size-8 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? "border-orange-500 ring-2 ring-orange-500/30 scale-110"
                              : "border-slate-300 hover:scale-105"
                          }`}
                          style={{ backgroundColor: color.hex }}
                        >
                          {isSelected && (
                            <Check className={`size-4 ${color.hex === "#E3E4E5" || color.hex === "#FFFFFF" ? "text-slate-900" : "text-white"}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size / Storage Options */}
              {product.sizes.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Size / Storage:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                            isSelected
                              ? "bg-orange-50 border-orange-500 text-orange-600 shadow-2xs"
                              : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity & Actions Row */}
              <div className="pt-2 flex items-center gap-4">
                {/* Quantity Control */}
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                  <button
                    onClick={handleDecrement}
                    className="size-8 flex items-center justify-center text-slate-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="size-8 flex items-center justify-center text-slate-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>

                {/* Add To Cart */}
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-3 px-6 rounded-xl gap-2 shadow-xs transition-all cursor-pointer">
                  <ShoppingCart className="size-4" />
                  <span>ADD TO CART</span>
                </Button>

                {/* Buy Now */}
                <Button className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3 px-6 rounded-xl shadow-xs transition-all cursor-pointer">
                  BUY NOW
                </Button>

                {/* Wishlist Button */}
                <button className="size-11 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all cursor-pointer">
                  <Heart className="size-5" />
                </button>
              </div>

              {/* Guarantee Perks */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-3 text-slate-600">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Truck className="size-4 text-orange-500" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <ShieldCheck className="size-4 text-orange-500" />
                  <span>100% Genuine</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <RotateCcw className="size-4 text-orange-500" />
                  <span>7 Days Return</span>
                </div>
              </div>
            </div>
          </div>

          {/* PRODUCT INFORMATION TABBED SECTION (Figma 21-8669) */}
          <ProductDetailInfoTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            product={product}
          />
        </div>

        {/* RELATED PRODUCTS 4-COLUMN WIDGET SECTION (Figma 21-8670) */}
        <ProductRelatedWidgetSection currentProductId={product.id} currentCategory={product.category} />
      </div>
    </div>
  );
}
