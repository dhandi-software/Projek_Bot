import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";

import { CheckoutDesktop } from "~/features/landing/transaksi/checkout/CheckoutDesktop";
import { CheckoutMobile } from "~/features/landing/transaksi/checkout/CheckoutMobile";

export default function CheckoutRoute() {
    const { isMobile } = useOutletContext<ContextType>();
    return isMobile ? <CheckoutMobile /> : <CheckoutDesktop />;
}
