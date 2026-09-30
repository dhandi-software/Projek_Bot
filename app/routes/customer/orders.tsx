import { useOutletContext, Navigate } from "react-router";
import type { ContextType } from "~/root";
import { ProtectedRoute } from "~/routes/ProtectedRoute";
import { useAuth } from "~/hooks/useAuth";
import { CustomerOrdersDesktop } from "~/features/customer/orders/components/desktop/CustomerOrdersDesktop";
import { CustomerOrdersMobile } from "~/features/customer/orders/components/mobile/CustomerOrdersMobile";

export function meta() {
    return [
        { title: "Riwayat Pesanan - Dhandi Ecommerce" },
        { name: "description", content: "Lihat daftar dan status pesanan pembelian Anda" },
    ];
}

export default function CustomerOrdersRoute() {
    const { isMobile } = useOutletContext<ContextType>();
    const { user } = useAuth();

    if (user?.role?.toLowerCase() === "admin") {
        return <Navigate to="/admin/pesanan" replace />;
    }

    return (
        <ProtectedRoute>
            {isMobile ? <CustomerOrdersMobile /> : <CustomerOrdersDesktop />}
        </ProtectedRoute>
    );
}
