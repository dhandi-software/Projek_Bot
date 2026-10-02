import { useState, useEffect, useCallback } from "react";
import type { OrderDetailData, OrderDetailHookResult, OrderActivityItem, OrderTimelineStep } from "../types/orderDetail.types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export function useOrderDetail(orderId: string | null): OrderDetailHookResult {
    const [orderDetail, setOrderDetail] = useState<OrderDetailData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isDownloadingPDF, setIsDownloadingPDF] = useState<boolean>(false);

    const cleanId = orderId ? orderId.replace("#", "").trim() : "";

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
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }) + " WIB"
            );
        } catch {
            return dateStr;
        }
    };

    const formatArrivalDate = (dateStr?: string) => {
        if (!dateStr) return "-";
        try {
            const date = new Date(dateStr);
            date.setDate(date.getDate() + 5);
            return date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
            });
        } catch {
            return "-";
        }
    };

    const determineStep = (status?: string): number => {
        const st = (status || "").toLowerCase();
        if (st === "delivered" || st === "completed") return 4;
        if (st === "on_the_road" || st === "shipped" || st === "shipping") return 3;
        if (st === "packaging" || st === "paid" || st === "settlement") return 2;
        return 1;
    };

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
                const formattedItems = itemsRaw.map((it: any, idx: number) => {
                    const titleStr = it.title || it.product_name || "Produk Pilihan";
                    let category = "GENERAL";
                    const titleLower = titleStr.toLowerCase();
                    if (titleLower.includes("phone") || titleLower.includes("pixel") || titleLower.includes("iphone") || titleLower.includes("samsung")) {
                        category = "SMARTPHONE";
                    } else if (titleLower.includes("case") || titleLower.includes("cover") || titleLower.includes("cable") || titleLower.includes("charger") || titleLower.includes("clear")) {
                        category = "ACCESSORIES";
                    } else if (titleLower.includes("headphone") || titleLower.includes("audio") || titleLower.includes("speaker") || titleLower.includes("earbuds")) {
                        category = "AUDIO";
                    }

                    return {
                        id: it.id || idx + 1,
                        order_id: it.order_id || rawData.order_id,
                        product_id: it.product_id || 0,
                        title: titleStr,
                        quantity: it.quantity || 1,
                        price: it.price || 0,
                        subtotal: (it.price || 0) * (it.quantity || 1),
                        category: category,
                        image: it.image || it.image_url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80",
                    };
                });

                const createdDate = rawData.created_at || new Date().toISOString();
                const paidDate = rawData.paid_at || createdDate;
                const statusStr = (rawData.status || "pending").toLowerCase();
                const currentStepNum = determineStep(statusStr);

                const activitiesList: OrderActivityItem[] = [];

                if (currentStepNum >= 4) {
                    activitiesList.push({
                        id: 4,
                        title: "Pesanan Anda telah diterima oleh pembeli. Terima kasih telah berbelanja!",
                        date: formatDate(paidDate),
                        type: "delivered",
                    });
                }
                if (currentStepNum >= 3) {
                    activitiesList.push({
                        id: 3,
                        title: "Kurir pengiriman dalam perjalanan menuju lokasi alamat Anda.",
                        date: formatDate(paidDate),
                        type: "shipping",
                    });
                }
                if (currentStepNum >= 2) {
                    activitiesList.push({
                        id: 2,
                        title: "Pesanan telah dikonfirmasi lunas & sedang dalam proses pengemasan (Packaging).",
                        date: formatDate(paidDate),
                        type: "packaging",
                    });
                    activitiesList.push({
                        id: 21,
                        title: "Pembayaran berhasil diverifikasi oleh sistem.",
                        date: formatDate(paidDate),
                        type: "verified",
                    });
                }
                activitiesList.push({
                    id: 1,
                    title: "Pesanan berhasil dibuat & masuk ke dalam sistem.",
                    date: formatDate(createdDate),
                    type: "placed",
                });

                setOrderDetail({
                    id: rawData.id || cleanId,
                    order_id: rawData.order_id || `#${cleanId}`,
                    order_number: rawData.order_number,
                    customer_name: rawData.customer_name || "Customer",
                    customer_email: rawData.customer_email || "-",
                    customer_phone: rawData.customer_phone || "-",
                    shipping_address: rawData.shipping_address || "Indonesia",
                    billing_address: rawData.shipping_address || "Indonesia",
                    order_notes: rawData.order_notes || "Tidak ada catatan khusus dari pembeli.",
                    total_amount: rawData.total_amount || rawData.total_price || 0,
                    status: rawData.status || "pending",
                    payment_type: rawData.payment_type || rawData.payment_method || "QRIS / Instant Payment",
                    va_number: rawData.va_number,
                    va_bank: rawData.va_bank,
                    qris_url: rawData.qris_url,
                    created_at: createdDate,
                    paid_at: rawData.paid_at,
                    expected_arrival: formatArrivalDate(createdDate),
                    items: formattedItems,
                    activities: activitiesList,
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

    const currentStep = determineStep(orderDetail?.status);

    const timelineSteps: OrderTimelineStep[] = [
        { id: 1, label: "Order Placed", isCompleted: currentStep >= 1, isCurrent: currentStep === 1 },
        { id: 2, label: "Packaging", isCompleted: currentStep >= 2, isCurrent: currentStep === 2 },
        { id: 3, label: "On The Road", isCompleted: currentStep >= 3, isCurrent: currentStep === 3 },
        { id: 4, label: "Delivered", isCompleted: currentStep >= 4, isCurrent: currentStep === 4 },
    ];

    return {
        orderDetail,
        isLoading,
        error,
        currentStep,
        timelineSteps,
        formatRupiah,
        formatDate,
        handlePrint,
        handleDownloadPDF,
        isDownloadingPDF,
    };
}
