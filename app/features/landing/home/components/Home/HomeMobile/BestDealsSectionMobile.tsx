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

const FEATURED_DEAL: DealProduct = {
  id: "featured-xbox-series-s",
  title: "Xbox Series S - 512GB SSD Console with Wireless Controller - EU Version",
  price: "$442.12",
  originalPrice: "$865.99",
  rating: 5,
  reviewsCount: 52677,
  description: "Games built using the Xbox Series X|S development kit showcase unparalleled load times, visuals.",
  badge: { text: "32% OFF", variant: "discount" },
  image: "/images/Image.png",
};

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

export function BestDealsSectionMobile() {
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
    <section className="w-full font-sans space-y-4 pt-2">
      {/* 1. Header with Title & Timer */}
      <div className="space-y-2.5 border-b border-zinc-200 pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-zinc-900 tracking-tight">
            Best Deals
          </h2>
          <Link
            to="/category-demo"
            className="text-xs font-bold text-[#2DA5F3] hover:text-[#1982c7] transition-colors flex items-center gap-1 group cursor-pointer"
          >
            <span>Browse All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 bg-zinc-100 px-3 py-1.5 rounded-md w-fit">
          <span>Deals ends in</span>
          <span className="bg-[#EFD33D] text-zinc-950 font-extrabold px-2 py-0.5 rounded-xs text-[11px]">
            16d : 21h : 57m : 23s
          </span>
        </div>
      </div>

      {/* 2. Featured Mobile Card */}
      <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-2xs relative space-y-3">
        {/* Badges Top Left */}
        <div className="flex items-center gap-1.5 absolute top-4 left-4 z-10">
          <span className="bg-[#EFD33D] text-zinc-950 px-2 py-0.5 text-[10px] font-extrabold rounded-xs uppercase shadow-2xs">
            32% OFF
          </span>
          <span className="bg-[#EE5858] text-white px-2 py-0.5 text-[10px] font-extrabold rounded-xs uppercase shadow-2xs">
            HOT
          </span>
        </div>

        {/* Product Image */}
        <div className="relative h-48 w-full flex items-center justify-center pt-4">
          <img
            src={FEATURED_DEAL.image}
            alt={FEATURED_DEAL.title}
            className="h-full w-full object-contain drop-shadow-md"
          />
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-1 pt-1">
          <div className="flex items-center gap-0.5">
            {renderStars(5)}
          </div>
          <span className="text-[11px] text-zinc-500 font-semibold ml-1">
            (52,677)
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug line-clamp-2">
          {FEATURED_DEAL.title}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 line-through">
            $865.99
          </span>
          <span className="text-base font-extrabold text-[#2DA5F3]">
            $442.12
          </span>
        </div>

        {/* Description */}
        <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-2">
          {FEATURED_DEAL.description}
        </p>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            title="Wishlist"
            className="w-10 h-10 rounded-xs bg-[#FFE7D6] hover:bg-[#ffd2b3] text-[#FA8232] flex items-center justify-center shrink-0 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-[#FA8232]" />
          </button>

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
            className="flex-1 h-10 px-3 bg-[#FA8232] hover:bg-[#e06d20] text-white font-extrabold text-xs uppercase tracking-tight rounded-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer whitespace-nowrap min-w-0"
          >
            <ShoppingCart className="w-4 h-4 shrink-0" />
            <span>ADD TO CART</span>
          </button>

          <Link
            to="/product/1"
            title="Quick View"
            className="w-10 h-10 rounded-xs bg-[#FFE7D6] hover:bg-[#ffd2b3] text-[#FA8232] flex items-center justify-center shrink-0 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 3. Mobile Product Grid (2 Columns) */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        {GRID_DEALS.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="bg-white border border-zinc-200 rounded-xl p-3 shadow-2xs flex flex-col justify-between relative space-y-2 group"
          >
            {/* Badge */}
            {product.badge && (
              <span
                className={cn(
                  "absolute top-2 left-2 z-10 rounded-xs px-1.5 py-0.5 text-[9px] font-extrabold uppercase shadow-2xs",
                  product.badge.variant === "discount" && "bg-[#EFD33D] text-zinc-950",
                  product.badge.variant === "hot" && "bg-[#EE5858] text-white",
                  product.badge.variant === "sold-out" && "bg-zinc-400 text-white",
                  product.badge.variant === "sale" && "bg-[#2DB224] text-white"
                )}
              >
                {product.badge.text}
              </span>
            )}

            {/* Product Image */}
            <div className="h-32 w-full flex items-center justify-center p-1 bg-zinc-50/50 rounded-lg relative overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>

            {/* Title & Price */}
            <div className="space-y-1">
              <h4 className="text-[11px] font-semibold text-zinc-800 line-clamp-2 leading-snug">
                {product.title}
              </h4>
              <div className="flex items-center gap-1.5">
                {product.originalPrice && (
                  <span className="text-[10px] text-zinc-400 line-through">
                    {product.originalPrice}
                  </span>
                )}
                <span className="text-xs font-extrabold text-[#2DA5F3]">
                  {product.price}
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                });
              }}
              className="w-full h-8 bg-zinc-100 hover:bg-[#FA8232] hover:text-white text-zinc-800 font-bold text-[11px] rounded-md flex items-center justify-center gap-1 transition-colors active:scale-95 cursor-pointer mt-1"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Beli</span>
            </button>
          </Link>
        ))}
      </div>
    </section>
  );
}
