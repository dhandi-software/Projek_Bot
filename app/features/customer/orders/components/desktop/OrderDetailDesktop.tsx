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
    ShieldCheck,
} from "lucide-react";
import { NavigationSideBar } from "~/components/ui/NavigationSideBar";
import { Button } from "~/components/ui/button";
import { useOrderDetail } from "~/hooks/useOrderDetail";

interface OrderDetailDesktopProps {
    orderId: string;
}

export function OrderDetailDesktop({ orderId }: OrderDetailDesktopProps) {
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
    } = useOrderDetail(orderId);

    const handleCopyVA = (vaNum: string) => {
        navigator.clipboard.writeText(vaNum);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const statusUpper = (orderDetail?.status || "").toUpperCase();
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
        <div className="w-full bg-zinc-50/50 pb-20 pt-8 px-4 md:px-8 font-sans min-h-screen">
            <div className="w-full max-w-7xl mx-auto flex gap-8 items-start">
                {/* Sidebar Navigation */}
                <div className="w-64 shrink-0 hidden md:block">
                    <NavigationSideBar activeId="order-history" onLogout={() => navigate("/login")} />
                </div>

                {/* Main Page Area */}
                <div className="flex-1 min-w-0 bg-white border border-zinc-200/90 rounded-3xl p-6 md:p-10 shadow-xs space-y-8">
                    {/* Header Bar */}
                    <div className="flex items-center justify-between border-b border-zinc-200 pb-5">
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => navigate("/customer/orders")}
                                className="p-2.5 rounded-xl text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer border border-zinc-200 shadow-2xs"
                                title="Kembali ke Daftar Pesanan"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-xl md:text-2xl font-extrabold text-zinc-900 uppercase tracking-wide">
                                    ORDER DETAILS
                                </h1>
                                <p className="text-xs md:text-sm text-zinc-500 mt-0.5">
                                    Rincian lengkap dan status progres pengiriman pesanan Anda
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="text-xs font-bold text-[#2DA5F3] hover:bg-sky-100/80 flex items-center gap-1.5 px-4 py-2.5 bg-sky-50 rounded-xl border border-sky-200 cursor-pointer transition-colors"
                            >
                                <span>Leave a Rating</span>
                                <Star className="w-4 h-4 fill-[#2DA5F3] text-[#2DA5F3]" />
                            </button>

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handlePrint}
                                className="gap-2 text-xs font-semibold border-zinc-300 text-zinc-700 hover:bg-zinc-100 rounded-xl px-4 py-2.5"
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
                                className="gap-2 text-xs font-bold bg-[#1B6392] hover:bg-[#134b70] text-white rounded-xl px-4 py-2.5"
                            >
                                <Download className="w-4 h-4" />
                                <span>{isDownloadingPDF ? "Mengunduh..." : "Unduh Invoice PDF"}</span>
                            </Button>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="py-28 text-center text-zinc-500 flex flex-col items-center justify-center gap-3">
                            <div className="w-10 h-10 border-3 border-[#2DA5F3] border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm font-medium">Memuat data rincian pesanan...</span>
                        </div>
                    ) : error ? (
                        <div className="py-12 text-center text-xs md:text-sm text-rose-600 bg-rose-50 rounded-2xl p-6 border border-rose-200">
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

                            {/* Order Expected Arrival Banner */}
                            <div className="pt-2">
                                <p className="text-sm md:text-base text-[#5F6C72]">
                                    Order expected arrival <span className="font-bold text-[#191C1F]">{orderDetail.expected_arrival}</span>
                                </p>
                            </div>

                            {/* Stepper Progress Bar Container (Figma Node 21:7315 4-Column Grid) */}
                            <div className="w-full block bg-white rounded-2xl border border-zinc-200/90 p-8 my-6 shadow-2xs font-sans" style={{ width: "100%", display: "block" }}>
                                <div className="w-full grid grid-cols-4 gap-0 text-center" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", width: "100%" }}>
                                    
                                    {/* Step 1: Order Placed */}
                                    <div className="flex flex-col items-center w-full px-2 relative">
                                        {/* Line to next node */}
                                        <div className="absolute top-3 left-1/2 right-0 h-1 bg-[#FFE7D6] z-0">
                                            <div className={`h-full bg-[#FA8232] transition-all duration-300 ${currentStep >= 2 ? "w-full" : "w-0"}`} />
                                        </div>
                                        {/* Dot 1 */}
                                        <div className={`relative z-10 w-6.5 h-6.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                                            currentStep >= 1 ? "bg-[#FA8232] text-white shadow-xs" : "bg-white border-2 border-[#FA8232]"
                                        }`}>
                                            {currentStep >= 1 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                        </div>
                                        {/* Icon & Label */}
                                        <div className="mt-6 flex flex-col items-center justify-center space-y-2">
                                            <div className={`p-1 ${currentStep >= 1 ? "text-[#2DB224]" : "text-[#929FA5]"}`}>
                                                <NotebookPen className="w-9 h-9" />
                                            </div>
                                            <span className={`text-sm md:text-base tracking-tight ${currentStep >= 1 ? "font-bold text-[#191C1F]" : "font-semibold text-[#929FA5]"}`}>
                                                Order Placed
                                            </span>
                                        </div>
                                    </div>

                                    {/* Step 2: Packaging */}
                                    <div className="flex flex-col items-center w-full px-2 relative">
                                        {/* Line from prev node & to next node */}
                                        <div className="absolute top-3 left-0 right-0 h-1 bg-[#FFE7D6] z-0">
                                            <div className={`h-full bg-[#FA8232] transition-all duration-300 ${currentStep >= 2 ? (currentStep >= 3 ? "w-full" : "w-1/2") : "w-0"}`} />
                                        </div>
                                        {/* Dot 2 */}
                                        <div className={`relative z-10 w-6.5 h-6.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                                            currentStep >= 2 ? "bg-[#FA8232] text-white shadow-xs" : "bg-white border-2 border-[#FA8232]"
                                        }`}>
                                            {currentStep >= 2 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                        </div>
                                        {/* Icon & Label */}
                                        <div className="mt-6 flex flex-col items-center justify-center space-y-2">
                                            <div className={`p-1 ${currentStep >= 2 ? "text-[#FA8232]" : "text-[#FA8232]"}`}>
                                                <Package className="w-9 h-9" />
                                            </div>
                                            <span className={`text-sm md:text-base tracking-tight ${currentStep >= 2 ? "font-bold text-[#191C1F]" : "font-bold text-[#191C1F]"}`}>
                                                Packaging
                                            </span>
                                        </div>
                                    </div>

                                    {/* Step 3: On The Road */}
                                    <div className="flex flex-col items-center w-full px-2 relative">
                                        {/* Line from prev node & to next node */}
                                        <div className="absolute top-3 left-0 right-0 h-1 bg-[#FFE7D6] z-0">
                                            <div className={`h-full bg-[#FA8232] transition-all duration-300 ${currentStep >= 3 ? (currentStep >= 4 ? "w-full" : "w-1/2") : "w-0"}`} />
                                        </div>
                                        {/* Dot 3 */}
                                        <div className={`relative z-10 w-6.5 h-6.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                                            currentStep >= 3 ? "bg-[#FA8232] text-white shadow-xs" : "bg-white border-2 border-[#FA8232]"
                                        }`}>
                                            {currentStep >= 3 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                        </div>
                                        {/* Icon & Label */}
                                        <div className="mt-6 flex flex-col items-center justify-center space-y-2">
                                            <div className={`p-1 ${currentStep >= 3 ? "text-[#FA8232]" : "text-[#FA8232]/40"}`}>
                                                <Truck className="w-9 h-9" />
                                            </div>
                                            <span className={`text-sm md:text-base tracking-tight ${currentStep >= 3 ? "font-bold text-[#191C1F]" : "font-medium text-[#929FA5]"}`}>
                                                On The Road
                                            </span>
                                        </div>
                                    </div>

                                    {/* Step 4: Delivered */}
                                    <div className="flex flex-col items-center w-full px-2 relative">
                                        {/* Line from prev node */}
                                        <div className="absolute top-3 left-0 right-1/2 h-1 bg-[#FFE7D6] z-0">
                                            <div className={`h-full bg-[#FA8232] transition-all duration-300 ${currentStep >= 4 ? "w-full" : "w-0"}`} />
                                        </div>
                                        {/* Dot 4 */}
                                        <div className={`relative z-10 w-6.5 h-6.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                                            currentStep >= 4 ? "bg-[#FA8232] text-white shadow-xs" : "bg-white border-2 border-[#FA8232]"
                                        }`}>
                                            {currentStep >= 4 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                        </div>
                                        {/* Icon & Label */}
                                        <div className="mt-6 flex flex-col items-center justify-center space-y-2">
                                            <div className={`p-1 ${currentStep >= 4 ? "text-[#FA8232]" : "text-[#FA8232]/40"}`}>
                                                <Handshake className="w-9 h-9" />
                                            </div>
                                            <span className={`text-sm md:text-base tracking-tight ${currentStep >= 4 ? "font-bold text-[#191C1F]" : "font-medium text-[#929FA5]"}`}>
                                                Delivered
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Payment Box if unpaid */}
                            {!isPaid && !isCanceled && (
                                <div className="bg-sky-50 border border-sky-200/90 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-sky-100 text-[#2DA5F3] flex items-center justify-center shrink-0 border border-sky-200">
                                            <CreditCard className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-zinc-900">Metode Pembayaran: {orderDetail.payment_type}</p>
                                            <p className="text-xs text-zinc-600 mt-0.5">Silakan lakukan pembayaran agar pesanan Anda dapat diproses ke tahap Packaging.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 shrink-0">
                                        {orderDetail.va_number && (
                                            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-sky-200 shadow-2xs">
                                                <span className="text-xs font-mono font-extrabold text-zinc-900">VA: {orderDetail.va_number}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleCopyVA(orderDetail.va_number!)}
                                                    className="text-[11px] bg-[#2DA5F3] text-white font-bold px-2.5 py-1 rounded-lg hover:bg-[#1B6392] transition-colors cursor-pointer"
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
                                            className="bg-[#2DA5F3] hover:bg-[#1B6392] text-white text-xs font-bold px-6 py-3 rounded-xl shadow-xs cursor-pointer"
                                        >
                                            Bayar Sekarang
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Order Activity Section */}
                            <div className="space-y-4 pt-2">
                                <h2 className="text-lg md:text-xl font-extrabold text-zinc-900 tracking-tight">
                                    Order Activity
                                </h2>

                                <div className="space-y-3">
                                    {orderDetail.activities.map((act) => (
                                        <div
                                            key={act.id}
                                            className="flex items-start gap-4 p-4 md:p-5 bg-zinc-50/70 rounded-2xl border border-zinc-200/80 hover:bg-zinc-50 transition-colors"
                                        >
                                            {getActivityIcon(act.type)}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm md:text-base font-semibold text-zinc-900 leading-snug">
                                                    {act.title}
                                                </p>
                                                <p className="text-xs text-zinc-500 mt-1 font-medium">
                                                    {act.date}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Product List Section */}
                            <div className="space-y-4 pt-2">
                                <h2 className="text-lg md:text-xl font-extrabold text-zinc-900 tracking-tight">
                                    Product ({String(orderDetail.items.length).padStart(2, "0")})
                                </h2>

                                <div className="border border-zinc-200/90 rounded-2xl overflow-hidden shadow-2xs">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-[#F2F4F5] border-b border-zinc-200 text-xs font-bold text-[#475156] uppercase tracking-wider">
                                                <th className="py-4 px-6">PRODUCTS</th>
                                                <th className="py-4 px-6 text-right w-40">PRICE</th>
                                                <th className="py-4 px-6 text-center w-32">QUANTITY</th>
                                                <th className="py-4 px-6 text-right w-48">SUB-TOTAL</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-200 text-sm">
                                            {orderDetail.items.map((item, idx) => (
                                                <tr key={item.id || idx} className="hover:bg-zinc-50/80 transition-colors">
                                                    <td className="py-5 px-6">
                                                        <div className="flex items-center gap-4">
                                                            <img
                                                                src={item.image || item.image_url}
                                                                alt={item.title}
                                                                className="w-16 h-16 rounded-xl object-contain bg-zinc-50 p-1.5 border border-zinc-200 shrink-0"
                                                            />
                                                            <div>
                                                                <span className="text-[#2DA5F3] font-extrabold text-[11px] uppercase tracking-wider block">
                                                                    {item.category || "GENERAL"}
                                                                </span>
                                                                <span className="font-semibold text-zinc-900 line-clamp-2 mt-0.5 leading-snug">
                                                                    {item.title}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-5 px-6 text-right text-zinc-700 font-medium">
                                                        {formatRupiah(item.price)}
                                                    </td>
                                                    <td className="py-5 px-6 text-center text-zinc-600 font-extrabold">
                                                        x{item.quantity}
                                                    </td>
                                                    <td className="py-5 px-6 text-right font-extrabold text-zinc-900">
                                                        {formatRupiah(item.price * item.quantity)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Bottom 3-Column Layout: Billing Address, Shipping Address, Order Notes */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-zinc-200">
                                {/* Billing Address */}
                                <div className="space-y-2.5 p-6 bg-zinc-50/80 rounded-2xl border border-zinc-200/80 text-xs md:text-sm">
                                    <h3 className="font-bold text-zinc-900 text-base border-b border-zinc-200/80 pb-3">
                                        Billing Address
                                    </h3>
                                    <p className="font-bold text-zinc-900 pt-1 text-sm">{orderDetail.customer_name}</p>
                                    <p className="text-zinc-600 leading-relaxed">{orderDetail.billing_address || orderDetail.shipping_address}</p>
                                    <p className="text-zinc-700 pt-1">
                                        <span className="font-semibold text-zinc-900">Phone Number:</span> {orderDetail.customer_phone}
                                    </p>
                                    <p className="text-zinc-700">
                                        <span className="font-semibold text-zinc-900">Email:</span> {orderDetail.customer_email}
                                    </p>
                                </div>

                                {/* Shipping Address */}
                                <div className="space-y-2.5 p-6 bg-zinc-50/80 rounded-2xl border border-zinc-200/80 text-xs md:text-sm">
                                    <h3 className="font-bold text-zinc-900 text-base border-b border-zinc-200/80 pb-3">
                                        Shipping Address
                                    </h3>
                                    <p className="font-bold text-zinc-900 pt-1 text-sm">{orderDetail.customer_name}</p>
                                    <p className="text-zinc-600 leading-relaxed">{orderDetail.shipping_address}</p>
                                    <p className="text-zinc-700 pt-1">
                                        <span className="font-semibold text-zinc-900">Phone Number:</span> {orderDetail.customer_phone}
                                    </p>
                                    <p className="text-zinc-700">
                                        <span className="font-semibold text-zinc-900">Email:</span> {orderDetail.customer_email}
                                    </p>
                                </div>

                                {/* Order Notes */}
                                <div className="space-y-2.5 p-6 bg-zinc-50/80 rounded-2xl border border-zinc-200/80 text-xs md:text-sm">
                                    <h3 className="font-bold text-zinc-900 text-base border-b border-zinc-200/80 pb-3">
                                        Order Notes
                                    </h3>
                                    <p className="text-zinc-600 leading-relaxed pt-1">
                                        {orderDetail.order_notes || "Tidak ada catatan khusus dari pembeli untuk pesanan ini."}
                                    </p>
                                </div>
                            </div>

                            {/* Footer Help Banner */}
                            <div className="pt-4 border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-500 font-medium">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                    <span>Membutuhkan bantuan terkait transaksi ini?</span>
                                </div>
                                <a href="/customer-support" className="text-[#2DA5F3] font-bold hover:underline">
                                    Contact Customer Support
                                </a>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default OrderDetailDesktop;
