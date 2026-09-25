import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";
import { BestDealsDesktop, BestDealsMobile } from "~/features/landing/best-deals";

export default function BestDeals() {
  const { isMobile } = useOutletContext<ContextType>();
  return isMobile ? <BestDealsMobile /> : <BestDealsDesktop />;
}

export function meta() {
  return [
    { title: "Best Deals - Special Offers | Dhandi Ecommerce" },
    { name: "description", content: "Explore limited time promotional discounts and best deals on selected products." },
  ];
}
