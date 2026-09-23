import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";

import { CustomerSupportDesktop } from "~/features/landing/customer-support/CustomerSupportDesktop";
import { CustomerSupportMobile } from "~/features/landing/customer-support/CustomerSupportMobile";

export default function CustomerSupportRoute() {
    const { isMobile } = useOutletContext<ContextType>();
    return isMobile ? <CustomerSupportMobile /> : <CustomerSupportDesktop />;
}
