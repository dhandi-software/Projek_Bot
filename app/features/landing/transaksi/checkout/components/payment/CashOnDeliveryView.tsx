import { Banknote, ShieldCheck } from "lucide-react";

export function CashOnDeliveryView() {
    return (
        <div className="border border-emerald-200 bg-emerald-50/60 rounded-lg p-4 space-y-2 text-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2 font-bold text-emerald-800">
                <Banknote className="w-4 h-4 text-emerald-600" />
                <span>Bayar di Tempat (COD)</span>
            </div>
            <p className="text-zinc-600 leading-relaxed">
                Anda dapat membayar pesanan secara tunai langsung kepada kurir saat barang tiba di alamat Anda.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium pt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Bebas biaya tambahan & garansi aman 100%</span>
            </div>
        </div>
    );
}
