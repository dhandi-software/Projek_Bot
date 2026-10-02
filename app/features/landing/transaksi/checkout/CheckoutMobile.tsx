import { useState, useEffect } from "react";
import { ArrowRight, Building2, QrCode, BookOpen, ShieldCheck, Printer } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useCheckout } from "~/hooks/useCheckout";
import { useMidtransPayment } from "~/hooks/useMidtransPayment";
import { BreadCheckoutMobile } from "~/components/template/breadcrumb/BreadCheckoutMobile";

import { BankTransferView } from "./components/payment/BankTransferView";
import { EWalletView } from "./components/payment/EWalletView";
import { PanduanPembayaranView } from "./components/payment/PanduanPembayaranView";

export function CheckoutMobile() {
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
        <div className="w-full bg-white pb-12">
            <BreadCheckoutMobile />

            {/* Mobile Checkout Spacing */}

            <section className="w-full py-5 px-4">
                <form onSubmit={handleSubmitOrder} className="space-y-5">
                    {/* Billing Form */}
                    <div className="border border-zinc-200 rounded-xl p-4 bg-white shadow-xs space-y-3.5">
                        <h1 className="text-base font-bold text-[#191C1F] pb-2 border-b border-zinc-200">
                            Informasi Tagihan & Pengiriman
                        </h1>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <Label className="text-xs font-semibold text-zinc-700">Nama Depan</Label>
                                <Input
                                    required
                                    value={billingInfo.firstName}
                                    onChange={(e) => updateBillingField("firstName", e.target.value)}
                                    placeholder="Nama depan"
                                    className="h-10 text-xs border-zinc-300"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs font-semibold text-zinc-700">Nama Belakang</Label>
                                <Input
                                    required
                                    value={billingInfo.lastName}
                                    onChange={(e) => updateBillingField("lastName", e.target.value)}
                                    placeholder="Nama belakang"
                                    className="h-10 text-xs border-zinc-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label className="text-xs font-semibold text-zinc-700">Alamat Lengkap</Label>
                            <Input
                                required
                                value={billingInfo.address}
                                onChange={(e) => updateBillingField("address", e.target.value)}
                                placeholder="Alamat rumah / kantor"
                                className="h-10 text-xs border-zinc-300"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <Label className="text-xs font-semibold text-zinc-700">Email</Label>
                                <Input
                                    type="email"
                                    required
                                    value={billingInfo.email}
                                    onChange={(e) => updateBillingField("email", e.target.value)}
                                    placeholder="Email"
                                    className="h-10 text-xs border-zinc-300"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs font-semibold text-zinc-700">Telepon</Label>
                                <Input
                                    type="tel"
                                    required
                                    value={billingInfo.phone}
                                    onChange={(e) => updateBillingField("phone", e.target.value)}
                                    placeholder="No. HP WhatsApp"
                                    className="h-10 text-xs border-zinc-300"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Method Tabs */}
                    <div className="border border-zinc-200 rounded-xl p-4 bg-white shadow-xs space-y-4">
                        <div>
                            <h2 className="text-base font-bold text-[#191C1F]">
                                Pilih Metode Pembayaran Mandiri
                            </h2>
                            <p className="text-xs text-zinc-500 mt-0.5">
                                Scan QRIS atau gunakan Virtual Account
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => setSelectedTab("wallet")}
                                className={`p-3 rounded-lg border text-center flex flex-col items-center gap-1.5 transition-all ${
                                    selectedTab === "wallet"
                                        ? "border-[#2DA5F3] bg-sky-50/50 text-[#1B6392] ring-1 ring-[#2DA5F3]"
                                        : "border-zinc-200 text-zinc-600 bg-white"
                                }`}
                            >
                                <QrCode className="w-5 h-5 text-[#2DA5F3]" />
                                <span className="text-[11px] font-bold">QRIS</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setSelectedTab("bank")}
                                className={`p-3 rounded-lg border text-center flex flex-col items-center gap-1.5 transition-all ${
                                    selectedTab === "bank"
                                        ? "border-[#2DA5F3] bg-sky-50/50 text-[#1B6392] ring-1 ring-[#2DA5F3]"
                                        : "border-zinc-200 text-zinc-600 bg-white"
                                }`}
                            >
                                <Building2 className="w-5 h-5 text-[#2DA5F3]" />
                                <span className="text-[11px] font-bold">VA</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setSelectedTab("guide")}
                                className={`p-3 rounded-lg border text-center flex flex-col items-center gap-1.5 transition-all ${
                                    selectedTab === "guide"
                                        ? "border-[#2DA5F3] bg-sky-50/50 text-[#1B6392] ring-1 ring-[#2DA5F3]"
                                        : "border-zinc-200 text-zinc-600 bg-white"
                                }`}
                            >
                                <BookOpen className="w-5 h-5 text-[#2DA5F3]" />
                                <span className="text-[11px] font-bold">Panduan</span>
                            </button>
                        </div>

                        <div className="pt-1">
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

                    {/* Order Summary */}
                    <div className="border border-zinc-200 rounded-xl p-4 bg-white shadow-xs space-y-4">
                        <h2 className="text-base font-bold text-[#191C1F] pb-2 border-b border-zinc-200">
                            Ringkasan Tagihan & Barang
                        </h2>

                        <div className="space-y-3">
                            {(items.length > 0 ? items : (paymentData?.items || [])).map((item, idx) => (
                                <div key={item.id || idx} className="flex items-center gap-2.5">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-10 h-10 object-contain rounded border border-zinc-200 p-0.5 shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-zinc-800 truncate">{item.title}</p>
                                        <p className="text-[11px] text-zinc-500">{item.quantity} x {formatRupiah(item.numericPrice)}</p>
                                    </div>
                                    <p className="text-xs font-extrabold text-zinc-900">{formatRupiah(item.numericPrice * item.quantity)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-zinc-200 pt-3 flex justify-between items-center">
                            <span className="text-xs font-bold text-[#191C1F]">Total Pembayaran Pas</span>
                            <span className="text-lg font-extrabold text-[#2DA5F3]">
                                {formatRupiah(items.length > 0 ? totals.total : (paymentData?.total_amount || 0))}
                            </span>
                        </div>

                        {errorMessage && (
                            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
                                {errorMessage}
                            </div>
                        )}

                        <div className="space-y-2.5 pt-1">
                            {!paymentData ? (
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#2DA5F3] text-white font-bold text-xs h-11 uppercase flex items-center justify-center gap-2"
                                >
                                    <span>{isLoading ? "Memproses..." : "Bayar Sekarang"}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    onClick={() => checkPaymentStatus()}
                                    disabled={isLoading}
                                    className="w-full bg-[#2DA5F3] text-white font-bold text-xs h-11 uppercase flex items-center justify-center gap-2"
                                >
                                    <span>CEK STATUS PEMBAYARAN (REAL-TIME)</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            )}

                            <Button
                                type="button"
                                variant="outline"
                                onClick={handlePrintReceipt}
                                className="w-full border-zinc-300 text-zinc-700 font-semibold text-xs h-10 flex items-center justify-center gap-2"
                            >
                                <Printer className="w-4 h-4 text-zinc-500" />
                                <span>Cetak Resi Pembayaran</span>
                            </Button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
}
