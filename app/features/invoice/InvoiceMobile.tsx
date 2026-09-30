import React from "react";
import { Link } from "react-router";
import {
    Printer,
    Download,
    CheckCircle2,
    Clock,
    XCircle,
    ArrowLeft,
    ShieldCheck,
    FileText,
    Building2,
    MapPin,
    Package,
} from "lucide-react";
import { useInvoice } from "~/hooks/useInvoice";
import { Button } from "~/components/ui/button";

interface InvoiceMobileProps {
    orderId?: string;
}

export function InvoiceMobile({ orderId }: InvoiceMobileProps) {
    const {
        invoice,
        isLoading,
        error,
        formatRupiah,
        formatDate,
        handlePrint,
        handleDownloadPDF,
        isDownloadingPDF,
    } = useInvoice(orderId);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
                <div className="text-center space-y-3">
                    <div className="w-10 h-10 border-4 border-[#2DA5F3] border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs text-zinc-600 font-medium">Memuat Invoice Resmi...</p>
                </div>
            </div>
        );
    }

    if (error || !invoice) {
        return (
            <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
                <div className="w-full bg-white p-6 rounded-xl border border-zinc-200 text-center space-y-3">
                    <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
                        <XCircle className="w-5 h-5" />
                    </div>
                    <h2 className="text-base font-bold text-zinc-900">Invoice Tidak Ditemukan</h2>
                    <p className="text-xs text-zinc-500">
                        {error || "Data pesanan tidak ditemukan."}
                    </p>
                    <Link to="/" className="inline-block pt-2">
                        <Button variant="outline" size="sm" className="text-xs">
                            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Kembali ke Beranda
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const isPaid = invoice.status === "paid" || invoice.status === "settlement";
    const isFailed = ["expire", "expired", "cancel", "deny"].includes(invoice.status);

    const paymentLabel = (() => {
        const type = (invoice.payment_type || "").toUpperCase();
        if (type === "BANK_TRANSFER" || type === "BANK") {
            return `Virtual Account (${(invoice.va_bank || "Bank").toUpperCase()})`;
        }
        if (type === "GOPAY" || type === "QRIS") {
            return "QRIS / E-Wallet Instant";
        }
        return "Pembayaran Online";
    })();

    return (
        <div className="min-h-screen bg-zinc-100 pb-24 print:bg-white print:pb-0">
            {/* Header Mobile Bar */}
            <div className="bg-[#191C1F] text-white p-4 sticky top-0 z-10 shadow-md flex items-center justify-between print:hidden">
                <Link to="/admin/pesanan" className="text-zinc-300 hover:text-white p-1">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="text-center">
                    <span className="font-extrabold text-sm tracking-tight text-white block">
                        DHANDI <span className="text-[#2DA5F3]">ECOMMERCE</span>
                    </span>
                    <span className="text-[10px] text-zinc-400 block font-mono">
                        Invoice #{invoice.order_id}
                    </span>
                </div>
                <div className="w-6" />
            </div>

            <div className="p-3 space-y-3 max-w-lg mx-auto">
                {/* Status Card */}
                <div className="bg-white rounded-xl border border-zinc-200 p-4 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-zinc-500 font-medium">Status Transaksi</span>
                        {isPaid ? (
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded text-[11px] font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                LUNAS
                            </span>
                        ) : isFailed ? (
                            <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded text-[11px] font-bold">
                                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                                GAGAL
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded text-[11px] font-bold">
                                <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                                MENUNGGU
                            </span>
                        )}
                    </div>
                    <div className="text-[11px] text-zinc-500 border-t border-zinc-100 pt-2 flex justify-between">
                        <span>Tanggal Transaksi:</span>
                        <span className="font-semibold text-zinc-800">{formatDate(invoice.created_at)}</span>
                    </div>
                </div>

                {/* Customer & Shipping Info */}
                <div className="bg-white rounded-xl border border-zinc-200 p-4 shadow-xs space-y-3 text-xs">
                    <h3 className="font-bold text-zinc-900 border-b border-zinc-100 pb-2 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#2DA5F3]" />
                        Detail Pembeli & Pengiriman
                    </h3>
                    <div className="space-y-1.5 text-zinc-600">
                        <p className="font-bold text-zinc-900">{invoice.customer_name || "Customer"}</p>
                        <p>{invoice.customer_email || "-"}</p>
                        <p>{invoice.customer_phone || "-"}</p>
                        <p className="pt-1 text-zinc-700 leading-relaxed border-t border-zinc-100 mt-2">
                            <span className="font-medium text-zinc-900">Alamat:</span> {invoice.shipping_address || "Indonesia"}
                        </p>
                    </div>
                </div>

                {/* Payment Method Card */}
                <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-3.5 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-500">Metode Pembayaran</span>
                        <span className="font-bold text-zinc-900">{paymentLabel}</span>
                    </div>
                    {invoice.va_number && (
                        <div className="flex justify-between items-center border-t border-sky-100/80 pt-1.5">
                            <span className="text-zinc-500">Nomor Virtual Account</span>
                            <span className="font-mono font-bold text-[#2DA5F3]">{invoice.va_number}</span>
                        </div>
                    )}
                </div>

                {/* Products List */}
                <div className="bg-white rounded-xl border border-zinc-200 p-4 shadow-xs space-y-3 text-xs">
                    <h3 className="font-bold text-zinc-900 border-b border-zinc-100 pb-2 flex items-center gap-1.5">
                        <Package className="w-4 h-4 text-[#2DA5F3]" />
                        Produk Dibeli ({invoice.items?.length || 0})
                    </h3>

                    <div className="divide-y divide-zinc-100">
                        {invoice.items && invoice.items.length > 0 ? (
                            invoice.items.map((item, idx) => (
                                <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                        {(item.image_url || (item as any).image) ? (
                                            <img
                                                src={item.image_url || (item as any).image}
                                                alt={item.title}
                                                className="w-10 h-10 object-cover rounded-lg border border-zinc-200 shrink-0 bg-zinc-50"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-lg border border-zinc-200 bg-zinc-100 flex items-center justify-center shrink-0">
                                                <Package className="w-4 h-4 text-zinc-400" />
                                            </div>
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <p className="font-bold text-zinc-900 truncate">{item.title}</p>
                                            <p className="text-[11px] text-zinc-500">
                                                {item.quantity} x {formatRupiah(item.price)}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-zinc-900 shrink-0">
                                        {formatRupiah(item.price * item.quantity)}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="py-3 text-center text-zinc-400">Tidak ada produk.</p>
                        )}
                    </div>

                    <div className="border-t border-zinc-200 pt-3 space-y-1.5 text-xs">
                        <div className="flex justify-between text-zinc-600">
                            <span>Subtotal:</span>
                            <span className="font-semibold text-zinc-800">
                                {formatRupiah(invoice.total_price || invoice.total_amount)}
                            </span>
                        </div>
                        <div className="flex justify-between text-zinc-600">
                            <span>Pengiriman:</span>
                            <span className="font-bold text-emerald-600">GRATIS</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-extrabold text-zinc-900 pt-1 border-t border-zinc-100">
                            <span>Total Pembayaran:</span>
                            <span className="text-[#2DA5F3] text-base">{formatRupiah(invoice.total_amount)}</span>
                        </div>
                    </div>
                </div>

                {/* Footer Security Note */}
                <div className="text-center text-[10px] text-zinc-400 pt-2 space-y-1">
                    <p className="flex items-center justify-center gap-1 text-emerald-600 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" /> Transaksi Diterbitkan Resmi oleh Dhandi Ecommerce
                    </p>
                </div>
            </div>

            {/* Bottom Fixed Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 p-3 shadow-lg flex items-center justify-between gap-2 z-20 print:hidden">
                <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrint}
                    className="flex-1 h-10 text-xs font-semibold"
                >
                    <Printer className="w-4 h-4 mr-1 text-zinc-600" /> Cetak
                </Button>
                <Button
                    type="button"
                    onClick={handleDownloadPDF}
                    disabled={isDownloadingPDF}
                    className="flex-1 h-10 text-xs font-bold bg-[#2DA5F3] hover:bg-[#1B6392] text-white"
                >
                    <Download className="w-4 h-4 mr-1" />
                    {isDownloadingPDF ? "Mengunduh..." : "Download PDF"}
                </Button>
            </div>
        </div>
    );
}
