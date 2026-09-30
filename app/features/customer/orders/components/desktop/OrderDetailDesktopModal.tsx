import React from "react";
import { X, Download, Printer, ShieldCheck, CreditCard, Building2, User } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useOrderDetail } from "../../hooks/useOrderDetail";
import type { OrderDetailModalProps } from "../../types/orderDetail.types";

export function OrderDetailDesktopModal({ orderId, isOpen, onClose }: OrderDetailModalProps) {
    const {
        orderDetail,
        isLoading,
        error,
        formatRupiah,
        formatDate,
        handlePrint,
        handleDownloadPDF,
        isDownloadingPDF,
    } = useOrderDetail(orderId);

    if (!isOpen || !orderId) return null;

    const statusUpper = (orderDetail?.status || "").toUpperCase();
    const isPaid = statusUpper === "PAID" || statusUpper === "SETTLEMENT" || statusUpper === "COMPLETED";
    const isCanceled = statusUpper === "CANCEL" || statusUpper === "CANCELED" || statusUpper === "EXPIRE";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
            onClick={onClose}
        >
            <div
                className="bg-white w-full max-w-[960px] max-h-[90vh] rounded-2xl shadow-2xl border border-zinc-200 flex flex-col overflow-hidden cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="bg-[#1B6392] text-white px-6 py-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-white leading-tight">
                                Rincian Invoice & Detail Pesanan
                            </h2>
                            <p className="text-xs text-white/80 mt-0.5 flex items-center gap-1">
                                <span>Order ID:</span>
                                <span className="font-mono font-bold text-amber-300 truncate max-w-[450px] inline-block">
                                    {orderDetail?.order_id || `#${orderId}`}
                                </span>
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                        title="Tutup Modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {isLoading ? (
                        <div className="py-16 text-center text-xs text-zinc-500 flex flex-col items-center justify-center gap-3">
                            <div className="w-8 h-8 border-3 border-[#1B6392] border-t-transparent rounded-full animate-spin" />
                            <span>Memuat rincian invoice pesanan...</span>
                        </div>
                    ) : error ? (
                        <div className="py-12 text-center text-xs text-rose-600 bg-rose-50 rounded-xl p-4 border border-rose-200">
                            {error}
                        </div>
                    ) : orderDetail ? (
                        <>
                            {/* Section 1: Publisher & Customer Info Box */}
                            <div className="grid grid-cols-2 gap-6 bg-zinc-50/70 p-5 rounded-xl border border-zinc-200/80 text-xs">
                                {/* Left: Penerbit Invoice */}
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2 font-bold text-zinc-900 text-sm mb-1">
                                        <Building2 className="w-4 h-4 text-[#1B6392]" />
                                        <span>Penerbit Invoice</span>
                                    </div>
                                    <p className="font-bold text-zinc-800">Dhandi Ecommerce Store</p>
                                    <p className="text-zinc-600">Jl. Jendral Sudirman No. 123, Jakarta Selatan</p>
                                    <p className="text-zinc-600">Email: support@dhandiecommerce.com</p>
                                    <p className="text-zinc-600">No. Telp: +62 813-1924-0256</p>
                                </div>

                                {/* Right: Ditujukan Kepada */}
                                <div className="space-y-1.5 border-l border-zinc-200 pl-6">
                                    <div className="flex items-center gap-2 font-bold text-zinc-900 text-sm mb-1">
                                        <User className="w-4 h-4 text-[#1B6392]" />
                                        <span>Ditujukan Kepada (Customer)</span>
                                    </div>
                                    <p className="font-bold text-zinc-800">{orderDetail.customer_name}</p>
                                    <p className="text-zinc-600">Email: {orderDetail.customer_email}</p>
                                    <p className="text-zinc-600">No. Telp: {orderDetail.customer_phone}</p>
                                    <p className="text-zinc-600">Alamat Pengiriman: {orderDetail.shipping_address}</p>
                                </div>
                            </div>

                            {/* Section 2: Payment Details Banner */}
                            <div className="bg-[#F0F9FF] p-4.5 rounded-xl border border-sky-200/80 flex items-center justify-between text-xs gap-4">
                                <div className="space-y-1">
                                    <p className="text-[#5F6C72] font-medium text-[11px] uppercase tracking-wider">Metode Pembayaran</p>
                                    <p className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
                                        <CreditCard className="w-4 h-4 text-[#1B6392]" />
                                        <span>{orderDetail.payment_type || "QRIS / E-Wallet Instant"}</span>
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-[#5F6C72] font-medium text-[11px] uppercase tracking-wider">Waktu Pembayaran</p>
                                    <p className="font-semibold text-zinc-800 text-xs">
                                        {formatDate(orderDetail.paid_at || orderDetail.created_at)}
                                    </p>
                                </div>

                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-[#5F6C72] font-medium text-[11px] uppercase tracking-wider">
                                        Status Transaksi
                                    </span>
                                    <span
                                        className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wide uppercase shadow-2xs ${
                                            isPaid
                                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                                : isCanceled
                                                ? "bg-rose-100 text-rose-800 border border-rose-300"
                                                : "bg-amber-100 text-amber-800 border border-amber-300"
                                        }`}
                                    >
                                        {isPaid ? "LUNAS / PAID" : isCanceled ? "GAGAL / BATAL" : "MENUNGGU BAYAR"}
                                    </span>
                                </div>
                            </div>


                            {/* Section 3: Product Items Table with Thumbnail & Title */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-bold text-zinc-900 tracking-wide uppercase">
                                    Rincian Produk & Pesanan
                                </h3>

                                <div className="border border-zinc-200 rounded-xl overflow-hidden shadow-xs">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-zinc-100/80 border-b border-zinc-200 text-[11px] font-bold text-zinc-600 uppercase tracking-wider">
                                                <th className="py-3 px-4 w-12 text-center">NO</th>
                                                <th className="py-3 px-4">DESKRIPSI PRODUK</th>
                                                <th className="py-3 px-4 text-center w-24">JUMLAH</th>
                                                <th className="py-3 px-4 text-right w-36">HARGA SATUAN</th>
                                                <th className="py-3 px-4 text-right w-36">SUBTOTAL</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-200 text-xs">
                                            {orderDetail.items.map((item, idx) => {
                                                const subtotal = item.price * item.quantity;
                                                return (
                                                    <tr key={item.id || idx} className="hover:bg-zinc-50/80 transition-colors">
                                                        <td className="py-3 px-4 text-center text-zinc-500 font-medium">
                                                            {idx + 1}
                                                        </td>
                                                        <td className="py-3 px-4">
                                                            <div className="flex items-center gap-3">
                                                                <img
                                                                    src={
                                                                        item.image ||
                                                                        item.image_url ||
                                                                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80"
                                                                    }
                                                                    alt={item.title}
                                                                    className="w-12 h-12 rounded-lg object-contain bg-zinc-50 p-1 border border-zinc-200 shrink-0"
                                                                />
                                                                <span className="font-semibold text-zinc-900 line-clamp-2 leading-snug">
                                                                    {item.title}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-4 text-center font-bold text-zinc-800">
                                                            {item.quantity}
                                                        </td>
                                                        <td className="py-3 px-4 text-right text-zinc-600 font-medium">
                                                            {formatRupiah(item.price)}
                                                        </td>
                                                        <td className="py-3 px-4 text-right font-bold text-zinc-900">
                                                            {formatRupiah(subtotal)}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Section 4: Total Summary Card */}
                            <div className="flex justify-end">
                                <div className="w-80 bg-zinc-50 p-4 rounded-xl border border-zinc-200 space-y-2 text-xs">
                                    <div className="flex justify-between text-zinc-600">
                                        <span>Subtotal Produk:</span>
                                        <span className="font-semibold text-zinc-900">{formatRupiah(orderDetail.total_amount)}</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-600">
                                        <span>Biaya Pengiriman:</span>
                                        <span className="font-bold text-emerald-600">GRATIS</span>
                                    </div>
                                    <div className="border-t border-zinc-200 pt-2 flex justify-between text-sm font-extrabold text-zinc-900">
                                        <span>Total Tagihan:</span>
                                        <span className="text-[#1B6392]">{formatRupiah(orderDetail.total_amount)}</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null}
                </div>

                {/* Modal Footer */}
                <div className="bg-zinc-50 border-t border-zinc-200 px-6 py-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span>Dokumen Resmi Terverifikasi Sistem Dhandi Ecommerce</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handlePrint}
                            className="gap-2 text-xs font-semibold border-zinc-300 text-zinc-700 hover:bg-zinc-100"
                        >
                            <Printer className="w-4 h-4" />
                            <span>Cetak</span>
                        </Button>

                        <Button
                            type="button"
                            variant="default"
                            size="sm"
                            onClick={handleDownloadPDF}
                            disabled={isDownloadingPDF}
                            className="gap-2 text-xs font-bold bg-[#1B6392] hover:bg-[#134b70] text-white"
                        >
                            <Download className="w-4 h-4" />
                            <span>{isDownloadingPDF ? "Mengunduh PDF..." : "Unduh Invoice PDF"}</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailDesktopModal;
