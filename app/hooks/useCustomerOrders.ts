import { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "~/hooks/useAuth";
import { paymentApi, type OrderData } from "~/api/paymentApi";
import type { CustomerOrder, OrderStatus } from "../types/customerOrders.types";

const MOCK_CUSTOMER_ORDERS: CustomerOrder[] = [
    {
        id: "1",
        orderId: "#96459761",
        status: "IN PROGRESS",
        date: "30 Des 2019 07:52",
        totalAmount: 1500000,
        itemCount: 7,
        productTitle: "Sony PlayStation VR2 Headset + Horizon Call of the Mountain Bundle",
        productImage: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=200&q=80",
    },
    {
        id: "2",
        orderId: "#71667167",
        status: "COMPLETED",
        date: "7 Des 2019 23:26",
        totalAmount: 70000,
        itemCount: 1,
        productTitle: "TOZO T6 True Wireless Earbuds Bluetooth Headphones",
        productImage: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=200&q=80",
    },
    {
        id: "3",
        orderId: "#95214362",
        status: "CANCELED",
        date: "7 Des 2019 23:26",
        totalAmount: 2300000,
        itemCount: 8,
        productTitle: "Samsung Electronics Samsung Galaxy S21 5G 128GB",
        productImage: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=200&q=80",
    },
    {
        id: "4",
        orderId: "#71667167",
        status: "COMPLETED",
        date: "2 Feb 2019 19:28",
        totalAmount: 420000,
        itemCount: 5,
        productTitle: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/60Hz)",
        productImage: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=200&q=80",
    },
    {
        id: "5",
        orderId: "#51746385",
        status: "COMPLETED",
        date: "30 Des 2019 07:52",
        totalAmount: 80000,
        itemCount: 1,
        productTitle: "Logitech MX Master 3S Wireless Performance Mouse",
        productImage: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=200&q=80",
    },
    {
        id: "6",
        orderId: "#673971743",
        status: "COMPLETED",
        date: "4 Des 2019 21:42",
        totalAmount: 220000,
        itemCount: 2,
        productTitle: "Keychron K2 Wireless Mechanical Keyboard RGB",
        productImage: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=200&q=80",
    },
    {
        id: "7",
        orderId: "#63574637",
        status: "COMPLETED",
        date: "30 Des 2019 07:52",
        totalAmount: 80000,
        itemCount: 1,
        productTitle: "Apple AirPods Pro 2nd Generation MagSafe Case",
        productImage: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=200&q=80",
    },
    {
        id: "8",
        orderId: "#12548963",
        status: "COMPLETED",
        date: "30 Des 2019 07:52",
        totalAmount: 160000,
        itemCount: 2,
        productTitle: "Anker 737 Power Bank 24,000mAh 140W Fast Charger",
        productImage: "https://images.unsplash.com/photo-1609592424074-2790757754d9?auto=format&fit=crop&w=200&q=80",
    },
    {
        id: "9",
        orderId: "#89632541",
        status: "IN PROGRESS",
        date: "14 Nov 2019 14:10",
        totalAmount: 540000,
        itemCount: 3,
        productTitle: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
        productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80",
    },
    {
        id: "10",
        orderId: "#45896321",
        status: "COMPLETED",
        date: "22 Okt 2019 09:30",
        totalAmount: 120000,
        itemCount: 1,
        productTitle: "Nintendo Switch OLED Model White Gaming Console",
        productImage: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=200&q=80",
    },
];

export function useCustomerOrders() {
    const { logout } = useAuth();
    const [orders, setOrders] = useState<CustomerOrder[]>(MOCK_CUSTOMER_ORDERS);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "ALL">("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const fetchCustomerOrders = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await paymentApi.getOrders();
            const rawOrders: OrderData[] = Array.isArray(res?.data)
                ? res.data
                : Array.isArray((res as unknown as { orders?: OrderData[] })?.orders)
                ? (res as unknown as { orders: OrderData[] }).orders
                : [];

            if (rawOrders && rawOrders.length > 0) {
                const mappedOrders: CustomerOrder[] = rawOrders.map((ord, idx) => {
                    const statusStr = (ord.status || "").toLowerCase();
                    let mappedStatus: OrderStatus = "IN PROGRESS";

                    if (statusStr === "pending" || statusStr === "unpaid") {
                        mappedStatus = "PENDING";
                    } else if (statusStr === "shipped") {
                        mappedStatus = "SHIPPED";
                    } else if (statusStr === "paid" || statusStr === "settlement" || statusStr === "completed") {
                        mappedStatus = "COMPLETED";
                    } else if (
                        statusStr === "failed" ||
                        statusStr === "expire" ||
                        statusStr === "cancel" ||
                        statusStr === "canceled" ||
                        statusStr === "cancelled" ||
                        statusStr === "deny"
                    ) {
                        mappedStatus = "CANCELED";
                    } else if (statusStr === "processing" || statusStr === "in_progress") {
                        mappedStatus = "IN PROGRESS";
                    }

                    const itemsList = ord.OrderItems || ord.order_items || ord.items || [];
                    const itemCount = itemsList.reduce((acc, item) => acc + (item.quantity || 1), 0) || 1;
                    const firstItem = itemsList[0] || {};
                    const productTitle = firstItem.title || (firstItem as any).product_name || "Produk Dhandi Ecommerce";
                    const productImage = firstItem.image || firstItem.image_url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80";

                    const formattedDate = ord.created_at
                        ? new Date(ord.created_at).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                          })
                        : "Hari ini";

                    return {
                        id: String(ord.id || idx),
                        orderId: `#${ord.order_id || ord.order_number || idx}`,
                        status: mappedStatus,
                        date: formattedDate,
                        totalAmount: ord.total_amount || ord.total_price || 0,
                        itemCount: itemCount,
                        productTitle: productTitle,
                        productImage: productImage,
                        snapToken: ord.snap_token,
                        snapRedirectUrl: ord.snap_redirect_url,
                        qrisUrl: ord.qris_url,
                        vaNumber: ord.va_number,
                        vaBank: ord.va_bank,
                    };
                });

                setOrders(mappedOrders);
            }
        } catch (err) {
            console.error("Gagal mengambil data pesanan backend:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const cancelOrder = useCallback(async (orderId: string) => {
        try {
            await paymentApi.cancelOrder(orderId);
            await fetchCustomerOrders();
            return { success: true };
        } catch (err: any) {
            const msg = err?.response?.data?.error || err?.message || "Gagal membatalkan order";
            return { success: false, error: msg };
        }
    }, [fetchCustomerOrders]);

    useEffect(() => {
        fetchCustomerOrders();
    }, [fetchCustomerOrders]);

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const matchesStatus = selectedStatus === "ALL" || order.status === selectedStatus;
            const matchesQuery =
                !searchQuery ||
                order.orderId.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesStatus && matchesQuery;
        });
    }, [orders, selectedStatus, searchQuery]);

    const totalPages = Math.ceil(filteredOrders.length / pageSize) || 1;

    const paginatedOrders = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredOrders.slice(start, start + pageSize);
    }, [filteredOrders, currentPage, pageSize]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return {
        orders: paginatedOrders,
        totalOrdersCount: filteredOrders.length,
        isLoading,
        selectedStatus,
        setSelectedStatus,
        searchQuery,
        setSearchQuery,
        currentPage,
        totalPages,
        handlePageChange,
        logout,
        refreshOrders: fetchCustomerOrders,
        cancelOrder,
    };
}
