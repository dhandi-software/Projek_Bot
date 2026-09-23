import { useState } from "react";
import { Building2, Copy, Check } from "lucide-react";

export function BankTransferView() {
    const [selectedBank, setSelectedBank] = useState("bca");
    const [copied, setCopied] = useState(false);

    const banks = [
        { id: "bca", name: "Bank BCA", account: "8830-192-8472", holder: "PT Dhandi Ecommerce" },
        { id: "mandiri", name: "Bank Mandiri", account: "137-00-9831-2847", holder: "PT Dhandi Ecommerce" },
        { id: "bni", name: "Bank BNI", account: "0928-3741-29", holder: "PT Dhandi Ecommerce" },
        { id: "bri", name: "Bank BRI", account: "0341-01-002847-50-3", holder: "PT Dhandi Ecommerce" },
    ];

    const currentBank = banks.find((b) => b.id === selectedBank) || banks[0];

    const handleCopy = () => {
        navigator.clipboard.writeText(currentBank.account);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="border border-sky-200 bg-sky-50/50 rounded-lg p-4 space-y-3 text-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2 font-bold text-[#1B6392]">
                <Building2 className="w-4 h-4 text-[#2DA5F3]" />
                <span>Transfer Bank / Virtual Account</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
                {banks.map((bank) => (
                    <button
                        key={bank.id}
                        type="button"
                        onClick={() => setSelectedBank(bank.id)}
                        className={`py-2 px-1 text-center rounded border font-semibold text-[11px] transition-colors cursor-pointer ${
                            selectedBank === bank.id
                                ? "border-[#2DA5F3] bg-white text-[#1B6392] shadow-xs"
                                : "border-zinc-200 bg-white/70 text-zinc-600 hover:border-zinc-300"
                        }`}
                    >
                        {bank.name}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-md p-3 border border-zinc-200 flex items-center justify-between">
                <div>
                    <span className="text-[10px] text-zinc-400 font-medium block">Nomor Rekening / Virtual Account</span>
                    <span className="font-mono text-sm font-bold text-zinc-900">{currentBank.account}</span>
                    <span className="text-[11px] text-zinc-500 block">a.n. {currentBank.holder}</span>
                </div>
                <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-xs font-semibold text-[#2DA5F3] hover:text-[#1B6392] p-1.5 rounded bg-sky-50 border border-sky-100 cursor-pointer"
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600">Tersalin</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
