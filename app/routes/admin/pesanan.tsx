import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";

import { PesananDesktop } from "~/features/admin/pesanan/PesananDesktop";
import { PesananMobile } from "~/features/admin/pesanan/PesananMobile";

export default function AdminPesananRoute() {
    const { isMobile } = useOutletContext<ContextType>();
    return isMobile ? <PesananMobile /> : <PesananDesktop />;
}
