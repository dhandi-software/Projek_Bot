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

export function OrderDetailMobileDrawer({ orderId, isOpen, onClose }: OrderDetailModalProps) {
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
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                        <Check className="w-4 h-4" />
                    </div>
                );
            case "shipping":
                return (
                    <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 border border-sky-200">
                        <User className="w-4 h-4" />
                    </div>
                );
            case "packaging":
                return (
                    <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 border border-orange-200">
                        <Package className="w-4 h-4" />
                    </div>
                );
            case "verified":
                return (
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                        <CheckCircle className="w-4 h-4" />
                    </div>
                );
            case "placed":
            default:
                return (
                    <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 border border-sky-200">
                        <Calendar className="w-4 h-4" />
                    </div>
                );
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center p-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer font-sans"
            onClick={onClose}
        >
            <div
                className="bg-white w-full max-h-[94vh] rounded-t-2xl shadow-2xl border border-zinc-200 flex flex-col overflow-hidden cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Mobile Drawer Header */}
                <div className="bg-white border-b border-zinc-200 px-4 py-3 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-1 rounded-lg text-zinc-600 hover:bg-zinc-100"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h2 className="text-sm font-bold text-zinc-900 uppercase">
                            ORDER DETAILS
                        </h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="text-[11px] font-bold text-[#2DA5F3] flex items-center gap-0.5"
                        >
                            <span>Rating</span>
                            <Star className="w-3 h-3 fill-[#2DA5F3] text-[#2DA5F3]" />
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-zinc-400 p-1 rounded-lg hover:bg-zinc-100"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
                    {isLoading ? (
                        <div className="py-16 text-center text-zinc-500 flex flex-col items-center justify-center gap-2">
                            <div className="w-6 h-6 border-2 border-[#2DA5F3] border-t-transparent rounded-full animate-spin" />
                            <span>Memuat rincian pesanan...</span>
                        </div>
                    ) : error ? (
                        <div className="py-8 text-center text-rose-600 bg-rose-50 rounded-xl p-3 border border-rose-200">
                            {error}
                        </div>
                    ) : orderDetail ? (
                        <>
                            {/* Figma Node 21:7315 Top Yellow Highlight Card */}
                            <div className="bg-[#FFF9E6] border border-[#FDE3B4] rounded-xl p-4 space-y-2 shadow-2xs">
                                <div className="flex justify-between items-start gap-2">
                                    <div>
                                        <h3 className="text-base font-bold text-[#191C1F]">
                                            {orderDetail.order_id}
                                        </h3>
                                        <p className="text-[11px] text-[#5F6C72] mt-0.5">
                                            {orderDetail.items.length} Products · {formatDate(orderDetail.created_at)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-lg font-extrabold text-[#2DA5F3] block">
                                            {formatRupiah(orderDetail.total_amount)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Expected Arrival */}
                            <p className="text-xs text-[#5F6C72]">
                                Order expected arrival <span className="font-bold text-[#191C1F]">{orderDetail.expected_arrival}</span>
                            </p>

                            {/* Stepper Timeline (Figma Node 21:7315 Design) */}
                            <div className="py-4 px-3 bg-white rounded-xl border border-zinc-200/90 shadow-2xs space-y-4">
                                <div className="relative w-full px-2">
                                    <div className="relative w-full h-2 bg-[#FFE7D6] rounded-full">
                                        <div
                                            className="h-full bg-[#FA8232] rounded-full transition-all duration-300"
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
                                            className={`absolute top-1/2 -translate-y-1/2 left-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                                                currentStep >= 1
                                                    ? "bg-[#FA8232] text-white shadow-xs"
                                                    : "bg-white border-2 border-[#FA8232]"
                                            }`}
                                        >
                                            {currentStep >= 1 && <Check className="w-3 h-3 stroke-[3]" />}
                                        </div>

                                        {/* Dot 2 */}
                                        <div
                                            className={`absolute top-1/2 -translate-y-1/2 left-[33.33%] -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                                                currentStep >= 2
                                                    ? "bg-[#FA8232] text-white shadow-xs"
                                                    : "bg-white border-2 border-[#FA8232]"
                                            }`}
                                        >
                                            {currentStep >= 2 && <Check className="w-3 h-3 stroke-[3]" />}
                                        </div>

                                        {/* Dot 3 */}
                                        <div
                                            className={`absolute top-1/2 -translate-y-1/2 left-[66.66%] -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                                                currentStep >= 3
                                                    ? "bg-[#FA8232] text-white shadow-xs"
                                                    : "bg-white border-2 border-[#FA8232]"
                                            }`}
                                        >
                                            {currentStep >= 3 && <Check className="w-3 h-3 stroke-[3]" />}
                                        </div>

                                        {/* Dot 4 */}
                                        <div
                                            className={`absolute top-1/2 -translate-y-1/2 right-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                                                currentStep >= 4
                                                    ? "bg-[#FA8232] text-white shadow-xs"
                                                    : "bg-white border-2 border-[#FA8232]"
                                            }`}
                                        >
                                            {currentStep >= 4 && <Check className="w-3 h-3 stroke-[3]" />}
                                        </div>
                                    </div>
                                </div>

                                <div className="relative w-full flex items-start justify-between px-1 text-[11px]">
                                    <div className="flex flex-col items-start text-left space-y-1 w-20">
                                        <div className={`p-0.5 ${currentStep >= 1 ? "text-[#2DB224]" : "text-[#929FA5]"}`}>
                                            <NotebookPen className="w-6 h-6" />
                                        </div>
                                        <span className={`font-bold ${currentStep >= 1 ? "text-[#191C1F]" : "text-[#929FA5]"}`}>
                                            Order Placed
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-center text-center space-y-1 w-20">
                                        <div className={`p-0.5 ${currentStep >= 2 ? "text-[#FA8232]" : "text-[#FA8232]"}`}>
                                            <Package className="w-6 h-6" />
                                        </div>
                                        <span className="font-bold text-[#191C1F]">
                                            Packaging
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-center text-center space-y-1 w-20">
                                        <div className={`p-0.5 ${currentStep >= 3 ? "text-[#FA8232]" : "text-[#FA8232]/50"}`}>
                                            <Truck className="w-6 h-6" />
                                        </div>
                                        <span className={`font-bold ${currentStep >= 3 ? "text-[#191C1F]" : "text-[#929FA5]"}`}>
                                            On The Road
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-end text-right space-y-1 w-20">
                                        <div className={`p-0.5 ${currentStep >= 4 ? "text-[#FA8232]" : "text-[#FA8232]/50"}`}>
                                            <Handshake className="w-6 h-6" />
                                        </div>
                                        <span className={`font-bold ${currentStep >= 4 ? "text-[#191C1F]" : "text-[#929FA5]"}`}>
                                            Delivered
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Drawer Payment Box if unpaid */}
                            {!isPaid && !isCanceled && (
                                <div className="bg-sky-50/90 border border-sky-200/90 rounded-2xl p-4 space-y-3 shadow-2xs">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#2DA5F3] flex items-center justify-center shrink-0 border border-sky-200 mt-0.5">
                                            <CreditCard className="w-5 h-5" />
                                        </div>
                                        <div className="space-y-1 min-w-0 flex-1">
                                            <p className="text-xs font-bold text-zinc-900 leading-snug">
                                                Metode Pembayaran: <span className="text-[#2DA5F3] font-extrabold block sm:inline">{bankInfo.fullLabel}</span>
                                            </p>
                                            <p className="text-[11px] text-zinc-600 leading-snug">
                                                Transfer ke <span className="font-bold text-zinc-800">{bankInfo.bankName}</span> sebelum 24 jam.
                                            </p>
                                        </div>
                                    </div>

                                    {/* 24h Countdown Timer Pill */}
                                    <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl text-[11px] font-semibold text-amber-900 w-full justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse shrink-0" />
                                            <span>Batas Waktu (24 Jam):</span>
                                        </div>
                                        <span className="font-mono text-[11px] font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300 shrink-0">
                                            {countdown.formattedTime}
                                        </span>
                                    </div>

                                    {orderDetail.va_number && (
                                        <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-sky-200 shadow-2xs">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-bold text-sky-600 uppercase">{bankInfo.bankName}</span>
                                                <span className="text-xs font-mono font-extrabold text-zinc-900">VA: {orderDetail.va_number}</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleCopyVA(orderDetail.va_number!)}
                                                className="text-[10px] bg-[#2DA5F3] text-white font-bold px-2.5 py-1 rounded-lg hover:bg-[#1B6392] transition-colors cursor-pointer"
                                            >
                                                {isCopied ? "Tersalin!" : "Salin"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Mobile Drawer Expired Notice */}
                            {isCanceled && (
                                <div className="bg-rose-50 border border-rose-200/90 rounded-2xl p-3.5 flex items-center gap-3 text-rose-800 shadow-2xs">
                                    <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <div className="text-[11px]">
                                        <p className="font-bold text-rose-900">Pesanan Dibatalkan / Kedaluwarsa</p>
                                        <p className="text-rose-700 mt-0.5">
                                            Batas waktu 24 jam telah habis atau pesanan dibatalkan.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Order Activity Section */}
                            <div className="space-y-3">
                                <h3 className="font-bold text-zinc-900 uppercase text-xs">
                                    Order Activity
                                </h3>
                                <div className="space-y-2">
                                    {orderDetail.activities.map((act) => (
                                        <div key={act.id} className="flex items-start gap-3 p-2.5 bg-zinc-50 rounded-lg border border-zinc-100">
                                            {getActivityIcon(act.type)}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-zinc-900 text-xs leading-snug">
                                                    {act.title}
                                                </p>
                                                <p className="text-[10px] text-zinc-500 mt-0.5">
                                                    {act.date}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Product Items List */}
                            <div className="space-y-3">
                                <h3 className="font-bold text-zinc-900 uppercase text-xs">
                                    Products ({orderDetail.items.length})
                                </h3>
                                <div className="space-y-2">
                                    {orderDetail.items.map((item, idx) => (
                                        <div
                                            key={item.id || idx}
                                            className="p-3 bg-white border border-zinc-200 rounded-xl flex items-center gap-3 shadow-2xs"
                                        >
                                            <img
                                                src={item.image || item.image_url}
                                                alt={item.title}
                                                className="w-12 h-12 rounded-lg object-contain bg-zinc-50 p-1 border border-zinc-100 shrink-0"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <span className="text-[#2DA5F3] font-bold text-[10px] uppercase block">
                                                    {item.category || "GENERAL"}
                                                </span>
                                                <p className="font-semibold text-zinc-900 line-clamp-1 leading-snug">
                                                    {item.title}
                                                </p>
                                                <div className="flex items-center justify-between mt-1 text-[11px]">
                                                    <span className="text-zinc-500">x{item.quantity} · {formatRupiah(item.price)}</span>
                                                    <span className="font-bold text-[#2DA5F3]">
                                                        {formatRupiah(item.price * item.quantity)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Address Cards */}
                            <div className="space-y-3">
                                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1">
                                    <h4 className="font-bold text-zinc-900 text-xs">Billing Address</h4>
                                    <p className="font-semibold text-zinc-800">{orderDetail.customer_name}</p>
                                    <p className="text-zinc-600 text-[11px]">{orderDetail.billing_address || orderDetail.shipping_address}</p>
                                    <p className="text-zinc-600 text-[11px]"><span className="font-medium text-zinc-800">Telp:</span> {orderDetail.customer_phone}</p>
                                    <p className="text-zinc-600 text-[11px]"><span className="font-medium text-zinc-800">Email:</span> {orderDetail.customer_email}</p>
                                </div>

                                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1">
                                    <h4 className="font-bold text-zinc-900 text-xs">Shipping Address</h4>
                                    <p className="font-semibold text-zinc-800">{orderDetail.customer_name}</p>
                                    <p className="text-zinc-600 text-[11px]">{orderDetail.shipping_address}</p>
                                    <p className="text-zinc-600 text-[11px]"><span className="font-medium text-zinc-800">Telp:</span> {orderDetail.customer_phone}</p>
                                    <p className="text-zinc-600 text-[11px]"><span className="font-medium text-zinc-800">Email:</span> {orderDetail.customer_email}</p>
                                </div>

                                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1">
                                    <h4 className="font-bold text-zinc-900 text-xs">Order Notes</h4>
                                    <p className="text-zinc-600 text-[11px] leading-relaxed">
                                        {orderDetail.order_notes || "Tidak ada catatan khusus dari pembeli."}
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : null}
                </div>

                {/* Mobile Bottom Fixed Action Bar */}
                <div className="bg-zinc-50 border-t border-zinc-200 p-3 flex items-center gap-2 shrink-0">
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
                            className="bg-[#2DA5F3] hover:bg-[#1B6392] text-white text-xs font-bold px-3 py-1.5"
                        >
                            Bayar
                        </Button>
                    )}

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
                        <span>{isDownloadingPDF ? "Mengunduh..." : "Invoice PDF"}</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailMobileDrawer;
