import { useEffect, useState, useMemo, useCallback } from "react";
import type { AdminOrder, OrderStats } from "~/types/adminOrder.types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export function useAdminOrders() {
    const [orders, setOrders] = useState<AdminOrder[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
    const [isDownloadingInvoice, setIsDownloadingInvoice] = useState<boolean>(false);
    const [wsConnected, setWsConnected] = useState<boolean>(false);

    const fetchOrders = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/orders`);
            if (!res.ok) throw new Error("Gagal mengambil data pesanan");
            const data = await res.json();
            if (data && Array.isArray(data.data)) {
                setOrders(data.data);
            }
        } catch (err) {
            console.error("Error fetching admin orders:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // WebSocket real-time subscription
    useEffect(() => {
        const wsUrl = API_BASE_URL.replace(/^http/, "ws") + "/ws";
        let ws: WebSocket | null = null;
        let reconnectTimeout: ReturnType<typeof setTimeout>;

        const connectWS = () => {
            try {
                ws = new WebSocket(wsUrl);

                ws.onopen = () => {
                    setWsConnected(true);
                };

                ws.onmessage = (event) => {
                    try {
                        const payload = JSON.parse(event.data);
                        if (payload && payload.event === "payment_status_updated") {
                            fetchOrders();
                        }
                    } catch (e) {
                        // Ignore non-JSON broadcast
                    }
                };

                ws.onclose = () => {
                    setWsConnected(false);
                    reconnectTimeout = setTimeout(connectWS, 3000);
                };

                ws.onerror = () => {
                    setWsConnected(false);
                };
            } catch (err) {
                setWsConnected(false);
            }
        };

        connectWS();

        return () => {
            if (reconnectTimeout) clearTimeout(reconnectTimeout);
            if (ws) ws.close();
        };
    }, [fetchOrders]);

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
            return new Date(dateStr).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return dateStr;
        }
    };

    const handleDownloadInvoice = async (orderId: string) => {
        setIsDownloadingInvoice(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}/invoice`);
            if (!res.ok) throw new Error("Gagal mengunduh invoice");
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Invoice_${orderId}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            alert("Gagal mengunduh invoice. Silakan coba lagi.");
        } finally {
            setIsDownloadingInvoice(false);
        }
    };

    // Calculate aggregated statistics
    const stats: OrderStats = useMemo(() => {
        const total = orders.length;
        let paidCount = 0;
        let paidAmount = 0;
        let pendingCount = 0;
        let failedCount = 0;

        orders.forEach((ord) => {
            const st = (ord.status || "").toLowerCase();
            if (st === "paid" || st === "settlement") {
                paidCount++;
                paidAmount += ord.total_amount || ord.total_price || 0;
            } else if (st === "pending") {
                pendingCount++;
            } else if (st === "failed" || st === "expire" || st === "cancel" || st === "deny") {
                failedCount++;
            }
        });

        return { total, paidCount, paidAmount, pendingCount, failedCount };
    }, [orders]);

    // Filter orders by query & tab status
    const filteredOrders = useMemo(() => {
        return orders.filter((ord) => {
            const st = (ord.status || "").toLowerCase();

            if (statusFilter === "paid" && st !== "paid" && st !== "settlement") return false;
            if (statusFilter === "pending" && st !== "pending") return false;
            if (statusFilter === "failed" && st !== "failed" && st !== "expire" && st !== "cancel" && st !== "deny") return false;

            if (!searchQuery.trim()) return true;
            const q = searchQuery.toLowerCase();
            const orderIdMatch = (ord.order_id || "").toLowerCase().includes(q);
            const nameMatch = (ord.customer_name || "").toLowerCase().includes(q);
            const emailMatch = (ord.customer_email || "").toLowerCase().includes(q);
            const phoneMatch = (ord.customer_phone || "").toLowerCase().includes(q);

            const items = ord.order_items || ord.OrderItems || [];
            const itemMatch = items.some((it) => (it.title || "").toLowerCase().includes(q));

            return orderIdMatch || nameMatch || emailMatch || phoneMatch || itemMatch;
        });
    }, [orders, statusFilter, searchQuery]);

    const formatPaymentType = (type?: string, bank?: string) => {
        if (!type) return "QRIS / Transfer Bank";
        const t = type.toLowerCase();
        if (t === "qris" || t === "wallet" || t === "gopay") return "QRIS";
        if (t === "bank" || t === "va" || t === "bank_transfer") {
            return bank ? `Virtual Account (${bank.toUpperCase()})` : "Virtual Account";
        }
        return type.toUpperCase();
    };

    return {
        orders,
        filteredOrders,
        stats,
        isLoading,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        selectedOrder,
        setSelectedOrder,
        isDownloadingInvoice,
        wsConnected,
        fetchOrders,
        formatRupiah,
        formatDate,
        formatPaymentType,
        handleDownloadInvoice,
    };
}
