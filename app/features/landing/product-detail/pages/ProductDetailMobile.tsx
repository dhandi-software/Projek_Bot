import * as React from "react";
import { Link } from "react-router";
import {
  ShoppingBag,
  ShoppingCart,
  Star,
  Home,
  ChevronRight,
  Heart,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
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
import { ProductRelatedWidgetSection } from "../components/ProductRelatedWidgetSection";

export function ProductDetailMobile() {
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
    <div className="min-h-screen bg-[url('/images/Background_Mobile.png')] bg-cover bg-top bg-no-repeat bg-fixed py-4 px-3 pb-24 font-sans">
      <div className="mx-auto space-y-4">
        {/* MOBILE BREADCRUMB NAVIGATION */}
        <Breadcrumb className="bg-white py-2.5 px-3.5 rounded-xl border border-slate-200 shadow-2xs overflow-x-auto no-scrollbar">
          <BreadcrumbList className="text-[11px] font-medium text-slate-600 gap-1.5 whitespace-nowrap">
            <BreadcrumbItem className="shrink-0">
              <BreadcrumbLink asChild>
                <Link
                  to="/"
                  className="flex items-center gap-1 text-slate-600 hover:text-orange-600 transition-colors font-semibold"
                >
                  <Home className="size-3 text-slate-500 hover:text-orange-600 shrink-0" />
                  <span>Home</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="text-slate-400 shrink-0">
              <ChevronRight className="size-3" />
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
              <ChevronRight className="size-3" />
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
              <ChevronRight className="size-3" />
            </BreadcrumbSeparator>

            <BreadcrumbItem className="shrink-0">
              <BreadcrumbPage className="font-bold text-orange-600 max-w-[120px] truncate">
                {product.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* MOBILE PRODUCT CARD */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          {/* Main Image Container */}
          <div className="aspect-4/3 w-full rounded-xl border border-slate-200 bg-slate-50 relative overflow-hidden flex items-center justify-center p-4">
            {product.discountBadge && (
              <span className="absolute top-2 left-2 z-10 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                {product.discountBadge}
              </span>
            )}
            <img
              src={selectedImage}
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {product.images.map((imgUrl, idx) => {
                const isSelected = selectedImage === imgUrl;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`size-14 rounded-lg border-2 overflow-hidden flex items-center justify-center p-1 bg-slate-50 shrink-0 ${
                      isSelected ? "border-orange-500 ring-2 ring-orange-500/20" : "border-slate-200"
                    }`}
                  >
                    <img src={imgUrl} alt="thumb" className="max-h-full max-w-full object-contain" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Meta & Rating */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-slate-800">{product.rating}</span>
              <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {product.availability}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-base font-extrabold text-slate-900 leading-snug">
            {product.title}
          </h1>

          {/* Brand & SKU */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>Brand: <strong className="text-orange-600">{product.brand}</strong></span>
            <span>•</span>
            <span>SKU: {product.sku}</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-1 border-t border-slate-100">
            <span className="text-xl font-black text-orange-600">{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs font-semibold text-slate-400 line-through">
                {product.originalPrice}
              </span>
            )}
          </div>

          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-900">
                Color: <span className="text-orange-600 capitalize">{product.colors.find(c => c.id === selectedColor)?.name}</span>
              </label>
              <div className="flex items-center gap-2.5">
                {product.colors.map((color) => {
                  const isSelected = selectedColor === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`size-7 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? "border-orange-500 ring-2 ring-orange-500/30 scale-105" : "border-slate-300"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {isSelected && <Check className={`size-3.5 ${color.hex === "#E3E4E5" ? "text-slate-900" : "text-white"}`} />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size / Storage */}
          {product.sizes.length > 0 && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-900">
                Size / Storage:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-2.5 py-1 rounded text-xs font-bold border ${
                        isSelected ? "bg-orange-50 border-orange-500 text-orange-600" : "bg-white border-slate-200 text-slate-700"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-900">Jumlah:</span>
            <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 p-0.5">
              <button
                onClick={handleDecrement}
                className="size-7 flex items-center justify-center text-slate-600 hover:bg-white rounded"
              >
                <Minus className="size-3" />
              </button>
              <span className="w-8 text-center font-bold text-xs text-slate-900">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="size-7 flex items-center justify-center text-slate-600 hover:bg-white rounded"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>

          {/* Perks */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-1 text-slate-600 text-[10px] font-semibold text-center">
            <div className="flex flex-col items-center gap-1">
              <Truck className="size-4 text-orange-500" />
              <span>Free Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="size-4 text-orange-500" />
              <span>100% Original</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="size-4 text-orange-500" />
              <span>7 Days Return</span>
            </div>
          </div>
        </div>

        {/* MOBILE TABS */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-around border-b border-slate-200 pb-2">
            {(["description", "specification"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold capitalize transition-colors pb-2 -mb-2 border-b-2 ${
                  activeTab === tab ? "border-orange-500 text-orange-600" : "border-transparent text-slate-500"
                }`}
              >
                {tab === "description" ? "Deskripsi" : "Spesifikasi"}
              </button>
            ))}
          </div>

          {activeTab === "description" ? (
            <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
              <p>{product.description}</p>
              <ul className="space-y-1 pt-1">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-slate-700 font-medium">
                    <Check className="size-3 text-orange-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <table className="w-full text-xs text-left">
              <tbody>
                {Object.entries(product.specs).map(([key, val], idx) => (
                  <tr key={key} className={idx % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                    <td className="py-2 px-3 font-bold text-slate-900 w-1/3">{key}</td>
                    <td className="py-2 px-3 text-slate-600">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* RELATED PRODUCTS WIDGET SECTION (Figma 21-8670) */}
        <ProductRelatedWidgetSection currentProductId={product.id} />

        {/* STICKY BOTTOM ACTION BAR FOR MOBILE */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-3 flex items-center gap-2 shadow-lg">
          <button className="size-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-red-500 shrink-0">
            <Heart className="size-4" />
          </button>
          <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-2.5 rounded-xl gap-1.5">
            <ShoppingCart className="size-3.5" />
            <span>Keranjang</span>
          </Button>
          <Button className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl">
            Beli Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
}
