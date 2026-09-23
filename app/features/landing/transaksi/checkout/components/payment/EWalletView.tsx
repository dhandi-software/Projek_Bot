import { useState } from "react";
import { Wallet, QrCode } from "lucide-react";

export function EWalletView() {
    const [selectedWallet, setSelectedWallet] = useState("gopay");

    const wallets = [
        { id: "gopay", name: "GoPay" },
        { id: "ovo", name: "OVO" },
        { id: "shopeepay", name: "ShopeePay" },
        { id: "dana", name: "DANA" },
    ];

    return (
        <div className="border border-indigo-200 bg-indigo-50/50 rounded-lg p-4 space-y-3 text-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2 font-bold text-indigo-900">
                <Wallet className="w-4 h-4 text-indigo-600" />
                <span>Pembayaran E-Wallet Instan / QRIS</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
                {wallets.map((wallet) => (
                    <button
                        key={wallet.id}
                        type="button"
                        onClick={() => setSelectedWallet(wallet.id)}
                        className={`py-2 px-1 text-center rounded border font-semibold text-[11px] transition-colors cursor-pointer ${
                            selectedWallet === wallet.id
                                ? "border-indigo-500 bg-white text-indigo-900 shadow-xs"
                                : "border-zinc-200 bg-white/70 text-zinc-600 hover:border-zinc-300"
                        }`}
                    >
                        {wallet.name}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-md p-3 border border-zinc-200 flex items-center gap-3">
                <div className="w-12 h-12 bg-zinc-100 rounded border border-zinc-200 flex items-center justify-center text-zinc-500 shrink-0">
                    <QrCode className="w-7 h-7 text-indigo-600" />
                </div>
                <div className="space-y-0.5">
                    <p className="font-semibold text-zinc-800 text-xs">QRIS / Auto Switch ke App {selectedWallet.toUpperCase()}</p>
                    <p className="text-[11px] text-zinc-500">
                        Kode pembayaran akan ditampilkan setelah menekan tombol Place Order.
                    </p>
                </div>
            </div>
        </div>
    );
}
