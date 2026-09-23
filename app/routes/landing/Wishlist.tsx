import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";

import { WishlistDesktop } from "~/features/landing/wishlist/WishlistDesktop";
import { WishlistMobile } from "~/features/landing/wishlist/WishlistMobile";

export default function WishlistRoute() {
    const { isMobile } = useOutletContext<ContextType>();
    return isMobile ? <WishlistMobile /> : <WishlistDesktop />;
}
