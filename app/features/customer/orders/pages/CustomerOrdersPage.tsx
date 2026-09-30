import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";
import { CustomerOrdersDesktop } from "../components/desktop/CustomerOrdersDesktop";
import { CustomerOrdersMobile } from "../components/mobile/CustomerOrdersMobile";

export function CustomerOrdersPage() {
    const { isMobile } = useOutletContext<ContextType>();
    return isMobile ? <CustomerOrdersMobile /> : <CustomerOrdersDesktop />;
}

export default CustomerOrdersPage;
