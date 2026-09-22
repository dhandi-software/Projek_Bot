import * as React from "react";
import { Link } from "react-router";
import { EcommerceFilterSidebar } from "~/components/ui/category";
import { Star, Home, ChevronRight, SlidersHorizontal, X, Heart, ShoppingCart, Eye, Check } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import { useCart } from "~/context/CartContext";
import { useCategory } from "./UseCategory";

export function CategoryMobile() {
  const {
    selectedCatId,
    setSelectedCatId,
    activeCategoryTitle,
    showMobileFilter,
    setShowMobileFilter,
    products,
  } = useCategory();

  const { addToCart } = useCart();
  const [wishlist, setWishlist] = React.useState<Record<string, boolean>>({});
  const [addedCart, setAddedCart] = React.useState<Record<string, boolean>>({});

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (e: React.MouseEvent, prod: (typeof products)[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: prod.id,
      title: prod.title,
      price: prod.price,
      image: prod.image,
    });
    setAddedCart((prev) => ({ ...prev, [prod.id]: true }));
    setTimeout(() => {
      setAddedCart((prev) => ({ ...prev, [prod.id]: false }));
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[url('/images/Background_Mobile.png')] bg-cover bg-top bg-no-repeat bg-fixed py-4 px-3">
      <div className="mx-auto space-y-4">
        {/* Mobile Breadcrumb Navigation Component */}
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
              <BreadcrumbPage className="font-bold text-orange-600">
                {activeCategoryTitle}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* E-COMMERCE SHOP MOBILE LAYOUT */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          {/* Mobile Filter Bar Trigger */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <span>{products.length} Produk</span>
              <span className="text-slate-300">•</span>
              <span className="text-orange-600 font-bold truncate max-w-[140px]">{activeCategoryTitle}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMobileFilter(true)}
              className="rounded-lg border-slate-200 gap-1.5 text-xs font-semibold shrink-0 bg-slate-50 hover:bg-orange-50 text-slate-700 hover:text-orange-600 hover:border-orange-300 transition-colors"
            >
              <SlidersHorizontal className="size-3.5 text-orange-500" />
              <span>Filter Sidebar</span>
            </Button>
          </div>

          {/* Mobile Filter Drawer Overlay */}
          {showMobileFilter && (
            <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end transition-all">
              <div className="w-4/5 max-w-xs bg-white h-full p-4 overflow-y-auto space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="size-4 text-orange-500" />
                      <h3 className="font-bold text-sm text-slate-900">Filter Products</h3>
                    </div>
                    <button
                      onClick={() => setShowMobileFilter(false)}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <X className="size-5" />
                    </button>
                  </div>
                  <EcommerceFilterSidebar
                    selectedCategoryId={selectedCatId}
                    onSelectCategory={(id) => {
                      setSelectedCatId(id);
                      setShowMobileFilter(false);
                    }}
                  />
                </div>
                <div className="pt-3 border-t">
                  <Button
                    onClick={() => setShowMobileFilter(false)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-2 rounded-lg"
                  >
                    Terapkan Filter
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Product Grid Area (2-Columns) */}
          <div className="grid grid-cols-2 gap-3">
            {products.map((prod) => {
              const isWished = wishlist[prod.id];
              const isAdded = addedCart[prod.id];

              return (
                <Link
                  key={prod.id}
                  to={`/product/${prod.id}`}
                  className="group rounded-xl border border-slate-200 p-2.5 bg-white hover:border-orange-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="h-36 w-full rounded-lg bg-slate-50 flex items-center justify-center relative overflow-hidden">
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="h-full w-full object-contain p-1.5 group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-1.5 left-1.5 rounded-full bg-orange-500 px-2 py-0.5 text-[9px] font-bold text-white shadow-2xs z-10">
                        {prod.badge}
                      </span>

                      {/* 3 Action Overlay Icons (Wishlist, Shopping Cart, View Detail) */}
                      <div className="absolute inset-0 bg-slate-900/15 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-1.5 z-20">
                        <button
                          type="button"
                          title="Add to Wishlist"
                          onClick={(e) => toggleWishlist(e, prod.id)}
                          className={`size-8 rounded-full flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer ${
                            isWished
                              ? "bg-rose-500 text-white"
                              : "bg-white text-slate-800 hover:bg-orange-500 hover:text-white"
                          }`}
                        >
                          <Heart className="size-4 fill-current" />
                        </button>

                        <button
                          type="button"
                          title="Add to Cart"
                          onClick={(e) => handleAddToCart(e, prod)}
                          className={`size-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer active:scale-90 ${
                            isAdded
                              ? "bg-emerald-500 text-white"
                              : "bg-orange-500 text-white hover:bg-orange-600"
                          }`}
                        >
                          {isAdded ? (
                            <Check className="size-4" />
                          ) : (
                            <ShoppingCart className="size-4" />
                          )}
                        </button>

                        <Link
                          to={`/product/${prod.id}`}
                          title="Quick View"
                          onClick={(e) => e.stopPropagation()}
                          className="size-8 rounded-full bg-white text-slate-800 hover:bg-orange-500 hover:text-white shadow-md transition-all duration-300 flex items-center justify-center cursor-pointer"
                        >
                          <Eye className="size-4" />
                        </Link>
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-orange-500">
                        {prod.brand}
                      </span>
                      <h4 className="font-bold text-xs text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {prod.title}
                      </h4>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900">
                      {prod.price}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-500">
                      <Star className="size-3 fill-amber-400 text-amber-400" />
                      <span>{prod.rating}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
