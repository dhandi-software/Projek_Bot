import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ArrowRight, RefreshCw, CheckCircle2, AlertCircle, Clock, QrCode, Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { PaymentData } from "~/hooks/useMidtransPayment";

interface EWalletViewProps {
    paymentData?: PaymentData | null;
    totalAmount: number;
    formatRupiah: (val: number) => string;
    onCheckStatus?: () => void;
    isLoading?: boolean;
}

export function EWalletView({
    paymentData,
    totalAmount,
    formatRupiah,
    onCheckStatus,
    isLoading,
}: EWalletViewProps) {
    const [isCopied, setIsCopied] = useState(false);
    const hasActiveQR = Boolean(paymentData?.qris_string || paymentData?.qris_url);
    const status = paymentData?.status || "pending";

    if (!hasActiveQR) {
        return (
            <div className="border border-sky-100 bg-sky-50/50 rounded-lg p-5 space-y-4 text-xs animate-in fade-in duration-200">
                <div className="flex items-center gap-2.5 font-bold text-[#1B6392]">
                    <QrCode className="w-5 h-5 text-[#2DA5F3]" />
                    <span className="text-sm">Pembayaran QRIS / E-Wallet Instant</span>
                </div>
                <p className="text-zinc-600 text-xs leading-relaxed">
                    Setiap transaksi akan membuat <strong>QR Code QRIS resmi</strong> yang dapat di-scan langsung menggunakan GoPay, OVO, DANA, ShopeePay, BCA Mobile, atau aplikasi M-Banking pendukung QRIS lainnya.
                </p>
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-md border border-zinc-200 text-zinc-500">
                    <div className="w-9 h-9 bg-sky-100/70 rounded-full flex items-center justify-center shrink-0">
                        <QrCode className="w-5 h-5 text-[#2DA5F3]" />
                    </div>
                    <div className="text-[11px] leading-tight">
                        <span className="font-semibold text-zinc-800 block">QR Code Otomatis Tergenerasi</span>
                        Tekan tombol <strong>Bayar Sekarang</strong> di bawah untuk mendapatkan QR Code transaksi aktual Anda.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#181a38] text-white rounded-xl p-6 shadow-md border border-[#242852] space-y-5 animate-in fade-in duration-300">
            {/* Header section inside dark card */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                    <h3 className="text-base md:text-lg font-bold text-white tracking-wide">
                        QR Code Pembayaran QRIS
                    </h3>
                    <p className="text-xs text-zinc-300 mt-0.5">
                        Scan QR Code menggunakan aplikasi GoPay, OVO, DANA, ShopeePay, atau Mobile Banking
                    </p>
                </div>
                <span className="self-start md:self-auto text-[11px] font-medium text-white/80 bg-white/10 px-3 py-1 rounded-full border border-white/20 whitespace-nowrap">
                    QRIS Standards GPN
                </span>
            </div>

            {/* QR Code Container Box */}
            <div className="bg-[#13152d] border border-[#23264b] rounded-xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                {/* QR Code Box */}
                <div className="flex flex-col items-center shrink-0">
                    <div className="bg-white p-4 rounded-xl shadow-lg border border-zinc-200 flex items-center justify-center">
                        {paymentData?.qris_string ? (
                            <QRCodeSVG
                                value={paymentData.qris_string}
                                size={180}
                                level="M"
                                includeMargin={false}
                            />
                        ) : paymentData?.qris_url ? (
                            <img
                                src={paymentData.qris_url}
                                alt="QRIS Code Pembayaran"
                                className="w-44 h-44 object-contain"
                            />
                        ) : (
                            <div className="w-44 h-44 bg-zinc-100 flex items-center justify-center text-xs text-zinc-500">
                                QR Code Tidak Tersedia
                            </div>
                        )}
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-2.5 font-medium text-center">
                        Dicetak oleh: GoPay / QRIS National
                    </p>
                </div>

                {/* Details & Status Section */}
                <div className="flex-1 w-full flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                    <div>
                        <span className="text-xs text-zinc-400 font-medium block">Total Nominal Pembayaran</span>
                        <p className="text-2xl font-extrabold text-[#2DA5F3] mt-0.5">
                            {formatRupiah(paymentData?.total_amount || totalAmount)}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 py-1.5 px-3 bg-white/5 rounded-lg border border-white/10 w-full md:w-auto justify-center md:justify-start">
                        {status === "paid" || status === "settlement" ? (
                            <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span className="text-xs font-bold text-emerald-400">Pembayaran Berhasil Dikonfirmasi</span>
                            </>
                        ) : status === "expired" || status === "deny" || status === "failed" ? (
                            <>
                                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                                <span className="text-xs font-bold text-rose-400">Pembayaran Kedaluwarsa / Gagal</span>
                            </>
                        ) : (
                            <>
                                <Clock className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
                                <span className="text-xs font-bold text-amber-300">Menunggu pembayaran...</span>
                            </>
                        )}
                    </div>

                    {/* QRIS URL / Payment Simulator Testing Link */}
                    {paymentData?.qris_url && (
                        <div className="w-full bg-[#181a38] border border-[#2e3366] rounded-lg p-3 space-y-2 text-left">
                            <span className="text-[11px] text-sky-300 font-semibold block">
                                URL QRIS (Untuk Simulasi Pembayaran / Payment Simulator):
                            </span>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    readOnly
                                    value={paymentData.qris_url}
                                    className="flex-1 bg-[#0f1024] text-xs text-sky-200 px-2.5 py-1.5 rounded border border-[#2d3261] font-mono select-all focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        navigator.clipboard.writeText(paymentData.qris_url || "");
                                        setIsCopied(true);
                                        setTimeout(() => setIsCopied(false), 2000);
                                    }}
                                    className="bg-[#2DA5F3] hover:bg-[#1B6392] text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
                                >
                                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                                    <span>{isCopied ? "Tersalin!" : "Salin URL"}</span>
                                </button>
                                <a
                                    href={paymentData.qris_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1.5 rounded text-xs font-bold flex items-center gap-1 shrink-0 transition-colors"
                                    title="Buka QRIS URL"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>
                    )}

                    <Button
                        type="button"
                        onClick={onCheckStatus}
                        disabled={isLoading}
                        className="w-full bg-[#2DA5F3] hover:bg-[#1B6392] text-white font-bold text-xs h-12 uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
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
            </div>
        </div>
    );
}
