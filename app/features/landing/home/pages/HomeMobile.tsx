import * as React from "react";
import { MainHeroBannerMobile } from "~/features/landing/home/components/Home/HomeMobile/MainHeroBannerMobile";
import { ValuePropsSection } from "~/features/landing/home/components/Home/ValuePropsSection";
import { BestDealsSectionMobile } from "~/features/landing/home/components/Home/HomeMobile/BestDealsSectionMobile";
import { ShopByCategorySection } from "~/features/landing/home/components/Home/HomeDesktop/ShopByCategorySection";
import { FeaturedProductsSectionMobile } from "~/features/landing/home/components/Home/HomeMobile/FeaturedProductsSectionMobile";
import { PromoBannersSectionMobile } from "~/features/landing/home/components/Home/HomeMobile/PromoBannersSectionMobile";
import { ComputerAccessoriesSectionMobile } from "~/features/landing/home/components/Home/HomeMobile/ComputerAccessoriesSectionMobile";
import { MacbookBannerSectionMobile } from "~/features/landing/home/components/Home/HomeMobile/MacbookBannerSectionMobile";
import { CategorizedProductListsSectionMobile } from "~/features/landing/home/components/Home/HomeMobile/CategorizedProductListsSectionMobile";
import { LatestNewsSectionMobile } from "~/features/landing/home/components/Home/HomeMobile/LatestNewsSectionMobile";

export function HomeMobile() {
    return (
        <main className="w-full bg-slate-50/40 min-h-screen p-4 space-y-6">
            {/* 1. Mobile Hero Banner */}
            <MainHeroBannerMobile />

            {/* 2. Value Props Section */}
            <ValuePropsSection />

            {/* 3. Mobile Best Deals Section */}
            <BestDealsSectionMobile />

            {/* 4. Shop with Categorys Carousel Section */}
            <ShopByCategorySection />

            {/* 5. Mobile Featured Products Section */}
            <FeaturedProductsSectionMobile />

            {/* 6. Mobile Double Promo Banners Section */}
            <PromoBannersSectionMobile />

            {/* 7. Mobile Computer Accessories Section */}
            <ComputerAccessoriesSectionMobile />

            {/* 8. Mobile Macbook Pro Banner Section */}
            <MacbookBannerSectionMobile />

            {/* 9. Mobile Categorized Product Lists Section */}
            <CategorizedProductListsSectionMobile />

            {/* 10. Mobile Latest News Section */}
            <LatestNewsSectionMobile />
        </main>
    );
}

