import * as React from "react";
import { Link } from "react-router";
import { EcommerceFilterSidebar } from "~/components/ui/category";
import { Star, Home, ChevronRight, Heart, ShoppingCart, Eye, Check } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { useCart } from "~/context/CartContext";
import { useCategory } from "./UseCategory";

export function CategoryDesktop() {
  const {
    selectedCatId,
    setSelectedCatId,
    activeCategoryTitle,
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
    <div className="min-h-screen bg-[url('/images/Background_Eccomerce.png')] bg-cover bg-top bg-no-repeat bg-fixed py-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-5">
        {/* Desktop Breadcrumb Navigation Component */}
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
              <BreadcrumbLink asChild>
                <Link
                  to="/category-demo"
                  className="text-slate-600 hover:text-orange-600 transition-colors font-semibold"
                >
                  Category
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="text-slate-400">
              <ChevronRight className="size-3.5" />
            </BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold text-orange-600">
                {activeCategoryTitle}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* E-COMMERCE SHOP DESKTOP LAYOUT (GLASSMORPHISM) */}
        <div className="bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/80 shadow-lg shadow-sky-950/5 space-y-6">
          <div className="flex flex-row gap-8 items-start">
            {/* E-commerce Filter Sidebar */}
            <EcommerceFilterSidebar
              selectedCategoryId={selectedCatId}
              onSelectCategory={(id) => setSelectedCatId(id)}
              className="w-72 p-4 bg-slate-50/50 rounded-xl border border-slate-200/80 shrink-0"
            />

            {/* Product Grid Area */}
            <div className="flex-1 w-full space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-semibold text-slate-600">
                  Menampilkan <span className="text-slate-900 font-bold">{products.length}</span> Produk dalam <span className="text-orange-600 font-bold">{activeCategoryTitle}</span>
                </span>
                <select className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-700 font-medium focus:outline-none bg-white shadow-2xs">
                  <option>Urutkan: Popularitas</option>
                  <option>Harga: Termurah</option>
                  <option>Harga: Termahal</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((prod) => {
                  const isWished = wishlist[prod.id];
                  const isAdded = addedCart[prod.id];

                  return (
                    <Link
                      key={prod.id}
                      to={`/product/${prod.id}`}
                      className="group rounded-2xl border border-slate-200 p-4 bg-white hover:border-orange-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="h-44 w-full rounded-xl bg-slate-50 flex items-center justify-center relative overflow-hidden">
                          <img
                            src={prod.image}
                            alt={prod.title}
                            className="h-full w-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-2 left-2 rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-2xs z-10">
                            {prod.badge}
                          </span>

                          {/* 3 Action Overlay Icons (Wishlist, Shopping Cart, View Detail) */}
                          <div className="absolute inset-0 bg-slate-900/15 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 z-20">
                            {/* Like / Wishlist Button */}
                            <button
                              type="button"
                              title="Add to Wishlist"
                              onClick={(e) => toggleWishlist(e, prod.id)}
                              className={`size-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 cursor-pointer ${
                                isWished
                                  ? "bg-rose-500 text-white"
                                  : "bg-white text-slate-800 hover:bg-orange-500 hover:text-white"
                              }`}
                            >
                              <Heart className="size-5 fill-current" />
                            </button>

                            {/* Shop / Add to Cart Button */}
                            <button
                              type="button"
                              title="Add to Cart"
                              onClick={(e) => handleAddToCart(e, prod)}
                              className={`size-13 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 cursor-pointer active:scale-90 ${
                                isAdded
                                  ? "bg-emerald-500 text-white"
                                  : "bg-orange-500 text-white hover:bg-orange-600"
                              }`}
                            >
                              {isAdded ? (
                                <Check className="size-6" />
                              ) : (
                                <ShoppingCart className="size-6" />
                              )}
                            </button>

                            {/* Quick View / Detail Link Button */}
                            <Link
                              to={`/product/${prod.id}`}
                              title="Quick View"
                              onClick={(e) => e.stopPropagation()}
                              className="size-11 rounded-full bg-white text-slate-800 hover:bg-orange-500 hover:text-white shadow-lg transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 flex items-center justify-center cursor-pointer"
                            >
                              <Eye className="size-5" />
                            </Link>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500">
                            {prod.brand}
                          </span>
                          <h4 className="font-bold text-sm text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                            {prod.title}
                          </h4>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-sm font-extrabold text-slate-900">
                          {prod.price}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                          <Star className="size-3.5 fill-amber-400 text-amber-400" />
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
      </div>
    </div>
  );
}
