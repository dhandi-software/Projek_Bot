export interface OrderItem {
    id: number;
    order_id: string;
    product_id: number;
    title: string;
    quantity: number;
    price: number;
}

export interface AdminOrder {
    id: number;
    order_id: string;
    order_number?: string;
    idempotency_key?: string;
    customer_id?: number;
    user_id?: number;
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string;
    shipping_address?: string;
    total_amount: number;
    total_price?: number;
    status: string;
    snap_token?: string;
    snap_redirect_url?: string;
    qris_url?: string;
    qris_string?: string;
    va_number?: string;
    va_bank?: string;
    payment_type?: string;
    paid_at?: string;
    created_at?: string;
    updated_at?: string;
    order_items?: OrderItem[];
    OrderItems?: OrderItem[];
}

export interface OrderStats {
    total: number;
    paidCount: number;
    paidAmount: number;
    pendingCount: number;
    failedCount: number;
}
