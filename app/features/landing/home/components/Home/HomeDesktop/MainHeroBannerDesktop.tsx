import React from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";

export function MainHeroBannerDesktop() {
  return (
    <div className="w-full font-sans">
      <div className="flex gap-6 items-stretch min-h-[440px]">
        {/* 1. MAIN HERO BANNER (LIGHT GRAY BG) */}
        <div className="flex-1 bg-[#F2F4F5] text-zinc-900 rounded-md p-8 md:p-10 relative overflow-hidden flex flex-col justify-between shadow-2xs min-w-0">
          {/* Content Wrapper (Text + Image Centered Together) */}
          <div className="flex items-center justify-center gap-8 lg:gap-12 my-auto z-10">
            {/* Left Tagline & Content */}
            <div className="space-y-3.5 max-w-[340px] shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-[#2DA5F3]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#2DA5F3]">
                  THE BEST PLACE TO PLAY
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-[#191C1F]">
                Xbox Consoles
              </h1>
              <p className="text-xs md:text-sm text-[#5F6C72] leading-relaxed">
                Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.
              </p>
              <div className="pt-2">
                <Button
                  asChild
                  size="md"
                  className="bg-[#FA8232] hover:bg-[#e06d20] text-white font-bold px-7 py-3.5 rounded-xs text-xs gap-2 shadow-md hover:translate-x-1 transition-all cursor-pointer"
                >
                  <Link to="/category-demo?category=gaming-console">
                    <span>SHOP NOW</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Product Image & $299 Price Tag Badge */}
            <div className="relative w-[340px] h-[320px] flex items-center justify-center shrink-0">
              <img
                src="/images/Image.png"
                alt="Xbox Consoles"
                className="w-full h-full object-contain drop-shadow-2xl scale-105"
              />
              {/* Blue Price Badge Circle */}
              <div className="absolute top-2 right-2 bg-[#2DA5F3] text-white font-extrabold text-base w-18 h-18 rounded-full flex items-center justify-center border-4 border-white shadow-xl z-20">
                $299
              </div>
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex items-center gap-2.5 z-20 pt-4">
            <span className="w-3.5 h-3.5 rounded-full bg-[#191C1F]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ADB7BC] cursor-pointer hover:bg-[#191C1F]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ADB7BC] cursor-pointer hover:bg-[#191C1F]" />
          </div>
        </div>

        {/* 2. RIGHT STACKED PROMO CARDS */}
        <div className="w-[360px] lg:w-[380px] shrink-0 flex flex-col justify-between gap-4">
          {/* Top Card: Summer Sales Pixel 6 Pro */}
          <div className="flex-1 bg-[#191C1F] text-white rounded-md p-6 relative overflow-hidden flex items-center justify-between shadow-xs min-h-[215px]">
            <div className="space-y-2 z-10 max-w-[160px] shrink-0">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                SUMMER SALES
              </span>
              <h3 className="text-base font-bold leading-tight text-white">
                New Google Pixel 6 Pro
              </h3>
              <div className="pt-2">
                <Button
                  asChild
                  size="sm"
                  className="bg-[#FA8232] hover:bg-[#e06d20] text-white text-[11px] font-bold px-4 h-9 gap-1.5 rounded-xs cursor-pointer"
                >
                  <Link to="/category-demo?search=pixel">
                    <span>SHOP NOW</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Yellow Discount Badge */}
            <span className="absolute top-4 right-4 bg-amber-400 text-zinc-950 text-[11px] font-extrabold px-2.5 py-1 rounded-xs shadow-xs z-20">
              29% OFF
            </span>

            {/* Phone Image */}
            <img
              src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80"
              alt="Google Pixel 6 Pro"
              className="absolute right-0 bottom-0 top-0 w-44 h-full object-contain object-right pointer-events-none opacity-95 pr-1 pt-1"
            />
          </div>

          {/* Bottom Card: Xiaomi FlipBuds Pro */}
          <div className="flex-1 bg-[#F2F4F5] text-zinc-900 rounded-md p-5 flex items-center justify-center gap-6 shadow-xs border border-zinc-200/80 min-h-[215px]">
            {/* Earbuds Image on Left (Enlarged & Centered) */}
            <div className="w-40 h-40 shrink-0 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=500&q=80"
                alt="Xiaomi FlipBuds Pro"
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>

            {/* Text Content on Right */}
            <div className="space-y-2 z-10 shrink-0 flex flex-col justify-center min-w-0">
              <h3 className="text-base font-bold leading-tight text-[#191C1F]">
                Xiaomi FlipBuds Pro
              </h3>
              <p className="text-sm font-extrabold text-[#2DA5F3]">
                $299 USD
              </p>
              <div className="pt-1">
                <Button
                  asChild
                  size="sm"
                  className="bg-[#FA8232] hover:bg-[#e06d20] text-white text-[11px] font-bold px-4 h-9 gap-1.5 rounded-xs cursor-pointer"
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
    </div>
  );
}
