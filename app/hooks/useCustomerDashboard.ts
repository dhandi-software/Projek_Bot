import { useState, useEffect, useCallback } from "react";
import { useAuth } from "~/hooks/useAuth";
import { paymentApi, type OrderData } from "~/api/paymentApi";
import type {
    CustomerProfileInfo,
    CustomerBillingAddress,
    CustomerDashboardStats,
    CustomerPaymentCard,
    CustomerRecentOrder,
    CustomerHistoryProduct,
    OrderStatusType,
} from "../types/customerDashboard.types";

const MOCK_PROFILE: CustomerProfileInfo = {
    name: "Kevin Gilbert",
    email: "kevin.gilbert@gmail.com",
    secEmail: "kevin12345@gmail.com",
    phone: "+1-202-555-0118",
    location: "Dhaka - 1207, Bangladesh",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
};

const MOCK_BILLING: CustomerBillingAddress = {
    name: "Kevin Gilbert",
    address:
        "East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh",
    phone: "+1-202-555-0118",
    email: "kevin.gilbert@gmail.com",
};

const MOCK_CARDS: CustomerPaymentCard[] = [
    {
        id: "card-1",
        cardType: "visa",
        balance: "Rp 95.400.000",
        currency: "IDR",
        cardNumberMasked: "****  ****  ****  3814",
        cardHolderName: "Kevin Gilbert",
        isDefault: true,
    },
    {
        id: "card-2",
        cardType: "mastercard",
        balance: "Rp 87.583.000",
        currency: "IDR",
        cardNumberMasked: "****  ****  ****  1761",
        cardHolderName: "Kevin Gilbert",
    },
];

const MOCK_RECENT_ORDERS: CustomerRecentOrder[] = [
    {
        id: "1",
        orderId: "#96459761",
        status: "IN PROGRESS",
        date: "30 Des 2019 05:18",
        totalAmount: "Rp 1.500.000",
        productCount: 5,
    },
    {
        id: "2",
        orderId: "#71667167",
        status: "COMPLETED",
        date: "2 Feb 2019 19:28",
        totalAmount: "Rp 80.000",
        productCount: 11,
    },
    {
        id: "3",
        orderId: "#95214362",
        status: "CANCELED",
        date: "20 Mar 2019 23:14",
        totalAmount: "Rp 160.000",
        productCount: 3,
    },
    {
        id: "4",
        orderId: "#71667168",
        status: "COMPLETED",
        date: "2 Feb 2019 19:28",
        totalAmount: "Rp 80.000",
        productCount: 1,
    },
    {
        id: "5",
        orderId: "#51746385",
        status: "COMPLETED",
        date: "2 Feb 2019 19:28",
        totalAmount: "Rp 2.300.000",
        productCount: 2,
    },
    {
        id: "6",
        orderId: "#51746386",
        status: "CANCELED",
        date: "30 Des 2019 07:52",
        totalAmount: "Rp 70.000",
        productCount: 1,
    },
    {
        id: "7",
        orderId: "#673971743",
        status: "COMPLETED",
        date: "7 Des 2019 23:26",
        totalAmount: "Rp 220.000",
        productCount: 1,
    },
];

const MOCK_BROWSING_HISTORY: CustomerHistoryProduct[] = [
    {
        id: "prod-1",
        title: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...",
        price: 70000,
        rating: 5,
        reviewCount: 738,
        badge: "HOT",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80",
    },
    {
        id: "prod-2",
        title: "Samsung Electronics Samsung Galaxy S21 5G",
        price: 2300000,
        rating: 5,
        reviewCount: 536,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=300&q=80",
    },
    {
        id: "prod-3",
        title: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6...",
        price: 360000,
        rating: 5,
        reviewCount: 423,
        badge: "BEST DEALS",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=300&q=80",
    },
    {
        id: "prod-4",
        title: "Portable Washing Machine, 11lbs capacity Model 18NMF...",
        price: 80000,
        rating: 4,
        reviewCount: 816,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80",
    },
];

export function useCustomerDashboard() {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState<CustomerProfileInfo>(MOCK_PROFILE);
    const [billingAddress, setBillingAddress] = useState<CustomerBillingAddress>(MOCK_BILLING);
    const [cards, setCards] = useState<CustomerPaymentCard[]>(MOCK_CARDS);
    const [orders, setOrders] = useState<CustomerRecentOrder[]>(MOCK_RECENT_ORDERS);
    const [browsingHistory] = useState<CustomerHistoryProduct[]>(MOCK_BROWSING_HISTORY);
    const [stats, setStats] = useState<CustomerDashboardStats>({
        totalOrders: 154,
        pendingOrders: 5,
        completedOrders: 149,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [activeCardMenuId, setActiveCardMenuId] = useState<string | null>(null);

    // Sync logged in user details & avatar photo if available
    useEffect(() => {
        const updateProfileFromUser = () => {
            const role = (user?.role || "customer").toLowerCase();
            const email = user?.email || "";
            const rolePhotoKey = `userPhoto_${role}_${email}`;
            const roleProfileKey = `userProfile_${role}_${email}`;

            const savedPhoto = localStorage.getItem("userPhoto") || (email ? localStorage.getItem(rolePhotoKey) : null) || user?.photo;
            const savedProfileStr = email ? localStorage.getItem(roleProfileKey) : null;
            let customName = user?.name;
            let customPhone = user?.phone;

            if (savedProfileStr) {
                try {
                    const parsed = JSON.parse(savedProfileStr);
                    if (parsed.name) customName = parsed.name;
                    if (parsed.phone) customPhone = parsed.phone;
                } catch (e) {
                    console.error("Error parsing role profile in dashboard", e);
                }
            }

            if (user || savedPhoto || customName) {
                setProfile((prev) => ({
                    ...prev,
                    name: customName || user?.name || user?.email?.split("@")[0] || prev.name,
                    email: user?.email || prev.email,
                    phone: customPhone || prev.phone,
                    avatar: (savedPhoto && savedPhoto !== "/images/avatar.svg") ? savedPhoto : prev.avatar,
                }));
                setBillingAddress((prev) => ({
                    ...prev,
                    name: customName || user?.name || prev.name,
                    email: user?.email || prev.email,
                    phone: customPhone || prev.phone,
                }));
            }
        };

        updateProfileFromUser();
        window.addEventListener("user-profile-updated", updateProfileFromUser);
        return () => window.removeEventListener("user-profile-updated", updateProfileFromUser);
    }, [user]);

    // Fetch real customer orders if API is available
    const fetchOrders = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await paymentApi.getOrders();
            if (response && Array.isArray(response.data) && response.data.length > 0) {
                const mapStatus = (st?: string): OrderStatusType => {
                    const statusStr = (st || "").toLowerCase();
                    if (statusStr === "paid" || statusStr === "settlement") return "COMPLETED";
                    if (statusStr === "pending") return "IN PROGRESS";
                    if (statusStr === "failed" || statusStr === "expire" || statusStr === "cancel") return "CANCELED";
                    return "IN PROGRESS";
                };

                const realOrders: CustomerRecentOrder[] = response.data.map((ord: OrderData, idx: number) => ({
                    id: String(ord.id || idx),
                    orderId: `#${ord.order_id || ord.order_number || idx}`,
                    status: mapStatus(ord.status),
                    date: ord.created_at
                        ? new Date(ord.created_at).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                          })
                        : "30 Des 2019 05:18",
                    totalAmount: `Rp ${(ord.total_amount || ord.total_price || 0).toLocaleString("id-ID")}`,
                    productCount: (ord.OrderItems || ord.order_items || ord.items || []).length || 1,
                }));


                setOrders(realOrders);

                const completed = realOrders.filter((o) => o.status === "COMPLETED").length;
                const pending = realOrders.filter((o) => o.status === "IN PROGRESS" || o.status === "PENDING").length;

                setStats({
                    totalOrders: realOrders.length,
                    pendingOrders: pending,
                    completedOrders: completed,
                });
            }
        } catch (err) {
            console.error("Gagal mengambil data pesanan customer:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleToggleCardMenu = (cardId: string) => {
        setActiveCardMenuId((prev) => (prev === cardId ? null : cardId));
    };

    const handleDeleteCard = (cardId: string) => {
        setCards((prev) => prev.filter((c) => c.id !== cardId));
        setActiveCardMenuId(null);
    };

    return {
        user,
        profile,
        billingAddress,
        cards,
        orders,
        stats,
        browsingHistory,
        isLoading,
        activeCardMenuId,
        handleToggleCardMenu,
        handleDeleteCard,
        logout,
        refreshOrders: fetchOrders,
    };
}
