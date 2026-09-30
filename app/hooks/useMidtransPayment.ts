import { useEffect, useState } from "react";
import type { CartItem } from "~/context/CartContext";
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
}

const MIDTRANS_CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
const MIDTRANS_SNAP_URL = import.meta.env.VITE_MIDTRANS_SNAP_URL;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useMidtransPayment() {
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

        let savedKey = sessionStorage.getItem("active_checkout_idempotency_key");
        if (!savedKey) {
            savedKey = `IDEM-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
            sessionStorage.setItem("active_checkout_idempotency_key", savedKey);
        }
        setActiveIdempotencyKey(savedKey);

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

    // WebSocket real-time listener for payment status updates
    useEffect(() => {
        if (typeof window === "undefined" || !paymentData?.order_id) return;

        const wsUrl = API_BASE_URL ? API_BASE_URL.replace(/^http/, "ws") + "/ws" : "ws://localhost:8080/ws";
        let socket: WebSocket | null = null;

        try {
            socket = new WebSocket(wsUrl);
            socket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.event === "payment_status_updated" && data.order_id === paymentData.order_id) {
                        setPaymentData((prev) => prev ? { ...prev, status: data.status } : prev);
                    }
                } catch {
                    // silent catch
                }
            };
        } catch {
            // silent catch
        }

        return () => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
        };
    }, [paymentData?.order_id]);

    // Auto-polling interval every 3 seconds while payment is pending
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
            const res = await fetch(`${API_BASE_URL}/api/orders/${targetId}`);
            const data = await res.json();
            if (res.ok && data.data) {
                const newStatus = data.data.status;
                if (newStatus === "paid" || newStatus === "settlement") {
                    localStorage.setItem("last_active_order_id", data.data.order_id);
                }
                setPaymentData((prev) => ({
                    ...(prev || {}),
                    order_id: data.data.order_id,
                    status: newStatus,
                    total_amount: data.data.total_amount,
                    qris_url: data.data.qris_url || prev?.qris_url,
                    qris_string: data.data.qris_string || prev?.qris_string,
                    va_number: data.data.va_number || prev?.va_number,
                    va_bank: data.data.va_bank || prev?.va_bank,
                    snap_token: data.data.snap_token || prev?.snap_token,
                    snap_redirect_url: data.data.snap_redirect_url || prev?.snap_redirect_url,
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

            const cartSig = items.map(i => `${i.id}:${i.quantity}:${i.numericPrice}`).join("|");
            const storedSig = sessionStorage.getItem("active_checkout_cart_sig");
            let idempotencyKey = sessionStorage.getItem("active_checkout_idempotency_key");

            if (!idempotencyKey || storedSig !== cartSig) {
                idempotencyKey = `IDEM-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
                sessionStorage.setItem("active_checkout_idempotency_key", idempotencyKey);
                sessionStorage.setItem("active_checkout_cart_sig", cartSig);
            }
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
            if (data.order_id) {
                localStorage.setItem("last_active_order_id", data.order_id);
            }
            setPaymentData(data);
            setIsLoading(false);

            if (data.status === "paid" || data.status === "settlement") {
                sessionStorage.removeItem("active_checkout_idempotency_key");
                if (onSuccessCallback) onSuccessCallback();
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
                onSuccess: function () {
                    sessionStorage.removeItem("active_checkout_idempotency_key");
                    checkPaymentStatus();
                },
            });
        } else if (paymentData?.snap_redirect_url) {
            window.open(paymentData.snap_redirect_url, "_blank");
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
