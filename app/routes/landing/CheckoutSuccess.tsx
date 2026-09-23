import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";

import { CheckoutSuccessDesktop } from "~/features/landing/transaksi/checkout/CheckoutSuccessDesktop";
import { CheckoutSuccessMobile } from "~/features/landing/transaksi/checkout/CheckoutSuccessMobile";

export default function CheckoutSuccessRoute() {
    const { isMobile } = useOutletContext<ContextType>();
    return isMobile ? <CheckoutSuccessMobile /> : <CheckoutSuccessDesktop />;
}
