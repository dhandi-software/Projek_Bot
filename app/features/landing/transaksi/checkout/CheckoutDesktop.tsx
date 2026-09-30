import { useState, useEffect } from "react";
import { ArrowRight, Building2, QrCode, BookOpen, ShieldCheck, Printer } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useCheckout } from "~/hooks/useCheckout";
import { useMidtransPayment } from "~/hooks/useMidtransPayment";
import { BreadCheckoutDesktop } from "~/components/template/breadcrumb/BreadCheckoutDesktop";

import { BankTransferView } from "./components/payment/BankTransferView";
import { EWalletView } from "./components/payment/EWalletView";
import { PanduanPembayaranView } from "./components/payment/PanduanPembayaranView";

export function CheckoutDesktop() {
    const navigate = useNavigate();
    const { items, totals, billingInfo, updateBillingField, formatRupiah } = useCheckout();
    const {
        processPayment,
        checkPaymentStatus,
        paymentData,
        isLoading,
        errorMessage,
        isOnline,
        activeIdempotencyKey,
    } = useMidtransPayment();

    const [selectedTab, setSelectedTab] = useState<"wallet" | "bank" | "guide">("wallet");
    const [selectedBank, setSelectedBank] = useState<string>("bca");

    // Redirect to checkout success if status becomes paid, settlement, or completed
    useEffect(() => {
        const st = (paymentData?.status || "").toLowerCase();
        if (st === "paid" || st === "settlement" || st === "completed") {
            navigate("/checkout/success");
        }
    }, [paymentData?.status, navigate]);

    useEffect(() => {
        if (items.length > 0) {
            localStorage.removeItem("last_active_order_id");
        } else {
            const lastOrderId = localStorage.getItem("last_active_order_id");
            if (lastOrderId) {
                checkPaymentStatus(lastOrderId);
            }
        }
    }, [items.length]);

    const handleSubmitOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        await processPayment(
            items,
            billingInfo,
            () => {
                navigate("/checkout/success");
            },
            selectedTab === "guide" ? "wallet" : selectedTab,
            selectedBank
        );
    };

    const handlePrintReceipt = () => {
        window.print();
    };

    return (
        <div className="w-full bg-white min-h-screen">
            <BreadCheckoutDesktop />

            {/* Checkout Header Spacing */}

            <section className="w-full py-8">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <form onSubmit={handleSubmitOrder} className="grid grid-cols-12 gap-8 items-start">
                        {/* LEFT COLUMN: Billing Information Form & Payment (8 cols) */}
                        <div className="col-span-8 space-y-6">
                            {/* Billing & Shipping Form */}
                            <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-xs space-y-5">
                                <h1 className="text-lg font-bold text-[#191C1F] pb-3 border-b border-zinc-200 flex items-center justify-between">
                                    <span>Informasi Tagihan & Pengiriman</span>
                                    <span className="text-xs font-normal text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-full">Data Pembeli</span>
                                </h1>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold text-zinc-700">Nama Depan</Label>
                                        <Input
                                            required
                                            value={billingInfo.firstName}
                                            onChange={(e) => updateBillingField("firstName", e.target.value)}
                                            placeholder="Nama depan Anda"
                                            className="h-10 text-xs border-zinc-300"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold text-zinc-700">Nama Belakang</Label>
                                        <Input
                                            required
                                            value={billingInfo.lastName}
                                            onChange={(e) => updateBillingField("lastName", e.target.value)}
                                            placeholder="Nama belakang Anda"
                                            className="h-10 text-xs border-zinc-300"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold text-zinc-700">Alamat Lengkap</Label>
                                    <Input
                                        required
                                        value={billingInfo.address}
                                        onChange={(e) => updateBillingField("address", e.target.value)}
                                        placeholder="Jalan, No. Rumah, RT/RW, Kelurahan, Kecamatan"
                                        className="h-10 text-xs border-zinc-300"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold text-zinc-700">Email</Label>
                                        <Input
                                            type="email"
                                            required
                                            value={billingInfo.email}
                                            onChange={(e) => updateBillingField("email", e.target.value)}
                                            placeholder="Alamat email aktif"
                                            className="h-10 text-xs border-zinc-300"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold text-zinc-700">Nomor Telepon (WhatsApp)</Label>
                                        <Input
                                            type="tel"
                                            required
                                            value={billingInfo.phone}
                                            onChange={(e) => updateBillingField("phone", e.target.value)}
                                            placeholder="Nomor WhatsApp"
                                            className="h-10 text-xs border-zinc-300"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method Selection Header & Tab Cards */}
                            <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-xs space-y-6">
                                <div>
                                    <h2 className="text-lg font-bold text-[#191C1F]">
                                        Pilih Metode Pembayaran Mandiri
                                    </h2>
                                    <p className="text-xs text-zinc-500 mt-1">
                                        Silakan scan QRIS atau gunakan Virtual Account
                                    </p>
                                </div>

                                {/* 3 Tab Cards matching screenshot reference */}
                                <div className="grid grid-cols-3 gap-4">
                                    {/* Card 1: QRIS / E-Wallet */}
                                    <button
                                        type="button"
                                        onClick={() => setSelectedTab("wallet")}
                                        className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                                            selectedTab === "wallet"
                                                ? "border-[#2DA5F3] bg-sky-50/50 text-[#1B6392] ring-2 ring-[#2DA5F3]/30 shadow-xs"
                                                : "border-zinc-200 hover:border-zinc-300 text-zinc-700 bg-white"
                                        }`}
                                    >
                                        <div className={`p-2.5 rounded-lg shrink-0 ${selectedTab === "wallet" ? "bg-[#2DA5F3] text-white" : "bg-zinc-100 text-zinc-600"}`}>
                                            <QrCode className="w-5 h-5" />
                                        </div>
                                        <div className="space-y-0.5 min-w-0">
                                            <p className="text-xs font-bold text-zinc-900 truncate">QRIS / E-Wallet</p>
                                            <p className="text-[11px] text-zinc-500 truncate">GoPay, OVO, DANA, QRIS</p>
                                        </div>
                                    </button>

                                    {/* Card 2: Virtual Account */}
                                    <button
                                        type="button"
                                        onClick={() => setSelectedTab("bank")}
                                        className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                                            selectedTab === "bank"
                                                ? "border-[#2DA5F3] bg-sky-50/50 text-[#1B6392] ring-2 ring-[#2DA5F3]/30 shadow-xs"
                                                : "border-zinc-200 hover:border-zinc-300 text-zinc-700 bg-white"
                                        }`}
                                    >
                                        <div className={`p-2.5 rounded-lg shrink-0 ${selectedTab === "bank" ? "bg-[#2DA5F3] text-white" : "bg-zinc-100 text-zinc-600"}`}>
                                            <Building2 className="w-5 h-5" />
                                        </div>
                                        <div className="space-y-0.5 min-w-0">
                                            <p className="text-xs font-bold text-zinc-900 truncate">Virtual Account (VA)</p>
                                            <p className="text-[11px] text-zinc-500 truncate">BCA, BNI, Mandiri, BRI</p>
                                        </div>
                                    </button>

                                    {/* Card 3: Panduan Pembayaran */}
                                    <button
                                        type="button"
                                        onClick={() => setSelectedTab("guide")}
                                        className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                                            selectedTab === "guide"
                                                ? "border-[#2DA5F3] bg-sky-50/50 text-[#1B6392] ring-2 ring-[#2DA5F3]/30 shadow-xs"
                                                : "border-zinc-200 hover:border-zinc-300 text-zinc-700 bg-white"
                                        }`}
                                    >
                                        <div className={`p-2.5 rounded-lg shrink-0 ${selectedTab === "guide" ? "bg-[#2DA5F3] text-white" : "bg-zinc-100 text-zinc-600"}`}>
                                            <BookOpen className="w-5 h-5" />
                                        </div>
                                        <div className="space-y-0.5 min-w-0">
                                            <p className="text-xs font-bold text-zinc-900 truncate">Panduan Pembayaran</p>
                                            <p className="text-[11px] text-zinc-500 truncate">Langkah-langkah lengkap</p>
                                        </div>
                                    </button>
                                </div>

                                {/* Active Payment Section View */}
                                <div className="pt-2">
                                    {selectedTab === "wallet" && (
                                        <EWalletView
                                            paymentData={paymentData}
                                            totalAmount={totals.total}
                                            formatRupiah={formatRupiah}
                                            onCheckStatus={() => checkPaymentStatus()}
                                            isLoading={isLoading}
                                        />
                                    )}

                                    {selectedTab === "bank" && (
                                        <BankTransferView
                                            paymentData={paymentData}
                                            selectedBank={selectedBank}
                                            onSelectBank={setSelectedBank}
                                            totalAmount={totals.total}
                                            formatRupiah={formatRupiah}
                                            onCheckStatus={() => checkPaymentStatus()}
                                            isLoading={isLoading}
                                        />
                                    )}

                                    {selectedTab === "guide" && <PanduanPembayaranView />}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Order Summary Box (4 cols matching screenshot) */}
                        <div className="col-span-4 space-y-6">
                            <div className="border border-zinc-200 rounded-xl bg-white p-6 shadow-xs space-y-6 sticky top-6">
                                <h2 className="text-base font-bold text-[#191C1F] pb-3 border-b border-zinc-200">
                                    Ringkasan Tagihan & Barang
                                </h2>

                                {/* Purchased Item Previews */}
                                <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                                    {(items.length > 0 ? items : (paymentData?.items || [])).map((item, idx) => (
                                        <div key={item.id || idx} className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg border border-zinc-200 p-1 shrink-0 bg-white">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-zinc-800 truncate">
                                                    {item.title}
                                                </p>
                                                <p className="text-[11px] text-zinc-500 mt-0.5">
                                                    {item.quantity} x {formatRupiah(item.numericPrice)}
                                                </p>
                                            </div>
                                            <p className="text-xs font-extrabold text-zinc-900">
                                                {formatRupiah(item.numericPrice * item.quantity)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-zinc-200 pt-4 flex justify-between items-center">
                                    <span className="text-xs font-medium text-zinc-600">Total Pembayaran Pas</span>
                                    <span className="text-xl font-extrabold text-[#2DA5F3]">
                                        {formatRupiah(items.length > 0 ? totals.total : (paymentData?.total_amount || 0))}
                                    </span>
                                </div>

                                {errorMessage && items.length > 0 && (
                                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 space-y-1">
                                        <p className="font-bold">Informasi Pembayaran</p>
                                        <p>{errorMessage}</p>
                                    </div>
                                )}

                                {/* Main Action Buttons matching reference UI */}
                                <div className="space-y-3 pt-2">
                                    {!paymentData ? (
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-[#2DA5F3] hover:bg-[#1B6392] text-white font-bold text-xs h-12 uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
                                        >
                                            <span>{isLoading ? "Memproses Transaksi..." : "Bayar Sekarang"}</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            onClick={() => checkPaymentStatus()}
                                            disabled={isLoading}
                                            className="w-full bg-[#2DA5F3] hover:bg-[#1B6392] text-white font-bold text-xs h-12 uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
                                        >
                                            <span>CEK STATUS PEMBAYARAN (REAL-TIME)</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    )}

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handlePrintReceipt}
                                        className="w-full border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-semibold text-xs h-11 flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <Printer className="w-4 h-4 text-zinc-500" />
                                        <span>Cetak Resi Pembayaran</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
