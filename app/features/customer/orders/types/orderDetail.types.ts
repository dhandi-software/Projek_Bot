export interface OrderDetailItem {
    id: number | string;
    order_id: string;
    product_id: number;
    title: string;
    quantity: number;
    price: number;
    subtotal?: number;
    image?: string;
    image_url?: string;
}

export interface OrderDetailData {
    id: number | string;
    order_id: string;
    order_number?: string;
    idempotency_key?: string;
    customer_id?: number;
    user_id?: number;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    shipping_address: string;
    total_amount: number;
    total_price?: number;
    status: "pending" | "paid" | "settlement" | "cancel" | "deny" | "expire" | "expired" | string;
    snap_token?: string;
    snap_redirect_url?: string;
    qris_url?: string;
    qris_string?: string;
    va_number?: string;
    va_bank?: string;
    payment_type?: string;
    payment_method?: string;
    created_at: string;
    paid_at?: string;
    items: OrderDetailItem[];
}

export interface OrderDetailModalProps {
    orderId: string | null;
    isOpen: boolean;
    onClose: () => void;
}

export interface OrderDetailHookResult {
    orderDetail: OrderDetailData | null;
    isLoading: boolean;
    error: string | null;
    formatRupiah: (val: number) => string;
    formatDate: (dateStr?: string) => string;
    handlePrint: () => void;
    handleDownloadPDF: () => void;
    isDownloadingPDF: boolean;
}
