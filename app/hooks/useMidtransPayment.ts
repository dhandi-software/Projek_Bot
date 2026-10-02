import { useEffect, useState } from "react";
import type { CartItem } from "~/context/CartContext";
import { useCart } from "~/context/CartContext";
import type { BillingInfo } from "~/types/checkout";

declare global {
    interface Window {
        snap?: {
            pay: (
                token: string,
                options?: {
                    onSuccess?: (result: unknown) => void;
                    onPending?: (result: unknown) => void;
                    onError?: (result: unknown) => void;
                    onClose?: () => void;
                }
            ) => void;
        };
    }
}

export interface PaymentDataItem {
    id?: string | number;
    title: string;
    quantity: number;
    numericPrice: number;
    image?: string;
}

export interface PaymentData {
    order_id?: string;
    snap_token?: string;
    snap_redirect_url?: string;
    qris_url?: string;
    qris_string?: string;
    va_number?: string;
    va_bank?: string;
    total_amount?: number;
    status?: string;
    items?: PaymentDataItem[];
}

const MIDTRANS_CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
const MIDTRANS_SNAP_URL = import.meta.env.VITE_MIDTRANS_SNAP_URL;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useMidtransPayment() {
    const { removePurchasedItems } = useCart();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
    const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== "undefined" ? navigator.onLine : true);
    const [activeIdempotencyKey, setActiveIdempotencyKey] = useState<string>("");

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    useEffect(() => {
        if (typeof window === "undefined" || !MIDTRANS_SNAP_URL || !MIDTRANS_CLIENT_KEY) return;

        const existingScript = document.getElementById("midtrans-snap-script");
        if (!existingScript) {
            const script = document.createElement("script");
            script.id = "midtrans-snap-script";
            script.src = MIDTRANS_SNAP_URL;
            script.setAttribute("data-client-key", MIDTRANS_CLIENT_KEY);
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    useEffect(() => {
        if (typeof window === "undefined" || !paymentData?.order_id) return;

        const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
        const defaultWsScheme = isHttps ? "wss" : "ws";
        const wsUrl = API_BASE_URL
            ? API_BASE_URL.replace(/^http/, defaultWsScheme) + "/ws"
            : `${defaultWsScheme}://localhost:8080/ws`;
        let socket: WebSocket | null = null;

        try {
            socket = new WebSocket(wsUrl);
            socket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.event === "payment_status_updated" && data.order_id === paymentData.order_id) {
                        setPaymentData((prev) => (prev ? { ...prev, status: data.status } : prev));
                    }
                } catch {
                }
            };
        } catch {
        }

        return () => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
        };
    }, [paymentData?.order_id]);

    useEffect(() => {
        if (typeof window === "undefined" || !paymentData?.order_id) return;

        const currentStatus = paymentData?.status?.toLowerCase();
        if (currentStatus === "paid" || currentStatus === "settlement") return;

        const interval = setInterval(() => {
            checkPaymentStatus(paymentData.order_id);
        }, 3000);

        return () => clearInterval(interval);
    }, [paymentData?.order_id, paymentData?.status]);

    const checkPaymentStatus = async (overrideOrderId?: string) => {
        const targetId = overrideOrderId || paymentData?.order_id || localStorage.getItem("last_active_order_id");
        if (!targetId || !API_BASE_URL) return;

        setIsLoading(true);
        try {
            const cleanId = encodeURIComponent(targetId.replace(/^#/, ""));
            const res = await fetch(`${API_BASE_URL}/api/orders/${cleanId}`);
            const data = await res.json();
            if (res.ok && data.data) {
                const ord = data.data;
                const newStatus = ord.status;
                const isOrderPaid = ["paid", "settlement", "completed", "success", "capture"].includes((newStatus || "").toLowerCase());
                if (isOrderPaid) {
                    localStorage.removeItem("last_active_order_id");
                } else if (ord.order_id) {
                    localStorage.setItem("last_active_order_id", ord.order_id);
                }

                const rawItems = ord.OrderItems || ord.order_items || ord.items || [];
                const formattedItems: PaymentDataItem[] = rawItems.map((it: any) => ({
                    id: String(it.id || it.product_id),
                    title: it.title || "Produk",
                    quantity: it.quantity || 1,
                    numericPrice: it.price || 0,
                    image: it.image || it.image_url || "",
                }));

                setPaymentData((prev) => ({
                    ...(prev || {}),
                    order_id: ord.order_id,
                    status: newStatus,
                    total_amount: ord.total_amount || ord.total_price,
                    qris_url: ord.qris_url || prev?.qris_url,
                    qris_string: ord.qris_string || prev?.qris_string,
                    va_number: ord.va_number || prev?.va_number,
                    va_bank: ord.va_bank || prev?.va_bank,
                    snap_token: ord.snap_token || prev?.snap_token,
                    snap_redirect_url: ord.snap_redirect_url || prev?.snap_redirect_url,
                    items: formattedItems.length > 0 ? formattedItems : prev?.items,
                }));
            }
        } catch (err) {
            console.error("Gagal mengecek status pembayaran:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const processPayment = async (
        items: CartItem[],
        billingInfo: BillingInfo,
        onSuccessCallback?: () => void,
        methodOverride?: string,
        bankOverride?: string
    ) => {
        setIsLoading(true);
        setErrorMessage(null);

        if (!navigator.onLine) {
            setIsLoading(false);
            setErrorMessage(`Koneksi terputus. Idempotency Key (${activeIdempotencyKey}) tersimpan aman.`);
            return;
        }

        try {
            if (!API_BASE_URL || !MIDTRANS_CLIENT_KEY) {
                throw new Error("Konfigurasi variabel environment API / Midtrans belum diatur.");
            }

            const secureUuid = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
                ? crypto.randomUUID().replace(/-/g, "")
                : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const idempotencyKey = `IDEM-${Date.now()}-${secureUuid}`;
            setActiveIdempotencyKey(idempotencyKey);

            const payloadItems = items.map((item) => {
                const rawId = item.id;
                const parsedId = parseInt(String(rawId), 10);
                const prodId = typeof rawId === "number" ? rawId : (!isNaN(parsedId) ? parsedId : 0);
                return {
                    product_id: prodId,
                    quantity: item.quantity || 1,
                    title: item.title || "Produk",
                    price: item.numericPrice || 100000,
                    image: item.image || (item as any).image_url || "",
                };
            });

            const fullName = `${billingInfo.firstName} ${billingInfo.lastName}`.trim() || "Customer Bot";
            const chosenMethod = methodOverride || billingInfo.paymentMethod || "wallet";

            const response = await fetch(`${API_BASE_URL}/api/payment/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Idempotency-Key": idempotencyKey,
                },
                body: JSON.stringify({
                    idempotency_key: idempotencyKey,
                    payment_method: chosenMethod,
                    bank: bankOverride || "bca",
                    items: payloadItems,
                    customer: {
                        name: fullName,
                        email: billingInfo.email || "customer@example.com",
                        phone: billingInfo.phone || "081234567890",
                        address: billingInfo.address || "Jakarta, Indonesia",
                    },
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.data) {
                throw new Error(result.error || "Gagal membuat transaksi pembayaran");
            }

            const data: PaymentData = result.data;
            const isOrderPaid = ["paid", "settlement", "completed", "success", "capture"].includes((data.status || "").toLowerCase());

            if (data.order_id) {
                if (isOrderPaid) {
                    localStorage.removeItem("last_active_order_id");
                } else {
                    localStorage.setItem("last_active_order_id", data.order_id);
                }
                removePurchasedItems(payloadItems);
            }
            setPaymentData(data);
            setIsLoading(false);

            if (isOrderPaid) {
                sessionStorage.removeItem("active_checkout_idempotency_key");
                if (onSuccessCallback) onSuccessCallback();
                if (typeof window !== "undefined") {
                    window.location.href = "/checkout/success";
                }
            }
        } catch (err: unknown) {
            setIsLoading(false);
            const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat memproses pembayaran.";
            setErrorMessage(msg);
        }
    };

    const triggerExistingSnap = () => {
        if (paymentData?.snap_token && window.snap && typeof window.snap.pay === "function") {
            window.snap.pay(paymentData.snap_token, {
                onSuccess: function (result: any) {
                    const paidId = paymentData?.order_id || (result && (result as any).order_id);
                    if (paidId) {
                        localStorage.setItem("last_active_order_id", paidId);
                    }
                    sessionStorage.removeItem("active_checkout_idempotency_key");
                    setPaymentData((prev) => (prev ? { ...prev, status: "paid" } : { status: "paid" }));
                    if (typeof window !== "undefined") {
                        window.location.href = "/checkout/success";
                    }
                },
                onPending: function () {
                    checkPaymentStatus();
                },
                onError: function () {
                    setErrorMessage("Pembayaran gagal atau dibatalkan.");
                },
                onClose: function () {
                    checkPaymentStatus();
                },
            });
        }
    };

    return {
        processPayment,
        triggerExistingSnap,
        checkPaymentStatus,
        paymentData,
        isLoading,
        errorMessage,
        isOnline,
        activeIdempotencyKey,
    };
}
