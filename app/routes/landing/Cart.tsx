import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";

import { ShoppingCardDesktop } from "~/features/landing/transaksi/shopping-card/ShoppingCardDesktop";
import { ShoppingCardMobile } from "~/features/landing/transaksi/shopping-card/ShoppingCardMobile";

export default function CartRoute() {
    const { isMobile } = useOutletContext<ContextType>();
    return isMobile ? <ShoppingCardMobile /> : <ShoppingCardDesktop />;
}
