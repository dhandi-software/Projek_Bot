import { useState, useEffect, useCallback } from "react";
import type { OrderDetailData, OrderDetailHookResult } from "../types/orderDetail.types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export function useOrderDetail(orderId: string | null): OrderDetailHookResult {
    const [orderDetail, setOrderDetail] = useState<OrderDetailData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isDownloadingPDF, setIsDownloadingPDF] = useState<boolean>(false);

    const cleanId = orderId ? orderId.replace("#", "").trim() : "";

    const fetchOrderDetail = useCallback(async () => {
        if (!cleanId) {
            setOrderDetail(null);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API_BASE_URL}/api/orders/${cleanId}`);
            if (!res.ok) {
                if (res.status === 404) {
                    throw new Error("Pesanan tidak ditemukan di sistem.");
                }
                throw new Error("Gagal mengambil data rincian pesanan dari server.");
            }

            const json = await res.json();
            const rawData = json.data || json;

            if (rawData) {
                const itemsRaw = rawData.OrderItems || rawData.order_items || rawData.items || [];
                const formattedItems = itemsRaw.map((it: any, idx: number) => ({
                    id: it.id || idx + 1,
                    order_id: it.order_id || rawData.order_id,
                    product_id: it.product_id || 0,
                    title: it.title || (it as any).product_name || "Produk Pilihan",
                    quantity: it.quantity || 1,
                    price: it.price || 0,
                    image: it.image || it.image_url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80",
                }));

                setOrderDetail({
                    id: rawData.id || cleanId,
                    order_id: rawData.order_id || `#${cleanId}`,
                    order_number: rawData.order_number,
                    customer_name: rawData.customer_name || "Customer",
                    customer_email: rawData.customer_email || "-",
                    customer_phone: rawData.customer_phone || "-",
                    shipping_address: rawData.shipping_address || "Indonesia",
                    total_amount: rawData.total_amount || rawData.total_price || 0,
                    status: rawData.status || "pending",
                    payment_type: rawData.payment_type || rawData.payment_method || "QRIS / E-Wallet Instant",
                    va_number: rawData.va_number,
                    va_bank: rawData.va_bank,
                    qris_url: rawData.qris_url,
                    created_at: rawData.created_at || new Date().toISOString(),
                    paid_at: rawData.paid_at,
                    items: formattedItems,
                });
            }
        } catch (err: any) {
            setError(err.message || "Terjadi kesalahan saat memuat rincian pesanan.");
        } finally {
            setIsLoading(false);
        }
    }, [cleanId]);

    useEffect(() => {
        fetchOrderDetail();
    }, [fetchOrderDetail]);

    const formatRupiah = (val: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(val || 0);
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "-";
        try {
            return (
                new Date(dateStr).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }) + " WIB"
            );
        } catch {
            return dateStr;
        }
    };

    const handlePrint = () => {
        if (typeof window !== "undefined") {
            window.print();
        }
    };

    const handleDownloadPDF = async () => {
        if (!cleanId) return;
        setIsDownloadingPDF(true);

        try {
            const res = await fetch(`${API_BASE_URL}/api/orders/${cleanId}/invoice`);
            if (!res.ok) throw new Error("Gagal mengunduh berkas PDF invoice.");

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Invoice_${cleanId}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err: any) {
            alert(err.message || "Gagal mendownload berkas PDF invoice.");
        } finally {
            setIsDownloadingPDF(false);
        }
    };

    return {
        orderDetail,
        isLoading,
        error,
        formatRupiah,
        formatDate,
        handlePrint,
        handleDownloadPDF,
        isDownloadingPDF,
    };
}
