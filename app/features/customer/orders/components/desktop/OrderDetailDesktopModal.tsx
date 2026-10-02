import React, { useState } from "react";
import {
    ArrowLeft,
    X,
    Download,
    Printer,
    Check,
    Package,
    Truck,
    Handshake,
    NotebookPen,
    User,
    CheckCircle,
    Calendar,
    Star,
    CreditCard,
    Clock,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { useOrderDetail } from "~/hooks/useOrderDetail";
import type { OrderDetailModalProps } from "~/types/orderDetail.types";

export function OrderDetailDesktopModal({ orderId, isOpen, onClose }: OrderDetailModalProps) {
    const [isCopied, setIsCopied] = useState(false);
    const {
        orderDetail,
        isLoading,
        error,
        currentStep,
        formatRupiah,
        formatDate,
        handlePrint,
        handleDownloadPDF,
        isDownloadingPDF,
        bankInfo,
        countdown,
        effectiveStatus,
    } = useOrderDetail(orderId);

    const handleCopyVA = (vaNum: string) => {
        navigator.clipboard.writeText(vaNum);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    if (!isOpen || !orderId) return null;

    const statusUpper = (effectiveStatus || orderDetail?.status || "").toUpperCase();
    const isPaid =
        statusUpper === "PAID" ||
        statusUpper === "SETTLEMENT" ||
        statusUpper === "PACKAGING" ||
        statusUpper === "ON_THE_ROAD" ||
        statusUpper === "SHIPPED" ||
        statusUpper === "DELIVERED" ||
        statusUpper === "COMPLETED";
    const isCanceled =
        statusUpper === "CANCEL" ||
        statusUpper === "CANCELED" ||
        statusUpper === "EXPIRE" ||
        statusUpper === "EXPIRED" ||
        statusUpper === "FAILED";

    const getActivityIcon = (type: string) => {
        switch (type) {
            case "delivered":
                return (
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                        <Check className="w-5 h-5" />
                    </div>
                );
            case "shipping":
                return (
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 border border-sky-200">
                        <User className="w-5 h-5" />
                    </div>
                );
            case "packaging":
                return (
                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 border border-orange-200">
                        <Package className="w-5 h-5" />
                    </div>
                );
            case "verified":
                return (
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                        <CheckCircle className="w-5 h-5" />
                    </div>
                );
            case "placed":
            default:
                return (
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 border border-sky-200">
                        <Calendar className="w-5 h-5" />
                    </div>
                );
        }
    };

    return (
        <div
            className="fixed inset-0 top-0 left-0 w-screen h-screen z-[9999] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer font-sans"
            onClick={onClose}
        >
            <div
                className="bg-white w-[94vw] max-w-[1020px] max-h-[92vh] rounded-2xl shadow-2xl border border-zinc-200 flex flex-col overflow-hidden cursor-default shrink-0"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Bar */}
                <div className="bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h2 className="text-base font-bold text-zinc-900 uppercase tracking-wide">
                            ORDER DETAILS
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className="text-xs font-bold text-[#2DA5F3] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                            <span>Leave a Rating</span>
                            <Star className="w-3.5 h-3.5 fill-[#2DA5F3] text-[#2DA5F3]" />
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Main Body Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                    {isLoading ? (
                        <div className="py-20 text-center text-xs text-zinc-500 flex flex-col items-center justify-center gap-3">
                            <div className="w-8 h-8 border-3 border-[#2DA5F3] border-t-transparent rounded-full animate-spin" />
                            <span>Memuat rincian pesanan...</span>
                        </div>
                    ) : error ? (
                        <div className="py-12 text-center text-xs text-rose-600 bg-rose-50 rounded-xl p-4 border border-rose-200">
                            {error}
                        </div>
                    ) : orderDetail ? (
                        <>
                            {/* Top Highlight Banner Card (Figma Node 21:7315 Design) */}
                            <div className="bg-[#FFF9E6] border border-[#FDE3B4] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
                                <div className="space-y-1.5">
                                    <h2 className="text-2xl md:text-3xl font-bold text-[#191C1F] tracking-tight font-sans">
                                        {orderDetail.order_id}
                                    </h2>
                                    <p className="text-xs md:text-sm text-[#5F6C72] font-normal">
                                        {orderDetail.items.length} Products · Order Placed in {formatDate(orderDetail.created_at)}
                                    </p>
                                </div>

                                <div className="text-left md:text-right space-y-2">
                                    <div className="text-3xl md:text-4xl font-extrabold text-[#2DA5F3]">
                                        {formatRupiah(orderDetail.total_amount)}
                                    </div>
                                    <div>
                                        <span
                                            className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide uppercase shadow-2xs ${
                                                isPaid
                                                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                                    : isCanceled
                                                    ? "bg-rose-100 text-rose-800 border border-rose-300"
                                                    : "bg-amber-100 text-amber-800 border border-amber-300"
                                            }`}
                                        >
                                            {statusUpper === "PACKAGING"
                                                ? "DIPROSES (PACKAGING)"
                                                : statusUpper === "ON_THE_ROAD" || statusUpper === "SHIPPED"
                                                ? "DIKIRIM (ON THE ROAD)"
                                                : statusUpper === "DELIVERED" || statusUpper === "COMPLETED"
                                                ? "SELESAI (DELIVERED)"
                                                : isPaid
                                                ? "SUDAH DIBAYAR"
                                                : isCanceled
                                                ? "DIBATALKAN"
                                                : "MENUNGGU PEMBAYARAN"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Expected Arrival */}
                            <p className="text-sm md:text-base text-[#5F6C72]">
                                Order expected arrival <span className="font-bold text-[#191C1F]">{orderDetail.expected_arrival}</span>
                            </p>

                            {/* Stepper Progress Bar (Figma Node 21:7315 Stepper Design) */}
                            <div className="py-6 px-4 bg-white rounded-2xl border border-zinc-200/80 my-4 shadow-2xs">
                                <div className="relative w-full max-w-4xl mx-auto px-4 md:px-8 space-y-6">
                                    {/* Line Track + Dots */}
                                    <div className="relative w-full h-2.5 bg-[#FFE7D6] rounded-full">
                                        <div
                                            className="h-full bg-[#FA8232] rounded-full transition-all duration-500"
                                            style={{
                                                width: `${
                                                    currentStep <= 1
                                                        ? "0%"
                                                        : currentStep === 2
                                                        ? "33.33%"
                                                        : currentStep === 3
                                                        ? "66.66%"
                                                        : "100%"
                                                }`,
                                            }}
                                        />

                                        {/* Dot 1 */}
                                        <div
                                            className={`absolute top-1/2 -translate-y-1/2 left-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                                                currentStep >= 1
                                                    ? "bg-[#FA8232] text-white shadow-xs"
                                                    : "bg-white border-2 border-[#FA8232]"
                                            }`}
                                        >
                                            {currentStep >= 1 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                        </div>

                                        {/* Dot 2 */}
                                        <div
                                            className={`absolute top-1/2 -translate-y-1/2 left-[33.33%] -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                                                currentStep >= 2
                                                    ? "bg-[#FA8232] text-white shadow-xs"
                                                    : "bg-white border-2 border-[#FA8232]"
                                            }`}
                                        >
                                            {currentStep >= 2 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                        </div>

                                        {/* Dot 3 */}
                                        <div
                                            className={`absolute top-1/2 -translate-y-1/2 left-[66.66%] -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                                                currentStep >= 3
                                                    ? "bg-[#FA8232] text-white shadow-xs"
                                                    : "bg-white border-2 border-[#FA8232]"
                                            }`}
                                        >
                                            {currentStep >= 3 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                        </div>

                                        {/* Dot 4 */}
                                        <div
                                            className={`absolute top-1/2 -translate-y-1/2 right-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                                                currentStep >= 4
                                                    ? "bg-[#FA8232] text-white shadow-xs"
                                                    : "bg-white border-2 border-[#FA8232]"
                                            }`}
                                        >
                                            {currentStep >= 4 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                        </div>
                                    </div>

                                    {/* Icons & Labels Row Below the Bar */}
                                    <div className="relative w-full flex items-start justify-between">
                                        <div className="flex flex-col items-start text-left space-y-2 w-32 md:w-40">
                                            <div className={`p-1 ${currentStep >= 1 ? "text-[#2DB224]" : "text-[#929FA5]"}`}>
                                                <NotebookPen className="w-8 h-8" />
                                            </div>
                                            <span className={`text-xs md:text-sm ${currentStep >= 1 ? "font-bold text-[#191C1F]" : "font-semibold text-[#929FA5]"}`}>
                                                Order Placed
                                            </span>
                                        </div>

                                        <div className="flex flex-col items-center text-center space-y-2 w-32 md:w-40">
                                            <div className={`p-1 ${currentStep >= 2 ? "text-[#FA8232]" : "text-[#FA8232]"}`}>
                                                <Package className="w-8 h-8" />
                                            </div>
                                            <span className={`text-xs md:text-sm ${currentStep >= 2 ? "font-bold text-[#191C1F]" : "font-bold text-[#191C1F]"}`}>
                                                Packaging
                                            </span>
                                        </div>

                                        <div className="flex flex-col items-center text-center space-y-2 w-32 md:w-40">
                                            <div className={`p-1 ${currentStep >= 3 ? "text-[#FA8232]" : "text-[#FA8232]/50"}`}>
                                                <Truck className="w-8 h-8" />
                                            </div>
                                            <span className={`text-xs md:text-sm ${currentStep >= 3 ? "font-bold text-[#191C1F]" : "font-medium text-[#929FA5]"}`}>
                                                On The Road
                                            </span>
                                        </div>

                                        <div className="flex flex-col items-end text-right space-y-2 w-32 md:w-40">
                                            <div className={`p-1 ${currentStep >= 4 ? "text-[#FA8232]" : "text-[#FA8232]/50"}`}>
                                                <Handshake className="w-8 h-8" />
                                            </div>
                                            <span className={`text-xs md:text-sm ${currentStep >= 4 ? "font-bold text-[#191C1F]" : "font-medium text-[#929FA5]"}`}>
                                                Delivered
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Box if unpaid */}
                            {!isPaid && !isCanceled && (
                                <div className="bg-sky-50/80 border border-sky-200/90 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs my-4">
                                    <div className="flex items-start md:items-center gap-4">
                                        <div className="w-11 h-11 rounded-xl bg-sky-100 text-[#2DA5F3] flex items-center justify-center shrink-0 border border-sky-200 mt-0.5 md:mt-0">
                                            <CreditCard className="w-5 h-5" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs md:text-sm font-bold text-zinc-900">
                                                Metode Pembayaran: <span className="text-[#2DA5F3] font-extrabold">{bankInfo.fullLabel}</span>
                                            </p>
                                            <p className="text-[11px] md:text-xs text-zinc-600">
                                                Transfer ke <span className="font-bold text-zinc-800">{bankInfo.bankName}</span> sebelum batas 24 jam berakhir.
                                            </p>
                                            {/* 24h Countdown Timer Pill */}
                                            <div className="pt-1 flex items-center gap-2">
                                                <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl text-xs font-semibold text-amber-900">
                                                    <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse shrink-0" />
                                                    <span>Sisa Waktu (24 Jam):</span>
                                                    <span className="font-mono text-xs font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
                                                        {countdown.formattedTime}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                                        {orderDetail.va_number && (
                                            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-sky-200 shadow-2xs">
                                                <div className="flex flex-col text-left">
                                                    <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">{bankInfo.bankName}</span>
                                                    <span className="text-xs font-mono font-extrabold text-zinc-900">VA: {orderDetail.va_number}</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleCopyVA(orderDetail.va_number!)}
                                                    className="text-[11px] bg-[#2DA5F3] text-white font-bold px-2.5 py-1 rounded-lg hover:bg-[#1B6392] transition-colors cursor-pointer ml-1"
                                                >
                                                    {isCopied ? "Tersalin!" : "Salin"}
                                                </button>
                                            </div>
                                        )}

                                        <Button
                                            type="button"
                                            onClick={() => {
                                                if (orderDetail?.snap_token && (window as any).snap) {
                                                    (window as any).snap.pay(orderDetail.snap_token);
                                                } else {
                                                    window.location.href = "/checkout";
                                                }
                                            }}
                                            className="bg-[#2DA5F3] hover:bg-[#1B6392] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs cursor-pointer"
                                        >
                                            Bayar Sekarang
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Expired / Canceled Notice */}
                            {isCanceled && (
                                <div className="bg-rose-50 border border-rose-200/90 rounded-2xl p-4 flex items-center gap-3.5 text-rose-800 shadow-2xs my-4">
                                    <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
                                        <Clock className="w-4.5 h-4.5" />
                                    </div>
                                    <div>
                                        <p className="text-xs md:text-sm font-bold text-rose-900">Pesanan Dibatalkan / Kedaluwarsa</p>
                                        <p className="text-[11px] text-rose-700 mt-0.5">
                                            Batas waktu 24 jam telah habis atau pesanan ini telah dibatalkan.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Order Activity Section */}
                            <div className="space-y-4">
                                <h3 className="text-base md:text-lg font-bold text-zinc-900">
                                    Order Activity
                                </h3>

                                <div className="space-y-3">
                                    {orderDetail.activities.map((act) => (
                                        <div key={act.id} className="flex items-start gap-4 p-3.5 bg-zinc-50/60 rounded-xl border border-zinc-100 hover:bg-zinc-50 transition-colors">
                                            {getActivityIcon(act.type)}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs md:text-sm font-semibold text-zinc-900 leading-snug">
                                                    {act.title}
                                                </p>
                                                <p className="text-[11px] md:text-xs text-zinc-500 mt-1">
                                                    {act.date}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Product List Section */}
                            <div className="space-y-4">
                                <h3 className="text-base md:text-lg font-bold text-zinc-900">
                                    Product ({String(orderDetail.items.length).padStart(2, "0")})
                                </h3>

                                <div className="border border-zinc-200 rounded-xl overflow-hidden shadow-2xs">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-[#F2F4F5] border-b border-zinc-200 text-[11px] font-bold text-[#475156] uppercase tracking-wider">
                                                <th className="py-3 px-4">PRODUCTS</th>
                                                <th className="py-3 px-4 text-right w-28">PRICE</th>
                                                <th className="py-3 px-4 text-center w-24">QUANTITY</th>
                                                <th className="py-3 px-4 text-right w-32">SUB-TOTAL</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-200 text-xs md:text-sm">
                                            {orderDetail.items.map((item, idx) => (
                                                <tr key={item.id || idx} className="hover:bg-zinc-50/80 transition-colors">
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center gap-4">
                                                            <img
                                                                src={item.image || item.image_url}
                                                                alt={item.title}
                                                                className="w-14 h-14 rounded-lg object-contain bg-zinc-50 p-1 border border-zinc-200 shrink-0"
                                                            />
                                                            <div>
                                                                <span className="text-[#2DA5F3] font-bold text-[11px] uppercase tracking-wider block">
                                                                    {item.category || "GENERAL"}
                                                                </span>
                                                                <span className="font-semibold text-zinc-900 line-clamp-2 mt-0.5 leading-snug">
                                                                    {item.title}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 text-right text-zinc-700 font-medium">
                                                        {formatRupiah(item.price)}
                                                    </td>
                                                    <td className="py-4 px-4 text-center text-zinc-600 font-medium">
                                                        x{item.quantity}
                                                    </td>
                                                    <td className="py-4 px-4 text-right font-bold text-zinc-900">
                                                        {formatRupiah(item.price * item.quantity)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Bottom 3-Column Section */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-zinc-200 text-xs md:text-sm">
                                <div className="space-y-1.5 p-4 bg-zinc-50/80 rounded-xl border border-zinc-200/80">
                                    <h4 className="font-bold text-zinc-900 text-sm mb-2">Billing Address</h4>
                                    <p className="font-bold text-zinc-900">{orderDetail.customer_name}</p>
                                    <p className="text-zinc-600 leading-relaxed">{orderDetail.billing_address || orderDetail.shipping_address}</p>
                                    <p className="text-zinc-700 pt-1"><span className="font-semibold text-zinc-900">Phone Number:</span> {orderDetail.customer_phone}</p>
                                    <p className="text-zinc-700"><span className="font-semibold text-zinc-900">Email:</span> {orderDetail.customer_email}</p>
                                </div>

                                <div className="space-y-1.5 p-4 bg-zinc-50/80 rounded-xl border border-zinc-200/80">
                                    <h4 className="font-bold text-zinc-900 text-sm mb-2">Shipping Address</h4>
                                    <p className="font-bold text-zinc-900">{orderDetail.customer_name}</p>
                                    <p className="text-zinc-600 leading-relaxed">{orderDetail.shipping_address}</p>
                                    <p className="text-zinc-700 pt-1"><span className="font-semibold text-zinc-900">Phone Number:</span> {orderDetail.customer_phone}</p>
                                    <p className="text-zinc-700"><span className="font-semibold text-zinc-900">Email:</span> {orderDetail.customer_email}</p>
                                </div>

                                <div className="space-y-1.5 p-4 bg-zinc-50/80 rounded-xl border border-zinc-200/80">
                                    <h4 className="font-bold text-zinc-900 text-sm mb-2">Order Notes</h4>
                                    <p className="text-zinc-600 leading-relaxed">
                                        {orderDetail.order_notes || "Tidak ada catatan khusus dari pembeli untuk pesanan ini."}
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : null}
                </div>

                {/* Footer Actions */}
                <div className="bg-zinc-50 border-t border-zinc-200 px-6 py-4 flex items-center justify-between shrink-0">
                    <div className="text-xs text-zinc-500 font-medium">
                        Need help? <a href="/customer-support" className="text-[#2DA5F3] font-bold hover:underline">Contact Customer Support</a>
                    </div>

                    <div className="flex items-center gap-3">
                        {!isPaid && !isCanceled && (
                            <Button
                                type="button"
                                size="sm"
                                onClick={() => {
                                    if (orderDetail?.snap_token && (window as any).snap) {
                                        (window as any).snap.pay(orderDetail.snap_token);
                                    } else {
                                        window.location.href = "/checkout";
                                    }
                                }}
                                className="bg-[#2DA5F3] hover:bg-[#1B6392] text-white text-xs font-bold px-4 py-2"
                            >
                                Bayar Sekarang
                            </Button>
                        )}

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
