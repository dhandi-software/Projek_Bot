import * as React from "react";
import { MainHeroBannerDesktop } from "~/features/landing/home/components/Home/HomeDesktop/MainHeroBannerDesktop";
import { ValuePropsSection } from "~/features/landing/home/components/Home/ValuePropsSection";
import { ShopByCategorySection } from "~/features/landing/home/components/Home/HomeDesktop/ShopByCategorySection";
import { BestDealsSection } from "~/features/landing/home/components/Home/HomeDesktop/BestDealsSection";
import { FeaturedProductsSection } from "~/features/landing/home/components/Home/HomeDesktop/FeaturedProductsSection";
import { PromoBannersSection } from "~/features/landing/home/components/Home/HomeDesktop/PromoBannersSection";
import { ComputerAccessoriesSection } from "~/features/landing/home/components/Home/HomeDesktop/ComputerAccessoriesSection";
import { MacbookBannerSection } from "~/features/landing/home/components/Home/HomeDesktop/MacbookBannerSection";
import { CategorizedProductListsSection } from "~/features/landing/home/components/Home/HomeDesktop/CategorizedProductListsSection";
import { LatestNewsSection } from "~/features/landing/home/components/Home/HomeDesktop/LatestNewsSection";

export function HomeDesktop() {
    return (
        <main className="w-full bg-slate-50/40 py-8 min-h-[calc(100vh-120px)] space-y-10">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl space-y-10">
                {/* 1. Main Hero Banner Section */}
                <MainHeroBannerDesktop />

                {/* 2. 4-Feature Value Props Section */}
                <ValuePropsSection />

                {/* 3. Best Deals Section */}
                <BestDealsSection />

                {/* 4. Shop with Categorys Carousel Section */}
                <ShopByCategorySection />

                {/* 5. Featured Products Section */}
                <FeaturedProductsSection />

                {/* 6. Double Promo Banners Section (HomePod Mini & Xiaomi Mi 11 Ultra) */}
                <PromoBannersSection />

                {/* 7. Computer Accessories Section */}
                <ComputerAccessoriesSection />

                {/* 8. Macbook Pro Computer Banner Section */}
                <MacbookBannerSection />

                {/* 9. Categorized Product Lists Section (Flash Sale, Best Sellers, Top Rated, New Arrival) */}
                <CategorizedProductListsSection />

                {/* 10. Latest News Section */}
                <LatestNewsSection />
            </div>
        </main>
    );
}

