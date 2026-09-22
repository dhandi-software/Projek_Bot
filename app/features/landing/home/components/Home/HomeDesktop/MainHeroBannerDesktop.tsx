import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { bannerApi } from "~/api/bannerApi";
import type { BannerItem } from "~/features/products/types/types";

export function MainHeroBannerDesktop() {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const res = await bannerApi.getAll({ active: true });
        if (res.data && res.data.length > 0) {
          setBanners(res.data);
        }
      } catch (err) {
        console.error("Gagal memuat hero banner dari backend:", err);
      }
    };
    loadBanners();
  }, []);

  const activeBanner = banners.length > 0 ? banners[currentIndex] : null;

  return (
    <div className="w-full font-sans">
      <div className="flex gap-6 items-stretch min-h-[440px]">
        {/* 1. MAIN HERO BANNER */}
        <div className="flex-1 bg-white/80 backdrop-blur-md border border-white/80 text-zinc-900 rounded-2xl p-8 md:p-10 relative overflow-hidden flex flex-col justify-between shadow-lg shadow-sky-950/5 min-w-0">
          <div className="flex items-center justify-center gap-8 lg:gap-12 my-auto z-10">
            <div className="space-y-3.5 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-[#2DA5F3]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#2DA5F3]">
                  {activeBanner?.tagline || "THE BEST PLACE TO PLAY"}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-[#191C1F]">
                {activeBanner?.title || "Xbox Consoles"}
              </h1>
              <p className="text-xs md:text-sm text-[#5F6C72] leading-relaxed">
                {activeBanner?.subtitle ||
                  "Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD."}
              </p>
              <div className="pt-2">
                <Button
                  asChild
                  size="md"
                  className="bg-[#FA8232] hover:bg-[#e06d20] text-white font-bold px-7 py-3.5 rounded-xl text-xs gap-2 shadow-md hover:translate-x-1 transition-all cursor-pointer"
                >
                  <Link to={activeBanner?.link_url || "/category-demo?category=gaming-console"}>
                    <span>{activeBanner?.button_text || "SHOP NOW"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative w-[340px] h-[320px] flex items-center justify-center shrink-0">
              <img
                src={activeBanner?.image || "/images/Image.png"}
                alt={activeBanner?.title || "Xbox Consoles"}
                className="w-full h-full object-contain drop-shadow-2xl scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/Image.png";
                }}
              />
              {activeBanner?.price_badge && (
                <div className="absolute top-2 right-2 bg-[#2DA5F3] text-white font-extrabold text-base w-18 h-18 rounded-full flex items-center justify-center border-4 border-white shadow-xl z-20">
                  {activeBanner.price_badge}
                </div>
              )}
            </div>
          </div>

          {banners.length > 1 && (
            <div className="flex items-center gap-2.5 z-20 pt-4">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`rounded-full transition-all cursor-pointer ${
                    idx === currentIndex
                      ? "w-3.5 h-3.5 bg-[#191C1F]"
                      : "w-2.5 h-2.5 bg-[#ADB7BC] hover:bg-[#191C1F]"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* 2. RIGHT STACKED PROMO CARDS */}
        <div className="w-[360px] lg:w-[380px] shrink-0 flex flex-col justify-between gap-4">
          <div className="flex-1 bg-[#191C1F] text-white rounded-2xl p-6 relative overflow-hidden flex items-center justify-between shadow-md min-h-[215px]">
            <div className="space-y-2 z-10 flex-1 min-w-0 pr-12">
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
                  className="bg-[#FA8232] hover:bg-[#e06d20] text-white text-[11px] font-bold px-4 h-9 gap-1.5 rounded-xl cursor-pointer"
                >
                  <Link to="/category-demo?search=pixel">
                    <span>SHOP NOW</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </Button>
              </div>
            </div>

            <span className="absolute top-4 right-4 bg-amber-400 text-zinc-950 text-[11px] font-extrabold px-2.5 py-1 rounded-lg shadow-xs z-20">
              29% OFF
            </span>

            <img
              src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=300&q=80"
              alt="Google Pixel 6 Pro"
              className="w-36 h-36 object-contain absolute right-2 bottom-2 drop-shadow-xl"
            />
          </div>

          <div className="flex-1 bg-[#F2F4F5] text-zinc-900 rounded-2xl p-6 relative overflow-hidden flex items-center justify-between shadow-xs border border-zinc-200/70 min-h-[215px]">
            <div className="space-y-2 z-10 flex-1 min-w-0 pr-12">
              <span className="text-[10px] font-bold text-[#2DA5F3] uppercase tracking-wider">
                PROMO DISKON
              </span>
              <h3 className="text-base font-bold leading-tight text-[#191C1F]">
                Xiaomi FlipBuds Pro
              </h3>
              <p className="text-xs text-[#5F6C72] font-semibold">$299 USD</p>
              <div className="pt-1">
                <Button
                  asChild
                  size="sm"
                  className="bg-[#FA8232] hover:bg-[#e06d20] text-white text-[11px] font-bold px-4 h-9 gap-1.5 rounded-xl cursor-pointer"
                >
                  <Link to="/category-demo?category=headphone">
                    <span>SHOP NOW</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </Button>
              </div>
            </div>

            <img
              src="https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=300&q=80"
              alt="Xiaomi FlipBuds Pro"
              className="w-36 h-36 object-contain absolute right-2 bottom-2 drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
