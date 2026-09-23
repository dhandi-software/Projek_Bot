import { useState } from "react";
import { ArrowRight, CreditCard, ShieldCheck, Truck, Banknote, Wallet } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useCheckout } from "~/hooks/useCheckout";
import { BreadCheckoutDesktop } from "~/components/template/breadcrumb/BreadCheckoutDesktop";

import { CashOnDeliveryView } from "./components/payment/CashOnDeliveryView";
import { BankTransferView } from "./components/payment/BankTransferView";
import { EWalletView } from "./components/payment/EWalletView";
import { CreditCardView } from "./components/payment/CreditCardView";

export function CheckoutDesktop() {
    const navigate = useNavigate();
    const { items, totals, billingInfo, updateBillingField, formatRupiah } = useCheckout();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            navigate("/checkout/success");
        }, 800);
    };

    return (
        <div className="w-full bg-white">
            <BreadCheckoutDesktop />
            <section className="w-full py-10">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <form onSubmit={handleSubmitOrder} className="grid grid-cols-12 gap-8 items-start">
                        {/* LEFT COLUMN: Billing Information Form & Payment (8 cols) */}
                        <div className="col-span-8 space-y-6">
                            <div className="border border-zinc-200 rounded-lg p-6 bg-white shadow-xs space-y-5">
                                <h1 className="text-xl font-bold text-[#191C1F] pb-4 border-b border-zinc-200">
                                    Informasi Tagihan & Pengiriman
                                </h1>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold text-zinc-700">Nama Depan</Label>
                                        <Input
                                            required
                                            value={billingInfo.firstName}
                                            onChange={(e) => updateBillingField("firstName", e.target.value)}
                                            placeholder="Nama depan Anda"
                                            className="h-11 text-xs border-zinc-300"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold text-zinc-700">Nama Belakang</Label>
                                        <Input
                                            required
                                            value={billingInfo.lastName}
                                            onChange={(e) => updateBillingField("lastName", e.target.value)}
                                            placeholder="Nama belakang Anda"
                                            className="h-11 text-xs border-zinc-300"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold text-zinc-700">
                                        Nama Perusahaan <span className="text-zinc-400 font-normal">(Opsional)</span>
                                    </Label>
                                    <Input
                                        value={billingInfo.companyName}
                                        onChange={(e) => updateBillingField("companyName", e.target.value)}
                                        placeholder="Nama kantor / perusahaan"
                                        className="h-11 text-xs border-zinc-300"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold text-zinc-700">Alamat Lengkap</Label>
                                    <Input
                                        required
                                        value={billingInfo.address}
                                        onChange={(e) => updateBillingField("address", e.target.value)}
                                        placeholder="Jalan, No. Rumah, RT/RW, Kelurahan, Kecamatan"
                                        className="h-11 text-xs border-zinc-300"
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold text-zinc-700">Negara</Label>
                                        <Input
                                            value={billingInfo.country}
                                            onChange={(e) => updateBillingField("country", e.target.value)}
                                            className="h-11 text-xs border-zinc-300"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold text-zinc-700">Provinsi</Label>
                                        <Input
                                            value={billingInfo.regionState}
                                            onChange={(e) => updateBillingField("regionState", e.target.value)}
                                            className="h-11 text-xs border-zinc-300"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold text-zinc-700">Kota / Kabupaten</Label>
                                        <Input
                                            value={billingInfo.city}
                                            onChange={(e) => updateBillingField("city", e.target.value)}
                                            className="h-11 text-xs border-zinc-300"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold text-zinc-700">Kode Pos</Label>
                                        <Input
                                            value={billingInfo.zipCode}
                                            onChange={(e) => updateBillingField("zipCode", e.target.value)}
                                            className="h-11 text-xs border-zinc-300"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold text-zinc-700">Email</Label>
                                        <Input
                                            type="email"
                                            required
                                            value={billingInfo.email}
                                            onChange={(e) => updateBillingField("email", e.target.value)}
                                            placeholder="Alamat email aktif"
                                            className="h-11 text-xs border-zinc-300"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold text-zinc-700">Nomor Telepon</Label>
                                        <Input
                                            type="tel"
                                            required
                                            value={billingInfo.phone}
                                            onChange={(e) => updateBillingField("phone", e.target.value)}
                                            placeholder="Nomor HP WhatsApp"
                                            className="h-11 text-xs border-zinc-300"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Option Selection & Dynamic Payment Details View */}
                            <div className="border border-zinc-200 rounded-lg p-6 bg-white shadow-xs space-y-5">
                                <h2 className="text-lg font-bold text-[#191C1F] pb-3 border-b border-zinc-200">
                                    Opsi Pembayaran
                                </h2>

                                <div className="grid grid-cols-4 gap-3">
                                    {[
                                        { id: "cod", label: "Bayar di Tempat (COD)", icon: Banknote },
                                        { id: "bank", label: "Transfer Bank / VA", icon: Truck },
                                        { id: "wallet", label: "E-Wallet / QRIS", icon: Wallet },
                                        { id: "card", label: "Kartu Kredit / Debit", icon: CreditCard },
                                    ].map((method) => {
                                        const Icon = method.icon;
                                        const isSelected = billingInfo.paymentMethod === method.id;
                                        return (
                                            <button
                                                key={method.id}
                                                type="button"
                                                onClick={() => updateBillingField("paymentMethod", method.id)}
                                                className={`p-4 rounded-lg border text-center flex flex-col items-center gap-2 transition-all cursor-pointer ${
                                                    isSelected
                                                        ? "border-[#2DA5F3] bg-sky-50/50 text-[#1B6392] ring-2 ring-[#2DA5F3]/30 shadow-xs"
                                                        : "border-zinc-200 hover:border-zinc-300 text-zinc-600 bg-white"
                                                }`}
                                            >
                                                <Icon className="w-6 h-6" />
                                                <span className="text-xs font-bold">{method.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Separate Dynamic Payment Sub-Component View */}
                                <div className="pt-2">
                                    {billingInfo.paymentMethod === "cod" && <CashOnDeliveryView />}
                                    {billingInfo.paymentMethod === "bank" && <BankTransferView />}
                                    {billingInfo.paymentMethod === "wallet" && <EWalletView />}
                                    {billingInfo.paymentMethod === "card" && <CreditCardView />}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Order Summary Box (4 cols) */}
                        <div className="col-span-4 space-y-6">
                            <div className="border border-zinc-200 rounded-lg bg-white p-6 shadow-xs space-y-5">
                                <h2 className="text-lg font-bold text-[#191C1F] pb-3 border-b border-zinc-200">
                                    Ringkasan Pesanan
                                </h2>

                                {/* Purchased Item Previews */}
                                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded border border-zinc-200 p-1 shrink-0 bg-white">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium text-zinc-800 truncate">
                                                    {item.title}
                                                </p>
                                                <p className="text-xs text-zinc-500">
                                                    {item.quantity} x {formatRupiah(item.numericPrice)}
                                                </p>
                                            </div>
                                            <p className="text-xs font-bold text-zinc-900">
                                                {formatRupiah(item.numericPrice * item.quantity)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2.5 text-xs text-zinc-600 border-t border-zinc-200 pt-4">
                                    <div className="flex justify-between">
                                        <span>Sub-total</span>
                                        <span className="font-semibold text-zinc-900">{formatRupiah(totals.subTotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Pengiriman</span>
                                        <span className="font-semibold text-emerald-600">Gratis Ongkir</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Diskon Kupon</span>
                                        <span className="font-semibold text-zinc-900">-{formatRupiah(totals.discount)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Pajak & Layanan</span>
                                        <span className="font-semibold text-zinc-900">{formatRupiah(totals.tax)}</span>
                                    </div>
                                </div>

                                <div className="border-t border-zinc-200 pt-4 flex justify-between items-center">
                                    <span className="text-sm font-bold text-[#191C1F]">Total Akhir</span>
                                    <span className="text-base font-bold text-[#2DA5F3]">
                                        {formatRupiah(totals.total)}
                                    </span>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#2DA5F3] hover:bg-[#1B6392] text-white font-bold text-xs h-13 uppercase tracking-wider shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <span>{isSubmitting ? "Memproses..." : "Buat Pesanan Sekarang"}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Button>

                                <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 pt-1">
                                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                    <span>Jaminan Pembayaran 100% Aman & Terenkripsi</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
