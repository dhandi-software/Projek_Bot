import { useEffect, useState } from "react";
import { CheckCircle2, PackageCheck, ArrowRight, Home, Download, FileText, ShieldCheck, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { useCheckout } from "~/hooks/useCheckout";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export function CheckoutSuccessMobile() {
    const { items, totals, billingInfo, formatRupiah } = useCheckout();
    const [orderId, setOrderId] = useState<string>("");
    const [fetchedOrder, setFetchedOrder] = useState<any>(null);
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
    const [showNotificationToast, setShowNotificationToast] = useState<boolean>(true);

    useEffect(() => {
        let activeOrderId = localStorage.getItem("last_active_order_id");
        if (!activeOrderId) {
            const savedKey = sessionStorage.getItem("active_checkout_idempotency_key");
            if (savedKey) {
                activeOrderId = `IDEM-${savedKey}`;
            }
        }

        fetch(`${API_BASE_URL}/api/orders`)
            .then((res) => res.json())
            .then((data) => {
                if (data.data && Array.isArray(data.data) && data.data.length > 0) {
                    const latest = data.data[0];
                    setFetchedOrder(latest);
                    setOrderId(latest.order_id);
                }
            })
            .catch((err) => {
                console.error("Gagal mengambil data order terbaru:", err);
            });
    }, []);

    const targetOrderId = orderId || fetchedOrder?.order_id || "ORDER-ID";

    const handleDownloadInvoiceBackend = async () => {
        if (!targetOrderId) return;
        setIsDownloading(true);
        try {
            const invoiceUrl = `${API_BASE_URL}/api/orders/${targetOrderId}/invoice`;
            const response = await fetch(invoiceUrl);
            if (!response.ok) {
                throw new Error("Gagal mengambil invoice dari backend");
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Invoice_${targetOrderId}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            window.open(`${API_BASE_URL}/api/orders/${targetOrderId}/invoice`, "_blank");
        } finally {
            setIsDownloading(false);
        }
    };

    const displayItems = fetchedOrder?.items && fetchedOrder.items.length > 0
        ? fetchedOrder.items.map((it: any) => {
            const matchedCartItem = items.find((ci: any) => ci.title === it.title || String(ci.id) === String(it.product_id || it.id));
            return {
                id: it.id || it.product_id,
                title: it.title,
                quantity: it.quantity,
                numericPrice: it.price,
                image: it.image || it.image_url || (matchedCartItem ? matchedCartItem.image : "") || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&auto=format&fit=crop",
            };
        })
        : items;

    const displayTotal = fetchedOrder?.total_amount || totals.total || 0;
    const displayStatus = fetchedOrder?.status ? fetchedOrder.status.toUpperCase() : "PAID";

    return (
        <div className="w-full bg-zinc-50/60 py-6 px-4 pb-12 relative">
            {/* Top Floating Notification Toast */}
            {showNotificationToast && (
                <div className="fixed top-4 left-4 right-4 z-[9999] bg-[#0F172A]/95 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center justify-between gap-3 border border-emerald-500/50 backdrop-blur-md animate-in fade-in slide-in-from-top-3 duration-300">
                    <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div className="text-[11px]">
                            <p className="font-bold text-emerald-400">Pembayaran Diterima!</p>
                            <p className="text-zinc-300 text-[10px]">
                                Pesanan <span className="font-mono text-white font-bold">{targetOrderId}</span> terverifikasi.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowNotificationToast(false)}
                        className="text-zinc-400 hover:text-white text-xs font-bold p-1 shrink-0"
                    >
                        ✕
                    </button>
                </div>
            )}
            <div className="space-y-4 w-full">
                {/* Hero Status Card */}
                <div className="bg-white border border-zinc-200 rounded-xl p-5 text-center space-y-3 shadow-xs w-full">
                    <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 ring-6 ring-emerald-50/50">
                        <CheckCircle2 className="w-7 h-7" />
                    </div>

                    <div className="space-y-1 w-full">
                        <h1 className="text-lg font-bold text-[#191C1F] w-full">
                            Pembayaran Berhasil!
                        </h1>
                        <p className="text-xs text-zinc-500 w-full">
                            Pesanan Anda telah dikonfirmasi dan berhasil diproses.
                        </p>
                    </div>

                    <div className="pt-1 flex justify-center">
                        <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> STATUS: {displayStatus}
                        </span>
                    </div>
                </div>

                {/* Transaction Details */}
                <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-3 shadow-xs text-xs w-full">
                    <h2 className="font-bold text-[#191C1F] pb-2 border-b border-zinc-100 flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-[#2DA5F3]" />
                        <span>Detail Transaksi</span>
                    </h2>

                    <div className="space-y-2 w-full">
                        <div className="flex justify-between w-full">
                            <span className="text-zinc-500">Order ID:</span>
                            <span className="font-mono font-bold text-zinc-900">{targetOrderId}</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <span className="text-zinc-500">Est. Pengiriman:</span>
                            <span className="font-bold text-emerald-600">2 - 4 Hari Kerja</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <span className="text-zinc-500">Metode:</span>
                            <span className="font-semibold text-zinc-800">Pembayaran Online</span>
                        </div>
                    </div>
                </div>

                {/* Purchased Items */}
                <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-3 shadow-xs text-xs w-full">
                    <h2 className="font-bold text-[#191C1F] pb-2 border-b border-zinc-100">
                        Produk Dibeli ({displayItems.length})
                    </h2>

                    <div className="divide-y divide-zinc-100 w-full">
                        {displayItems.map((item: any, idx: number) => (
                            <div key={idx} className="py-2.5 flex items-center justify-between gap-3 w-full">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <img
                                        src={item.image || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&auto=format&fit=crop"}
                                        alt={item.title}
                                        className="w-10 h-10 object-contain rounded border border-zinc-200 p-0.5 shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <p className="font-bold text-zinc-900 text-[11px]">{item.title}</p>
                                        <p className="text-[10px] text-zinc-500">{item.quantity} x {formatRupiah(item.numericPrice)}</p>
                                    </div>
                                </div>
                                <span className="font-extrabold text-zinc-900 shrink-0 text-[11px]">
                                    {formatRupiah(item.numericPrice * item.quantity)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-zinc-200 pt-2.5 flex justify-between items-center text-xs font-bold w-full">
                        <span>Total Bayar</span>
                        <span className="text-sm font-extrabold text-[#2DA5F3]">{formatRupiah(displayTotal)}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-1 w-full">
                    <Button
                        asChild
                        className="w-full bg-emerald-600 text-white font-bold text-xs h-11 flex items-center justify-center gap-2"
                    >
                        <Link to={`/invoice/${targetOrderId}`} target="_blank">
                            <FileText className="w-4 h-4" />
                            <span>Lihat & Cetak Invoice Resmi</span>
                        </Link>
                    </Button>

                    <Button
                        asChild
                        className="w-full bg-[#2DA5F3] text-white text-xs font-bold h-11 flex items-center justify-center gap-2"
                    >
                        <Link to="/track-order">
                            <PackageCheck className="w-4 h-4" />
                            <span>Lacak Pesanan</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        className="w-full border-zinc-300 text-xs font-semibold h-10 flex items-center justify-center gap-2"
                    >
                        <Link to="/">
                            <Home className="w-4 h-4 text-zinc-600" />
                            <span>Kembali ke Beranda</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
