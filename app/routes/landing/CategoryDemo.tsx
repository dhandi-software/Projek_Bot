import * as React from "react";
import { EcommerceFilterSidebar } from "~/components/ui/category";
import { ShoppingBag, Star } from "lucide-react";

export function meta() {
  return [
    { title: "E-Commerce Category & Filter Demo" },
    { name: "description", content: "Showcase & Demo Komponen E-Commerce Category & Sidebar Filter Figma" },
  ];
}



const SAMPLE_PRODUCTS = [
  {
    id: "1",
    title: "MacBook Pro M3 Max 16-inch",
    price: "$2,499",
    rating: "4.9",
    badge: "Best Seller",
    brand: "Apple",
  },
  {
    id: "2",
    title: "Dell XPS 15 OLED Touch",
    price: "$1,899",
    rating: "4.8",
    badge: "New",
    brand: "Dell",
  },
  {
    id: "3",
    title: "Sony WH-1000XM5 Wireless Headphone",
    price: "$399",
    rating: "4.9",
    badge: "Hot",
    brand: "Sony",
  },
  {
    id: "4",
    title: "Samsung Galaxy S24 Ultra 512GB",
    price: "$1,299",
    rating: "4.7",
    badge: "Popular",
    brand: "Samsung",
  },
  {
    id: "5",
    title: "LG UltraGear 32-inch Gaming Monitor",
    price: "$699",
    rating: "4.8",
    badge: "Sale",
    brand: "LG",
  },
  {
    id: "6",
    title: "Google Pixel 8 Pro AI Camera",
    price: "$999",
    rating: "4.6",
    badge: "Hot",
    brand: "Google",
  },
];

export default function CategoryDemo() {
  const [selectedCatId, setSelectedCatId] = React.useState("electronics");

  return (
    <div className="min-h-screen bg-slate-50/40 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* E-COMMERCE SHOP LAYOUT */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* E-commerce Filter Sidebar */}
            <EcommerceFilterSidebar
              selectedCategoryId={selectedCatId}
              onSelectCategory={(id) => setSelectedCatId(id)}
              className="w-full lg:w-72 p-4 bg-slate-50/50 rounded-xl border border-slate-200/80 shrink-0"
            />

            {/* Product Grid Area */}
            <div className="flex-1 w-full space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-semibold text-slate-600">
                  Menampilkan <span className="text-slate-900 font-bold">{SAMPLE_PRODUCTS.length}</span> Produk
                </span>
                <select className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-700 font-medium focus:outline-none bg-white shadow-2xs">
                  <option>Urutkan: Popularitas</option>
                  <option>Harga: Termurah</option>
                  <option>Harga: Termahal</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {SAMPLE_PRODUCTS.map((prod) => (
                  <div
                    key={prod.id}
                    className="group rounded-2xl border border-slate-200 p-4 bg-white hover:border-orange-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="h-44 w-full rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-sm relative overflow-hidden group-hover:scale-102 transition-transform">
                        <ShoppingBag className="size-10 text-slate-300" />
                        <span className="absolute top-2 left-2 rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-2xs">
                          {prod.badge}
                        </span>
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
