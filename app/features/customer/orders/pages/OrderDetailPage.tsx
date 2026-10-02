import { useParams, useOutletContext } from "react-router";
import type { ContextType } from "~/root";
import { OrderDetailDesktop } from "../components/desktop/OrderDetailDesktop";
import { OrderDetailMobile } from "../components/mobile/OrderDetailMobile";

export function OrderDetailPage() {
    const { orderId } = useParams<{ orderId: string }>();
    const outletContext = useOutletContext<ContextType>();
    const isMobile = outletContext?.isMobile ?? false;

    if (!orderId) {
        return (
            <div className="p-8 text-center text-zinc-500">
                Order ID tidak ditemukan.
            </div>
        );
    }

    return isMobile ? (
        <OrderDetailMobile orderId={orderId} />
    ) : (
        <OrderDetailDesktop orderId={orderId} />
    );
}

export default OrderDetailPage;
