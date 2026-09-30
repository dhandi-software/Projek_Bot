import { HelpCircle, QrCode, Building2, CheckCircle2 } from "lucide-react";

export function PanduanPembayaranView() {
    return (
        <div className="border border-zinc-200 bg-zinc-50/70 rounded-xl p-5 space-y-4 text-xs text-zinc-700 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 font-bold text-[#191C1F]">
                <HelpCircle className="w-4 h-4 text-[#2DA5F3]" />
                <span className="text-sm">Panduan & Cara Pembayaran</span>
            </div>

            <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border border-zinc-200 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-zinc-900">
                        <QrCode className="w-4 h-4 text-[#2DA5F3]" />
                        <span>Cara Pembayaran QRIS / E-Wallet</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-1 text-zinc-600 leading-relaxed text-[11px]">
                        <li>Buka aplikasi e-wallet (GoPay, OVO, DANA, ShopeePay) atau M-Banking Anda.</li>
                        <li>Pilih menu <strong>Scan QR / Bayar</strong>.</li>
                        <li>Arahkan kamera smartphone ke <strong>QR Code Pembayaran QRIS</strong> yang tampil di layar.</li>
                        <li>Periksa nominal pembayaran dan nama merchant, lalu selesaikan transaksi dengan PIN Anda.</li>
                        <li>Tekan tombol <strong>CEK STATUS PEMBAYARAN (REAL-TIME)</strong> di bawah.</li>
                    </ol>
                </div>

                <div className="bg-white p-4 rounded-lg border border-zinc-200 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-zinc-900">
                        <Building2 className="w-4 h-4 text-[#2DA5F3]" />
                        <span>Cara Pembayaran Virtual Account (VA)</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-1 text-zinc-600 leading-relaxed text-[11px]">
                        <li>Buka aplikasi Mobile Banking / ATM sesuai bank yang dipilih (BCA, BNI, Mandiri, BRI).</li>
                        <li>Pilih menu <strong>Transfer / Pembayaran Virtual Account</strong>.</li>
                        <li>Masukkan <strong>Nomor Virtual Account</strong> yang tertera.</li>
                        <li>Periksa rincian tagihan dan konfirmasi pembayaran.</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
