import { useState } from "react";
import { Building2, Copy, Check, RefreshCw, Clock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { PaymentData } from "~/hooks/useMidtransPayment";

interface BankTransferViewProps {
    paymentData?: PaymentData | null;
    selectedBank: string;
    onSelectBank: (bank: string) => void;
    totalAmount: number;
    formatRupiah: (val: number) => string;
    onCheckStatus?: () => void;
    isLoading?: boolean;
}

export function BankTransferView({
    paymentData,
    selectedBank,
    onSelectBank,
    totalAmount,
    formatRupiah,
    onCheckStatus,
    isLoading,
}: BankTransferViewProps) {
    const [copied, setCopied] = useState(false);

    const banks = [
        { id: "bca", name: "BCA" },
        { id: "bni", name: "BNI" },
        { id: "mandiri", name: "Mandiri" },
        { id: "bri", name: "BRI" },
    ];

    const activeVaNumber = paymentData?.va_number || "";
    const status = paymentData?.status || "pending";

    const handleCopy = () => {
        if (activeVaNumber) {
            navigator.clipboard.writeText(activeVaNumber);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="border border-sky-200 bg-sky-50/40 rounded-xl p-5 space-y-4 text-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2 font-bold text-[#1B6392]">
                <Building2 className="w-4 h-4 text-[#2DA5F3]" />
                <span className="text-sm">Pembayaran Virtual Account (VA)</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
                {banks.map((bank) => (
                    <button
                        key={bank.id}
                        type="button"
                        onClick={() => onSelectBank(bank.id)}
                        className={`py-2.5 px-2 text-center rounded-lg border font-bold text-xs transition-all cursor-pointer ${
                            selectedBank === bank.id
                                ? "border-[#2DA5F3] bg-white text-[#1B6392] shadow-xs ring-1 ring-[#2DA5F3]/30"
                                : "border-zinc-200 bg-white/70 text-zinc-600 hover:border-zinc-300"
                        }`}
                    >
                        {bank.name}
                    </button>
                ))}
            </div>

            {activeVaNumber ? (
                <div className="bg-white rounded-lg p-4 border border-zinc-200 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-[11px] text-zinc-500 font-medium block">
                                Virtual Account {paymentData?.va_bank?.toUpperCase() || selectedBank.toUpperCase()}
                            </span>
                            <span className="font-mono text-lg font-extrabold text-zinc-900 tracking-wider">
                                {activeVaNumber}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="flex items-center gap-1.5 text-xs font-bold text-[#2DA5F3] hover:text-[#1B6392] py-2 px-3 rounded-md bg-sky-50 border border-sky-200 cursor-pointer"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4 text-emerald-600" />
                                    <span className="text-emerald-600">Tersalin</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" />
                                    <span>Salin VA</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
                        <div>
                            <span className="text-[10px] text-zinc-400 block">Total Pembayaran</span>
                            <span className="text-base font-bold text-[#2DA5F3]">
                                {formatRupiah(paymentData?.total_amount || totalAmount)}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold">
                            {status === "paid" || status === "settlement" ? (
                                <span className="text-emerald-600 flex items-center gap-1">
                                    <CheckCircle2 className="w-4 h-4" /> Paid
                                </span>
                            ) : status === "expired" ? (
                                <span className="text-rose-600 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" /> Expired
                                </span>
                            ) : (
                                <span className="text-amber-600 flex items-center gap-1">
                                    <Clock className="w-4 h-4 animate-pulse" /> Pending
                                </span>
                            )}
                        </div>
                    </div>

                    <Button
                        type="button"
                        onClick={onCheckStatus}
                        disabled={isLoading}
                        className="w-full bg-[#2DA5F3] hover:bg-[#1B6392] text-white font-bold text-xs h-11 uppercase cursor-pointer flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <span>CEK STATUS PEMBAYARAN (REAL-TIME)</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </Button>
                </div>
            ) : (
                <div className="bg-white rounded-lg p-3.5 border border-zinc-200 text-xs text-zinc-600">
                    <p>Pilih bank di atas, lalu tekan <strong>Bayar Sekarang</strong> untuk mendapatkan nomor Virtual Account transaksi Anda.</p>
                </div>
            )}
        </div>
    );
}
