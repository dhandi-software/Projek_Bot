import { useState } from "react";
import { ArrowRight, CreditCard, ShieldCheck, Truck, Banknote, Wallet } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useCheckout } from "~/hooks/useCheckout";
import { useMidtransPayment } from "~/hooks/useMidtransPayment";
import { BreadCheckoutMobile } from "~/components/template/breadcrumb/BreadCheckoutMobile";

import { CashOnDeliveryView } from "./components/payment/CashOnDeliveryView";
import { BankTransferView } from "./components/payment/BankTransferView";
import { EWalletView } from "./components/payment/EWalletView";
import { CreditCardView } from "./components/payment/CreditCardView";

export function CheckoutMobile() {
    const navigate = useNavigate();
    const { items, totals, billingInfo, updateBillingField, formatRupiah } = useCheckout();
    const { processPayment, triggerExistingSnap, isLoading, errorMessage, snapRedirectUrl, snapToken, isOnline, activeIdempotencyKey } = useMidtransPayment();

    const handleSubmitOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        await processPayment(items, billingInfo, () => {
            navigate("/checkout/success");
        });
    };

    return (
        <div className="w-full bg-white">
            <BreadCheckoutMobile />

            {/* Network Status & Idempotency Key Bar */}
            <div className="w-full bg-zinc-900 text-white py-2 px-3">
                <div className="flex flex-col gap-1 text-[11px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}></span>
                            <span className="font-medium">
                                {isOnline ? "Online (Sinyal Stabil)" : "⚠️ Sinyal Terputus (Proteksi Active)"}
                            </span>
                        </div>
                        <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <div className="font-mono text-[10px] text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded truncate">
                        Key: <span className="text-sky-300 font-bold">{activeIdempotencyKey || "Memuat..."}</span>
                    </div>
                </div>
            </div>

            <section className="w-full py-6 px-4">
                <form onSubmit={handleSubmitOrder} className="space-y-5">
                    <div className="border border-zinc-200 rounded-lg p-4 bg-white shadow-xs space-y-4">
                        <h1 className="text-base font-bold text-[#191C1F] pb-3 border-b border-zinc-200">
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
                                    className="h-11 text-xs border-zinc-300"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs font-semibold text-zinc-700">Nama Belakang</Label>
                                <Input
                                    required
                                    value={billingInfo.lastName}
                                    onChange={(e) => updateBillingField("lastName", e.target.value)}
                                    placeholder="Nama belakang"
                                    className="h-11 text-xs border-zinc-300"
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
                                className="h-11 text-xs border-zinc-300"
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
                                    className="h-11 text-xs border-zinc-300"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs font-semibold text-zinc-700">Telepon</Label>
                                <Input
                                    type="tel"
                                    required
                                    value={billingInfo.phone}
                                    onChange={(e) => updateBillingField("phone", e.target.value)}
                                    placeholder="No. HP"
                                    className="h-11 text-xs border-zinc-300"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Options */}
                    <div className="border border-zinc-200 rounded-lg p-4 bg-white shadow-xs space-y-3">
                        <h2 className="text-sm font-bold text-[#191C1F] pb-2 border-b border-zinc-200">
                            Opsi Pembayaran Midtrans Gateway
                        </h2>
                        <div className="grid grid-cols-2 gap-2.5">
                            {[
                                { id: "cod", label: "COD", icon: Banknote },
                                { id: "bank", label: "Transfer Bank", icon: Truck },
                                { id: "wallet", label: "E-Wallet", icon: Wallet },
                                { id: "card", label: "Kartu Kredit", icon: CreditCard },
                            ].map((method) => {
                                const Icon = method.icon;
                                const isSelected = billingInfo.paymentMethod === method.id;
                                return (
                                    <button
                                        key={method.id}
                                        type="button"
                                        onClick={() => updateBillingField("paymentMethod", method.id)}
                                        className={`p-3 rounded-lg border text-center flex flex-col items-center gap-1.5 transition-all ${isSelected
                                                ? "border-[#2DA5F3] bg-sky-50/50 text-[#1B6392] ring-1 ring-[#2DA5F3]"
                                                : "border-zinc-200 text-zinc-600"
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="text-xs font-semibold">{method.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Separate Dynamic Payment View */}
                        <div className="pt-2">
                            {billingInfo.paymentMethod === "cod" && <CashOnDeliveryView />}
                            {billingInfo.paymentMethod === "bank" && <BankTransferView />}
                            {billingInfo.paymentMethod === "wallet" && <EWalletView />}
                            {billingInfo.paymentMethod === "card" && <CreditCardView />}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="border border-zinc-200 rounded-lg p-4 bg-white shadow-xs space-y-4">
                        <h2 className="text-sm font-bold text-[#191C1F] pb-2 border-b border-zinc-200">
                            Ringkasan Pesanan
                        </h2>

                        <div className="space-y-2.5 text-xs text-zinc-600">
                            <div className="flex justify-between">
                                <span>Sub-total Produk</span>
                                <span className="font-semibold text-zinc-900">{formatRupiah(totals.subTotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Ongkos Kirim</span>
                                <span className="font-semibold text-emerald-600">Gratis Ongkir</span>
                            </div>
                            {totals.discount > 0 && (
                                <div className="flex justify-between">
                                    <span>Diskon</span>
                                    <span className="font-semibold text-rose-600">-{formatRupiah(totals.discount)}</span>
                                </div>
                            )}
                        </div>

                        <div className="border-t border-zinc-200 pt-3 flex justify-between items-center">
                            <span className="text-xs font-bold text-[#191C1F]">Total Bayar (Pas)</span>
                            <span className="text-base font-extrabold text-[#2DA5F3]">{formatRupiah(totals.total)}</span>
                        </div>

                        {errorMessage && (
                            <div className="p-3 bg-rose-50 border border-rose-200 rounded text-xs text-rose-700 space-y-1">
                                <p className="font-bold">Informasi Pembayaran</p>
                                <p>{errorMessage}</p>
                            </div>
                        )}

                        {(snapToken || snapRedirectUrl) && (
                            <div className="p-3 bg-sky-50 border border-sky-200 rounded text-xs text-[#1B6392] space-y-2">
                                <p className="font-semibold text-zinc-900">Sesi Midtrans Aktif</p>
                                <Button
                                    type="button"
                                    onClick={triggerExistingSnap}
                                    className="w-full bg-[#2DA5F3] text-white text-xs h-9"
                                >
                                    Buka Pembayaran Midtrans
                                </Button>
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#2DA5F3] hover:bg-[#1B6392] text-white font-bold text-xs min-h-[48px] uppercase tracking-wider shadow-xs flex items-center justify-center gap-2"
                        >
                            <span>{isLoading ? "Memproses Midtrans..." : "Bayar Sekarang via Midtrans"}</span>
                            <ArrowRight className="w-4 h-4" />
                        </Button>

                        <div className="flex flex-col items-center justify-center gap-0.5 text-[10px] text-zinc-500 pt-1 text-center">
                            <div className="flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Pembayaran Terproteksi Idempotency</span>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
}
