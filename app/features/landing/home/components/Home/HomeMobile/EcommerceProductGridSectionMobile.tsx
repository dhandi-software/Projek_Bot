import * as React from "react";
import { Search, X, Star, Heart, ShoppingCart, Eye, Filter, ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";
import { EcommerceFilterSidebar } from "~/components/ui/category";
import { Button } from "~/components/ui/button";

export function EcommerceProductGridSectionMobile() {
  const [showMobileFilter, setShowMobileFilter] = React.useState(false);
  const [activeFilters, setActiveFilters] = React.useState<string[]>([
    "Electronics Devices",
    "5 Star Rating",
  ]);

  const SAMPLE_PRODUCTS = [
    {
      id: "1",
      title: "TOZO T6 True Wireless Earbuds Bluetooth Headphones...",
      price: "$70",
      rating: 5,
      reviewsCount: 738,
      badge: { text: "HOT", variant: "hot" },
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "2",
      title: "Samsung Electronics Samsung Galexy S21 5G",
      price: "$2,300",
      rating: 5,
      reviewsCount: 536,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "3",
      title: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6...",
      price: "$360",
      rating: 5,
      reviewsCount: 423,
      badge: { text: "BEST DEALS", variant: "best-deals" },
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "4",
      title: "Portable Wshing Machine, 11lbs capacity Model 18NMF...",
      price: "$80",
      rating: 4,
      reviewsCount: 816,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "5",
      title: "Wired Over-Ear Gaming Headphones with USB",
      price: "$1,500",
      rating: 5,
      reviewsCount: 647,
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "6",
      title: "Polaroid 57-Inch Photo/Video Tripod with Deluxe Tripod Ca...",
      price: "$1,200",
      originalPrice: "$1600",
      rating: 4,
      reviewsCount: 877,
      badge: { text: "25% OFF", variant: "discount" },
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="w-full space-y-4 font-sans px-3 py-4">
      {/* Search & Filter Bar for Mobile */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9 text-xs text-slate-800 focus:border-orange-500 focus:outline-none"
          />
          <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-500" />
        </div>

        {/* Mobile Filter Drawer Trigger */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowMobileFilter(!showMobileFilter)}
          className="rounded-lg border-slate-200 gap-1.5 text-xs font-semibold shrink-0"
        >
          <Filter className="size-3.5 text-orange-500" />
          <span>Filter ({activeFilters.length})</span>
        </Button>
      </div>

      {/* Active Filters Bar (Scrollable) */}
      <div className="flex items-center justify-between bg-slate-100/90 rounded-lg p-2.5 text-xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] text-slate-500 font-medium shrink-0">Filters:</span>
          {activeFilters.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1 rounded bg-white px-2 py-0.5 text-[10px] font-bold text-slate-800 shadow-2xs shrink-0"
            >
              {f}
              <X
                className="size-3 text-slate-400 cursor-pointer"
                onClick={() => setActiveFilters(activeFilters.filter((item) => item !== f))}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Mobile Drawer / Overlay */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end">
          <div className="w-4/5 max-w-xs bg-white h-full p-5 overflow-y-auto space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-sm text-slate-900">Filter Products</h3>
              <X
                className="size-5 text-slate-500 cursor-pointer"
                onClick={() => setShowMobileFilter(false)}
              />
            </div>
            <EcommerceFilterSidebar />
            <Button
              onClick={() => setShowMobileFilter(false)}
              className="w-full bg-orange-500 text-white font-bold text-xs py-2 rounded-lg"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}

      {/* Mobile Product Grid (2-Columns) */}
      <div className="grid grid-cols-2 gap-3">
        {SAMPLE_PRODUCTS.map((prod) => (
          <div
            key={prod.id}
            className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-2.5 space-y-2 relative"
          >
            {prod.badge && (
              <span className="absolute top-2 left-2 z-10 rounded-xs px-1.5 py-0.5 text-[9px] font-bold bg-orange-500 text-white">
                {prod.badge.text}
              </span>
            )}
            <div className="aspect-square w-full rounded bg-slate-50 overflow-hidden flex items-center justify-center">
              <img src={prod.image} alt={prod.title} className="h-full w-full object-contain" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                <Star className="size-3 fill-amber-400 text-amber-400" />
                <span>{prod.rating} ({prod.reviewsCount})</span>
              </div>
              <h4 className="text-[11px] font-medium text-slate-900 line-clamp-2 leading-tight">
                {prod.title}
              </h4>
              <div className="text-xs font-bold text-[#2DA5F3]">
                {prod.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
