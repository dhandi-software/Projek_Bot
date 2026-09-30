import { useOutletContext, Navigate } from "react-router";
import type { ContextType } from "~/root";
import { ProtectedRoute } from "~/routes/ProtectedRoute";
import { useAuth } from "~/hooks/useAuth";
import { CustomerDashboardDesktop } from "~/features/customer/components/desktop/CustomerDashboardDesktop";
import { CustomerDashboardMobile } from "~/features/customer/components/mobile/CustomerDashboardMobile";

export function meta() {
    return [
        { title: "Dashboard Customer - Dhandi Ecommerce" },
        { name: "description", content: "Kelola akun dan lihat aktivitas belanja Anda" },
    ];
}

export default function CustomerDashboardRoute() {
    const { isMobile } = useOutletContext<ContextType>();
    const { user } = useAuth();

    if (user?.role?.toLowerCase() === "admin") {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return (
        <ProtectedRoute>
            {isMobile ? <CustomerDashboardMobile /> : <CustomerDashboardDesktop />}
        </ProtectedRoute>
    );
}

