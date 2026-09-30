import React from "react";
import { X, Download, Printer, ShieldCheck, CreditCard, Building2, User } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useOrderDetail } from "../../hooks/useOrderDetail";
import type { OrderDetailModalProps } from "../../types/orderDetail.types";

export function OrderDetailMobileDrawer({ orderId, isOpen, onClose }: OrderDetailModalProps) {
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
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
            onClick={onClose}
        >
            <div
                className="bg-white w-full max-w-lg max-h-[92vh] rounded-t-2xl sm:rounded-2xl shadow-2xl border border-zinc-200 flex flex-col overflow-hidden cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Mobile Drawer Top Bar */}
                <div className="bg-[#1B6392] text-white p-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <Building2 className="w-5 h-5 text-white shrink-0" />
                        <div className="min-w-0">
                            <h2 className="text-sm font-bold text-white truncate">
                                Rincian Invoice & Pesanan
                            </h2>
                            <p className="text-[11px] text-white/80 font-mono">
                                {orderDetail?.order_id || `#${orderId}`}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Mobile Body Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                    {isLoading ? (
                        <div className="py-12 text-center text-zinc-500 flex flex-col items-center justify-center gap-2">
                            <div className="w-6 h-6 border-2 border-[#1B6392] border-t-transparent rounded-full animate-spin" />
                            <span>Memuat invoice pesanan...</span>
                        </div>
                    ) : error ? (
                        <div className="py-8 text-center text-rose-600 bg-rose-50 rounded-xl p-3 border border-rose-200">
                            {error}
                        </div>
                    ) : orderDetail ? (
                        <>
                            {/* Customer & Status Banner */}
                            <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200 space-y-2">
                                <div className="flex items-center justify-between border-b pb-2">
                                    <span className="font-bold text-zinc-900 text-xs">Informasi Customer</span>
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                                            isPaid
                                                ? "bg-emerald-100 text-emerald-700"
                                                : isCanceled
                                                ? "bg-rose-100 text-rose-700"
                                                : "bg-amber-100 text-amber-700"
                                        }`}
                                    >
                                        {isPaid ? "PAID" : isCanceled ? "BATAL" : "PENDING"}
                                    </span>
                                </div>
                                <p><span className="text-zinc-500">Nama:</span> {orderDetail.customer_name}</p>
                                <p><span className="text-zinc-500">Email:</span> {orderDetail.customer_email}</p>
                                <p><span className="text-zinc-500">Telp:</span> {orderDetail.customer_phone}</p>
                                <p><span className="text-zinc-500">Alamat:</span> {orderDetail.shipping_address}</p>
                            </div>

                            {/* Payment Info */}
                            <div className="bg-sky-50 p-3 rounded-xl border border-sky-200 space-y-1">
                                <p className="font-bold text-zinc-900">Metode & Waktu Bayar</p>
                                <p className="text-zinc-700 font-semibold">{orderDetail.payment_type || "QRIS / E-Wallet"}</p>
                                <p className="text-[11px] text-zinc-500">{formatDate(orderDetail.paid_at || orderDetail.created_at)}</p>
                            </div>

                            {/* Products List Cards */}
                            <div className="space-y-2">
                                <h3 className="font-bold text-zinc-900 uppercase text-xs">
                                    Daftar Barang ({orderDetail.items.length})
                                </h3>

                                {orderDetail.items.map((item, idx) => (
                                    <div
                                        key={item.id || idx}
                                        className="p-3 bg-white border border-zinc-200 rounded-xl flex items-center gap-3"
                                    >
                                        <img
                                            src={
                                                item.image ||
                                                item.image_url ||
                                                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80"
                                            }
                                            alt={item.title}
                                            className="w-14 h-14 rounded-lg object-contain bg-zinc-50 p-1 border border-zinc-100 shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-zinc-900 line-clamp-2 leading-snug">
                                                {item.title}
                                            </p>
                                            <div className="flex items-center justify-between mt-1 text-[11px]">
                                                <span className="text-zinc-500">{item.quantity} x {formatRupiah(item.price)}</span>
                                                <span className="font-bold text-[#1B6392]">
                                                    {formatRupiah(item.price * item.quantity)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Total Calculation */}
                            <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200 space-y-1.5 font-semibold">
                                <div className="flex justify-between text-zinc-600">
                                    <span>Subtotal Produk</span>
                                    <span>{formatRupiah(orderDetail.total_amount)}</span>
                                </div>
                                <div className="flex justify-between text-zinc-600">
                                    <span>Ongkos Kirim</span>
                                    <span className="text-emerald-600 font-bold">GRATIS</span>
                                </div>
                                <div className="border-t pt-1.5 flex justify-between text-sm font-extrabold text-zinc-900">
                                    <span>Total Tagihan</span>
                                    <span className="text-[#1B6392]">{formatRupiah(orderDetail.total_amount)}</span>
                                </div>
                            </div>
                        </>
                    ) : null}
                </div>

                {/* Mobile Bottom Action Bar */}
                <div className="bg-zinc-50 border-t border-zinc-200 p-3 flex items-center gap-2 shrink-0">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handlePrint}
                        className="px-3 text-xs border-zinc-300"
                    >
                        <Printer className="w-4 h-4" />
                    </Button>

                    <Button
                        type="button"
                        variant="default"
                        size="sm"
                        onClick={handleDownloadPDF}
                        disabled={isDownloadingPDF}
                        className="flex-1 text-xs bg-[#1B6392] hover:bg-[#134b70] text-white font-bold gap-2"
                    >
                        <Download className="w-4 h-4" />
                        <span>{isDownloadingPDF ? "Mengunduh..." : "Unduh Invoice PDF"}</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailMobileDrawer;
