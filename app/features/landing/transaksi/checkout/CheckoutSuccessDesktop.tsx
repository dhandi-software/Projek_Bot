import { useEffect, useState } from "react";
import { CheckCircle2, PackageCheck, ArrowRight, Home, Download, FileText, Calendar, CreditCard, ShieldCheck, ShoppingBag, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { useCheckout } from "~/hooks/useCheckout";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export function CheckoutSuccessDesktop() {
    const { items, totals, billingInfo, formatRupiah } = useCheckout();
    const [orderId, setOrderId] = useState<string>("");
    const [fetchedOrder, setFetchedOrder] = useState<any>(null);
    const [isDownloading, setIsDownloading] = useState<boolean>(false);

    useEffect(() => {
        let activeOrderId = localStorage.getItem("last_active_order_id");
        if (!activeOrderId) {
            const savedKey = sessionStorage.getItem("active_checkout_idempotency_key");
            if (savedKey) {
                activeOrderId = `IDEM-${savedKey}`;
            }
        }

        // Fetch latest order from backend
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
            console.error("Fallback invoice error:", err);
            window.open(`${API_BASE_URL}/api/orders/${targetOrderId}/invoice`, "_blank");
        } finally {
            setIsDownloading(false);
        }
    };

    const displayItems = fetchedOrder?.items && fetchedOrder.items.length > 0
        ? fetchedOrder.items.map((it: any) => ({
            id: it.id || it.product_id,
            title: it.title,
            quantity: it.quantity,
            numericPrice: it.price,
            image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&auto=format&fit=crop",
        }))
        : items;

    const displayTotal = fetchedOrder?.total_amount || totals.total || 0;
    const displayCustomerName = fetchedOrder?.customer_name || `${billingInfo.firstName} ${billingInfo.lastName}`.trim() || "Customer Dhandi";
    const displayCustomerEmail = fetchedOrder?.customer_email || billingInfo.email || "customer@example.com";
    const displayPaymentType = fetchedOrder?.payment_type ? fetchedOrder.payment_type.toUpperCase() : "MIDTRANS GATEWAY";
    const displayStatus = fetchedOrder?.status ? fetchedOrder.status.toUpperCase() : "PAID";

    return (
        <div className="w-full bg-zinc-50/60 py-8 px-4 md:px-8 min-h-screen">
            <div className="w-full max-w-7xl mx-auto space-y-6">
                {/* Full-width Banner Hero Card */}
                <div className="w-full bg-white border border-zinc-200 rounded-2xl p-8 shadow-xs text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 ring-8 ring-emerald-50/50 animate-in zoom-in duration-300">
                        <CheckCircle2 className="w-9 h-9" />
                    </div>

                    <div className="space-y-1.5 w-full">
                        <h1 className="text-2xl font-bold text-[#191C1F] w-full">
                            Pembayaran Berhasil & Pesanan Dikonfirmasi!
                        </h1>
                        <p className="text-xs text-zinc-500 leading-relaxed w-full">
                            Terima kasih telah berbelanja di Dhandi Ecommerce. Transaksi Anda telah terverifikasi oleh Midtrans secara real-time.
                        </p>
                    </div>

                    {/* Quick Badge Summary Bar */}
                    <div className="pt-2 flex flex-wrap justify-center items-center gap-3 text-xs w-full">
                        <div className="bg-emerald-50 text-emerald-700 font-bold px-3.5 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            <span>Status: {displayStatus}</span>
                        </div>
                        <div className="bg-sky-50 text-[#1B6392] font-semibold px-3.5 py-1.5 rounded-full border border-sky-200 flex items-center gap-1.5">
                            <CreditCard className="w-4 h-4 text-[#2DA5F3]" />
                            <span>Metode: {displayPaymentType}</span>
                        </div>
                        <div className="bg-zinc-100 text-zinc-700 font-medium px-3.5 py-1.5 rounded-full border border-zinc-200 flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-zinc-500" />
                            <span>{new Date().toLocaleDateString("id-ID")}</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid (12 Columns Full Width Layout) */}
                <div className="w-full grid grid-cols-12 gap-8 items-start">
                    {/* LEFT: Order Info & Product Items List (8 cols) */}
                    <div className="col-span-8 space-y-6">
                        {/* Transaction Detail Card */}
                        <div className="w-full bg-white border border-zinc-200 rounded-xl p-6 shadow-xs space-y-4">
                            <h2 className="text-base font-bold text-[#191C1F] pb-3 border-b border-zinc-200 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-[#2DA5F3]" />
                                <span>Rincian Transaksi Pesanan</span>
                            </h2>

                            <div className="grid grid-cols-2 gap-6 text-xs w-full">
                                <div className="space-y-1">
                                    <span className="text-zinc-500 block font-medium">Nomor Pesanan (Order ID)</span>
                                    <span className="font-mono font-bold text-zinc-900 text-sm block">
                                        {targetOrderId}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-zinc-500 block font-medium">Estimasi Pengiriman</span>
                                    <span className="font-bold text-emerald-600 text-sm block">
                                        2 - 4 Hari Kerja
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-zinc-500 block font-medium">Nama Pembeli</span>
                                    <span className="font-semibold text-zinc-800 text-sm block">
                                        {displayCustomerName}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-zinc-500 block font-medium">Email Pembeli</span>
                                    <span className="font-semibold text-zinc-800 text-sm block">
                                        {displayCustomerEmail}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Product Items Purchased List */}
                        <div className="w-full bg-white border border-zinc-200 rounded-xl p-6 shadow-xs space-y-4">
                            <h2 className="text-base font-bold text-[#191C1F] pb-3 border-b border-zinc-200 flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-[#2DA5F3]" />
                                <span>Produk yang Dibeli ({displayItems.length} barang)</span>
                            </h2>

                            <div className="divide-y divide-zinc-100 w-full">
                                {displayItems.map((item: any, idx: number) => (
                                    <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4 w-full">
                                        <div className="flex items-center gap-4 min-w-0">
                                            <div className="w-14 h-14 rounded-lg border border-zinc-200 p-1 shrink-0 bg-white">
                                                <img
                                                    src={item.image || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&auto=format&fit=crop"}
                                                    alt={item.title}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="min-w-0 space-y-1">
                                                <p className="text-xs font-bold text-zinc-900">{item.title}</p>
                                                <p className="text-xs text-zinc-500">
                                                    {item.quantity} x {formatRupiah(item.numericPrice)}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-extrabold text-zinc-900 shrink-0">
                                            {formatRupiah(item.numericPrice * item.quantity)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Payment Summary & Downloads (4 cols) */}
                    <div className="col-span-4 space-y-6">
                        <div className="w-full bg-white border border-zinc-200 rounded-xl p-6 shadow-xs space-y-6 sticky top-6">
                            <h2 className="text-base font-bold text-[#191C1F] pb-3 border-b border-zinc-200">
                                Ringkasan Pembayaran
                            </h2>

                            <div className="space-y-3 text-xs text-zinc-600 w-full">
                                <div className="flex justify-between">
                                    <span>Subtotal Produk</span>
                                    <span className="font-semibold text-zinc-900">{formatRupiah(displayTotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Ongkos Kirim</span>
                                    <span className="font-semibold text-emerald-600">Gratis Ongkir</span>
                                </div>
                                <div className="border-t border-zinc-200 pt-3.5 flex justify-between items-center text-sm font-bold text-zinc-900">
                                    <span>Total Dibayar</span>
                                    <span className="text-lg font-extrabold text-[#2DA5F3]">
                                        {formatRupiah(displayTotal)}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3 pt-2 w-full">
                                <Button
                                    type="button"
                                    onClick={handleDownloadInvoiceBackend}
                                    disabled={isDownloading}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-12 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                                >
                                    {isDownloading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Download className="w-4 h-4" />
                                    )}
                                    <span>{isDownloading ? "Mengunduh PDF..." : "Download Invoice PDF (Backend)"}</span>
                                </Button>

                                <Button
                                    asChild
                                    className="w-full bg-[#2DA5F3] hover:bg-[#1B6392] text-white text-xs font-bold h-12 flex items-center justify-center gap-2 shadow-xs"
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
                                    className="w-full border-zinc-300 hover:bg-zinc-50 text-xs font-semibold h-11 flex items-center justify-center gap-2"
                                >
                                    <Link to="/">
                                        <Home className="w-4 h-4 text-zinc-600" />
                                        <span>Kembali ke Beranda</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
