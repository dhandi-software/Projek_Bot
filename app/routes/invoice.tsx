import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";

import { InvoiceDesktop } from "~/features/invoice/InvoiceDesktop";
import { InvoiceMobile } from "~/features/invoice/InvoiceMobile";

export default function InvoiceRoute() {
    const context = useOutletContext<ContextType>();
    const isMobile = context?.isMobile ?? false;

    return isMobile ? <InvoiceMobile /> : <InvoiceDesktop />;
}
