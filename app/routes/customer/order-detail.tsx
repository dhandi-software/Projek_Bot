import { ProtectedRoute } from "~/routes/ProtectedRoute";
import { OrderDetailPage } from "~/features/customer/orders/pages/OrderDetailPage";

export function meta() {
    return [
        { title: "Rincian Pesanan - Dhandi Ecommerce" },
        { name: "description", content: "Detail Rincian dan Lacak Status Pesanan Pembelian Anda" },
    ];
}

export default function CustomerOrderDetailRoute() {
    return (
        <ProtectedRoute>
            <OrderDetailPage />
        </ProtectedRoute>
    );
}
