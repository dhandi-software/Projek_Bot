import React from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";

export function MainHeroBannerMobile() {
  return (
    <div className="w-full font-sans space-y-4">
      {/* 1. Main Xbox Hero Card (Light Gray BG) */}
      <div className="bg-[#F2F4F5] text-zinc-900 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[340px] shadow-2xs border border-zinc-200/60">
        {/* Text content */}
        <div className="space-y-2 z-10 max-w-[200px]">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-[2px] bg-[#2DA5F3]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#2DA5F3]">
              THE BEST PLACE TO PLAY
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#191C1F] leading-tight">
            Xbox Consoles
          </h1>
          <p className="text-xs text-[#5F6C72] leading-relaxed line-clamp-3">
            Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.
          </p>
          <div className="pt-2">
            <Button
              asChild
              size="sm"
              className="bg-[#FA8232] hover:bg-[#e06d20] text-white font-bold px-4 h-9 rounded-xs text-xs gap-1.5 shadow-md cursor-pointer"
            >
              <Link to="/category-demo?category=gaming-console">
                <span>SHOP NOW</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Product image & Price badge */}
        <div className="absolute right-0 bottom-2 w-48 h-48 flex items-center justify-center pointer-events-none z-10">
          <img
            src="/images/Image.png"
            alt="Xbox Consoles"
            className="w-full h-full object-contain drop-shadow-xl scale-105"
          />
          {/* Price badge */}
          <div className="absolute top-2 right-2 bg-[#2DA5F3] text-white font-extrabold text-xs w-12 h-12 rounded-full flex items-center justify-center border-2 border-white shadow-md z-20">
            $299
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-1.5 z-20 pt-4">
          <span className="w-3.5 h-3.5 rounded-full bg-[#191C1F]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ADB7BC]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ADB7BC]" />
        </div>
      </div>

      {/* 2. Mobile Promo Cards Grid */}
      <div className="grid grid-cols-1 gap-3">
        {/* Top Card: Summer Sales Pixel 6 Pro */}
        <div className="bg-[#191C1F] text-white rounded-xl p-5 relative overflow-hidden flex items-center justify-between min-h-[160px] shadow-xs">
          <div className="space-y-1.5 z-10 max-w-[150px]">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
              SUMMER SALES
            </span>
            <h3 className="text-sm font-bold leading-tight text-white">
              New Google Pixel 6 Pro
            </h3>
            <div className="pt-1.5">
              <Button
                asChild
                size="sm"
                className="bg-[#FA8232] hover:bg-[#e06d20] text-white text-[11px] font-bold px-3 h-8 gap-1 rounded-xs cursor-pointer"
              >
                <Link to="/category-demo?search=pixel">
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </Button>
            </div>
          </div>

          <span className="absolute top-3 right-3 bg-amber-400 text-zinc-950 text-[10px] font-extrabold px-2 py-0.5 rounded-xs shadow-xs z-20">
            29% OFF
          </span>

          <img
            src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80"
            alt="Google Pixel 6 Pro"
            className="absolute right-0 bottom-0 top-0 w-32 h-full object-contain object-right pointer-events-none opacity-95"
          />
        </div>

        {/* Bottom Card: Xiaomi FlipBuds Pro */}
        <div className="bg-[#F2F4F5] text-zinc-900 rounded-xl p-4 flex items-center justify-center gap-4 min-h-[160px] border border-zinc-200/80 shadow-xs">
          <div className="w-28 h-28 shrink-0 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80"
              alt="Xiaomi FlipBuds Pro"
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>

          <div className="space-y-1.5 z-10 shrink-0 flex flex-col justify-center min-w-0">
            <h3 className="text-sm font-bold leading-tight text-[#191C1F]">
              Xiaomi FlipBuds Pro
            </h3>
            <p className="text-xs font-extrabold text-[#2DA5F3]">
              $299 USD
            </p>
            <div className="pt-1">
              <Button
                asChild
                size="sm"
                className="bg-[#FA8232] hover:bg-[#e06d20] text-white text-[11px] font-bold px-3 h-8 gap-1 rounded-xs cursor-pointer"
              >
                <Link to="/category-demo?search=earbuds">
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
