import React from "react";
import { Search } from "lucide-react";

interface ProductFilterMobileProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export function ProductFilterMobile({
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategory,
  setSelectedCategory,
}: ProductFilterMobileProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="relative w-full">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
        <input
          type="text"
          placeholder="Cari nama produk / SKU..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 h-11 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
        />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full">
        {["ALL", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-2 min-h-[44px] rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
              selectedCategory === cat
                ? "bg-[#1D4ED8] text-white"
                : "bg-white border border-[#E2E8F0] text-[#475569]"
            }`}
          >
            {cat === "ALL" ? "Semua" : cat}
          </button>
        ))}
      </div>
    </div>
  );
}
