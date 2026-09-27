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

const MIDTRANS_CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
const MIDTRANS_SNAP_URL = import.meta.env.VITE_MIDTRANS_SNAP_URL;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useMidtransPayment() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [snapRedirectUrl, setSnapRedirectUrl] = useState<string | null>(null);
    const [snapToken, setSnapToken] = useState<string | null>(null);
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

    const processPayment = async (
        items: CartItem[],
        billingInfo: BillingInfo,
        onSuccessCallback?: () => void
    ) => {
        setIsLoading(true);
        setErrorMessage(null);

        if (!navigator.onLine) {
            setIsLoading(false);
            setErrorMessage(`Koneksi terputus (Mati Sinyal). Kunci Transaksi (${activeIdempotencyKey}) telah tersimpan dengan aman. Pembayaran dapat dilanjutkan begitu koneksi kembali tanpa risiko pembayaran ganda.`);
            return;
        }

        try {
            if (!API_BASE_URL || !MIDTRANS_CLIENT_KEY || !MIDTRANS_SNAP_URL) {
                throw new Error("Konfigurasi variabel environment (VITE_API_BASE_URL, VITE_MIDTRANS_CLIENT_KEY, VITE_MIDTRANS_SNAP_URL) belum diatur di file .env");
            }

            let idempotencyKey = sessionStorage.getItem("active_checkout_idempotency_key");
            if (!idempotencyKey) {
                idempotencyKey = `IDEM-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
                sessionStorage.setItem("active_checkout_idempotency_key", idempotencyKey);
            }
            setActiveIdempotencyKey(idempotencyKey);

            const payloadItems = items.map((item) => ({
                product_id: typeof item.id === "number" ? item.id : parseInt(String(item.id), 10) || 1,
                quantity: item.quantity,
                title: item.title,
                price: item.numericPrice,
            }));

            const fullName = `${billingInfo.firstName} ${billingInfo.lastName}`.trim() || "Customer Bot";

            const response = await fetch(`${API_BASE_URL}/api/payment/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Idempotency-Key": idempotencyKey,
                },
                body: JSON.stringify({
                    idempotency_key: idempotencyKey,
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
                throw new Error(result.error || "Gagal membuat sesi pembayaran Midtrans");
            }

            const { snap_token, snap_redirect_url } = result.data;

            setSnapToken(snap_token);
            setSnapRedirectUrl(snap_redirect_url);

            if (window.snap && typeof window.snap.pay === "function") {
                window.snap.pay(snap_token, {
                    onSuccess: function () {
                        sessionStorage.removeItem("active_checkout_idempotency_key");
                        setIsLoading(false);
                        if (onSuccessCallback) onSuccessCallback();
                    },
                    onPending: function () {
                        setIsLoading(false);
                        if (onSuccessCallback) onSuccessCallback();
                    },
                    onError: function (err: unknown) {
                        setIsLoading(false);
                        setErrorMessage("Pembayaran gagal atau dibatalkan. Silakan coba lagi.");
                        console.error("Midtrans Error:", err);
                    },
                    onClose: function () {
                        setIsLoading(false);
                    },
                });
            } else {
                window.open(snap_redirect_url, "_blank");
                setIsLoading(false);
            }
        } catch (err: unknown) {
            setIsLoading(false);
            const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat memproses pembayaran.";
            setErrorMessage(msg);
        }
    };

    const triggerExistingSnap = () => {
        if (snapToken && window.snap && typeof window.snap.pay === "function") {
            window.snap.pay(snapToken, {
                onSuccess: function () {
                    sessionStorage.removeItem("active_checkout_idempotency_key");
                },
            });
        } else if (snapRedirectUrl) {
            window.open(snapRedirectUrl, "_blank");
        }
    };

    return {
        processPayment,
        triggerExistingSnap,
        isLoading,
        errorMessage,
        snapRedirectUrl,
        snapToken,
        isOnline,
        activeIdempotencyKey,
    };
}
