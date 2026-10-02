import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
    ArrowLeft,
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

interface OrderDetailMobileProps {
    orderId: string;
}

export function OrderDetailMobile({ orderId }: OrderDetailMobileProps) {
    const navigate = useNavigate();
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
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                        <Check className="w-4.5 h-4.5" />
                    </div>
                );
            case "shipping":
                return (
                    <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 border border-sky-200">
                        <User className="w-4.5 h-4.5" />
                    </div>
                );
            case "packaging":
                return (
                    <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 border border-orange-200">
                        <Package className="w-4.5 h-4.5" />
                    </div>
                );
            case "verified":
                return (
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                        <CheckCircle className="w-4.5 h-4.5" />
                    </div>
                );
            case "placed":
            default:
                return (
                    <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 border border-sky-200">
                        <Calendar className="w-4.5 h-4.5" />
                    </div>
                );
        }
    };

    return (
        <div className="w-full bg-zinc-50/50 min-h-screen font-sans pb-28">
            {/* Mobile Header Bar */}
            <div className="sticky top-0 z-30 bg-white border-b border-zinc-200 px-4 py-3.5 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                    <button
                        type="button"
                        onClick={() => navigate("/customer/orders")}
                        className="p-1.5 rounded-xl text-zinc-600 hover:bg-zinc-100 cursor-pointer shrink-0 border border-zinc-200"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-sm font-extrabold text-zinc-900 uppercase truncate tracking-wide">
                        ORDER DETAILS
                    </h1>
                </div>

                <button
                    type="button"
                    className="text-[11px] font-bold text-[#2DA5F3] flex items-center gap-1 shrink-0 px-2.5 py-1.5 bg-sky-50 rounded-lg border border-sky-200"
                >
                    <span>Rating</span>
                    <Star className="w-3.5 h-3.5 fill-[#2DA5F3] text-[#2DA5F3]" />
                </button>
            </div>

            {/* Mobile Body Content */}
            <div className="p-4 space-y-5 text-xs">
                {isLoading ? (
                    <div className="py-24 text-center text-zinc-500 flex flex-col items-center justify-center gap-2">
                        <div className="w-8 h-8 border-2 border-[#2DA5F3] border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs font-medium">Memuat data rincian pesanan...</span>
                    </div>
                ) : error ? (
                    <div className="py-8 text-center text-rose-600 bg-rose-50 rounded-2xl p-4 border border-rose-200">
                        {error}
                    </div>
                ) : orderDetail ? (
                    <>
                        {/* Top Highlight Summary Card (Figma Node 21:7315 Design) */}
                        <div className="bg-[#FFF9E6] border border-[#FDE3B4] rounded-2xl p-4 space-y-2 shadow-2xs">
                            <div className="flex items-start justify-between gap-2">
                                <div className="space-y-1 min-w-0">
                                    <h2 className="text-base font-bold text-[#191C1F] font-sans truncate">
                                        {orderDetail.order_id}
                                    </h2>
                                    <p className="text-[11px] text-[#5F6C72]">
                                        {orderDetail.items.length} Products · {formatDate(orderDetail.created_at)}
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="text-lg font-extrabold text-[#2DA5F3]">
                                        {formatRupiah(orderDetail.total_amount)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Order Expected Arrival */}
                        <p className="text-xs text-[#5F6C72]">
                            Order expected arrival <span className="font-bold text-[#191C1F]">{orderDetail.expected_arrival}</span>
                        </p>

                        {/* Mobile Stepper Timeline (Figma Node 21:7315 4-Column Grid) */}
                        <div className="w-full block bg-white rounded-2xl border border-zinc-200/90 p-4 shadow-2xs font-sans" style={{ width: "100%", display: "block" }}>
                            <div className="w-full grid grid-cols-4 gap-0 text-center" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", width: "100%" }}>
                                
                                {/* Step 1: Order Placed */}
                                <div className="flex flex-col items-center w-full px-1 relative">
                                    <div className="absolute top-2.5 left-1/2 right-0 h-1 bg-[#FFE7D6] z-0">
                                        <div className={`h-full bg-[#FA8232] transition-all duration-300 ${currentStep >= 2 ? "w-full" : "w-0"}`} />
                                    </div>
                                    <div className={`relative z-10 w-5.5 h-5.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        currentStep >= 1 ? "bg-[#FA8232] text-white shadow-xs" : "bg-white border-2 border-[#FA8232]"
                                    }`}>
                                        {currentStep >= 1 && <Check className="w-3 h-3 stroke-[3]" />}
                                    </div>
                                    <div className="mt-4 flex flex-col items-center justify-center space-y-1">
                                        <div className={`p-0.5 ${currentStep >= 1 ? "text-[#2DB224]" : "text-[#929FA5]"}`}>
                                            <NotebookPen className="w-6 h-6" />
                                        </div>
                                        <span className={`text-[10px] tracking-tight ${currentStep >= 1 ? "font-bold text-[#191C1F]" : "font-semibold text-[#929FA5]"}`}>
                                            Order Placed
                                        </span>
                                    </div>
                                </div>

                                {/* Step 2: Packaging */}
                                <div className="flex flex-col items-center w-full px-1 relative">
                                    <div className="absolute top-2.5 left-0 right-0 h-1 bg-[#FFE7D6] z-0">
                                        <div className={`h-full bg-[#FA8232] transition-all duration-300 ${currentStep >= 2 ? (currentStep >= 3 ? "w-full" : "w-1/2") : "w-0"}`} />
                                    </div>
                                    <div className={`relative z-10 w-5.5 h-5.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        currentStep >= 2 ? "bg-[#FA8232] text-white shadow-xs" : "bg-white border-2 border-[#FA8232]"
                                    }`}>
                                        {currentStep >= 2 && <Check className="w-3 h-3 stroke-[3]" />}
                                    </div>
                                    <div className="mt-4 flex flex-col items-center justify-center space-y-1">
                                        <div className={`p-0.5 ${currentStep >= 2 ? "text-[#FA8232]" : "text-[#FA8232]"}`}>
                                            <Package className="w-6 h-6" />
                                        </div>
                                        <span className={`text-[10px] tracking-tight ${currentStep >= 2 ? "font-bold text-[#191C1F]" : "font-bold text-[#191C1F]"}`}>
                                            Packaging
                                        </span>
                                    </div>
                                </div>

                                {/* Step 3: On The Road */}
                                <div className="flex flex-col items-center w-full px-1 relative">
                                    <div className="absolute top-2.5 left-0 right-0 h-1 bg-[#FFE7D6] z-0">
                                        <div className={`h-full bg-[#FA8232] transition-all duration-300 ${currentStep >= 3 ? (currentStep >= 4 ? "w-full" : "w-1/2") : "w-0"}`} />
                                    </div>
                                    <div className={`relative z-10 w-5.5 h-5.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        currentStep >= 3 ? "bg-[#FA8232] text-white shadow-xs" : "bg-white border-2 border-[#FA8232]"
                                    }`}>
                                        {currentStep >= 3 && <Check className="w-3 h-3 stroke-[3]" />}
                                    </div>
                                    <div className="mt-4 flex flex-col items-center justify-center space-y-1">
                                        <div className={`p-0.5 ${currentStep >= 3 ? "text-[#FA8232]" : "text-[#FA8232]/40"}`}>
                                            <Truck className="w-6 h-6" />
                                        </div>
                                        <span className={`text-[10px] tracking-tight ${currentStep >= 3 ? "font-bold text-[#191C1F]" : "font-medium text-[#929FA5]"}`}>
                                            On The Road
                                        </span>
                                    </div>
                                </div>

                                {/* Step 4: Delivered */}
                                <div className="flex flex-col items-center w-full px-1 relative">
                                    <div className="absolute top-2.5 left-0 right-1/2 h-1 bg-[#FFE7D6] z-0">
                                        <div className={`h-full bg-[#FA8232] transition-all duration-300 ${currentStep >= 4 ? "w-full" : "w-0"}`} />
                                    </div>
                                    <div className={`relative z-10 w-5.5 h-5.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        currentStep >= 4 ? "bg-[#FA8232] text-white shadow-xs" : "bg-white border-2 border-[#FA8232]"
                                    }`}>
                                        {currentStep >= 4 && <Check className="w-3 h-3 stroke-[3]" />}
                                    </div>
                                    <div className="mt-4 flex flex-col items-center justify-center space-y-1">
                                        <div className={`p-0.5 ${currentStep >= 4 ? "text-[#FA8232]" : "text-[#FA8232]/40"}`}>
                                            <Handshake className="w-6 h-6" />
                                        </div>
                                        <span className={`text-[10px] tracking-tight ${currentStep >= 4 ? "font-bold text-[#191C1F]" : "font-medium text-[#929FA5]"}`}>
                                            Delivered
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Mobile Payment Box if unpaid */}
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

                        {/* Mobile Expired / Canceled Notice */}
                        {isCanceled && (
                            <div className="bg-rose-50 border border-rose-200/90 rounded-2xl p-3.5 flex items-center gap-3 text-rose-800 shadow-2xs">
                                <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <div className="text-[11px]">
                                    <p className="font-bold text-rose-900">Pesanan Dibatalkan / Kedaluwarsa</p>
                                    <p className="text-rose-700 mt-0.5">
                                        Waktu pembayaran 24 jam telah habis atau pesanan ini telah dibatalkan.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Order Activity Section */}
                        <div className="space-y-3">
                            <h3 className="font-extrabold text-zinc-900 uppercase text-xs tracking-wider">
                                Order Activity
                            </h3>
                            <div className="space-y-2.5">
                                {orderDetail.activities.map((act) => (
                                    <div key={act.id} className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-zinc-200/80 shadow-2xs">
                                        {getActivityIcon(act.type)}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-zinc-900 text-xs leading-snug">
                                                {act.title}
                                            </p>
                                            <p className="text-[10px] text-zinc-500 mt-1 font-medium">
                                                {act.date}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Items List */}
                        <div className="space-y-3">
                            <h3 className="font-extrabold text-zinc-900 uppercase text-xs tracking-wider">
                                Products ({orderDetail.items.length})
                            </h3>
                            <div className="space-y-3">
                                {orderDetail.items.map((item, idx) => (
                                    <div
                                        key={item.id || idx}
                                        className="p-3.5 bg-white border border-zinc-200/90 rounded-2xl flex items-center gap-3.5 shadow-2xs"
                                    >
                                        <img
                                            src={item.image || item.image_url}
                                            alt={item.title}
                                            className="w-14 h-14 rounded-xl object-contain bg-zinc-50 p-1 border border-zinc-100 shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <span className="text-[#2DA5F3] font-extrabold text-[10px] uppercase block">
                                                {item.category || "GENERAL"}
                                            </span>
                                            <p className="font-semibold text-zinc-900 line-clamp-1 leading-snug text-xs">
                                                {item.title}
                                            </p>
                                            <div className="flex items-center justify-between mt-1 text-[11px]">
                                                <span className="text-zinc-500">x{item.quantity} · {formatRupiah(item.price)}</span>
                                                <span className="font-extrabold text-[#2DA5F3]">
                                                    {formatRupiah(item.price * item.quantity)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Billing, Shipping & Notes Cards */}
                        <div className="space-y-3.5">
                            <div className="p-4 bg-white rounded-2xl border border-zinc-200/90 space-y-1.5 shadow-2xs">
                                <h4 className="font-bold text-zinc-900 text-xs border-b border-zinc-100 pb-1.5">Billing Address</h4>
                                <p className="font-semibold text-zinc-900 pt-0.5">{orderDetail.customer_name}</p>
                                <p className="text-zinc-600 text-[11px] leading-relaxed">{orderDetail.billing_address || orderDetail.shipping_address}</p>
                                <p className="text-zinc-600 text-[11px]"><span className="font-medium text-zinc-800">Telp:</span> {orderDetail.customer_phone}</p>
                                <p className="text-zinc-600 text-[11px]"><span className="font-medium text-zinc-800">Email:</span> {orderDetail.customer_email}</p>
                            </div>

                            <div className="p-4 bg-white rounded-2xl border border-zinc-200/90 space-y-1.5 shadow-2xs">
                                <h4 className="font-bold text-zinc-900 text-xs border-b border-zinc-100 pb-1.5">Shipping Address</h4>
                                <p className="font-semibold text-zinc-900 pt-0.5">{orderDetail.customer_name}</p>
                                <p className="text-zinc-600 text-[11px] leading-relaxed">{orderDetail.shipping_address}</p>
                                <p className="text-zinc-600 text-[11px]"><span className="font-medium text-zinc-800">Telp:</span> {orderDetail.customer_phone}</p>
                                <p className="text-zinc-600 text-[11px]"><span className="font-medium text-zinc-800">Email:</span> {orderDetail.customer_email}</p>
                            </div>

                            <div className="p-4 bg-white rounded-2xl border border-zinc-200/90 space-y-1.5 shadow-2xs">
                                <h4 className="font-bold text-zinc-900 text-xs border-b border-zinc-100 pb-1.5">Order Notes</h4>
                                <p className="text-zinc-600 text-[11px] leading-relaxed pt-0.5">
                                    {orderDetail.order_notes || "Tidak ada catatan khusus dari pembeli."}
                                </p>
                            </div>
                        </div>
                    </>
                ) : null}
            </div>

            {/* Mobile Fixed Bottom Actions Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-zinc-200 p-3.5 flex items-center gap-2.5 shadow-lg">
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
                        className="bg-[#2DA5F3] hover:bg-[#1B6392] text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
                    >
                        Bayar
                    </Button>
                )}

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handlePrint}
                    className="px-4 text-xs border-zinc-300 rounded-xl cursor-pointer"
                >
                    <Printer className="w-4 h-4" />
                </Button>

                <Button
                    type="button"
                    variant="default"
                    size="sm"
                    onClick={handleDownloadPDF}
                    disabled={isDownloadingPDF}
                    className="flex-1 text-xs bg-[#1B6392] hover:bg-[#134b70] text-white font-bold gap-2 rounded-xl cursor-pointer"
                >
                    <Download className="w-4 h-4" />
                    <span>{isDownloadingPDF ? "Mengunduh..." : "Invoice PDF"}</span>
                </Button>
            </div>
        </div>
    );
}

export default OrderDetailMobile;
