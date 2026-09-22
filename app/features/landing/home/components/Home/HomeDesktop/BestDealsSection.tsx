import React from "react";
import { Link } from "react-router";
import { ArrowRight, Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { cn } from "~/lib/utils";
import { useCart } from "~/context/CartContext";

export interface DealProduct {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  reviewsCount?: number;
  image: string;
  description?: string;
  badge?: {
    text: string;
    variant: "hot" | "sold-out" | "discount" | "sale";
  };
}

// Featured Left Card Product
const FEATURED_DEAL: DealProduct = {
  id: "featured-xbox-series-s",
  title: "Xbox Series S - 512GB SSD Console with Wireless Controller - EU Version",
  price: "$442.12",
  originalPrice: "$865.99",
  rating: 5,
  reviewsCount: 52677,
  description: "Games built using the Xbox Series X|S development kit showcase unparalleled load times, visuals.",
  badge: { text: "32% OFF", variant: "discount" },
  image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=600&q=80",
};

// Right 4x2 Grid Products (8 Items)
const GRID_DEALS: DealProduct[] = [
  {
    id: "deal-bose-earbuds",
    title: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...",
    price: "$2,300",
    badge: { text: "SOLD OUT", variant: "sold-out" },
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "deal-simple-mobile",
    title: "Simple Mobile 4G LTE Prepaid Smartphone",
    price: "$220",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "deal-smart-tv",
    title: "4K UHD LED Smart TV with Chromecast Built-in",
    price: "$1,150",
    originalPrice: "$865.00",
    badge: { text: "19% OFF", variant: "discount" },
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "deal-sony-camera",
    title: "Sony DSCHX8 High Zoom Point & Shoot Camera",
    price: "$1,200",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "deal-dell-optiplex",
    title: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
    price: "$299",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "deal-portable-washing",
    title: "Portable Wshing Machine, 11lbs capacity Model 18NMFIAM",
    price: "$70",
    originalPrice: "$865.99",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "deal-carburetor",
    title: "2-Barrel Carburetor Carb 2100 Engine Increase Horsepower",
    price: "$160",
    badge: { text: "HOT", variant: "hot" },
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "deal-jbl-flip4",
    title: "JBL FLIP 4 - Waterproof Portable Bluetooth Speaker - Black",
    price: "$250",
    originalPrice: "$360.00",
    badge: { text: "32% OFF", variant: "discount" },
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&q=80",
  },
];

export function BestDealsSection() {
  const { addToCart } = useCart();

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className="size-3.5 fill-[#FA8232] text-[#FA8232]"
        />
      );
    }
    return stars;
  };

  return (
    <section className="w-full font-sans space-y-6 pt-4">
      {/* 1. Header with Title, Timer, and Browse All Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
        <div className="flex items-center gap-4 flex-wrap">
          <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
            Best Deals
          </h2>
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 bg-zinc-100 px-3 py-1.5 rounded-sm">
            <span>Deals ends in</span>
            <span className="bg-[#EFD33D] text-zinc-950 font-extrabold px-2 py-0.5 rounded-xs">
              16d : 21h : 57m : 23s
            </span>
          </div>
        </div>

        <Link
          to="/category-demo"
          className="text-xs font-bold text-[#2DA5F3] hover:text-[#1982c7] transition-colors flex items-center gap-1 group cursor-pointer"
        >
          <span>Browse All Product</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* 2. Main Grid Layout (12 Columns: 3 cols Left Featured Card + 9 cols Right Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border border-white/80 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg shadow-sky-950/5 overflow-hidden">
        
        {/* LEFT COLUMN: Featured Large Product Card */}
        <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-zinc-200 p-5 md:p-6 flex flex-col justify-between relative bg-white group">
          {/* Top Badges */}
          <div className="space-y-1.5 absolute top-4 left-4 z-10">
            {FEATURED_DEAL.badge && (
              <span className="block bg-[#EFD33D] text-zinc-950 px-2.5 py-1 text-[11px] font-extrabold rounded-xs shadow-2xs uppercase">
                {FEATURED_DEAL.badge.text}
              </span>
            )}
            <span className="block bg-[#EE5858] text-white px-2.5 py-1 text-[11px] font-extrabold rounded-xs shadow-2xs uppercase w-fit">
              HOT
            </span>
          </div>

          {/* Product Image */}
          <div className="relative h-56 sm:h-72 w-full my-4 flex items-center justify-center p-1">
            <img
              src="/images/Image.png"
              alt={FEATURED_DEAL.title}
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
            />
          </div>

          {/* Content & Details */}
          <div className="space-y-2.5 pt-2">
            {/* Rating Stars */}
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5">
                {renderStars(FEATURED_DEAL.rating || 5)}
              </div>
              <span className="text-xs text-zinc-500 font-semibold ml-1">
                ({FEATURED_DEAL.reviewsCount?.toLocaleString()})
              </span>
            </div>

            {/* Title */}
            <h3 className="text-sm font-bold text-zinc-900 leading-snug line-clamp-2">
              {FEATURED_DEAL.title}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-2">
              {FEATURED_DEAL.originalPrice && (
                <span className="text-xs text-zinc-400 line-through">
                  {FEATURED_DEAL.originalPrice}
                </span>
              )}
              <span className="text-base font-extrabold text-[#2DA5F3]">
                {FEATURED_DEAL.price}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 pt-0.5">
              {FEATURED_DEAL.description}
            </p>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-2 pt-3">
              {/* Wishlist Button */}
              <button
                type="button"
                title="Add to Wishlist"
                className="w-10 h-10 rounded-xs bg-[#FFE7D6] hover:bg-[#ffd2b3] text-[#FA8232] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <Heart className="w-4 h-4 fill-[#FA8232]" />
              </button>

              {/* Add to Cart Button (Prevent Text Wrap) */}
              <button
                type="button"
                onClick={() =>
                  addToCart({
                    id: FEATURED_DEAL.id,
                    title: FEATURED_DEAL.title,
                    price: FEATURED_DEAL.price,
                    image: FEATURED_DEAL.image,
                  })
                }
                className="flex-1 h-10 px-3 bg-[#FA8232] hover:bg-[#e06d20] text-white font-extrabold text-xs uppercase tracking-tight rounded-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-98 whitespace-nowrap overflow-hidden text-ellipsis min-w-0"
              >
                <ShoppingCart className="w-4 h-4 shrink-0" />
                <span className="truncate">ADD TO CART</span>
              </button>

              {/* Quick View Button */}
              <Link
                to={`/product/1`}
                title="Quick View"
                className="w-10 h-10 rounded-xs bg-[#FFE7D6] hover:bg-[#ffd2b3] text-[#FA8232] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <Eye className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 4x2 Product Grid (8 Items on Desktop, 2 Cols on Mobile) */}
        <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 divide-x divide-y divide-zinc-200">
          {GRID_DEALS.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col justify-between p-4 bg-white hover:bg-zinc-50/50 transition-colors duration-200"
            >
              {/* Badge Top Left */}
              {product.badge && (
                <span
                  className={cn(
                    "absolute top-3 left-3 z-10 rounded-xs px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider shadow-2xs",
                    product.badge.variant === "discount" && "bg-[#EFD33D] text-zinc-950",
                    product.badge.variant === "hot" && "bg-[#EE5858] text-white",
                    product.badge.variant === "sold-out" && "bg-zinc-400 text-white",
                    product.badge.variant === "sale" && "bg-[#2DB224] text-white"
                  )}
                >
                  {product.badge.text}
                </span>
              )}

              {/* Product Image & Hover Action Buttons */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-md flex items-center justify-center p-1 mb-2 bg-zinc-50/40">
                <Link to={`/product/${product.id}`} className="h-full w-full flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </Link>

                {/* Hover Action Overlay Icons */}
                <div className="absolute inset-0 bg-zinc-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    title="Add to Wishlist"
                    className="flex size-9 items-center justify-center rounded-full bg-white text-zinc-800 shadow-md hover:bg-[#FA8232] hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 cursor-pointer"
                  >
                    <Heart className="size-4" />
                  </button>
                  <button
                    type="button"
                    title="Add to Cart"
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                      })
                    }
                    className="flex size-9 items-center justify-center rounded-full bg-[#FA8232] text-white shadow-md hover:bg-orange-600 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 delay-75 cursor-pointer active:scale-90"
                  >
                    <ShoppingCart className="size-4" />
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    title="Quick View"
                    className="flex size-9 items-center justify-center rounded-full bg-white text-zinc-800 shadow-md hover:bg-[#FA8232] hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 delay-150 cursor-pointer"
                  >
                    <Eye className="size-4" />
                  </Link>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-1">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-xs font-semibold text-zinc-800 line-clamp-2 leading-snug group-hover:text-orange-500 transition-colors">
                    {product.title}
                  </h3>
                </Link>

                <div className="flex items-center gap-2 pt-1">
                  {product.originalPrice && (
                    <span className="text-xs text-zinc-400 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                  <span className="text-sm font-bold text-[#2DA5F3]">
                    {product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
