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
    Mail,
    Phone,
    MapPin,
    Package,
} from "lucide-react";
import { useInvoice } from "~/hooks/useInvoice";
import { Button } from "~/components/ui/button";

interface InvoiceDesktopProps {
    orderId?: string;
}

export function InvoiceDesktop({ orderId }: InvoiceDesktopProps) {
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
            <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-[#2DA5F3] border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-sm text-zinc-600 font-medium">Memuat Invoice Resmi...</p>
                </div>
            </div>
        );
    }

    if (error || !invoice) {
        return (
            <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
                <div className="w-full bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm text-center space-y-4">
                    <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
                        <XCircle className="w-6 h-6" />
                    </div>
                    <h2 className="text-lg font-bold text-zinc-900">Invoice Tidak Ditemukan</h2>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                        {error || "Data pesanan tidak ditemukan atau tautan sudah tidak berlaku."}
                    </p>
                    <div className="pt-2">
                        <Link to="/">
                            <Button variant="outline" className="text-xs">
                                <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
                            </Button>
                        </Link>
                    </div>
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
        <div className="w-full min-h-screen bg-zinc-100/70 py-8 px-6 md:px-10 print:bg-white print:py-0 print:px-0">
            {/* Action Bar (Hidden on Print) */}
            <div className="w-full mb-6 flex items-center justify-between print:hidden">
                <Link
                    to="/admin/pesanan"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Daftar Pesanan
                </Link>

                <div className="flex items-center gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrint}
                        className="bg-white border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-semibold text-xs h-9"
                    >
                        <Printer className="w-4 h-4 mr-1.5 text-zinc-500" />
                        Cetak Web Invoice
                    </Button>
                    <Button
                        type="button"
                        onClick={handleDownloadPDF}
                        disabled={isDownloadingPDF}
                        className="bg-[#2DA5F3] hover:bg-[#1B6392] text-white font-semibold text-xs h-9 shadow-xs"
                    >
                        <Download className="w-4 h-4 mr-1.5" />
                        {isDownloadingPDF ? "Mengunduh PDF..." : "Download PDF Resmi"}
                    </Button>
                </div>
            </div>

            {/* Main Printable Invoice Sheet */}
            <div className="w-full bg-white rounded-2xl border border-zinc-200 shadow-xl overflow-hidden print:shadow-none print:border-none print:rounded-none">
                {/* Header Banner */}
                <div className="bg-[#191C1F] text-white p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-800">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-[#2DA5F3] rounded-lg flex items-center justify-center text-white font-black text-lg">
                                D
                            </div>
                            <span className="text-xl font-extrabold tracking-tight text-white">
                                DHANDI <span className="text-[#2DA5F3]">ECOMMERCE</span>
                            </span>
                        </div>
                        <p className="text-xs text-zinc-400">
                            Solusi Platform E-Commerce Terpercaya & Transaksi Resmi
                        </p>
                    </div>

                    <div className="text-left md:text-right space-y-1">
                        <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-sky-300 border border-white/10">
                            <FileText className="w-3.5 h-3.5" />
                            INVOICE PEMBAYARAN RESMI
                        </div>
                        <p className="text-xs font-mono text-zinc-300 pt-1">
                            NO: <span className="font-bold text-white">{invoice.order_id}</span>
                        </p>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="bg-zinc-50 border-b border-zinc-200 px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-zinc-500 font-medium">Status Transaksi:</span>
                        {isPaid ? (
                            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-md text-xs font-bold">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                LUNAS / PAID
                            </span>
                        ) : isFailed ? (
                            <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1 rounded-md text-xs font-bold">
                                <XCircle className="w-4 h-4 text-rose-600" />
                                GAGAL / EXPIRED
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-md text-xs font-bold">
                                <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                                MENUNGGU PEMBAYARAN
                            </span>
                        )}
                    </div>

                    <div className="text-xs text-zinc-500">
                        Tanggal Diterbitkan:{" "}
                        <span className="font-semibold text-zinc-800">{formatDate(invoice.created_at)}</span>
                    </div>
                </div>

                {/* Information Section */}
                <div className="p-8 md:p-10 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-zinc-100">
                        {/* Company Info */}
                        <div className="space-y-2.5 text-xs text-zinc-600">
                            <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-[#2DA5F3]" />
                                Penerbit Invoice
                            </h3>
                            <p className="font-semibold text-zinc-800">Dhandi Ecommerce Store</p>
                            <p>Jl. Jendral Sudirman No. 123, Jakarta Selatan</p>
                            <p>Email: support@dhandiecommerce.com</p>
                            <p>No. Telp: +62 813-1924-0256</p>
                        </div>

                        {/* Customer Info */}
                        <div className="space-y-2.5 text-xs text-zinc-600">
                            <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#2DA5F3]" />
                                Ditujukan Kepada (Customer)
                            </h3>
                            <p className="font-semibold text-zinc-800">{invoice.customer_name || "Pelanggan Setia"}</p>
                            <p className="flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                                {invoice.customer_email || "-"}
                            </p>
                            <p className="flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-zinc-400" />
                                {invoice.customer_phone || "-"}
                            </p>
                            <p className="pt-0.5 leading-relaxed">
                                <span className="font-medium text-zinc-700">Alamat Pengiriman:</span>{" "}
                                {invoice.shipping_address || "Indonesia"}
                            </p>
                        </div>
                    </div>

                    {/* Payment Details Box */}
                    <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div>
                            <span className="text-zinc-500 block">Metode Pembayaran</span>
                            <span className="font-bold text-zinc-900">{paymentLabel}</span>
                        </div>
                        {invoice.va_number && (
                            <div>
                                <span className="text-zinc-500 block">Nomor Virtual Account</span>
                                <span className="font-mono font-bold text-[#2DA5F3]">{invoice.va_number}</span>
                            </div>
                        )}
                        <div>
                            <span className="text-zinc-500 block">Waktu Pembayaran</span>
                            <span className="font-semibold text-zinc-800">
                                {invoice.paid_at ? formatDate(invoice.paid_at) : "Belum Dibayar"}
                            </span>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="space-y-3">
                        <h3 className="font-bold text-zinc-900 text-sm">Rincian Produk & Pesanan</h3>

                        <div className="border border-zinc-200 rounded-xl overflow-hidden">
                            <table className="w-full text-xs text-left">
                                <thead className="bg-zinc-100 text-zinc-700 uppercase font-bold border-b border-zinc-200">
                                    <tr>
                                        <th className="py-3 px-4">No</th>
                                        <th className="py-3 px-4">Deskripsi Produk</th>
                                        <th className="py-3 px-4 text-center">Jumlah</th>
                                        <th className="py-3 px-4 text-right">Harga Satuan</th>
                                        <th className="py-3 px-4 text-right">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100">
                                    {invoice.items && invoice.items.length > 0 ? (
                                        invoice.items.map((item, idx) => (
                                            <tr key={idx} className="hover:bg-zinc-50/50 transition-colors">
                                                <td className="py-3.5 px-4 font-medium text-zinc-500">{idx + 1}</td>
                                                <td className="py-3.5 px-4 font-semibold text-zinc-900">
                                                    <div className="flex items-center gap-3">
                                                        {(item.image_url || (item as any).image) ? (
                                                            <img
                                                                src={item.image_url || (item as any).image}
                                                                alt={item.title}
                                                                className="w-11 h-11 object-cover rounded-lg border border-zinc-200 shrink-0 bg-zinc-50"
                                                            />
                                                        ) : (
                                                            <div className="w-11 h-11 rounded-lg border border-zinc-200 bg-zinc-100 flex items-center justify-center shrink-0">
                                                                <Package className="w-5 h-5 text-zinc-400" />
                                                            </div>
                                                        )}
                                                        <span className="leading-snug">{item.title}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3.5 px-4 text-center font-bold text-zinc-800">{item.quantity}</td>
                                                <td className="py-3.5 px-4 text-right text-zinc-600">{formatRupiah(item.price)}</td>
                                                <td className="py-3.5 px-4 text-right font-bold text-zinc-900">
                                                    {formatRupiah(item.price * item.quantity)}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="py-6 text-center text-zinc-500">
                                                Tidak ada detail produk.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Summary Total */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-4 border-t border-zinc-100">
                        <div className="space-y-1 text-xs text-zinc-500">
                            <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                                <ShieldCheck className="w-4 h-4" />
                                Dokumen Resmi Terverifikasi Sistem
                            </div>
                            <p className="leading-relaxed">
                                Invoice ini sah diterbitkan secara elektronik oleh Dhandi Ecommerce dan berlaku tanpa memerlukan tanda tangan basah.
                            </p>
                        </div>

                        <div className="w-full sm:w-72 bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-2 text-xs">
                            <div className="flex justify-between text-zinc-600">
                                <span>Subtotal Produk:</span>
                                <span className="font-semibold text-zinc-800">
                                    {formatRupiah(invoice.total_price || invoice.total_amount)}
                                </span>
                            </div>
                            <div className="flex justify-between text-zinc-600">
                                <span>Biaya Pengiriman:</span>
                                <span className="font-semibold text-emerald-600">GRATIS</span>
                            </div>
                            <div className="border-t border-zinc-200 pt-2 flex justify-between items-center text-sm font-extrabold text-zinc-900">
                                <span>Total Tagihan:</span>
                                <span className="text-[#2DA5F3] text-base">{formatRupiah(invoice.total_amount)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="bg-zinc-100 text-center py-4 px-6 text-[11px] text-zinc-500 border-t border-zinc-200">
                    Terima kasih telah berbelanja di <strong className="text-zinc-800">Dhandi Ecommerce Store</strong>. Simpan invoice ini sebagai bukti transaksi sah Anda.
                </div>
            </div>
        </div>
    );
}
