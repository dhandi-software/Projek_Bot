import { client } from "./client";

export interface CheckoutItemPayload {
    product_id: number;
    quantity: number;
    title: string;
    price: number;
}

export interface CheckoutCustomerPayload {
    customer_id?: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface CreateCheckoutPayload {
    idempotency_key: string;
    payment_method: string;
    bank?: string;
    items: CheckoutItemPayload[];
    customer: CheckoutCustomerPayload;
}

export interface CheckoutResponseData {
    order_id: string;
    snap_token?: string;
    snap_redirect_url?: string;
    qris_url?: string;
    qris_string?: string;
    va_number?: string;
    va_bank?: string;
    total_amount: number;
    status: string;
    is_reused?: boolean;
}

export interface OrderItemData {
    id?: number;
    order_id: string;
    product_id: number;
    title: string;
    quantity: number;
    price: number;
    subtotal?: number;
    image?: string;
    image_url?: string;
}

export interface OrderData {
    id?: number;
    order_id: string;
    order_number?: string;
    customer_id?: number;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    customer_address?: string;
    shipping_address?: string;
    total_amount: number;
    total_price?: number;
    payment_method?: string;
    payment_type?: string;
    va_number?: string;
    va_bank?: string;
    qris_url?: string;
    qris_string?: string;
    snap_token?: string;
    snap_redirect_url?: string;
    status: string;
    items?: OrderItemData[];
    order_items?: OrderItemData[];
    OrderItems?: OrderItemData[];
    created_at?: string;
    paid_at?: string;
}

export interface ApiResponse<T> {
    message?: string;
    status?: string;
    error?: string;
    data: T;
}

export const paymentApi = {
    /**
     * POST /payment/checkout
     * Membuat transaksi checkout baru atau mengirim notification callback
     */
    async createCheckout(
        payload: CreateCheckoutPayload,
        idempotencyKey?: string
    ): Promise<ApiResponse<CheckoutResponseData>> {
        const headers: Record<string, string> = {};
        if (idempotencyKey) {
            headers["Idempotency-Key"] = idempotencyKey;
        }

        const response = await client.post<ApiResponse<CheckoutResponseData>>(
            "/payment/checkout",
            payload,
            { headers }
        );
        return response.data;
    },

    /**
     * POST /payment/checkout (Notification)
     * Mengirim notifikasi perubahan status pembayaran Midtrans
     */
    async sendNotification(
        notificationPayload: Record<string, unknown>
    ): Promise<ApiResponse<{ status: string; message: string }>> {
        const response = await client.post<ApiResponse<{ status: string; message: string }>>(
            "/payment/checkout",
            notificationPayload
        );
        return response.data;
    },

    /**
     * GET /orders
     * Mengambil seluruh riwayat pesanan (Admin / Customer)
     */
    async getOrders(): Promise<ApiResponse<OrderData[]>> {
        const response = await client.get<ApiResponse<OrderData[]>>("/orders");
        return response.data;
    },

    /**
     * GET /orders/:id
     * Mengambil rincian detail pesanan berdasarkan Order ID
     */
    async getOrderByID(orderId: string): Promise<ApiResponse<OrderData>> {
        const response = await client.get<ApiResponse<OrderData>>(`/orders/${orderId}`);
        return response.data;
    },

    /**
     * GET /orders/:id/invoice
     * Mengunduh berkas invoice PDF resmi pesanan
     */
    async getOrderInvoiceBlob(orderId: string): Promise<Blob> {
        const response = await client.get(`/orders/${orderId}/invoice`, {
            responseType: "blob",
        });
        return response.data;
    },

    /**
     * PUT /orders/:id/cancel
     * Membatalkan order pelanggan jika masih berstatus pending
     */
    async cancelOrder(orderId: string): Promise<ApiResponse<OrderData>> {
        const cleanId = orderId.replace(/^#/, "");
        const response = await client.put<ApiResponse<OrderData>>(`/orders/${cleanId}/cancel`);
        return response.data;
    },
};
