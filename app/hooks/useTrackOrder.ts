import { useState, useCallback } from "react";
import type { OrderDetail } from "~/types/trackOrder";

const MOCK_ORDER: OrderDetail = {
  id: "ORD-892341",
  date: "22 September 2026",
  status: "in_transit",
  estimatedDelivery: "24 September 2026",
  carrier: "JNE Express (Reguler)",
  trackingNumber: "JNE-8820194821",
  shippingAddress: {
    name: "Dhandi User",
    address: "Jl. Sudirman No. 45, Jakarta Selatan",
    city: "Jakarta Selatan, DKI Jakarta 12190",
    phone: "0812-3456-7890",
  },
  paymentMethod: "Transfer Bank BCA",
  subtotal: 1899000,
  shippingCost: 25000,
  total: 1924000,
  items: [
    {
      id: "prod-1",
      title: "Dell XPS 15 OLED Touch Intel i9 32GB",
      price: 1899000,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=200&q=80",
    },
  ],
  timeline: [
    {
      title: "Pesanan Dibuat",
      description: "Pesanan telah diterima oleh sistem dan menunggu pembayaran.",
      timestamp: "22 Sep 2026, 09:15 WIB",
      completed: true,
    },
    {
      title: "Pembayaran Dikonfirmasi",
      description: "Pembayaran telah berhasil diverifikasi oleh admin.",
      timestamp: "22 Sep 2026, 09:30 WIB",
      completed: true,
    },
    {
      title: "Pesanan Diproses",
      description: "Barang sedang dikemas di gudang utama.",
      timestamp: "22 Sep 2026, 14:00 WIB",
      completed: true,
    },
    {
      title: "Dalam Pengiriman",
      description: "Paket diserahkan ke kurir JNE (Manifested di Hub Jakarta Selatan).",
      timestamp: "23 Sep 2026, 08:45 WIB",
      completed: true,
      current: true,
    },
    {
      title: "Pesanan Tiba",
      description: "Paket akan diantarkan ke alamat tujuan.",
      timestamp: "Estimasi 24 Sep 2026",
      completed: false,
    },
  ],
};

export function useTrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderDetail | null>(null);

  const trackOrder = useCallback((searchId?: string) => {
    const queryId = (searchId || orderId).trim();
    if (!queryId) {
      setError("Silakan masukkan Nomor Pesanan (Order ID).");
      return;
    }

    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
      setOrder({
        ...MOCK_ORDER,
        id: queryId.toUpperCase().startsWith("ORD-") ? queryId.toUpperCase() : `ORD-${queryId.toUpperCase()}`,
      });
    }, 500);
  }, [orderId]);

  const resetTrack = useCallback(() => {
    setOrderId("");
    setEmailOrPhone("");
    setOrder(null);
    setError(null);
  }, []);

  return {
    orderId,
    setOrderId,
    emailOrPhone,
    setEmailOrPhone,
    isLoading,
    error,
    order,
    trackOrder,
    resetTrack,
  };
}
