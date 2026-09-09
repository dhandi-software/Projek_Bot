import * as React from "react";
import { cn } from "~/lib/utils";
import { Check } from "lucide-react";

export interface CategoryOption {
  id: string;
  name: string;
}

export interface PriceOption {
  id: string;
  label: string;
  min?: number;
  max?: number;
}

export interface BrandOption {
  id: string;
  name: string;
}

export interface EcommerceFilterSidebarProps {
  categories?: CategoryOption[];
  selectedCategoryId?: string;
  onSelectCategory?: (id: string) => void;

  priceOptions?: PriceOption[];
  selectedPriceId?: string;
  onSelectPrice?: (id: string) => void;
  minPrice?: string;
  maxPrice?: string;
  onMinPriceChange?: (val: string) => void;
  onMaxPriceChange?: (val: string) => void;

  brands?: BrandOption[];
  selectedBrandIds?: string[];
  onToggleBrand?: (id: string) => void;

  className?: string;
}

const DEFAULT_CATEGORIES: CategoryOption[] = [
  { id: "electronics", name: "Electronics Devices" },
  { id: "computer-laptop", name: "Computer & Laptop" },
  { id: "computer-acc", name: "Computer Accessories" },
  { id: "smartphone", name: "SmartPhone" },
  { id: "headphone", name: "Headphone" },
  { id: "mobile-acc", name: "Mobile Accessories" },
  { id: "gaming-console", name: "Gaming Console" },
  { id: "camera-photo", name: "Camera & Photo" },
  { id: "tv-appliances", name: "TV & Homes Appliances" },
  { id: "watches-acc", name: "Watchs & Accessories" },
  { id: "gps-navigation", name: "GPS & Navigation" },
  { id: "wearable-tech", name: "Warable Technology" },
];

const DEFAULT_PRICES: PriceOption[] = [
  { id: "all", label: "All Price" },
  { id: "under-20", label: "Under $20" },
  { id: "25-100", label: "$25 to $100" },
  { id: "100-300", label: "$100 to $300" },
  { id: "300-500", label: "$300 to $500" },
  { id: "500-1000", label: "$500 to $1,000" },
  { id: "1000-10000", label: "$1,000 to $10,000" },
];

const DEFAULT_BRANDS: BrandOption[] = [
  { id: "apple", name: "Apple" },
  { id: "google", name: "Google" },
  { id: "microsoft", name: "Microsoft" },
  { id: "samsung", name: "Samsung" },
  { id: "dell", name: "Dell" },
  { id: "hp", name: "HP" },
  { id: "symphony", name: "Symphony" },
  { id: "xiaomi", name: "Xiaomi" },
  { id: "sony", name: "Sony" },
  { id: "panasonic", name: "Panasonic" },
  { id: "lg", name: "LG" },
  { id: "intel", name: "Intel" },
];

export function EcommerceFilterSidebar({
  categories = DEFAULT_CATEGORIES,
  selectedCategoryId: initialCatId = "electronics",
  onSelectCategory,

  priceOptions = DEFAULT_PRICES,
  selectedPriceId: initialPriceId = "300-500",
  onSelectPrice,
  minPrice: propMinPrice = "$300",
  maxPrice: propMaxPrice = "$500",
  onMinPriceChange,
  onMaxPriceChange,

  brands = DEFAULT_BRANDS,
  selectedBrandIds: initialBrandIds = ["apple", "google", "microsoft", "hp", "panasonic", "lg"],
  onToggleBrand,

  className,
}: EcommerceFilterSidebarProps) {
  const MIN = 0;
  const MAX = 2000;

  const [selectedCat, setSelectedCat] = React.useState(initialCatId);
  const [selectedPrice, setSelectedPrice] = React.useState(initialPriceId);
  const [minPrice, setMinPrice] = React.useState(propMinPrice);
  const [maxPrice, setMaxPrice] = React.useState(propMaxPrice);
  const [sliderMin, setSliderMin] = React.useState<number>(300);
  const [sliderMax, setSliderMax] = React.useState<number>(500);
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>(initialBrandIds);

  const handleCategorySelect = (id: string) => {
    setSelectedCat(id);
    onSelectCategory?.(id);
  };

  const handlePriceSelect = (id: string) => {
    setSelectedPrice(id);
    onSelectPrice?.(id);

    if (id === "under-20") {
      setSliderMin(0); setSliderMax(20);
      setMinPrice("$0"); setMaxPrice("$20");
    } else if (id === "25-100") {
      setSliderMin(25); setSliderMax(100);
      setMinPrice("$25"); setMaxPrice("$100");
    } else if (id === "100-300") {
      setSliderMin(100); setSliderMax(300);
      setMinPrice("$100"); setMaxPrice("$300");
    } else if (id === "300-500") {
      setSliderMin(300); setSliderMax(500);
      setMinPrice("$300"); setMaxPrice("$500");
    } else if (id === "500-1000") {
      setSliderMin(500); setSliderMax(1000);
      setMinPrice("$500"); setMaxPrice("$1000");
    } else if (id === "1000-10000") {
      setSliderMin(1000); setSliderMax(2000);
      setMinPrice("$1000"); setMaxPrice("$2000");
    } else if (id === "all") {
      setSliderMin(0); setSliderMax(2000);
      setMinPrice("$0"); setMaxPrice("$2000");
    }
  };

  const handleMinSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), sliderMax - 20);
    setSliderMin(val);
    const formatted = `$${val}`;
    setMinPrice(formatted);
    onMinPriceChange?.(formatted);
  };

  const handleMaxSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), sliderMin + 20);
    setSliderMax(val);
    const formatted = `$${val}`;
    setMaxPrice(formatted);
    onMaxPriceChange?.(formatted);
  };

  const handleMinInputChange = (val: string) => {
    setMinPrice(val);
    onMinPriceChange?.(val);
    const num = parseInt(val.replace(/[^0-9]/g, ""), 10);
    if (!isNaN(num) && num >= MIN && num <= sliderMax - 10) {
      setSliderMin(num);
    }
  };

  const handleMaxInputChange = (val: string) => {
    setMaxPrice(val);
    onMaxPriceChange?.(val);
    const num = parseInt(val.replace(/[^0-9]/g, ""), 10);
    if (!isNaN(num) && num <= MAX && num >= sliderMin + 10) {
      setSliderMax(num);
    }
  };

  const minPercent = Math.min(100, Math.max(0, ((sliderMin - MIN) / (MAX - MIN)) * 100));
  const maxPercent = Math.min(100, Math.max(0, ((sliderMax - MIN) / (MAX - MIN)) * 100));

  const handleBrandToggle = (id: string) => {
    const next = selectedBrands.includes(id)
      ? selectedBrands.filter((b) => b !== id)
      : [...selectedBrands, id];
    setSelectedBrands(next);
    onToggleBrand?.(id);
  };

  return (
    <aside
      className={cn(
        "w-full max-w-[280px] shrink-0 font-sans text-slate-700 select-none space-y-6 pr-2",
        className
      )}
    >
      {/* 1. CATEGORY SECTION */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold tracking-wider uppercase text-slate-900">
          CATEGORY
        </h3>
        <div className="space-y-2.5">
          {categories.map((cat) => {
            const isSelected = selectedCat === cat.id;
            return (
              <label
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className="flex items-center gap-3 cursor-pointer group text-sm font-medium transition-colors hover:text-orange-500"
              >
                {/* Radio Circle */}
                <div
                  className={cn(
                    "size-4 rounded-full border flex items-center justify-center transition-all shrink-0",
                    isSelected
                      ? "border-orange-500 bg-white"
                      : "border-slate-300 group-hover:border-orange-400"
                  )}
                >
                  {isSelected && (
                    <div className="size-2 rounded-full bg-orange-500" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs leading-none transition-colors",
                    isSelected
                      ? "font-semibold text-slate-900"
                      : "text-slate-600 group-hover:text-slate-900"
                  )}
                >
                  {cat.name}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* 2. PRICE RANGE SECTION */}
      <div className="space-y-4">
        <h3 className="text-xs font-extrabold tracking-wider uppercase text-slate-900">
          PRICE RANGE
        </h3>

        {/* Interactive Dual Range Slider Visual */}
        <div className="relative py-4 flex items-center w-full">
          {/* Track background */}
          <div className="h-1.5 w-full bg-slate-200 rounded-full relative">
            {/* Active orange range line */}
            <div
              className="absolute h-1.5 bg-orange-500 rounded-full"
              style={{
                left: `${minPercent}%`,
                width: `${maxPercent - minPercent}%`,
              }}
            />
          </div>

          {/* Hidden Range Inputs overlaid for dual dragging */}
          <input
            type="range"
            min={MIN}
            max={MAX}
            value={sliderMin}
            onChange={handleMinSliderChange}
            className="absolute w-full h-2 opacity-0 cursor-pointer pointer-events-auto accent-orange-500 z-30"
          />
          <input
            type="range"
            min={MIN}
            max={MAX}
            value={sliderMax}
            onChange={handleMaxSliderChange}
            className="absolute w-full h-2 opacity-0 cursor-pointer pointer-events-auto accent-orange-500 z-40"
          />

          {/* Min Visual Thumb Handle */}
          <div
            className="absolute size-4 rounded-full border-2 border-orange-500 bg-white shadow-md pointer-events-none transform -translate-x-1/2 hover:scale-110 transition-transform z-10"
            style={{ left: `${minPercent}%` }}
          />

          {/* Max Visual Thumb Handle */}
          <div
            className="absolute size-4 rounded-full border-2 border-orange-500 bg-white shadow-md pointer-events-none transform -translate-x-1/2 hover:scale-110 transition-transform z-20"
            style={{ left: `${maxPercent}%` }}
          />
        </div>

        {/* Min / Max Input Fields */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => handleMinInputChange(e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 font-semibold"
          />
          <input
            type="text"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => handleMaxInputChange(e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 font-semibold"
          />
        </div>

        {/* Price Radio List */}
        <div className="space-y-2.5 pt-1">
          {priceOptions.map((price) => {
            const isSelected = selectedPrice === price.id;
            return (
              <label
                key={price.id}
                onClick={() => handlePriceSelect(price.id)}
                className="flex items-center gap-3 cursor-pointer group text-xs font-medium transition-colors"
              >
                <div
                  className={cn(
                    "size-4 rounded-full border flex items-center justify-center transition-all shrink-0",
                    isSelected
                      ? "border-orange-500 bg-white"
                      : "border-slate-300 group-hover:border-orange-400"
                  )}
                >
                  {isSelected && (
                    <div className="size-2 rounded-full bg-orange-500" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs leading-none transition-colors",
                    isSelected
                      ? "font-semibold text-slate-900"
                      : "text-slate-600 group-hover:text-slate-900"
                  )}
                >
                  {price.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* 3. POPULAR BRANDS SECTION */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold tracking-wider uppercase text-slate-900">
          POPULAR BRANDS
        </h3>

        {/* 2-Column Grid for Brand Checkboxes */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
          {brands.map((brand) => {
            const isChecked = selectedBrands.includes(brand.id);
            return (
              <label
                key={brand.id}
                onClick={() => handleBrandToggle(brand.id)}
                className="flex items-center gap-2.5 cursor-pointer group text-xs font-medium transition-colors"
              >
                {/* Custom Checkbox */}
                <div
                  className={cn(
                    "size-4 rounded border flex items-center justify-center transition-all shrink-0",
                    isChecked
                      ? "bg-orange-500 border-orange-500 text-white"
                      : "border-slate-300 group-hover:border-orange-400 bg-white"
                  )}
                >
                  {isChecked && <Check className="size-3 stroke-[3]" />}
                </div>
                <span
                  className={cn(
                    "text-xs leading-none truncate transition-colors",
                    isChecked
                      ? "font-semibold text-slate-900"
                      : "text-slate-600 group-hover:text-slate-900"
                  )}
                >
                  {brand.name}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
